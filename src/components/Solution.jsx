import { useMemo, useState } from 'react'
import SectionHeading from './SectionHeading'
import { content } from '../content'
import { ScanLine, CheckCircle2, XCircle } from 'lucide-react'

import deviceClose from '../assets/ppt/image28.png'
import signage from '../assets/ppt/image31.jpg'

const demoMap = [
  { label: 'Plastic bottle', result: 'Recyclable', stream: 'Plastic', ok: true },
  { label: 'Coffee cup (lined)', result: 'Trash', stream: 'Residual', ok: false },
  { label: 'Aluminum can', result: 'Recyclable', stream: 'Metal', ok: true },
  { label: 'Greasy pizza box', result: 'Trash', stream: 'Residual', ok: false },
  { label: 'Glass bottle', result: 'Recyclable', stream: 'Glass', ok: true },
]

export default function Solution() {
  const [choice, setChoice] = useState(demoMap[0].label)
  const outcome = useMemo(() => demoMap.find(d => d.label === choice) || demoMap[0], [choice])

  return (
    <section id="solution" className="section">
      <div className="container">
        <SectionHeading
          kicker="Our solution"
          title="Point-of-disposal classification that scales."
          description="WasteWiz helps users sort correctly in the moment, reduces contamination fees, and generates real-time waste stream data."
        />

        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:18, marginTop:22}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <div className="badge"><ScanLine size={16}/> Live demo</div>
            </div>

            <div style={{marginTop:14, display:'grid', gap:12}}>
              <label style={{color:'var(--muted)', fontSize:14}}>Pick an item</label>
              <select value={choice} onChange={(e) => setChoice(e.target.value)}
                style={{
                  width:'100%', padding:'12px 12px', borderRadius:12,
                  background:'rgba(0,0,0,.25)', color:'var(--text)',
                  border:'1px solid rgba(255,255,255,.16)'
                }}
              >
                {demoMap.map(d => <option key={d.label} value={d.label}>{d.label}</option>)}
              </select>

              <div className="card" style={{padding:14, background:'rgba(0,0,0,.20)'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{fontWeight:800, fontSize:18}}>Classification</div>
                  {outcome.ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                </div>
                <div style={{marginTop:10, fontSize:28, fontWeight:900, letterSpacing:'-.02em'}}>
                  {outcome.result}
                </div>
                <div className="p" style={{marginTop:6}}>
                  Stream: <span style={{color:'var(--text)'}}>{outcome.stream}</span>
                </div>
              </div>

              <div className="p">
                This is a lightweight demo UI. In production, the classifier is driven by spectroscopy + indicator logic.
              </div>
            </div>
          </div>

          <div className="grid" style={{gridTemplateRows:'auto auto', gap:18}}>
            <div className="card" style={{padding:18}}>
              <div style={{fontWeight:800, fontSize:18}}>What’s inside</div>
              <div className="p" style={{marginTop:6}}>
                Spectroscopy enhanced waste classification system (SEWCS): material characterization, indicator-based guidance, user education, and real-time data collection.
              </div>
              <div style={{marginTop:12, borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,.10)'}}>
                <img src={deviceClose} alt="Device closeup" />
              </div>
            </div>

            <div className="card" style={{padding:18}}>
              <div style={{fontWeight:800, fontSize:18}}>Designed for real behavior</div>
              <div className="p" style={{marginTop:6}}>
                Clear signage + instant feedback beats guessing. WasteWiz turns every disposal into a micro-training moment.
              </div>
              <div style={{marginTop:12, borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,.10)'}}>
                <img src={signage} alt="Mixed recycling guidance" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid" style={{gridTemplateColumns:'repeat(3, 1fr)', marginTop:18}}>
          {content.howItWorks.map(s => (
            <div key={s.step} className="card" style={{padding:18}}>
              <div className="badge">{s.step}</div>
              <div style={{fontWeight:800, fontSize:18, marginTop:12}}>{s.title}</div>
              <div className="p" style={{marginTop:6}}>{s.body}</div>
            </div>
          ))}
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
