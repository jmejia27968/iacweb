# Trazabilidad: fuente → sección → tabla → estado

| Fuente | Dato | Sección del sitio | Tabla / archivo | Estado |
|---|---|---|---|---|
| Prompt maestro §2 | Marca, razón social, fundación 2008 | Home (indicadores), Nosotros, footer | `src/lib/supabase.ts` | confirmed |
| Prompt maestro §2 | Teléfonos, correo | Barra superior, contacto, footer, WhatsApp | `src/lib/supabase.ts` | confirmed |
| Prompt maestro §2 | Misión y visión (texto original) | Nosotros | `src/pages/Public.tsx` | confirmed (original) |
| Prompt maestro §2 | Valores | Home, Nosotros | `src/pages/Home.tsx` | confirmed |
| Prompt maestro §10 | Equipo de 5 (3+1+1), experiencia > 15 años | Home, Nosotros | texto fijo | confirmed (sin nombres) |
| Prompt maestro §10 | ABB, Hitachi, Siemens, SEL, GE | Home, Capacidades | `technologies` | confirmed (sin representación) |
| Prompt maestro §9 | Proyecto Punutuma 2024 | Proyectos | `projects` | confirmed, sin fotos |
| Prompt maestro §8 | Servicio 01 | Servicios | `services` | confirmed |
| Fichas técnicas de servicios v1 | Servicios 1 a 6 (descripción, problema, alcance, equipos, pruebas, entregables, aplicaciones) | Servicios y detalle | `services` | 1 confirmed · 2–4 proposed · 5–6 pending (publicados) |
| Equipo, tecnologías, capacitación v1 | Texto de equipo, fabricantes, capacitación y certificaciones | Nosotros | `src/pages/Public.tsx` | confirmed (sin certificados nominativos) |
| Mensaje del cliente | Texto principal de la Home | Hero | `src/pages/Home.tsx` | confirmed |
| Proyectos.zip | 16 proyectos y 73 fotos | Proyectos, Home | `projects`, `project_images` | proposed (autorización de clientes pendiente) |
| Mensaje del cliente | Horario 8:00–18:00, hora de La Paz | Barra superior, contacto, footer | `HORARIO` | confirmed (por la empresa) |
| Logotipo (JPEG) | Logo | Encabezado, footer, favicon | `public/logo*.png` | confirmed (calidad pendiente) |
| Proyectos1.zip | SE Santivañes (T-1690) y SE Chimore 34,5 kV, 17 fotos | Proyectos, Capacidades | `projects`, `project_images` | proposed |
| Mensaje del cliente | 84 proyectos en 15 años; más de 100 en total | Home (indicadores) | `CIFRAS` | confirmed (declarado por la empresa) |