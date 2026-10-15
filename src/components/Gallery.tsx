import { useEffect, useState } from 'react'
export default function Gallery({ images }: { images: any[] }) {
  const [i, setI] = useState<number | null>(null)
  const go = (d: number) => setI(v => (v === null ? v : (v + d + images.length) % images.length))
  useEffect(() => {
    if (i === null) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [i])
  return (<>
    <div className="gal">{images.map((m, k) => <button key={m.id ?? k} onClick={() => setI(k)} aria-label={`Ampliar fotografía ${k + 1} de ${images.length}`}><img src={m.thumb_url || m.url} alt={m.alt || ''} loading="lazy" /></button>)}</div>
    {i !== null && <div className="lb" role="dialog" aria-modal="true" aria-label="Galería de fotografías" onClick={() => setI(null)}>
      <img src={images[i].url} alt={images[i].alt || ''} onClick={e => e.stopPropagation()} />
      <button className="lbx" aria-label="Cerrar" onClick={() => setI(null)}>×</button>
      {images.length > 1 && <><button className="lbp" aria-label="Anterior" onClick={e => { e.stopPropagation(); go(-1) }}>‹</button><button className="lbn" aria-label="Siguiente" onClick={e => { e.stopPropagation(); go(1) }}>›</button></>}
      <span className="lbc">{i + 1} / {images.length} · {images[i].alt}</span></div>}
  </>)
}
