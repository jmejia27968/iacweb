import { useEffect, useState } from 'react'
import { supabase } from './supabase'
type Opts = { eq?: [string, any]; order?: string; limit?: number; key?: number; asc?: boolean }
export function useRows<T = any>(table: string, o: Opts = {}) {
  const [s, set] = useState<{ data: T[]; loading: boolean; error: string | null }>({ data: [], loading: true, error: null })
  useEffect(() => {
    let ok = true
    let q: any = supabase.from(table).select('*')
    if (o.eq) q = q.eq(o.eq[0], o.eq[1])
    q = q.order(o.order ?? 'created_at', { ascending: !!o.asc })
    if (o.limit) q = q.limit(o.limit)
    q.then(({ data, error }: any) => ok && set({ data: data ?? [], loading: false, error: error?.message ?? null }))
    return () => { ok = false }
  }, [table, JSON.stringify(o)])
  return s
}
export function State({ s, empty, children }: { s: { data: any[]; loading: boolean; error: string | null }; empty: string; children: React.ReactNode }) {
  if (s.loading) return <p className="muted" role="status">Cargando…</p>
  if (s.error) return <p className="err" role="alert">No fue posible cargar la información. Intente nuevamente.</p>
  if (!s.data.length) return <p className="muted">{empty}</p>
  return <>{children}</>
}
export function useSEO(title: string, desc: string) {
  useEffect(() => {
    document.title = `${title} | IAC Ingenieros`
    let m = document.querySelector('meta[name=description]')
    if (m) m.setAttribute('content', desc)
    let l = document.querySelector('link[rel=canonical]') as HTMLLinkElement | null
    if (!l) { l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l) }
    l.href = location.origin + location.pathname
  }, [title, desc])
}

// Hora de La Paz, Bolivia (America/La_Paz, GMT-4, sin horario de verano), sincronizada con el reloj del visitante
export function useLaPaz() {
  const calc = () => {
    const d = new Date()
    const hora = new Intl.DateTimeFormat('es-BO', { timeZone: 'America/La_Paz', hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
    const dia = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].indexOf(new Intl.DateTimeFormat('es-BO', { timeZone: 'America/La_Paz', weekday: 'short' }).format(d).replace('.', '').replace(/^./, c => c.toUpperCase()))
    return { hora, dia: dia === 0 ? 7 : dia }
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const i = setInterval(() => setT(calc()), 30000); return () => clearInterval(i) }, [])
  return t
}
