import { useState } from 'react'
import SectionHeading from './SectionHeading'
import rocket from '../assets/ppt/image60.png'

export default function Contact() {
  const [status, setStatus] = useState(null)

  function onSubmit(e){
    e.preventDefault()
    setStatus('Thanks! (Demo form) Swap this for your email / CRM integration.')
  }

  return (
    <section id="contact" className="section" style={{paddingBottom:96}}>
      <div className="container">
        <div className="card" style={{padding:22, overflow:'hidden', position:'relative'}}>
          <div style={{
            position:'absolute', inset:0,
            background:'radial-gradient(700px 300px at 10% 0%, rgba(96,242,164,.18), transparent 60%), radial-gradient(900px 300px at 80% 20%, rgba(76,203,255,.14), transparent 60%)'
          }} />
          <div style={{position:'relative'}}>
            <SectionHeading
              kicker="The ask"
              title="Pilot with us."
              description="Get a fast estimate for your site (restaurants, campuses, hotels, venues) and start reducing contamination with point-of-disposal classification."
            />

            <div className="grid" style={{gridTemplateColumns:'1.1fr .9fr', gap:18, marginTop:18}}>
              <form onSubmit={onSubmit} className="card" style={{padding:16, background:'rgba(0,0,0,.20)'}}>
                <div style={{display:'grid', gap:10}}>
                  <input required placeholder="Name" style={inputStyle} />
                  <input required type="email" placeholder="Email" style={inputStyle} />
                  <input placeholder="Organization" style={inputStyle} />
                  <textarea rows={4} placeholder="What are you trying to improve? (contamination, training, costs...)" style={{...inputStyle, resize:'vertical'}} />
                  <button className="btn primary" type="submit">Send</button>
                  {status && <div style={{color:'var(--muted)', fontSize:13}}>{status}</div>}
                </div>
              </form>

              <div className="card" style={{padding:18, background:'rgba(0,0,0,.20)'}}>
                <div style={{display:'flex', alignItems:'center', gap:10}}>
                  <img src={rocket} alt="" style={{height:26, width:'auto', opacity:.9}} />
                  <div style={{fontWeight:900, fontSize:18}}>What you get</div>
                </div>
                <ul style={{margin:'12px 0 0', paddingLeft:18, color:'var(--muted)', lineHeight:1.7}}>
                  <li>On-site bin + signage fit recommendations</li>
                  <li>Pilot pricing estimate</li>
                  <li>Suggested KPI plan (contamination %, diversion, fees)</li>
                  <li>Timeline to deploy a small test-bed</li>
                </ul>
                <div className="hr" style={{margin:'16px 0'}} />
                <div style={{color:'var(--muted)', fontSize:13}}>
                  Replace this form with a mailto link or API integration when you’re ready.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop:18, color:'var(--muted)', fontSize:13, textAlign:'center'}}>
          © {new Date().getFullYear()} WasteWiz. All rights reserved.
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

const inputStyle = {
  width: '100%',
  padding: '12px 12px',
  borderRadius: 12,
  background: 'rgba(0,0,0,.25)',
  color: 'var(--text)',
  border: '1px solid rgba(255,255,255,.16)',
  outline: 'none',
}
