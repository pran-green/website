import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { content } from '../content'
import StatsCounter from './StatCounter'

export default function Hero() {
  return (
    <section id="top" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0,
        background: `
          radial-gradient(900px 600px at 15% 50%, rgba(82,176,90,.13), transparent 60%),
          radial-gradient(600px 500px at 80% 20%, rgba(82,176,90,.07), transparent 55%),
          radial-gradient(400px 300px at 60% 80%, rgba(109,200,118,.05), transparent 55%)
        `,
      }} />
      <div className="container" style={{ position: 'relative', padding: '40px 20px', marginTop: '-80px' }}>
        <motion.h1
          initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55}}
          className="h1"
          style={{ maxWidth: 820 }}
        >
          {content.brand.tagline}
        </motion.h1>

        <motion.p
          initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.1}}
          className="hero-desc"
          style={{ maxWidth: 660, fontSize: 19, marginTop: 20 }}
        >
          {content.brand.description}
        </motion.p>

        <motion.div
          initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.2}}
          className="hero-ctas mt-2"
        >
          <a className="btn primary" href="#product">Learn About SEWCS <ArrowRight size={18} /></a>
          <a className="btn" href="#contact">Partner with us</a>
        </motion.div>

        <motion.div
          initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.55, delay:.3}}
          className="grid grid-cols-3 mt-3"
          style={{ maxWidth: 680 }}
        >
          {content.stats.map((s) => (
            <div key={s.label} className="card">
              <div className="stat-number">
                <StatsCounter value={s.value} />{s.suffix ? <span className="muted-small ml-1">{s.suffix}</span> : null}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px){
          .h1{font-size:38px !important}
          .grid-cols-3{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  )
}
