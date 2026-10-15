import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { State, useRows } from '../lib/hooks'
type Fd = { k: string; l: string; t?: 'area' | 'bool' | 'num' | 'date' | 'img' | 'sel' | 'list' | 'lines'; o?: string[] }
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const act: Fd = { k: 'active', l: 'Publicado / activo', t: 'bool' }, feat: Fd = { k: 'featured', l: 'Destacado', t: 'bool' }
const CFG: Record<string, { table: string; label: string; fields: Fd[] }> = {
  servicios: { table: 'services', label: 'Servicios', fields: [{ k: 'title', l: 'Título' }, { k: 'slug', l: 'Slug (se genera solo si se deja vacío)' }, { k: 'category_label', l: 'Categoría (etiqueta)' }, { k: 'subtitle', l: 'Subtítulo' }, { k: 'short_description', l: 'Descripción breve (tarjeta)' }, { k: 'description', l: 'Descripción (párrafos separados por línea en blanco)', t: 'area' }, { k: 'problem', l: 'Problema que atiende', t: 'area' }, { k: 'scope_items', l: 'Alcance (una actividad por línea)', t: 'lines' }, { k: 'scope_note', l: 'Nota del alcance', t: 'area' }, { k: 'equipment_text', l: 'Equipos y sistemas', t: 'area' }, { k: 'verification_items', l: 'Pruebas y verificaciones (una por línea)', t: 'lines' }, { k: 'verification_note', l: 'Nota de pruebas', t: 'area' }, { k: 'deliverable_items', l: 'Entregables (uno por línea)', t: 'lines' }, { k: 'applications_text', l: 'Aplicaciones', t: 'area' }, { k: 'related_project_slugs', l: 'Proyectos relacionados (slugs separados por coma)', t: 'list' }, { k: 'editorial_status', l: 'Estado editorial', t: 'sel', o: ['borrador', 'pendiente_validacion', 'aprobado', 'publicado'] }, { k: 'validation_status', l: 'Validación interna', t: 'sel', o: ['confirmed', 'proposed', 'pending'] }, { k: 'sort_order', l: 'Orden', t: 'num' }, act] },
  proyectos: { table: 'projects', label: 'Proyectos', fields: [{ k: 'title', l: 'Título' }, { k: 'slug', l: 'Slug (opcional)' }, { k: 'description', l: 'Descripción', t: 'area' }, { k: 'client_display_name', l: 'Cliente (vacío = no mostrar)' }, { k: 'location', l: 'Ubicación / subestación' }, { k: 'department', l: 'Departamento (solo si está confirmado)' }, { k: 'period_label', l: 'Período a mostrar (ej. Junio de 2023)' }, { k: 'project_date', l: 'Fecha para ordenar', t: 'date' }, { k: 'year', l: 'Año', t: 'num' }, { k: 'voltage_level', l: 'Tensión a mostrar (ej. 115/24,9 kV)' }, { k: 'voltages', l: 'Niveles de tensión (separados por coma)', t: 'list' }, { k: 'installation_type', l: 'Tipo de instalación' }, { k: 'services_done', l: 'Servicios (separados por coma)', t: 'list' }, { k: 'technologies', l: 'Tecnologías (solo las respaldadas)' }, { k: 'source_note', l: 'Nota de fuente' }, { k: 'cover_image', l: 'Imagen de portada', t: 'img' }, feat, act] },
  tecnologias: { table: 'technologies', label: 'Tecnologías', fields: [{ k: 'name', l: 'Nombre' }, { k: 'description', l: 'Descripción', t: 'area' }, { k: 'logo_url', l: 'Logo oficial', t: 'img' }, act] },
  certificaciones: { table: 'certifications', label: 'Certificaciones', fields: [{ k: 'name', l: 'Nombre' }, { k: 'issuer', l: 'Emisor' }, { k: 'description', l: 'Descripción', t: 'area' }, { k: 'document_url', l: 'Documento / imagen', t: 'img' }, { k: 'issue_date', l: 'Fecha de emisión', t: 'date' }, { k: 'expiry_date', l: 'Fecha de vencimiento', t: 'date' }, act] },
  testimonios: { table: 'testimonials', label: 'Testimonios', fields: [{ k: 'author', l: 'Autor' }, { k: 'company', l: 'Empresa' }, { k: 'quote', l: 'Testimonio (real y autorizado)', t: 'area' }, act] },
}
const STATES = ['nueva', 'en revisión', 'contactado', 'en proceso', 'cerrada']
function Crud({ table, fields, label }: { table: string; fields: Fd[]; label: string }) {
  const [n, setN] = useState(0); const s = useRows(table, { key: n }); const [f, setF] = useState<any>(null); const [msg, setMsg] = useState('')
  const first = fields[0].k
  async function save(e: React.FormEvent) {
    e.preventDefault(); const r: any = { ...f }
    fields.forEach(d => { const dt: string | undefined = d.t; if (r[d.k] === '' || r[d.k] === undefined) r[d.k] = d.t === 'bool' ? false : null; if (d.t === 'num' && r[d.k] != null) r[d.k] = Number(r[d.k]); if (dt === 'list' || dt === 'lines') r[d.k] = typeof r[d.k] === 'string' ? r[d.k].split(dt === 'lines' ? '\n' : ',').map((x: string) => x.trim()).filter(Boolean) : (r[d.k] || []) })
    if (fields.some(d => d.k === 'slug') && !r.slug) r.slug = slugify(r.title || '')
    const { error } = r.id ? await supabase.from(table).update(r).eq('id', r.id) : await supabase.from(table).insert(r)
    if (error) return setMsg('Error: ' + error.message); setMsg(''); setF(null); setN(n + 1)
  }
  async function del(id: string) { if (confirm('¿Eliminar este registro?')) { await supabase.from(table).delete().eq('id', id); setN(n + 1) } }
  async function upload(k: string, file?: File) {
    if (!file) return; const path = `${table}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const up = await supabase.storage.from('imagenes').upload(path, file); if (up.error) return setMsg('Error al subir: ' + up.error.message)
    setF({ ...f, [k]: supabase.storage.from('imagenes').getPublicUrl(path).data.publicUrl })
  }
  if (f) return (<form onSubmit={save} className="form"><h2 className="full">{f.id ? 'Editar' : 'Nuevo'} — {label}</h2>
    {fields.map(d => <label key={d.k} className={d.t === 'area' || d.t === 'lines' ? 'full' : ''}>{d.t === 'bool' ? <><input type="checkbox" checked={!!f[d.k]} onChange={e => setF({ ...f, [d.k]: e.target.checked })} /> {d.l}</> : <>{d.l}
      {d.t === 'area' || d.t === 'lines' ? <textarea rows={d.t === 'lines' ? 6 : 4} value={f[d.k] ?? ''} onChange={e => setF({ ...f, [d.k]: e.target.value })} />
        : d.t === 'img' ? <><input type="file" accept="image/*,.pdf" onChange={e => upload(d.k, e.target.files?.[0])} />{f[d.k] && <small>Cargado ✔</small>}</>
        : d.t === 'sel' ? <select value={f[d.k] ?? ''} onChange={e => setF({ ...f, [d.k]: e.target.value })}><option value="">—</option>{d.o!.map(o => <option key={o}>{o}</option>)}</select>
        : <input type={d.t === 'num' ? 'number' : d.t === 'date' ? 'date' : 'text'} value={((d.t as string) === 'list' || (d.t as string) === 'lines') && Array.isArray(f[d.k]) ? f[d.k].join((d.t as string) === 'lines' ? '\n' : ', ') : f[d.k] ?? ''} onChange={e => setF({ ...f, [d.k]: e.target.value })} />}</>}</label>)}
    {msg && <p className="err full">{msg}</p>}<div className="btns full"><button className="btn">Guardar</button><button type="button" className="btn ghost" onClick={() => setF(null)}>Cancelar</button></div></form>)
  return (<div><button className="btn" onClick={() => setF({ active: true })}>+ Nuevo</button>{msg && <p className="err">{msg}</p>}
    <State s={s} empty="No hay registros todavía."><table className="tbl"><tbody>{s.data.map((r: any) => <tr key={r.id}><td>{r[first]}</td><td>{r.active === false ? 'Oculto' : 'Publicado'}{r.featured ? ' ★' : ''}</td>
      <td><button className="link" onClick={() => setF(r)}>Editar</button> <button className="link" onClick={() => del(r.id)}>Eliminar</button></td></tr>)}</tbody></table></State></div>)
}
function Inbox({ table, title }: { table: string; title: string }) {
  const [n, setN] = useState(0); const s = useRows(table, { key: n })
  async function setStatus(id: string, status: string) { await supabase.from(table).update({ status }).eq('id', id); setN(n + 1) }
  async function open(path: string) { const { data } = await supabase.storage.from('documentos').createSignedUrl(path, 300); if (data) window.open(data.signedUrl) }
  return <State s={s} empty={`No hay ${title} todavía.`}>{s.data.map((r: any) => <details key={r.id} className="card"><summary><b>{r.name}</b> — {r.company || 'sin empresa'} · {new Date(r.created_at).toLocaleString()} · <em>{r.status}</em></summary>
    <p>{Object.entries(r).filter(([k, v]) => v && !['id', 'status', 'created_at', 'attachment_url'].includes(k)).map(([k, v]) => <span key={k}><b>{k}:</b> {String(v)}<br /></span>)}</p>
    {r.attachment_url && <button className="link" onClick={() => open(r.attachment_url)}>Ver archivo adjunto</button>}
    <select value={r.status} onChange={e => setStatus(r.id, e.target.value)}>{STATES.map(o => <option key={o}>{o}</option>)}</select></details>)}</State>
}
function Users() {
  const [n, setN] = useState(0); const s = useRows('profiles', { key: n }); const [v, setV] = useState({ email: '', password: '', name: '', role: 'staff' }); const [m, setM] = useState('')
  async function create(e: React.FormEvent) {
    e.preventDefault(); const { error } = await supabase.rpc('admin_create_user', { p_email: v.email, p_password: v.password, p_name: v.name, p_role: v.role })
    if (error) return setM('Error: ' + error.message); setM('Usuario creado correctamente.'); setV({ email: '', password: '', name: '', role: 'staff' }); setN(n + 1)
  }
  return (<div><form onSubmit={create} className="form"><h2 className="full">Crear usuario</h2>
    <label>Nombre<input required value={v.name} onChange={e => setV({ ...v, name: e.target.value })} /></label>
    <label>Correo<input type="email" required value={v.email} onChange={e => setV({ ...v, email: e.target.value })} /></label>
    <label>Contraseña (mín. 8)<input type="password" minLength={8} required value={v.password} onChange={e => setV({ ...v, password: e.target.value })} /></label>
    <label>Rol<select value={v.role} onChange={e => setV({ ...v, role: e.target.value })}><option value="staff">Empleado</option><option value="admin">Administrador</option></select></label>
    {m && <p className="full">{m}</p>}<button className="btn full">Crear usuario</button></form>
    <State s={s} empty="Sin usuarios."><table className="tbl"><tbody>{s.data.map((u: any) => <tr key={u.id}><td>{u.full_name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody></table></State></div>)
}
function Galeria() {
  const [n, setN] = useState(0); const ps = useRows('projects', { key: n }); const [pid, setPid] = useState(''); const [m, setM] = useState('')
  const im = useRows('project_images', { eq: ['project_id', pid || '00000000-0000-0000-0000-000000000000'], order: 'sort_order', asc: true, key: n })
  const pr: any = (ps.data as any[]).find(p => p.id === pid)
  async function up(file?: File) {
    if (!file || !pr) return; const path = `proyectos/${pr.slug}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const u = await supabase.storage.from('imagenes').upload(path, file); if (u.error) return setM('Error al subir: ' + u.error.message)
    const url = supabase.storage.from('imagenes').getPublicUrl(path).data.publicUrl
    const { error } = await supabase.from('project_images').insert({ project_id: pid, url, thumb_url: url, alt: `${pr.title}: fotografía`, sort_order: im.data.length + 1 })
    if (!error && !pr.cover_image) await supabase.from('projects').update({ cover_image: url }).eq('id', pid)
    setM(error ? 'Error: ' + error.message : 'Foto agregada.'); setN(n + 1)
  }
  async function rm(id: string) { if (confirm('¿Quitar esta foto?')) { await supabase.from('project_images').delete().eq('id', id); setN(n + 1) } }
  async function cover(url: string) { await supabase.from('projects').update({ cover_image: url }).eq('id', pid); setM('Portada actualizada.'); setN(n + 1) }
  return (<div><p className="muted">Elija un proyecto para agregar, quitar o definir la portada de sus fotografías.</p>
    <select value={pid} onChange={e => setPid(e.target.value)}><option value="">Seleccione un proyecto…</option>{(ps.data as any[]).map(p => <option key={p.id} value={p.id}>{p.title}</option>)}</select>{m && <p>{m}</p>}
    {pid && <><p><input type="file" accept="image/*" onChange={e => up(e.target.files?.[0])} /></p><div className="grid3">{(im.data as any[]).map(x => <div className="card" key={x.id}><img src={x.thumb_url || x.url} alt={x.alt} /><button className="link" onClick={() => cover(x.thumb_url || x.url)}>Usar como portada</button> <button className="link" onClick={() => rm(x.id)}>Quitar</button></div>)}</div></>}</div>)
}
function Dash() {
  const [c, setC] = useState<Record<string, number>>({})
  useEffect(() => { ['services', 'projects', 'quote_requests', 'contact_messages'].forEach(t => supabase.from(t).select('*', { count: 'exact', head: true }).then(({ count }) => setC(p => ({ ...p, [t]: count ?? 0 })))) }, [])
  return <div className="grid4">{[['services', 'Servicios'], ['projects', 'Proyectos'], ['quote_requests', 'Cotizaciones'], ['contact_messages', 'Mensajes']].map(([k, l]) => <div className="card" key={k}><strong className="big">{c[k] ?? '…'}</strong><p>{l}</p></div>)}</div>
}
function Login() {
  const nav = useNavigate(); const [e, setE] = useState(''); const [p, setP] = useState(''); const [m, setM] = useState(''); const [b, setB] = useState(false)
  async function go(ev: React.FormEvent) { ev.preventDefault(); setB(true); const { error } = await supabase.auth.signInWithPassword({ email: e, password: p }); setB(false); if (error) setM('Correo o contraseña incorrectos.'); else nav('/admin/dashboard') }
  return <form onSubmit={go} className="wrap sec form login"><h1 className="full">Acceso interno</h1><label className="full">Correo<input type="email" required value={e} onChange={x => setE(x.target.value)} /></label>
    <label className="full">Contraseña<input type="password" required value={p} onChange={x => setP(x.target.value)} /></label>{m && <p className="err full" role="alert">{m}</p>}<button className="btn full" disabled={b}>Ingresar</button></form>
}
export default function Admin() {
  const { tab = 'dashboard' } = useParams(); const nav = useNavigate(); const [role, setRole] = useState<string | null | undefined>(undefined)
  useEffect(() => { if (tab === 'login') return
    supabase.auth.getSession().then(async ({ data }) => { if (!data.session) return nav('/admin/login')
      const { data: p } = await supabase.from('profiles').select('role').eq('id', data.session.user.id).maybeSingle(); setRole(p?.role ?? null) }) }, [tab])
  if (tab === 'login') return <Login />
  if (role === undefined) return <p className="wrap muted">Cargando…</p>
  if (role === null) return <div className="wrap sec"><p className="err">Esta cuenta no tiene permisos de administración.</p><button className="btn" onClick={() => supabase.auth.signOut().then(() => nav('/admin/login'))}>Salir</button></div>
  const tabs = [['dashboard', 'Dashboard'], ...Object.entries(CFG).map(([k, v]) => [k, v.label]), ['galeria', 'Galería de proyectos'], ['solicitudes', 'Solicitudes'], ['mensajes', 'Mensajes'], ...(role === 'admin' ? [['usuarios', 'Usuarios']] : [])]
  const c = CFG[tab]
  return (<div className="admin"><aside><Link to="/" className="logo">IAC <span>ADMIN</span></Link>{tabs.map(([k, l]) => <Link key={k} to={`/admin/${k}`} className={k === tab ? 'on' : ''}>{l}</Link>)}
    <button className="link" onClick={() => supabase.auth.signOut().then(() => nav('/admin/login'))}>Cerrar sesión</button></aside>
    <section>{tab === 'dashboard' ? <Dash /> : c ? <><h1>{c.label}</h1><Crud key={tab} table={c.table} fields={c.fields} label={c.label} /></> : tab === 'galeria' ? <><h1>Galería de proyectos</h1><Galeria /></> : tab === 'solicitudes' ? <><h1>Solicitudes de cotización</h1><Inbox table="quote_requests" title="solicitudes" /></> : tab === 'mensajes' ? <><h1>Mensajes de contacto</h1><Inbox table="contact_messages" title="mensajes" /></> : tab === 'usuarios' && role === 'admin' ? <Users /> : <p>Sección no disponible.</p>}</section></div>)
}
