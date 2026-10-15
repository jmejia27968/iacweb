import { Link } from 'react-router-dom'
import { Yard } from './Art'
export default function ProjectCard({ p }: { p: any }) {
  return (<Link to={`/proyectos/${p.slug}`} className="pc">
    <div className="pcimg">{p.cover_image ? <img src={p.cover_image} alt={p.title} loading="lazy" /> : <Yard />}</div>
    <div className="pcb"><span className="m pcd">{[p.period_label, p.voltage_level].filter(Boolean).join(' · ')}</span>
      <h3>{p.title}</h3><p>{[p.location, p.client_display_name].filter(Boolean).join(' · ')}</p></div></Link>)
}
