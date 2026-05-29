import { useState } from 'react'
import SectionHeading from './SectionHeading'
import rocket from '../assets/ppt/image60.png'

export default function Contact() {
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', organization: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" style={{paddingBottom:96}}>
      <div className="container">
        <div className="card" style={{padding:22, overflow:'hidden', position:'relative'}}>
          <div style={{
            position:'absolute', inset:0,
            background:'radial-gradient(700px 300px at 10% 0%, rgba(82,176,90,.18), transparent 60%), radial-gradient(900px 300px at 80% 20%, rgba(109,200,118,.10), transparent 60%)'
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
                  <input required name="name" value={form.name} onChange={onChange} placeholder="Name" style={inputStyle} />
                  <input required name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" style={inputStyle} />
                  <input name="organization" value={form.organization} onChange={onChange} placeholder="Organization" style={inputStyle} />
                  <textarea name="message" rows={4} value={form.message} onChange={onChange} placeholder="What are you trying to improve? (contamination, training, costs...)" style={{...inputStyle, resize:'vertical'}} />
                  <button className="btn primary" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send'}
                  </button>
                  {status === 'success' && <div style={{color:'var(--accent)', fontSize:13}}>Message sent! We'll be in touch soon.</div>}
                  {status === 'error' && <div style={{color:'#f87171', fontSize:13}}>Something went wrong. Please try again.</div>}
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
              </div>
            </div>
          </div>
        </div>

        <div style={{marginTop:18, color:'var(--muted)', fontSize:13, textAlign:'center'}}>
          © {new Date().getFullYear()} Pran. All rights reserved.
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
