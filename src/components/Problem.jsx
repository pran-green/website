import SectionHeading from './SectionHeading'
import { content } from '../content'

export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="container">
        <SectionHeading
          kicker="Stark reality"
          title="Contamination is the bottleneck."
          description="When recyclables are mixed or mis-sorted, they get landfilled and organizations pay the price."
        />

        <div className="grid" style={{gridTemplateColumns:'repeat(3, 1fr)', marginTop:22}}>
          {content.problem.map((p) => (
            <div key={p.title} className="card" style={{padding:18}}>
<div style={{fontWeight:750, fontSize:18, marginTop:12}}>{p.title}</div>
              <div className="p" style={{marginTop:6}}>{p.body}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{marginTop:18, padding:18, display:'grid', gridTemplateColumns:'1.2fr .8fr', gap:16}}>
          <div>
            <div style={{fontWeight:750, fontSize:18}}>Why it matters</div>
            <div className="p" style={{marginTop:6}}>
              Mixed recycling programs often operate around contamination thresholds; going above them triggers extra fees and more landfill diversion.
            </div>
          </div>
          <div style={{borderLeft:'1px solid rgba(255,255,255,.10)', paddingLeft:16}}>
            <div className="badge">Contamination threshold</div>
            <div style={{marginTop:10, color:'var(--muted)', fontSize:14, lineHeight:1.6}}>
              &lt; 15%: lower processing cost • &gt; 15%: extra contamination fees + disposal
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px){
            .grid{grid-template-columns:1fr !important}
            .card[style*="grid-template-columns"]{grid-template-columns:1fr !important}
            .card[style*="borderLeft"]{border-left:none !important; padding-left:0 !important}
          }
        `}</style>
      </div>
    </section>
  )
}
