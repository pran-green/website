import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { content } from '../content'
import StatCounter from './StatCounter'

import heroBg from '../assets/ppt/image55.png'
import deviceImg from '../assets/ppt/image29.png'

export default function Hero() {
  return (
    <section id="top" style={{position:'relative', overflow:'hidden'}}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage: `linear-gradient(180deg, rgba(7,10,15,.55), rgba(7,10,15,.92)), url(${heroBg})`,
        backgroundSize:'cover', backgroundPosition:'center',
        filter:'saturate(1.05)',
      }} />
      <div className="container" style={{position:'relative', padding:'86px 20px 54px'}}>
        <div className="badge"><Sparkles size={16}/> Spectroscopy Enhanced Waste Classification System</div>

        <div className="grid" style={{gridTemplateColumns:'1.15fr .85fr', alignItems:'center', marginTop:18}}>
          <div>
            <motion.h1
              initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55}}
              style={{fontSize:52, lineHeight:1.02, margin:'14px 0 12px', letterSpacing:'-.02em'}}
            >
              {content.brand.tagline}
            </motion.h1>

            <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.1}}
              style={{color:'var(--muted)', fontSize:18, lineHeight:1.6, maxWidth: 620}}
            >
              {content.brand.description}
            </motion.p>

            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.2}}
              style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:18}}
            >
              <a className="btn primary" href="#solution">See how it works <ArrowRight size={18} /></a>
              <a className="btn" href="#contact">Partner with us</a>
            </motion.div>

            <div className="grid" style={{gridTemplateColumns:'repeat(3, 1fr)', gap:12, marginTop:26}}>
              {content.stats.map((s) => (
                <div key={s.label} className="card" style={{padding:14}}>
                  <div style={{fontSize:24, fontWeight:750}}>
                    <StatCounter value={s.value} />{s.suffix ? <span style={{fontSize:14, color:'var(--muted)', marginLeft:6}}>{s.suffix}</span> : null}
                  </div>
                  <div style={{color:'var(--muted)', fontSize:13, marginTop:6}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.15}}
            className="card"
            style={{padding:18, background:'rgba(12,18,32,.55)'}}
          >
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontWeight:700}}>Product preview</div>
              <div className="badge" style={{padding:'6px 10px'}}>Standalone • Integrated</div>
            </div>
            <div style={{marginTop:12, borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,.10)'}}>
              <img src={deviceImg} alt="WasteWiz unit mockup" style={{width:'100%', background:'rgba(0,0,0,.35)'}}/>
            </div>
            <div style={{marginTop:12, color:'var(--muted)', fontSize:14, lineHeight:1.6}}>
              Drop-in unit for existing bins or a fully integrated bin upgrade.
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px){
          h1{font-size:40px !important}
          .grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  )
}
