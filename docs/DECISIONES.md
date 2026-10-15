# Registro de decisiones

1. **Prompt maestro v1 como fuente de verdad.** Prevalece sobre borradores previos: fundación 24-01-2008, "más de 18 años" calculado, correo marcoinochea@gmail.com, teléfonos +591 4 4390296 y +591 72266385, tecnologías ABB/Hitachi/Siemens/SEL/GE. Se retiraron "+50 proyectos", "230 kV" como indicador y "Omicron".
2. **Cifras dinámicas.** "Proyectos documentados" se cuenta desde la base de datos; el ruler de tensiones y los ámbitos técnicos salen de los proyectos publicados.
3. **Fotografías reales.** Se sustituyeron las imágenes de stock/IA por fotografías de proyectos de IAC. El hero usa una foto de las celdas de SE Central.
4. **Sin Edge Functions.** El prompt maestro sugiere un endpoint seguro para formularios; la instrucción previa del cliente excluye Edge Functions y CLI. Se usa inserción directa con RLS, restricciones en tablas (correo, longitud, consentimiento), campo trampa antispam y lectura restringida al personal. Límite: no hay limitación de frecuencia.
5. **Rol simple.** Se mantienen `admin` y `staff` (el prompt propone superadmin/editor/viewer): se priorizó la simplicidad para una empresa de cinco personas.
6. **Servicios.** Solo "Ingeniería de control y protección" está `confirmed`; los demás muestran "Ficha técnica en elaboración".
7. **Mapa.** Límites departamentales de Natural Earth (dominio público). Se descartó otra fuente por licencia. Solo se marca la sede (Cochabamba), la experiencia declarada y Punutuma; no se ubican otros proyectos sin confirmación.
8. **Color.** Se mantiene la paleta aprobada (petróleo, grafito, celeste). Del logotipo se tomó el naranja como detalle mínimo (líneas, numeración), por la retícula cruzada de su isotipo.
9. **Hora de La Paz.** Se calcula con `America/La_Paz` (GMT-4, sin horario de verano).
10. **Mejoras no verificadas:** no se midió Core Web Vitals ni se ejecutaron pruebas automatizadas E2E.
11. **Fichas de servicio (v1, 10-oct-2026).** Los seis servicios se cargan íntegros desde `supabase/3_contenido_inicial.sql` con las secciones Descripción, Problema que atiende, Alcance, Equipos y sistemas, Pruebas y verificaciones, Entregables, Aplicaciones y Proyectos relacionados. Las secciones vacías no se muestran.
12. **Sin textos de relleno en el sitio público.** Se eliminaron "Ficha técnica en elaboración" y "[Información pendiente de completar]". Los estados quedan solo en el panel: estado editorial (`borrador`, `pendiente_validacion`, `aprobado`, `publicado`; la base solo muestra al público los `publicado`) y validación interna.
13. **Servicios 5 y 6 publicados.** La ficha recomienda validarlos antes de publicar; se publican por indicación del cliente. Conservan `validation_status = 'pending'` y pueden ocultarse desde el panel. Se excluyó del texto público la nota interna "propuesta preliminar".
14. **Proyectos relacionados** definidos con evidencia documentada: Punutuma (servicios 1 a 4), proyectos de tableros (2), de puesta en servicio (4) y Chaquilla (6). El servicio 5 no tiene proyecto relacionado por falta de evidencia.
15. **Nosotros** usa el texto de "Equipo, tecnologías y fabricantes, capacitación y certificaciones". Se adoptó "Hitachi Energy" como nombre del fabricante. No se atribuyen certificados a fabricantes ni personas concretas.
16. **Barra superior:** el reloj muestra la hora de La Paz sin la leyenda "hora de La Paz", a pedido del cliente.
17. **Cifras de la Home (cliente).** Se publican "84 proyectos documentados en los últimos 15 años" y "Más de 100 proyectos ejecutados desde la fundación", tal como las declaró la empresa. Viven en `CIFRAS` (`src/lib/supabase.ts`). El portafolio se presenta como selección representativa y no se enumeran los 84.
18. **34,5 kV con respaldo.** Con el proyecto SE Chimore 34,5 kV, ese nivel de tensión pasó de "experiencia declarada" a "respaldado por proyecto" en Capacidades (se calcula solo).
19. **Corrección de diseño:** los indicadores numéricos de la Home heredaban márgenes del contenedor; en móvil el texto quedaba pegado al borde. Se limitaron los estilos a las celdas.
