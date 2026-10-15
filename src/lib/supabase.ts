import { createClient } from '@supabase/supabase-js'
// Solo URL y clave pública, leídas del archivo .env (o de las variables de Netlify)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder')
export const PENDING = '[Información pendiente de completar]'
export const wa = (t = 'Hola, quiero consultar sobre un servicio de IAC Ingenieros.') =>
  `https://wa.me/59172266385?text=${encodeURIComponent(t)}`
export const VOLTAGES = ['10 kV', '14,4 kV', '24,9 kV', '115 kV', '230 kV']
export const EMPRESA = {
  marca: 'IAC Ingenieros', razon: 'Marco Antonio Inochea Gutierrez',
  completa: 'IAC Ingenieros Empresa Unipersonal Marco Antonio Inochea Gutierrez', fundacion: new Date(2008, 0, 24),
}
export const CONTACTO = { nombre: 'Marco Inochea', fijo: '+591 4 4390296', telFijo: 'tel:+59144390296', telefono: '+591 72266385', tel: 'tel:+59172266385', email: 'marcoinochea@gmail.com' }
// Años completos desde la fundación (24 de enero de 2008): se recalcula solo
export const anios = () => { const n = new Date(), f = EMPRESA.fundacion; let a = n.getFullYear() - f.getFullYear(); if (n.getMonth() < f.getMonth() || (n.getMonth() === f.getMonth() && n.getDate() < f.getDate())) a--; return a }
// Horario de oficina (hora de La Paz, Bolivia): lunes a viernes, 8:00 a 18:00, indicado por la empresa.
export const HORARIO: { dias: number[]; desde: string | null; hasta: string | null } = { dias: [1, 2, 3, 4, 5], desde: '08:00', hasta: '18:00' }
// Cifras declaradas por la empresa (editar aquí si cambian)
export const CIFRAS = { documentados: 84, ventana: 15, totalMin: 100 }
export const sortProjects = (l: any[]) => [...l].sort((a, b) => (b.project_date || '').localeCompare(a.project_date || '') || (a.title > b.title ? 1 : -1))
