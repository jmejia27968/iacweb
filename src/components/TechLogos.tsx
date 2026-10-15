// Logotipos de los fabricantes con los que el equipo declara experiencia (no implica representación comercial)
export const ORDER = ['ABB', 'Hitachi Energy', 'Siemens', 'SEL', 'GE']
const LOGOS: Record<string, { src: string; fam?: string; h: number }> = {
  'ABB': { src: '/tecnologias/abb.svg', fam: 'Relion', h: 38 }, 'Hitachi Energy': { src: '/tecnologias/hitachi-energy.svg', h: 30 },
  'Siemens': { src: '/tecnologias/siemens.svg', fam: 'SIPROTEC', h: 26 }, 'SEL': { src: '/tecnologias/sel.svg', fam: 'SEL-351', h: 42 }, 'GE': { src: '/tecnologias/ge.svg', fam: 'Multilin', h: 58 },
}
// Tolera variantes del nombre (p. ej. "Hitachi" o "Hitachi Energy") para encontrar siempre el logotipo
const keyOf = (n: string) => ORDER.find(k => n.toLowerCase().startsWith(k.toLowerCase().split(' ')[0]))
export const sortTech = (names: string[]) => [...names].sort((a, b) => (ORDER.indexOf(keyOf(a) ?? '') + 1 || 99) - (ORDER.indexOf(keyOf(b) ?? '') + 1 || 99))
export default function TechLogos({ rows }: { rows: any[] }) {
  const list = rows.length ? sortTech(rows.map(r => r.name)).map(n => rows.find(r => r.name === n)) : ORDER.map(name => ({ name }))
  return (<div className="tlogos">{list.map((t: any) => { const m = LOGOS[keyOf(t.name) ?? '']; const src = t.logo_url || m?.src
    return (<figure key={t.name}><div className="tl">{src ? <img src={src} alt={`Logotipo de ${t.name}`} loading="lazy" style={{ height: m?.h ?? 40 }} /> : <b>{t.name}</b>}</div>
      <figcaption><b>{t.name}</b><span className="m">{m?.fam ? `Familia: ${m.fam}` : 'Experiencia declarada'}</span></figcaption></figure>) })}</div>)
}
