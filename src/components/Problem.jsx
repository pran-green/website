import { motion } from 'framer-motion'
import { content } from '../content'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-80px' },
  transition: { duration: 0.65, delay, ease },
})

export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="container">

        {/* Heading */}
        <motion.div {...fadeUp(0)}>
          <div className="kicker">Stark reality</div>
          <div className="h2">Contamination is the bottleneck.</div>
          <div className="p">
            When recyclables are mixed or mis-sorted, they get landfilled and organizations pay the price.
          </div>
        </motion.div>

        {/* Problem cards — staggered */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 22 }}>
          {content.problem.map((p, i) => (
            <motion.div key={p.title} style={{ padding: 18 }} {...fadeUp(0.1 + i * 0.08)}>
              <div style={{ fontWeight: 750, fontSize: 18 }}>{p.title}</div>
              <div className="p" style={{ marginTop: 6 }}>{p.body}</div>
            </motion.div>
          ))}
        </div>

        {/* Why it matters */}
        <motion.div
          style={{ marginTop: 18, padding: 18 }}
          {...fadeUp(0.35)}
        >
          <div style={{ fontWeight: 750, fontSize: 18 }}>Why it matters</div>
          <div className="p" style={{ marginTop: 6 }}>
            Mixed recycling programs often operate around contamination thresholds; going above them triggers extra fees and more landfill diversion.
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 860px){
          .grid{grid-template-columns:1fr !important}
          .card[style*="grid-template-columns"]{grid-template-columns:1fr !important}
          .card[style*="borderLeft"]{border-left:none !important; padding-left:0 !important}
        }
      `}</style>
    </section>
  )
}
