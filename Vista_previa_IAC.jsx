// Vista previa visual (sin Supabase). Es un solo componente React autónomo.
import React from 'react'
const css = `.i{--p:#123B4A;--a:#00A8E8;font:17px/1.6 Inter,system-ui,sans-serif;color:#172026;background:#F7F9FA}.i h1,.i h2,.i h3{font-family:Manrope,Inter,sans-serif;color:var(--p);margin:.3em 0;line-height:1.15}
.i .w{max-width:1100px;margin:auto;padding:0 20px}.i header{background:#fff;border-bottom:1px solid #dde3e7}.i header .w{display:flex;justify-content:space-between;align-items:center;height:64px;gap:12px;flex-wrap:wrap}
.i .b{background:var(--a);color:#fff;padding:11px 20px;border-radius:6px;font-weight:600;display:inline-block}.i .g{background:none;border:2px solid #fff}
.i .hero{background:var(--p);color:#fff;padding:56px 0}.i .hero h1,.i .hero p{color:#fff}.i .hero .w{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:32px;align-items:center}
.i .ph{min-height:260px;border-radius:10px;background:repeating-linear-gradient(45deg,#1b4d5f,#1b4d5f 12px,#174456 12px,#174456 24px);display:grid;place-items:center;color:#9fb8c2}
.i .m{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin:-28px auto 0}.i .m div{background:#fff;padding:18px;border-radius:8px;box-shadow:0 2px 8px #0001}.i .m b{display:block;font:800 26px Manrope;color:var(--p)}
.i .c{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}.i .c div{background:#fff;border:1px solid #dde3e7;border-radius:8px;padding:18px}.i .n{color:var(--a);font:800 26px Manrope}
.i .s{display:flex;border-bottom:4px solid var(--p);margin-top:12px}.i .s div{flex:1;text-align:center;padding:16px 2px;font:700 18px Manrope;border-left:2px solid var(--a)}.i section{padding:44px 0}`
const cats = [['01', 'INGENIERÍA'], ['02', 'ARMADO Y CONEXIONADO'], ['03', 'PROTECCIÓN Y AUTOMATIZACIÓN'], ['04', 'COMISIONAMIENTO']]
export default function Preview() {
  return (<div className="i"><style>{css}</style>
    <header><div className="w"><b style={{ font: '800 22px Manrope', color: '#123B4A' }}>IAC INGENIEROS</b><span>Inicio · Nosotros · Servicios · Proyectos · Capacidades · Contacto</span><span className="b">Solicitar cotización</span></div></header>
    <div className="hero"><div className="w"><div><h1>Control, protección y automatización para sistemas de potencia</h1>
      <p>Diseñamos, configuramos, probamos y ponemos en servicio sistemas de control, protección y automatización para subestaciones eléctricas.</p><span className="b">Solicitar cotización</span> <span className="b g">Conocer nuestros servicios</span></div>
      <div className="ph">[Fotografía real pendiente]</div></div></div>
    <div className="w m">{[['+15 años', 'de trayectoria'], ['+50 proyectos', 'ejecutados'], ['230 kV', 'nivel máximo'], ['Bolivia', 'cobertura nacional']].map(([a, b]) => <div key={a}><b>{a}</b>{b}</div>)}</div>
    <section><div className="w"><h2>Soluciones para cada etapa del proyecto</h2><div className="c">{cats.map(([n, t]) => <div key={n}><span className="n">{n}</span><h3>{t}</h3></div>)}</div></div></section>
    <section><div className="w"><h2>Experiencia en diferentes niveles de tensión</h2><div className="s">{['10 kV', '14,4 kV', '24,9 kV', '115 kV', '230 kV'].map(v => <div key={v}>{v}</div>)}</div></div></section>
  </div>)
}
