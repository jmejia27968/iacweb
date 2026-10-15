import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { CONTACTO, EMPRESA, HORARIO, wa } from '../lib/supabase'
import { useLaPaz } from '../lib/hooks'
const nav = [['/', 'Inicio'], ['/nosotros', 'Nosotros'], ['/servicios', 'Servicios'], ['/proyectos', 'Proyectos'], ['/capacidades', 'Capacidades'], ['/contacto', 'Contacto']]
export default function Layout() {
  const [open, setOpen] = useState(false)
  const lp = useLaPaz()
  const abierto = HORARIO.desde && HORARIO.hasta ? HORARIO.dias.includes(lp.dia) && lp.hora >= HORARIO.desde && lp.hora < HORARIO.hasta : null
  const estado = abierto === null ? '' : abierto ? 'Atendiendo ahora' : 'Fuera de horario'
  return (<>
    <div className="tb"><div className="wrap">
      <span>Cochabamba, Bolivia · {lp.hora}{estado && ` · ${estado}`} · Lun–Vie {HORARIO.desde}–{HORARIO.hasta}</span>
      <span><a href={CONTACTO.telFijo}>{CONTACTO.fijo}</a> · <a href={wa()} target="_blank" rel="noreferrer">WhatsApp {CONTACTO.telefono}</a> · <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a></span></div></div>
    <header className="hdr"><div className="wrap row">
      <Link to="/" className="brand" aria-label="IAC Ingenieros, inicio"><img src="/logo.png" alt="IAC Ingenieros" width="150" height="69" /></Link>
      <button className="burger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      <nav className={open ? 'nav open' : 'nav'} onClick={() => setOpen(false)}>
        {nav.map(([to, l]) => <NavLink key={to} to={to} end={to === '/'}>{l}</NavLink>)}
        <Link to="/cotizacion" className="btn">Solicitar cotización</Link>
      </nav></div></header>
    <main><Outlet /></main>
    <footer className="ftr"><div className="wrap grid4">
      <div><span className="fl"><img src="/logo.png" alt="IAC Ingenieros" width="130" height="60" /></span>
        <p>Ingeniería eléctrica de control y protección para subestaciones de media y alta tensión. Sede única en Cochabamba, cobertura nacional.</p>
        <p className="fine">{EMPRESA.completa}</p></div>
      <div><h4>Navegación</h4>{nav.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</div>
      <div><h4>Servicios</h4><Link to="/servicios/ingenieria-control-proteccion">Ingeniería de control y protección</Link><Link to="/servicios">Tableros, retrofit y puesta en servicio</Link><Link to="/proyectos">Proyectos</Link><Link to="/cotizacion">Solicitar cotización</Link></div>
      <div><h4>Contacto</h4><p>Cochabamba, Bolivia<br /><a href={CONTACTO.telFijo}>{CONTACTO.fijo}</a><br /><a href={CONTACTO.tel}>{CONTACTO.telefono}</a><br /><a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a><br />Lun–Vie {HORARIO.desde}–{HORARIO.hasta} (La Paz)</p></div></div>
      <p className="wrap copy">© {new Date().getFullYear()} IAC Ingenieros. <Link to="/privacidad">Privacidad</Link> · <Link to="/admin/login">Acceso interno</Link></p></footer>
    <a className="wa" href={wa()} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp">WhatsApp</a>
    <nav className="mbar" aria-label="Contacto rápido"><a href={CONTACTO.tel}>Llamar</a><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><Link to="/cotizacion">Cotizar</Link></nav>
  </>)
}
