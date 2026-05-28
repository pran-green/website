import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import StatsCounter from './StatCounter'

import deviceImg from '../assets/ppt/image29.png'

export default function Hero() {
  return (
    <section id="top" className="section hero">
      <div style={{
        position:'absolute', inset:0,
        background: `
          radial-gradient(900px 600px at 15% 50%, rgba(82,176,90,.13), transparent 60%),
          radial-gradient(600px 500px at 80% 20%, rgba(82,176,90,.07), transparent 55%),
          radial-gradient(400px 300px at 60% 80%, rgba(109,200,118,.05), transparent 55%)
        `,
      }} />
      <div className="container hero-inner">
        <div className="grid grid-hero">
          <div>
            <motion.h1
              initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55}}
              className="h1"
            >
              {content.brand.tagline}
            </motion.h1>

            <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.1}}
              className="hero-desc"
            >
              {content.brand.description}
            </motion.p>

            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.2}}
              className="hero-ctas mt-2"
            >
              <a className="btn primary" href="#product">Learn About SEWCS <ArrowRight size={18} /></a>
              <a className="btn" href="#contact">Partner with us</a>
            </motion.div>

            <div className="grid grid-cols-3 mt-3">
              {content.stats.map((s) => (
                <div key={s.label} className="card">
                  <div className="stat-number">
                    <StatsCounter value={s.value} />{s.suffix ? <span className="muted-small ml-1">{s.suffix}</span> : null}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.15}}
            className="card panel-dark"
          >
            <div className="space-between">
              <div className="card-title">Product preview</div>
              <div className="badge">Standalone • Integrated</div>
            </div>
            <div className="card-media">
              <img src={deviceImg} alt="Pran unit mockup" className="device-img"/>
            </div>
            <div className="muted-note">
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
