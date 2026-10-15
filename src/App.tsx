import { lazy, Suspense } from 'react'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { About, Services, ServiceDetail, Projects, ProjectDetail, Capabilities, Contact, Quote, Privacy, NotFound } from './pages/Public'
const Admin = lazy(() => import('./pages/Admin'))
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) { requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); return }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
export default function App() {
  return (<Suspense fallback={<p className="wrap muted">Cargando…</p>}><ScrollToTop /><Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} /><Route path="/nosotros" element={<About />} />
      <Route path="/servicios" element={<Services />} /><Route path="/servicios/:slug" element={<ServiceDetail />} />
      <Route path="/proyectos" element={<Projects />} /><Route path="/proyectos/:slug" element={<ProjectDetail />} />
      <Route path="/capacidades" element={<Capabilities />} /><Route path="/contacto" element={<Contact />} /><Route path="/cotizacion" element={<Quote />} />
      <Route path="/privacidad" element={<Privacy />} /><Route path="*" element={<NotFound />} /></Route>
    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/:tab" element={<Admin />} />
  </Routes></Suspense>)
}
