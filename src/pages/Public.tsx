import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CONTACTO, EMPRESA, HORARIO, PENDING, anios, sortProjects, wa } from '../lib/supabase'
import { State, useRows, useSEO } from '../lib/hooks'
import Form, { Field } from '../components/Form'
import Gallery from '../components/Gallery'
import ProjectCard from '../components/ProjectCard'
import TechLogos from '../components/TechLogos'
const P = (v: any) => v || PENDING
const svc = ['Ingeniería de control y protección', 'Tableros (diseño, armado, retrofit)', 'Configuración y pruebas de IED', 'Comisionamiento y puesta en servicio', 'Diagnóstico y mantenimiento', 'Automatización', 'Otro', 'No definido']
const inst = ['Subestación', 'Planta de generación', 'Industria / minería / hidrocarburos', 'Laboratorio', 'Otro', 'No definido']
const sector = ['Distribución', 'Transmisión', 'Generación', 'Industria', 'Minería', 'Hidrocarburos', 'Contratista EPC', 'Otro']
const volt = ['Menos de 1 kV', '1 a 36 kV (media tensión)', '69 kV', '115 kV', '230 kV o más', 'No definido']
const dptos = ['Beni', 'Chuquisaca', 'Cochabamba', 'La Paz', 'Oruro', 'Pando', 'Potosí', 'Santa Cruz', 'Tarija', 'No definido']
const consent = { name: 'consent', label: 'Acepto el tratamiento de mis datos para responder esta solicitud (ver política de privacidad)', type: 'check', req: true } as Field
const Cta = ({ t = '', msg }: { t?: string; msg?: string }) => <div className="btns"><Link className="btn" to={`/cotizacion${t ? '?servicio=' + encodeURIComponent(t) : ''}`}>Solicitar cotización</Link><a className="btn o" target="_blank" rel="noreferrer" href={wa(msg || (t ? `Hola, deseo consultar por el servicio de ${t} de IAC Ingenieros.` : undefined))}>Consultar por WhatsApp</a></div>
const Head = ({ tag, h, p }: { tag: string; h: string; p?: string }) => <div className="ph0"><div className="wrap"><span className="tag">{tag}</span><h1>{h}</h1>{p && <p>{p}</p>}</div></div>
export function About() {
  useSEO('Nosotros', 'IAC Ingenieros, empresa unipersonal de Cochabamba fundada en 2008: equipo, tecnologías, capacitación y certificaciones en control y protección.')
  return <><Head tag="Nosotros" h={`Más de ${anios()} años en ingeniería eléctrica de control y protección`} p={`IAC Ingenieros fue fundada el 24 de enero de 2008 en Cochabamba. Hoy cuenta con más de ${anios()} años de trayectoria.`} />
    <div className="wrap sec prose">
      <h2>Quiénes somos</h2><p>{EMPRESA.completa}. Sede única en Cochabamba, Bolivia, con servicios en todo el territorio nacional y experiencia declarada en Cochabamba, La Paz, Santa Cruz, Oruro y Potosí, entre otras regiones.</p>
      <div className="two2"><div><h2>Misión</h2><p>Proveer Soluciones Innovadoras. Somos una empresa sólidamente afianzada a través de más de 18 años de experiencia en el rubro eléctrico, abarcando un amplio espectro en Asesoramiento de Proyectos, Diseño, Mantenimiento y Armado de Tableros de Control, Commissioning y Puesta en Servicio.</p></div>
        <div><h2>Visión</h2><p>Nuestra visión es ser reconocidos como líderes en el sector de ingeniería eléctrica, dando soluciones integrales a los desafíos de las tecnologías emergentes y así consolidar la capacidad y confianza hacia nuestros clientes.</p></div></div>
      <h2>Valores</h2><div className="chips">{['Integridad', 'Responsabilidad', 'Innovación', 'Trabajo en equipo', 'Compromiso social'].map(v => <span key={v}>{v}</span>)}</div>
      <h2>Nuestro equipo</h2>
      <p>IAC Ingenieros cuenta con un equipo multidisciplinario conformado por ingenieros eléctricos, un ingeniero electrónico y un técnico especializado en electromecánica, con una experiencia profesional promedio superior a 15 años en proyectos eléctricos de media y alta tensión.</p>
      <p>Nuestros profesionales poseen amplia experiencia en ingeniería, diseño, montaje, pruebas, mantenimiento y puesta en servicio de sistemas de control y protección en subestaciones eléctricas de generación, transmisión y distribución.</p>
      <p>La combinación de conocimientos técnicos, experiencia en campo y formación especializada nos permite afrontar proyectos de alta exigencia técnica, priorizando la seguridad, la calidad y la confiabilidad de las instalaciones.</p>
      <h2>Tecnologías y fabricantes</h2>
      <p>Contamos con experiencia en la configuración, parametrización, integración, diagnóstico, mantenimiento y pruebas de equipos de control y protección de reconocidos fabricantes internacionales, entre ellos <b>ABB, Hitachi Energy, Siemens, SEL y GE</b>.</p>
      <p>Nuestra especialización comprende relés de protección, dispositivos electrónicos inteligentes (IED), tableros de control y protección y sistemas secundarios utilizados en subestaciones eléctricas.</p>
      <p>El conocimiento de diferentes plataformas tecnológicas nos permite desarrollar soluciones para nuevas instalaciones, ampliaciones y proyectos de modernización (<i>retrofit</i>), adaptándonos a los requerimientos técnicos de cada cliente.</p>
      <p className="muted" style={{ fontSize: 14 }}>Las marcas indicadas corresponden a tecnologías con las que el equipo tiene experiencia. IAC Ingenieros no es representante ni distribuidor autorizado de estos fabricantes.</p>
      <h2>Capacitación y certificaciones</h2>
      <p><b>La capacitación continua y la certificación técnica de nuestros profesionales constituyen pilares fundamentales de IAC Ingenieros.</b></p>
      <p>Nuestro equipo cuenta con <b>certificaciones técnicas en áreas de control y protección</b>, así como con formación y capacitaciones especializadas en tecnologías de fabricantes internacionales, entre ellos <b>ABB, Siemens y Hitachi Energy</b>.</p>
      <p>Esta preparación, complementada con una sólida experiencia práctica en proyectos de media y alta tensión, fortalece nuestras competencias en configuración y pruebas de relés de protección, diagnóstico de sistemas secundarios, integración de equipos, comisionamiento y puesta en servicio.</p>
      <p>En IAC Ingenieros entendemos que la actualización tecnológica es esencial para responder a las exigencias del sector eléctrico. Por ello, promovemos el desarrollo permanente de competencias técnicas, combinando conocimientos especializados, capacitación profesional y experiencia de campo para ofrecer servicios con altos estándares de calidad, seguridad y confiabilidad.</p>
      <Cta /></div></>
}
export function Services() {
  useSEO('Servicios', 'Ingeniería de control y protección, tableros, retrofit, configuración de IED, comisionamiento, mantenimiento y automatización para subestaciones.')
  const s = useRows('services', { eq: ['active', true], order: 'sort_order', asc: true })
  return <><Head tag="Servicios" h="Servicios de ingeniería de control y protección" p="Seis servicios para las etapas críticas de un proyecto de subestación, desde la ingeniería hasta el mantenimiento." /><div className="wrap sec"><State s={s} empty="No hay servicios publicados actualmente.">
    <div className="grid3">{s.data.map((x: any, i: number) => <Link key={x.id} className="card svc" to={`/servicios/${x.slug}`}><span className="m svn">{String(i + 1).padStart(2, '0')}</span><h3>{x.title}</h3><p>{x.short_description}</p><span className="lk">Ver detalle →</span></Link>)}</div></State></div></>
}
const paras = (t?: string | null) => (t || '').split('\n\n').filter(Boolean).map((x, i) => <p key={i}>{x}</p>)
export function ServiceDetail() {
  const { slug } = useParams(); const s = useRows('services', { eq: ['slug', slug] }); const x: any = s.data[0]
  const pr = useRows('projects', { eq: ['active', true] })
  useSEO(x?.title || 'Servicio', x?.short_description || 'Servicio de IAC Ingenieros')
  const rel = useMemo(() => sortProjects(pr.data).filter((p: any) => (x?.related_project_slugs || []).includes(p.slug)), [pr.data, x])
  const ul = (l?: string[]) => l && l.length ? <ul className="chk2">{l.map(i => <li key={i}>{i}</li>)}</ul> : null
  const secs: [string, any][] = x ? ([
    ['Descripción', paras(x.description)], ['Problema que atiende', paras(x.problem)],
    ['Alcance', <>{ul(x.scope_items)}{paras(x.scope_note)}</>], ['Equipos y sistemas', paras(x.equipment_text)],
    ['Pruebas y verificaciones', <>{ul(x.verification_items)}{paras(x.verification_note)}</>], ['Entregables', ul(x.deliverable_items)], ['Aplicaciones', paras(x.applications_text)],
  ] as [string, any][]).filter(([, c]) => c && (!Array.isArray(c) || c.length) && !(c.props && c.props.children && [].concat(c.props.children).every((k: any) => !k || (Array.isArray(k) && !k.length)))) : []
  return <><Head tag={x?.category_label || 'Servicio'} h={x?.title || 'Servicio'} p={x?.subtitle || x?.short_description} />
    <div className="wrap sec"><Link to="/servicios">← Servicios</Link><State s={s} empty="El contenido que buscas no está disponible."><div className="pd svd"><div>
      {secs.map(([t, c], i) => <section key={t} id={`s${i + 1}`} className="sv"><span className="m svn">{String(i + 1).padStart(2, '0')}</span><h2>{t}</h2>{c}</section>)}
      {rel.length > 0 && <section id="rel" className="sv"><span className="m svn">{String(secs.length + 1).padStart(2, '0')}</span><h2>Proyectos relacionados</h2><div className="pgrid">{rel.map((p: any) => <ProjectCard key={p.id} p={p} />)}</div></section>}</div>
      <aside className="stick"><div className="cbox"><b>{x?.title}</b><nav className="sidx" aria-label="Contenido de la página">{secs.map(([t], i) => <a key={t} href={`#s${i + 1}`}>{String(i + 1).padStart(2, '0')} · {t}</a>)}{rel.length > 0 && <a href="#rel">Proyectos relacionados</a>}</nav><Cta t={x?.title} /></div></aside></div></State></div></>
}
export function Projects() {
  useSEO('Proyectos', 'Proyectos de tableros de control y protección, retrofit y puesta en servicio de subestaciones ejecutados por IAC Ingenieros.')
  const s = useRows('projects', { eq: ['active', true] }); const [f, setF] = useState<Record<string, string>>({})
  const list = useMemo(() => sortProjects(s.data), [s.data])
  const opt = (g: (p: any) => any) => [...new Set(list.flatMap(p => [].concat(g(p) ?? [])).filter(Boolean))].sort().reverse() as string[]
  const sel = (k: string, l: string, o: string[]) => <select aria-label={l} value={f[k] || ''} onChange={e => setF({ ...f, [k]: e.target.value })}><option value="">{l}</option>{o.map(x => <option key={x}>{x}</option>)}</select>
  const shown = list.filter(p => (!f.y || String(p.year) === f.y) && (!f.c || p.client_display_name === f.c) && (!f.v || (p.voltages || []).includes(f.v)) && (!f.s || (p.services_done || []).includes(f.s)) && (!f.t || p.installation_type === f.t))
  return <><Head tag="Proyectos" h="Proyectos documentados" p="Selección representativa de los proyectos de IAC Ingenieros, con registro fotográfico. El portafolio se amplía progresivamente." /><div className="wrap sec">
    <div className="filters">{sel('y', 'Año', opt(p => p.year))}{sel('c', 'Cliente', opt(p => p.client_display_name))}{sel('v', 'Tensión', opt(p => p.voltages))}{sel('s', 'Servicio', opt(p => p.services_done))}{sel('t', 'Instalación', opt(p => p.installation_type))}
      {Object.values(f).some(Boolean) && <button className="link" onClick={() => setF({})}>Quitar filtros</button>}</div>
    <p className="m muted">{shown.length} de {list.length} proyectos</p>
    <State s={s} empty="No hay proyectos publicados actualmente."><div className="pgrid">{shown.map(p => <ProjectCard key={p.id} p={p} />)}</div></State></div></>
}
export function ProjectDetail() {
  const { slug } = useParams(); const s = useRows('projects', { eq: ['slug', slug] }); const p: any = s.data[0]
  const im = useRows('project_images', { eq: ['project_id', p?.id ?? '00000000-0000-0000-0000-000000000000'], order: 'sort_order', asc: true })
  useSEO(p?.title || 'Proyecto', `${p?.title || 'Proyecto'} · IAC Ingenieros`)
  const row = (k: string, v: any) => v ? <tr><th>{k}</th><td>{Array.isArray(v) ? v.join(' · ') : v}</td></tr> : null
  return <><Head tag={p?.period_label || 'Proyecto'} h={p?.title || 'Proyecto'} /><div className="wrap sec"><Link to="/proyectos">← Proyectos</Link>
    <State s={s} empty="El contenido que buscas no está disponible."><div className="pd"><div>
      {im.data.length > 0 && <Gallery images={im.data} />}
      <h2 style={{ marginTop: 28 }}>Descripción</h2><p style={{ whiteSpace: 'pre-line' }}>{p?.description}</p></div>
      <aside><table className="ficha"><tbody>{row('Cliente', p?.client_display_name)}{row('Ubicación', p?.location)}{row('Período', p?.period_label)}{row('Tensión', p?.voltage_level)}{row('Instalación', p?.installation_type)}{row('Servicios', p?.services_done)}{row('Tecnologías', p?.technologies)}</tbody></table>
        <p className="muted" style={{ fontSize: 13 }}>{p?.source_note}</p>
        <Cta t="" msg={`Hola, quiero solicitar información sobre capacidades similares a: ${p?.title}.`} /></aside></div></State></div></>
}
export function Capabilities() {
  useSEO('Capacidades técnicas', 'Capacidades de IAC Ingenieros: tecnologías de control y protección, niveles de tensión, comisionamiento y puesta en servicio.')
  const tech = useRows('technologies', { order: 'name' }); const pr = useRows('projects', { eq: ['active', true] })
  const num = (v: string) => parseFloat(v.replace(',', '.'))
  const levels = useMemo(() => {
    const m: Record<string, string[]> = {}
    sortProjects(pr.data).forEach((p: any) => (p.voltages || []).forEach((v: string) => { (m[v] = m[v] || []).push(p.location) }))
    if (!m['34,5 kV']) m['34,5 kV'] = []
    return Object.entries(m).sort((a, b) => num(a[0]) - num(b[0]))
  }, [pr.data])
  return <div className="v3"><Head tag="Capacidades" h="Capacidades técnicas" p="Configuración, parametrización, pruebas, diagnóstico, mantenimiento, comisionamiento y puesta en servicio de sistemas de control y protección." />
    <div className="wrap sec cap">
      <section><span className="m capn">01 · TECNOLOGÍAS</span><h2>Tecnologías y fabricantes con experiencia declarada</h2>
        <p className="capp">Experiencia en configuración, parametrización, integración, diagnóstico, mantenimiento y pruebas de relés de protección, IED, tableros de control y protección y sistemas secundarios de los fabricantes indicados.</p>
        <TechLogos rows={tech.data} />
        <p className="capf">Las marcas y logotipos pertenecen a sus titulares y se muestran solo para indicar experiencia con sus tecnologías. IAC Ingenieros no es representante ni distribuidor autorizado.</p></section>
      <section><span className="m capn">02 · NIVELES DE TENSIÓN</span><h2>Niveles de tensión con experiencia</h2>
        <p className="capp">Tensiones nominales de las instalaciones en las que ha trabajado el equipo de IAC Ingenieros. Cada nivel indica si está respaldado por proyectos publicados en este sitio o si corresponde a experiencia declarada por la empresa.</p>
        <table className="vt"><thead><tr><th>Tensión nominal</th><th>Respaldo</th><th>Referencias en proyectos publicados</th></tr></thead>
          <tbody>{levels.map(([v, locs]) => { const u = [...new Set(locs)]; return (<tr key={v}><td className="m vv">{v}</td>
            <td>{locs.length ? <span className="vb ok">{locs.length} {locs.length === 1 ? 'proyecto' : 'proyectos'}</span> : <span className="vb">Experiencia declarada</span>}</td>
            <td>{u.length ? u.slice(0, 4).join(' · ') + (u.length > 4 ? ` · +${u.length - 4}` : '') : 'Sin proyecto publicado a la fecha'}</td></tr>) })}</tbody></table>
        <p className="capf">Los niveles respaldados se calculan a partir del portafolio publicado y se actualizan al incorporar nuevos proyectos.</p></section>
      <Cta /></div></div>
}
export function Contact() {
  useSEO('Contacto', `Contacte a IAC Ingenieros en Cochabamba: ${CONTACTO.fijo} y ${CONTACTO.telefono}.`)
  const f: Field[] = [{ name: 'name', label: 'Nombre', req: true }, { name: 'company', label: 'Empresa' }, { name: 'email', label: 'Correo', type: 'email', req: true }, { name: 'phone', label: 'Teléfono (opcional)', type: 'tel' }, { name: 'subject', label: 'Asunto', req: true },
  { name: 'message', label: 'Mensaje', type: 'textarea', req: true }, consent]
  return <><Head tag="Contacto" h="Conversemos sobre su proyecto" /><div className="wrap sec"><div className="pd"><div><Form table="contact_messages" fields={f} button="Enviar consulta" /></div>
    <aside className="cbox"><b>{EMPRESA.completa}</b><p>Cochabamba, Bolivia (sede única)</p><p>Teléfono: <a href={CONTACTO.telFijo}>{CONTACTO.fijo}</a><br />Celular y WhatsApp: <a href={CONTACTO.tel}>{CONTACTO.telefono}</a><br />Correo: <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></p><p>Lunes a viernes, {HORARIO.desde} a {HORARIO.hasta} (hora de La Paz, Bolivia)</p>
      <a className="btn" href={wa()} target="_blank" rel="noreferrer">Escribir por WhatsApp</a></aside></div></div></>
}
export function Quote() {
  useSEO('Solicitud de cotización', 'Solicite una cotización de ingeniería, tableros, retrofit, comisionamiento o puesta en servicio.')
  const pre = new URLSearchParams(location.search).get('servicio') || ''
  const f: Field[] = [{ name: 'name', label: 'Nombre', req: true }, { name: 'company', label: 'Empresa', req: true }, { name: 'position', label: 'Cargo (opcional)' }, { name: 'email', label: 'Correo', type: 'email', req: true }, { name: 'phone', label: 'Teléfono / WhatsApp', type: 'tel', req: true },
  { name: 'sector', label: 'Sector', type: 'select', opts: sector }, { name: 'service_required', label: 'Servicio', type: 'select', opts: svc, req: true }, { name: 'installation_type', label: 'Tipo de instalación', type: 'select', opts: inst }, { name: 'department', label: 'Departamento', type: 'select', opts: dptos },
  { name: 'location', label: 'Localidad o subestación (opcional)' }, { name: 'voltage_level', label: 'Nivel de tensión', type: 'select', opts: volt }, { name: 'estimated_date', label: 'Plazo referencial (opcional)', type: 'date' },
  { name: 'description', label: 'Descripción técnica del requerimiento', type: 'textarea', req: true }, { name: 'file', label: 'Archivo adjunto (opcional): planos, especificaciones, diagramas', type: 'file' }, consent]
  return <><Head tag="Cotización" h="Solicitud de cotización" p="Si aún no tiene definidos los datos técnicos, seleccione “No definido”." /><div className="wrap sec">{pre && <p className="muted">Servicio de interés: {pre}</p>}
    <Form table="quote_requests" fields={f} defaults={pre ? { description: `Servicio de interés: ${pre}\n` } : {}} button="Enviar solicitud" /></div></>
}
export function Privacy() {
  useSEO('Política de privacidad', 'Política de privacidad de IAC Ingenieros (borrador).')
  return <><Head tag="Legal" h="Política de privacidad" /><div className="wrap sec prose"><p className="muted">Borrador pendiente de revisión jurídica y aprobación antes del lanzamiento.</p>
    <h2>Datos que recibimos</h2><p>Los formularios de contacto y cotización recogen nombre, empresa, cargo, correo, teléfono, datos del proyecto, mensaje y, opcionalmente, archivos adjuntos.</p>
    <h2>Finalidad</h2><p>Responder consultas y preparar propuestas. No se publican ni se comparten con terceros para fines publicitarios.</p>
    <h2>Responsable</h2><p>{EMPRESA.completa}. {CONTACTO.email}.</p></div></>
}
export function NotFound() {
  return <div className="wrap sec"><h1>Página no encontrada</h1><p>El contenido que buscas no está disponible.</p><div className="btns"><Link className="btn" to="/">Volver al inicio</Link><Link className="btn o" to="/servicios">Ver servicios</Link></div></div>
}
