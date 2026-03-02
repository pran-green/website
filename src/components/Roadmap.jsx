import SectionHeading from './SectionHeading'
import { content } from '../content'

export default function Roadmap() {
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <SectionHeading
          kicker="Our green journey"
          title="Build, deploy, refine, scale."
          description="A phased plan to validate in the real world and expand into a unified waste data layer."
        />

        <div className="grid" style={{gridTemplateColumns:'repeat(4, 1fr)', marginTop:22}}>
          {content.roadmap.map((r) => (
            <div key={r.phase} className="card" style={{padding:18}}>
              <div className="badge">{r.phase}</div>
              <div style={{fontWeight:900, fontSize:18, marginTop:12}}>{r.title}</div>
              <ul style={{margin:'10px 0 0', paddingLeft:18, color:'var(--muted)', lineHeight:1.6}}>
                {r.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 960px){
            .grid{grid-template-columns:1fr 1fr !important}
          }
          @media (max-width: 540px){
            .grid{grid-template-columns:1fr !important}
          }
        `}</style>
      </div>
    </section>
  )
}
