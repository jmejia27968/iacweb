-- IAC INGENIEROS · SCRIPT 2 DE 2: convierte en ADMINISTRADOR al usuario que usted creó en Authentication > Users.
-- 1) Cambie el correo de abajo por el de ese usuario. 2) Pegue y ejecute (Run).
insert into profiles(id,email,full_name,role)
select id, email, 'Administrador', 'admin' from auth.users where email = 'j.mejia.27968@gmail.com'
on conflict (id) do update set role='admin';
select email, role from profiles;  -- debe mostrar su correo con rol admin
