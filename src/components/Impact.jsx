import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { content } from '../content'

import westin  from '../assets/ppt/image24.png'
import berkeley from '../assets/ppt/image37.png'
import blueman  from '../assets/ppt/image40.png'

// Blue Man Group featured first (as requested)
const CASES = [
  { ...content.caseStudies[2], img: blueman  },
  { ...content.caseStudies[0], img: westin   },
  { ...content.caseStudies[1], img: berkeley },
]

function CaseSection({ data, index, total }) {
  const ref    = useRef()
  const isLast = index === total - 1
  const nextId = `impact-case-${index + 1}`

  const { scrollYProgress: sp } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Background fades in immediately
  const bgOp = useTransform(sp, [0, 0.10], [0, 1])

  // Kicker
  const kickOp = useTransform(sp, [0.05, 0.18], [0, 1])
  const kickY  = useTransform(sp, [0.05, 0.18], ['20px', '0px'])

  // Title
  const titleOp = useTransform(sp, [0.14, 0.28], [0, 1])
  const titleY  = useTransform(sp, [0.14, 0.28], ['28px', '0px'])

  // Highlight stat (zooms in like the story phase numbers)
  const hlOp    = useTransform(sp, [0.28, 0.42], [0, 1])
  const hlScale = useTransform(sp, [0.28, 0.42], [0.86, 1])

  // Details
  const d1Op = useTransform(sp, [0.44, 0.56], [0, 1])
  const d1Y  = useTransform(sp, [0.44, 0.56], ['20px', '0px'])
  const d2Op = useTransform(sp, [0.56, 0.68], [0, 1])
  const d2Y  = useTransform(sp, [0.56, 0.68], ['20px', '0px'])

  // Next button
  const btnOp = useTransform(sp, [0.78, 0.90], [0, 1])
  const btnY  = useTransform(sp, [0.78, 0.90], ['18px', '0px'])

  const detailOpacities = [d1Op, d2Op]
  const detailYs        = [d1Y,  d2Y]

  return (
    <div
      ref={ref}
      id={`impact-case-${index}`}
      style={{ height: '300vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>

        {/* Case image — full screen */}
        <motion.div style={{
          position: 'absolute',
          inset: 0,
          opacity: bgOp,
          backgroundImage: `url(${data.img})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#060606',
        }} />

        {/* Dark gradient overlay — keeps text legible */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom, rgba(6,6,6,.72) 0%, rgba(6,6,6,.60) 50%, rgba(6,6,6,.80) 100%)
          `,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 clamp(24px, 8vw, 140px)',
        }}>

          {/* Kicker */}
          <motion.p style={{
            opacity: kickOp,
            y: kickY,
            color: 'var(--accent2)',
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 700,
            margin: '0 0 18px',
          }}>
            Case study {index + 1} of {total}
          </motion.p>

          {/* Organisation name */}
          <motion.h2 style={{
            opacity: titleOp,
            y: titleY,
            fontSize: 'clamp(28px, 4.5vw, 58px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: 0,
          }}>
            {data.title}
          </motion.h2>

          {/* Highlight stat */}
          <motion.div style={{ opacity: hlOp, scale: hlScale, marginTop: 22 }}>
            <div style={{
              fontSize: 'clamp(44px, 8vw, 96px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #fff 25%, var(--accent2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {data.highlight}
            </div>
          </motion.div>

          {/* Detail lines */}
          <div style={{ marginTop: 28, display: 'grid', gap: 12, maxWidth: 560, width: '100%' }}>
            {data.details.map((d, i) => (
              <motion.p key={d} style={{
                opacity: detailOpacities[i],
                y: detailYs[i],
                margin: 0,
                fontSize: 17,
                color: 'rgba(255,255,255,.75)',
                lineHeight: 1.65,
              }}>
                {d}
              </motion.p>
            ))}
          </div>

          {/* Next case button */}
          {!isLast && (
            <motion.div style={{ opacity: btnOp, y: btnY, marginTop: 42 }}>
              <button
                className="btn primary"
                onClick={() => document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' })}
              >
                Next case study <ArrowRight size={17} />
              </button>
            </motion.div>
          )}

          {/* Progress dots */}
          <motion.div style={{
            opacity: kickOp,
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}>
            {CASES.map((_, i) => (
              <div key={i} style={{
                height: 6,
                width: i === index ? 22 : 6,
                borderRadius: 999,
                background: i === index ? 'var(--accent2)' : 'rgba(255,255,255,.22)',
                transition: 'width .3s ease',
              }} />
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default function Impact() {
  return (
    <section id="impact">

      {/* Section intro — consistent with Problem style */}
      <motion.div
        className="container section"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="kicker">Impact</div>
        <div className="h2">Proof it works — and a market that's ready.</div>
        <div className="p">
          From hospitality to campuses and venues, organisations have shown real savings when waste streams are clean.
        </div>
      </motion.div>

      {/* Full-screen case study sections */}
      {CASES.map((c, i) => (
        <CaseSection key={c.title} data={c} index={i} total={CASES.length} />
      ))}

    </section>
  )
}
