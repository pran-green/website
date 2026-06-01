import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { content } from '../content'

import westin   from '../assets/ppt/image24.png'
import berkeley from '../assets/ppt/image37.png'
import blueman  from '../assets/ppt/image40.png'

const CASES = [
  { ...content.caseStudies[2], img: blueman  },
  { ...content.caseStudies[0], img: westin   },
  { ...content.caseStudies[1], img: berkeley },
]

const ease = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
  exit:   { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.60, ease } },
  exit:   { opacity: 0, y: -14, transition: { duration: 0.30, ease } },
}

const stat = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1,    transition: { duration: 0.60, ease } },
  exit:   { opacity: 0, scale: 0.96, transition: { duration: 0.30 } },
}

export default function Impact() {
  const [active, setActive] = useState(0)
  const data   = CASES[active]
  const isLast = active === CASES.length - 1

  return (
    <section id="impact">

      {/* Section intro */}
      <motion.div
        className="container section"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.65, ease }}
      >
        <div className="kicker">Impact</div>
        <div className="h2">Proof it works — and a market that's ready.</div>
        <div className="p">
          From hospitality to campuses and venues, organisations have shown real savings when waste streams are clean.
        </div>
      </motion.div>

      {/* Full-screen case study — fixed height, no sticky */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        {/* Background crossfades between cases */}
        <AnimatePresence>
          <motion.div
            key={`bg-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${data.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>

        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,6,6,.72) 0%, rgba(6,6,6,.58) 50%, rgba(6,6,6,.80) 100%)',
          zIndex: 1,
        }} />

        {/* Case content — exits and enters on active change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-60px' }}
            exit="exit"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 clamp(24px, 8vw, 140px)',
            }}
          >
            <motion.p variants={item} style={{
              color: 'var(--accent2)', fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              fontWeight: 700, margin: '0 0 18px',
            }}>
              Case study {active + 1} of {CASES.length}
            </motion.p>

            <motion.h2 variants={item} style={{
              fontSize: 'clamp(28px, 4.5vw, 58px)',
              fontWeight: 800, letterSpacing: '-0.03em',
              lineHeight: 1.1, margin: 0,
            }}>
              {data.title}
            </motion.h2>

            <motion.div variants={stat} style={{ marginTop: 22 }}>
              <div style={{
                fontSize: 'clamp(44px, 8vw, 96px)',
                fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
                background: 'linear-gradient(135deg, #fff 25%, var(--accent2) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {data.highlight}
              </div>
            </motion.div>

            {data.details.map(d => (
              <motion.p key={d} variants={item} style={{
                margin: '10px 0 0', fontSize: 17,
                color: 'rgba(255,255,255,.75)', lineHeight: 1.65, maxWidth: 560,
              }}>
                {d}
              </motion.p>
            ))}

            <motion.div variants={item} style={{ marginTop: 40 }}>
              {isLast ? (
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>
                  Scroll down to continue
                </p>
              ) : (
                <button className="btn primary" onClick={() => setActive(a => a + 1)}>
                  Next case study <ArrowRight size={17} />
                </button>
              )}
            </motion.div>

            {/* Progress dots — also clickable */}
            <div style={{ position: 'absolute', bottom: 36, display: 'flex', gap: 8 }}>
              {CASES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    height: 6, width: i === active ? 22 : 6,
                    borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0,
                    background: i === active ? 'var(--accent2)' : 'rgba(255,255,255,.22)',
                    transition: 'width .3s ease, background .3s ease',
                  }}
                />
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
