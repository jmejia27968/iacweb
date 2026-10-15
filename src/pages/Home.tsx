import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CIFRAS, CONTACTO, EMPRESA, anios, sortProjects, wa } from '../lib/supabase'
import { useRows, useSEO } from '../lib/hooks'
import BoliviaMap from '../components/BoliviaMap'
import ProjectCard from '../components/ProjectCard'
import { Photo, Yard } from '../components/Art'
import TechLogos from '../components/TechLogos'
const P = (slug: string, n: string) => `/proyectos/${slug}/${n}.jpg`
const zz: [string, string, string, string[], string, string, string, string][] = [
  ['01', 'Ingeniería de control y protección', 'Asesoramiento, ingeniería y diseño de sistemas de control y protección para subestaciones de media y alta tensión.', ['Asesoramiento de proyectos', 'Circuitos secundarios y planos de tableros', 'Ingeniería para retrofit', 'Diseño de tableros de control y protección'], P('tableros-transformador-linea-automatizacion-sas-chaquilla', '05'), 'Tableros de control y protección · SE Chaquilla · SEPSA S.A. · Agosto de 2026', '/servicios/ingenieria-control-proteccion', 'Ver el servicio'],
  ['02', 'Diseño, armado y retrofit de tableros', 'Tableros de control y protección y gabinetes de transformador, del diseño al despacho, y retrofit de tableros existentes.', ['Diseño y armado de tableros', 'Gabinetes de transformador', 'Retrofit de tableros de subestación', 'Despacho a obra'], P('retrofit-tableros-se-aranjuez-69kv', '06'), 'Retrofit de tableros · SE Aranjuez 69 kV · 2020', '/servicios/tableros-armado-retrofit', 'Ver el servicio'],
  ['03', 'Comisionamiento y puesta en servicio', 'Puesta en servicio de tableros y celdas de media tensión, y modificación de circuitos en instalaciones en operación.', ['Comisionamiento (commissioning)', 'Puesta en servicio de tableros', 'Modificación de circuitos en celdas de 24,9 kV', 'Pruebas según el alcance de cada proyecto'], P('puesta-en-servicio-retrofit-telamayu-69kv', '01'), 'Puesta en servicio · SE Telamayu 69 kV · Noviembre–Diciembre de 2022', '/servicios/comisionamiento-puesta-en-servicio', 'Ver el servicio'],
  ['04', 'Mantenimiento y automatización', 'Mantenimiento de sistemas de control y protección y tableros de automatización, con alcance definido junto al cliente.', ['Diagnóstico y mantenimiento de sistemas secundarios', 'Tableros de automatización (SE Chaquilla)', 'Integración de señales y funciones de control'], P('tableros-transformador-linea-automatizacion-sas-chaquilla', '01'), 'Tablero de automatización SAS · SE Chaquilla · Agosto de 2026', '/servicios/automatizacion-integracion', 'Ver el servicio'],
]
const steps = ['Diagnóstico y alcance', 'Ingeniería', 'Armado e integración', 'Pruebas', 'Comisionamiento', 'Entrega']
const faq = [['¿Qué información necesitan para cotizar?', 'Idealmente planos o diagramas unifilares, especificaciones técnicas, nivel de tensión y ubicación del proyecto. Si aún no los tiene definidos, puede indicar "No definido" en el formulario.'], ['¿Atienden fuera de Cochabamba?', 'Sí. Nuestra sede está en Cochabamba y prestamos servicios en todo el territorio nacional.'], ['¿Con qué tecnologías tienen experiencia?', 'Contamos con experiencia en configuración, parametrización, integración, diagnóstico, mantenimiento y pruebas de equipos de ABB, Hitachi Energy, Siemens, SEL y GE. No somos representantes oficiales de estas marcas.']]
const valores = ['Integridad', 'Responsabilidad', 'Innovación', 'Trabajo en equipo', 'Compromiso social']
export default function Home() {
  useSEO('Ingeniería de control y protección de subestaciones', 'IAC Ingenieros, Cochabamba: soluciones integrales de ingeniería, diseño, integración, modernización y puesta en servicio de control y protección para subestaciones de media y alta tensión.')
  const pr = useRows('projects', { eq: ['active', true] }); const tech = useRows('technologies', { order: 'name' })
  const projs = useMemo(() => sortProjects(pr.data), [pr.data]); const withPhoto = projs.filter((p: any) => p.cover_image)
  const [main, ...rest] = withPhoto; const punu = projs.find((p: any) => p.slug.includes('punutuma'))
  const svcs = useMemo(() => { const m: Record<string, number> = {}; projs.forEach((p: any) => (p.services_done || []).forEach((s: string) => { m[s] = (m[s] || 0) + 1 })); return Object.entries(m).sort((a, b) => b[1] - a[1]) }, [projs])
  return (<div className="v3">
    <header className="vhero"><div className="c"><div>
      <span className="tag">Cochabamba · Cobertura nacional</span>
      <h1>Ingeniería especializada en control y protección de subestaciones eléctricas</h1>
      <p>Desarrollamos soluciones integrales de ingeniería, diseño, integración, modernización y puesta en servicio de sistemas de control y protección para subestaciones de media y alta tensión, respaldadas por más de {anios()} años de trayectoria y experiencia técnica en el sector eléctrico boliviano.</p>
      <Link className="btn" to="/cotizacion">Solicitar cotización</Link>{' '}<Link className="btn d" to="/servicios">Conocer servicios</Link></div>
      <Photo src={P('celdas-media-tension-24-9kv-se-central', '02')} art={<Yard />} label="Celdas de media tensión 24,9 kV, SE Central" caption="Celdas de media tensión 24,9 kV · SE Central · Elfec S.A. · Abril de 2023" tone="hero" style={{ aspectRatio: '5/4' }} /></div></header>
    <div className="stats"><div className="c">
      <div><b>Desde 2008</b><span>Fundada el 24 de enero de 2008</span></div><div><b>Más de {anios()} años</b><span>de trayectoria en el rubro eléctrico</span></div>
      <div><b>{CIFRAS.documentados}</b><span>proyectos documentados en los últimos {CIFRAS.ventana} años</span></div><div><b>Más de {CIFRAS.totalMin}</b><span>proyectos ejecutados desde la fundación</span></div></div></div>
    <section className="strip"><div className="c">{[['Ingeniería especializada', '/servicios/ingenieria-control-proteccion'], ['Generación, transmisión y distribución', '/proyectos'], ['Ejecución integral', '/servicios'], ['Compromiso con la seguridad', '/nosotros']].map(([t, h]) => <Link to={h} key={t}>{t} →</Link>)}</div></section>
    <section className="vsec"><div className="c">
      <div className="head"><h2>Servicios para cada etapa del proyecto</h2><p>Cuatro frentes de trabajo ilustrados con fotografías de proyectos realizados por IAC.</p></div>
      {zz.map(([n, t, d, l, src, cap, to, lk]) => (<div className="zz" key={n}><Photo src={src} art={<Yard />} label={cap} caption={cap} />
        <div><span className="n">{n}</span><h3>{t}</h3><p>{d}</p><ul>{l.map(i => <li key={i}>{i}</li>)}</ul><Link className="lk" to={to}>{lk} →</Link>{' '}<Link className="lk" style={{ marginLeft: 18 }} to="/cotizacion">Cotizar</Link></div></div>))}
    </div></section>
    <section className="vsec wh"><div className="c">
      <div className="head"><h2>Especialización técnica</h2><p>Control y protección en subestaciones de media y alta tensión. Los ámbitos salen del registro de proyectos publicados.</p></div>
      <div className="chips">{svcs.map(([s, n]) => <span key={s}>{s}<i>{n}</i></span>)}</div>
      <p className="m" style={{ fontSize: 13, color: '#5B6770', marginTop: 14 }}>El número indica en cuántos proyectos publicados aparece cada actividad.</p>
    </div></section>
    <section className="vsec dk tech"><div className="c">
      <div className="head"><div><span className="tag" style={{ color: '#7fd6f5' }}>Equipos y tecnologías</span><h2 style={{ color: '#fff', marginTop: 10 }}>Equipos y tecnologías con experiencia declarada</h2></div>
        <p style={{ color: '#b9c4cb' }}>Relés de protección, IED, tableros de control y protección y sistemas secundarios de reconocidos fabricantes internacionales, para nuevas instalaciones, ampliaciones y proyectos de modernización (retrofit).</p></div>
      <TechLogos rows={tech.data} />
      <div className="tcap"><div><span className="m tcl">Capacidades con estos equipos</span><ol>{['Configuración', 'Parametrización', 'Integración', 'Diagnóstico', 'Mantenimiento', 'Pruebas'].map((c, k) => <li key={c}><span className="m">{String(k + 1).padStart(2, '0')}</span>{c}</li>)}</ol></div>
        <p className="tnote">Las marcas y logotipos pertenecen a sus respectivos titulares y se muestran únicamente para indicar experiencia con sus tecnologías. IAC Ingenieros no es representante ni distribuidor autorizado de estos fabricantes.</p></div></div></section>
    <section className="vsec"><div className="c">
      <div className="head"><h2>Proceso de trabajo</h2><p>Proceso metodológico referencial; las etapas ejecutadas dependen del alcance de cada proyecto.</p></div>
      <div className="vsteps">{steps.map((s, i) => <div key={s}><b>{String(i + 1).padStart(2, '0')}</b><span>{s}</span></div>)}</div></div></section>
    <section className="vsec wh"><div className="c">
      <div className="head"><h2>Proyectos y evidencia</h2><p>En los últimos {CIFRAS.ventana} años se documentaron {CIFRAS.documentados} proyectos; considerando la trayectoria completa de más de {anios()} años, el total ejecutado supera los {CIFRAS.totalMin}. A continuación se presenta una selección representativa, con registro fotográfico, y con fecha y cliente cuando están confirmados.</p></div>
      {main && <div className="feat"><Link to={`/proyectos/${main.slug}`} className="featimg"><img src={main.cover_image} alt={main.title} loading="lazy" /></Link>
        <div><span className="tag">Proyecto más reciente</span><h3>{main.title}</h3><p className="m" style={{ fontSize: 14 }}>{main.period_label} · {[main.location, main.client_display_name].filter(Boolean).join(' · ')}</p>
          <Link className="btn" to={`/proyectos/${main.slug}`}>Ver el proyecto</Link></div></div>}
      <div className="pgrid">{rest.slice(0, 5).map((p: any) => <ProjectCard key={p.id} p={p} />)}</div>
      {punu && <div className="callout"><div><span className="tag">Caso con ficha técnica</span><h3>{punu.title}</h3><p>{punu.client_display_name} · {punu.period_label} · {punu.location}.</p></div><Link className="btn o" to={`/proyectos/${punu.slug}`}>Ver ficha</Link></div>}
      <p style={{ marginTop: 26 }}><Link className="lk" to="/proyectos">Ver el portafolio de proyectos →</Link></p>
    </div></section>
    <section className="vsec"><div className="c">
      <div className="head"><h2>Equipo técnico</h2><p>Cinco profesionales, según la composición declarada por la empresa. Las fichas individuales se publicarán con autorización de cada integrante.</p></div>
      <div className="team"><div><b>5</b><span>integrantes en total</span></div><div><b>3 + 1 + 1</b><span>ingenieros eléctricos, un ingeniero electrónico y un técnico en electromecánica</span></div><div><b>+15 años</b><span>de experiencia promedio declarada</span></div></div></div></section>
    <section className="vsec wh"><div className="c cov">
      <div><span className="tag">Cobertura</span><h2 style={{ fontSize: 'clamp(30px,4vw,46px)', margin: '10px 0 16px' }}>Servicios en todo el territorio nacional</h2>
        <p style={{ color: 'var(--t2)' }}>Sede única en Cochabamba. Experiencia declarada en Cochabamba, La Paz, Santa Cruz, Oruro y Potosí, entre otras regiones. No contamos con sucursales.</p>
        <p className="m" style={{ fontSize: 14 }}>Atención: lunes a viernes, 8:00 a 18:00 (hora de La Paz, Bolivia).</p></div><BoliviaMap /></div></section>
    <section className="vsec"><div className="c"><div className="dsh">
      <div className="dshh"><span className="m">COMPROMISO INSTITUCIONAL</span><span className="m">IAC INGENIEROS · DESDE 2008</span></div>
      <div className="dshb">
        <div className="dc"><h2>Compromiso técnico</h2><p className="dlead">Proveer soluciones innovadoras con integridad, responsabilidad y calidad técnica.</p>
          <ol className="pil">{[['P-01', 'Seguridad', 'Trabajo priorizando la seguridad en instalaciones eléctricas de media y alta tensión.'], ['P-02', 'Calidad', 'Servicios con altos estándares de calidad, respaldados por capacitación y certificación técnica continua.'], ['P-03', 'Confiabilidad', 'Sistemas de control y protección concebidos para responder con confiabilidad en la operación.']].map(([k, t, d]) => <li key={k}><span className="m">{k}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol></div>
        <div className="dc"><h3>Valores institucionales</h3><ol className="val">{valores.map((v, k) => <li key={v}><span className="m">V-{String(k + 1).padStart(2, '0')}</span><b>{v}</b></li>)}</ol></div></div></div></div></section>
    <section className="vsec wh"><div className="c" style={{ maxWidth: 860 }}><div className="head" style={{ gridTemplateColumns: '1fr' }}><h2>Preguntas frecuentes</h2></div>
      {faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="vsec vcta"><div className="c"><div><h2>Cuéntenos su proyecto de control y protección</h2><p>Describa la subestación, el tipo de instalación y la necesidad técnica. Nuestro equipo le responderá.</p>
      <p className="m" style={{ fontSize: 14 }}>{CONTACTO.fijo} · {CONTACTO.telefono} · {CONTACTO.email}</p><p className="m" style={{ fontSize: 12, opacity: .7 }}>{EMPRESA.completa}</p></div>
      <div className="btns"><Link className="btn" to="/cotizacion">Solicitar cotización</Link><a className="btn d" href={wa()} target="_blank" rel="noreferrer">Hablar por WhatsApp</a></div></div></section>
  </div>)
}
