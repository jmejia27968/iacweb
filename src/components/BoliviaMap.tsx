import { useState } from 'react'
import { BOLIVIA } from '../lib/boliviaMap'
const DEC = ['cochabamba', 'la-paz', 'santa-cruz', 'oruro', 'potosi']
const short = (c: string) => (c === 'Santa Cruz de la Sierra' ? 'Santa Cruz' : c)
export default function BoliviaMap() {
  const [sel, setSel] = useState('cochabamba')
  const cur = BOLIVIA.depts.find(d => d.id === sel)!
  return (
    <div className="bmap">
      <svg viewBox={`0 0 ${BOLIVIA.w} ${BOLIVIA.h}`} role="group" aria-label="Mapa interactivo de Bolivia por departamentos">
        {BOLIVIA.depts.map(d => (
          <path key={d.id} d={d.d} className={'dep' + (d.id === sel ? ' on' : '') + (d.id === 'cochabamba' ? ' base' : DEC.includes(d.id) ? ' dec' : '')} tabIndex={0} role="button"
            aria-label={`${d.name}, capital ${d.capital}`} aria-pressed={d.id === sel}
            onClick={() => setSel(d.id)} onMouseEnter={() => setSel(d.id)} onFocus={() => setSel(d.id)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(d.id) } }} />
        ))}
        {BOLIVIA.depts.map(d => (
          <g key={d.id + 'm'} pointerEvents="none">
            {d.id === 'cochabamba' && <circle cx={d.cx} cy={d.cy} r="8" fill="#00A8E8" fillOpacity=".25"><animate attributeName="r" values="5;13;5" dur="2.6s" repeatCount="indefinite" /></circle>}
            <circle cx={d.cx} cy={d.cy} r={d.id === 'cochabamba' ? 4.5 : 3} fill={d.id === 'cochabamba' ? '#00A8E8' : '#123B4A'} />
            <text x={d.cx + 7} y={d.cy + 3.5} fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#123B4A">{short(d.capital)}</text>
          </g>
        ))}
        {(() => { const p = BOLIVIA.depts.find(d => d.id === 'potosi')!; return <g pointerEvents="none"><rect x={p.cx + 1} y={p.cy - 25} width="7" height="7" fill="#FF8A45" transform={`rotate(45 ${p.cx + 4.5} ${p.cy - 21.5})`} /><text x={p.cx + 12} y={p.cy - 19} fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#123B4A">Punutuma</text></g> })()}
      </svg>
      <div className="binfo" aria-live="polite">
        <b>{cur.name}</b>
        <span>{cur.id === 'cochabamba' ? 'Sede única de IAC Ingenieros · experiencia declarada' : DEC.includes(cur.id) ? `Experiencia declarada${cur.id === 'potosi' ? ' · proyecto: Punutuma 69 kV (2024)' : ''} · capital: ${cur.capital}` : `Servicios disponibles en todo el territorio nacional · capital: ${cur.capital}`}</span>
      </div>
      <div className="bchips">{BOLIVIA.depts.map(d => <button key={d.id} className={d.id === sel ? 'on' : ''} onClick={() => setSel(d.id)}>{d.name}</button>)}</div>
      <small className="m">Mapa referencial. Sede: Cochabamba. Rombo: proyecto publicado con ficha (ubicación aproximada). Límites: Natural Earth (dominio público).</small>
    </div>
  )
}
