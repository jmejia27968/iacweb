# IAC Ingenieros — sitio web (React + Vite + Supabase)

## Puesta en marcha (en orden)
1. **Supabase → SQL Editor:** ejecute `supabase/1_schema_general.sql`.
2. **Supabase → Authentication → Users → Add user** (marque *Auto Confirm User*). Luego edite el correo en `supabase/2_crear_administrador.sql` y ejecútelo.
3. **SQL Editor:** ejecute `supabase/3_contenido_inicial.sql` (servicios, tecnologías, 17 proyectos y sus fotos).
4. **Storage → New bucket:** `imagenes` (**público**) y `documentos` (**privado**).
5. **Project Settings → API:** copie Project URL y la clave anon/publishable.
6. **Netlify:** variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`; build `npm run build`, carpeta `dist` (ya en `netlify.toml`).
7. Entre a `/admin/login`.

Local: copie `.env.example` a `.env`, `npm install`, `npm run dev`.

## Documentación (`docs/`)
`PROYECTOS.md` · `PENDIENTES.md` · `DECISIONES.md` · `TRAZABILIDAD.md` · `GUIA_ADMINISTRACION.md`

Las fotografías de proyectos están en `public/proyectos/` y se enlazan desde la base de datos. Las fotos nuevas se suben desde el panel.
