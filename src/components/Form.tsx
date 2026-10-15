import { useState } from 'react'
import { supabase } from '../lib/supabase'
export type Field = { name: string; label: string; type?: 'text' | 'email' | 'tel' | 'textarea' | 'date' | 'select' | 'file' | 'check'; req?: boolean; opts?: string[] }
export default function Form({ table, fields, extra = {}, defaults = {}, button }: { table: string; fields: Field[]; extra?: Record<string, any>; defaults?: Record<string, string>; button: string }) {
  const [v, setV] = useState<Record<string, string>>(defaults)
  const [file, setFile] = useState<File | null>(null)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [st, setSt] = useState<'idle' | 'busy' | 'ok' | 'fail'>('idle')
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (st === 'busy') return
    const er: Record<string, string> = {}
    fields.forEach(f => {
      const x = (v[f.name] || '').trim()
      if (f.req && f.type !== 'file' && !x) er[f.name] = f.type === 'check' ? 'Debe aceptar para continuar' : 'Campo obligatorio'
      if (f.type === 'email' && x && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)) er[f.name] = 'Correo no válido'
    })
    if (file && file.size > 15 * 1024 * 1024) er.file = 'El archivo supera 15 MB'
    setErrs(er); if (Object.keys(er).length) return
    if (v.web) { setSt('ok'); return }
    setSt('busy')
    try {
      const row: Record<string, any> = { ...extra }
      fields.filter(f => f.type !== 'file').forEach(f => { row[f.name] = f.type === 'check' ? v[f.name] === 'true' : (v[f.name] || '').trim() || null })
      if (file) {
        const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const up = await supabase.storage.from('documentos').upload(path, file)
        if (up.error) throw up.error
        row.attachment_url = path
      }
      const { error } = await supabase.from(table).insert(row)
      if (error) throw error
      setSt('ok'); setV({}); setFile(null)
    } catch { setSt('fail') }
  }
  if (st === 'ok') return <p className="ok" role="status">Su solicitud fue enviada correctamente. Nuestro equipo se pondrá en contacto con usted.</p>
  return (<form onSubmit={submit} noValidate className="form">
    {fields.map(f => (<label key={f.name} className={f.type === 'textarea' || f.type === 'check' ? 'full' : ''}>{f.type !== 'check' && <>{f.label}{f.req && ' *'}</>}
      {f.type === 'check' ? <span className="chk"><input type="checkbox" checked={v[f.name] === 'true'} onChange={e => setV({ ...v, [f.name]: e.target.checked ? 'true' : '' })} /> {f.label} *</span>
        : f.type === 'textarea' ? <textarea rows={5} value={v[f.name] || ''} onChange={e => setV({ ...v, [f.name]: e.target.value })} />
        : f.type === 'select' ? <select value={v[f.name] || ''} onChange={e => setV({ ...v, [f.name]: e.target.value })}><option value="">Seleccione…</option>{f.opts!.map(o => <option key={o}>{o}</option>)}</select>
        : f.type === 'file' ? <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        : <input type={f.type || 'text'} value={v[f.name] || ''} onChange={e => setV({ ...v, [f.name]: e.target.value })} />}
      {errs[f.name] && <small className="err" role="alert">{errs[f.name]}</small>}</label>))}
    {st === 'fail' && <p className="err full" role="alert">No fue posible enviar la solicitud. Intente nuevamente.</p>}
    <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.web || ''} onChange={e => setV({ ...v, web: e.target.value })} />
    <button className="btn full" disabled={st === 'busy'}>{st === 'busy' ? 'Enviando…' : button}</button></form>)
}
