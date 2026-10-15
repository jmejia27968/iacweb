-- IAC INGENIEROS · SCRIPT 1 DE 3: estructura, seguridad y almacenamiento. Pegar UNA vez en Supabase > SQL Editor > Run.
-- (Se puede volver a ejecutar sin problema: no borra datos.)
create extension if not exists pgcrypto;

create table if not exists profiles(id uuid primary key references auth.users on delete cascade, email text, full_name text, role text not null default 'staff' check (role in ('admin','staff')), created_at timestamptz default now());
create or replace function is_staff() returns boolean language sql security definer stable set search_path=public as $$ select exists(select 1 from profiles where id=auth.uid() and role in ('admin','staff')) $$;
create or replace function is_admin() returns boolean language sql security definer stable set search_path=public as $$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;

create table if not exists service_categories(id uuid primary key default gen_random_uuid(), name text not null, slug text unique, active boolean default true, created_at timestamptz default now());
create table if not exists services(id uuid primary key default gen_random_uuid(), category_id uuid references service_categories on delete set null, title text not null, slug text unique not null, short_description text, description text, problem text, solution text, scope text, featured boolean default false, active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists projects(id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, description text, location text, voltage_level text, project_type text, client_display_name text, year int, featured boolean default false, cover_image text, status text default 'publicado', active boolean default true, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists project_images(id uuid primary key default gen_random_uuid(), project_id uuid references projects on delete cascade, url text not null, caption text, created_at timestamptz default now());
create table if not exists technologies(id uuid primary key default gen_random_uuid(), name text not null, description text, logo_url text, active boolean default true, created_at timestamptz default now());
create table if not exists certifications(id uuid primary key default gen_random_uuid(), name text not null, issuer text, description text, document_url text, issue_date date, expiry_date date, active boolean default true, created_at timestamptz default now());
create table if not exists testimonials(id uuid primary key default gen_random_uuid(), author text not null, company text, quote text not null, active boolean default true, created_at timestamptz default now());
create table if not exists site_settings(key text primary key, value text, created_at timestamptz default now());

create table if not exists contact_messages(id uuid primary key default gen_random_uuid(), name text not null check (length(trim(name))>1), company text, position text, email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'), phone text, project_type text, voltage_level text, service_required text, location text, subject text, message text not null check (length(trim(message))>1), attachment_url text, status text not null default 'nueva', created_at timestamptz default now());
create table if not exists quote_requests(id uuid primary key default gen_random_uuid(), name text not null check (length(trim(name))>1), company text, position text, email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'), phone text, project_name text, location text, installation_type text, voltage_level text, service_required text, description text not null check (length(trim(description))>1), estimated_date date, attachment_url text, status text not null default 'nueva', created_at timestamptz default now());

-- Seguridad (RLS)
alter table profiles enable row level security;
drop policy if exists "perfil propio o staff" on profiles;
create policy "perfil propio o staff" on profiles for select using (id=auth.uid() or is_staff());
drop policy if exists "admin edita perfiles" on profiles;
create policy "admin edita perfiles" on profiles for update using (is_admin());

do $$ declare t text; begin
  foreach t in array array['service_categories','services','projects','technologies','certifications','testimonials'] loop
    execute format('alter table %I enable row level security',t);
    execute format('drop policy if exists "publico lee activos" on %I',t);
    execute format('create policy "publico lee activos" on %I for select using (active or is_staff())',t);
    execute format('drop policy if exists "staff gestiona" on %I',t);
    execute format('create policy "staff gestiona" on %I for all using (is_staff()) with check (is_staff())',t);
  end loop;
  foreach t in array array['project_images','site_settings'] loop
    execute format('alter table %I enable row level security',t);
    execute format('drop policy if exists "publico lee" on %I',t);
    execute format('create policy "publico lee" on %I for select using (true)',t);
    execute format('drop policy if exists "staff gestiona" on %I',t);
    execute format('create policy "staff gestiona" on %I for all using (is_staff()) with check (is_staff())',t);
  end loop;
  foreach t in array array['contact_messages','quote_requests'] loop
    execute format('alter table %I enable row level security',t);
    execute format('drop policy if exists "publico envia" on %I',t);
    execute format('create policy "publico envia" on %I for insert to anon, authenticated with check (true)',t);
    execute format('drop policy if exists "staff lee" on %I',t);
    execute format('create policy "staff lee" on %I for select using (is_staff())',t);
    execute format('drop policy if exists "staff actualiza" on %I',t);
    execute format('create policy "staff actualiza" on %I for update using (is_staff())',t);
    execute format('drop policy if exists "staff borra" on %I',t);
    execute format('create policy "staff borra" on %I for delete using (is_staff())',t);
  end loop;
end $$;

-- Almacenamiento (los buckets se crean a mano: "imagenes" público y "documentos" privado)
drop policy if exists "imagenes lectura publica" on storage.objects;
create policy "imagenes lectura publica" on storage.objects for select using (bucket_id='imagenes');
drop policy if exists "imagenes staff" on storage.objects;
create policy "imagenes staff" on storage.objects for all using (bucket_id='imagenes' and is_staff()) with check (bucket_id='imagenes' and is_staff());
drop policy if exists "documentos: cualquiera sube" on storage.objects;
create policy "documentos: cualquiera sube" on storage.objects for insert to anon, authenticated with check (bucket_id='documentos');
drop policy if exists "documentos: staff gestiona" on storage.objects;
create policy "documentos: staff gestiona" on storage.objects for all using (bucket_id='documentos' and is_staff()) with check (bucket_id='documentos' and is_staff());

-- Crear usuarios desde el panel (sin CLI ni Edge Functions). Solo el administrador puede usarla.
create or replace function admin_create_user(p_email text, p_password text, p_name text, p_role text default 'staff') returns uuid
language plpgsql security definer set search_path=public, extensions as $$
declare uid uuid := gen_random_uuid();
begin
  if not is_admin() then raise exception 'No autorizado'; end if;
  if length(p_password) < 8 then raise exception 'La contraseña debe tener al menos 8 caracteres'; end if;
  insert into auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,confirmation_token,recovery_token,email_change,email_change_token_new)
  values('00000000-0000-0000-0000-000000000000',uid,'authenticated','authenticated',lower(p_email),crypt(p_password,gen_salt('bf')),now(),'{"provider":"email","providers":["email"]}','{}',now(),now(),'','','','');
  insert into auth.identities(id,user_id,provider_id,identity_data,provider,last_sign_in_at,created_at,updated_at)
  values(gen_random_uuid(),uid,uid::text,jsonb_build_object('sub',uid::text,'email',lower(p_email)),'email',now(),now(),now());
  insert into profiles(id,email,full_name,role) values(uid,lower(p_email),p_name,case when p_role='admin' then 'admin' else 'staff' end);
  return uid;
end $$;
revoke all on function admin_create_user(text,text,text,text) from public, anon;
grant execute on function admin_create_user(text,text,text,text) to authenticated;


-- Columnas de la versión 3 (proyectos documentados, validación editorial, consentimiento)
alter table services add column if not exists validation_status text default 'pending', add column if not exists sort_order int default 0, add column if not exists related_project_slug text;
alter table projects add column if not exists period_label text, add column if not exists project_date date, add column if not exists department text, add column if not exists installation_type text,
  add column if not exists services_done text[] default '{}', add column if not exists voltages text[] default '{}', add column if not exists technologies text, add column if not exists source_note text,
  add column if not exists validation_status text default 'confirmed', add column if not exists sort_order int default 0;
alter table project_images add column if not exists thumb_url text, add column if not exists alt text, add column if not exists sort_order int default 0;
alter table contact_messages add column if not exists consent boolean not null default false;
alter table quote_requests add column if not exists consent boolean not null default false, add column if not exists sector text, add column if not exists department text;
alter table contact_messages drop constraint if exists consent_ok; alter table contact_messages add constraint consent_ok check (consent) not valid;
alter table quote_requests drop constraint if exists consent_ok; alter table quote_requests add constraint consent_ok check (consent) not valid;
create index if not exists projects_date_idx on projects (project_date desc);
create index if not exists project_images_project_idx on project_images (project_id, sort_order);

-- Versión 4: fichas técnicas de servicios y estados editoriales
alter table services add column if not exists category_label text, add column if not exists subtitle text, add column if not exists scope_items text[] default '{}', add column if not exists scope_note text,
  add column if not exists equipment_text text, add column if not exists verification_items text[] default '{}', add column if not exists verification_note text,
  add column if not exists deliverable_items text[] default '{}', add column if not exists applications_text text, add column if not exists related_project_slugs text[] default '{}',
  add column if not exists editorial_status text not null default 'publicado';
alter table services drop constraint if exists editorial_status_ok;
alter table services add constraint editorial_status_ok check (editorial_status in ('borrador','pendiente_validacion','aprobado','publicado'));
-- Los visitantes solo ven servicios activos y en estado "publicado"; el personal ve todos.
drop policy if exists "publico lee activos" on services;
create policy "publico lee activos" on services for select using ((active and editorial_status = 'publicado') or is_staff());
