import { useMemo, useState } from 'react'
import SectionHeading from './SectionHeading'
import { content } from '../content'
import { ChevronRight } from 'lucide-react'

import westin from '../assets/ppt/image24.png'
import berkeley from '../assets/ppt/image37.png'
import blueman from '../assets/ppt/image40.png'
import booking from '../assets/ppt/image43.png'

const images = [westin, berkeley, blueman, booking]

export default function Impact() {
  const [active, setActive] = useState(0)
  const hero = useMemo(() => images[active] || images[0], [active])

  return (
    <section id="impact" className="section">
      <div className="container">
        <SectionHeading
          kicker="Impact"
          title="Proof it works — and a market that’s ready."
          description="From hospitality to campuses and venues, organizations have shown real savings when waste streams are clean."
        />

        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:18, marginTop:22}}>
          <div className="card" style={{padding:18}}>
            <div style={{fontWeight:850, fontSize:18}}>Case studies</div>
            <div className="p" style={{marginTop:6}}>Examples referenced in the pitch deck.</div>

            <div style={{display:'grid', gap:10, marginTop:12}}>
              {content.caseStudies.map((c, idx) => (
                <button
                  key={c.title}
                  className="btn"
                  onClick={() => setActive(idx)}
                  style={{
                    justifyContent:'space-between',
                    borderColor: idx === active ? 'rgba(82,176,90,.45)' : 'rgba(255,255,255,.10)',
                    background: idx === active ? 'rgba(82,176,90,.10)' : 'rgba(255,255,255,.04)',
                  }}
                >
                  <span style={{textAlign:'left'}}>
                    <div style={{fontWeight:750}}>{c.title}</div>
                    <div style={{color:'var(--muted)', fontSize:13, marginTop:4}}>{c.highlight}</div>
                  </span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>

            <div className="card" style={{padding:14, marginTop:12, background:'rgba(0,0,0,.20)'}}>
              <div style={{fontWeight:800}}>Details</div>
              <ul style={{margin:'10px 0 0', paddingLeft:18, color:'var(--muted)', lineHeight:1.6}}>
                {content.caseStudies[active].details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>

          <div className="card" style={{padding:18}}>
            <div style={{borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,.10)'}}>
              <img src={hero} alt="Case study visual" />
            </div>
          </div>
        </div>


        <style>{`
          @media (max-width: 860px){
            .grid{grid-template-columns:1fr !important}
          }
        `}</style>
      </div>
    </section>
  )
}
