import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { content } from '../content'
import deviceClose from '../assets/ppt/image28.png'

export default function Solution() {
  const ref = useRef()
  const { scrollYProgress: sp } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Device: rotates in from a side angle, scales up
  const rotateY   = useTransform(sp, [0, 0.38], [28, 0])
  const scale     = useTransform(sp, [0, 0.28], [0.82, 1])
  const devOp     = useTransform(sp, [0, 0.18], [0, 1])

  // Steps appear one by one alongside the device
  const s1Op = useTransform(sp, [0.12, 0.26], [0, 1])
  const s1Y  = useTransform(sp, [0.12, 0.26], ['22px', '0px'])
  const s2Op = useTransform(sp, [0.24, 0.38], [0, 1])
  const s2Y  = useTransform(sp, [0.24, 0.38], ['22px', '0px'])
  const s3Op = useTransform(sp, [0.36, 0.50], [0, 1])
  const s3Y  = useTransform(sp, [0.36, 0.50], ['22px', '0px'])

  const stepOpacities = [s1Op, s2Op, s3Op]
  const stepYs        = [s1Y,  s2Y,  s3Y]

  // Description appears after the steps settle
  const descOp = useTransform(sp, [0.64, 0.82], [0, 1])
  const descY  = useTransform(sp, [0.64, 0.82], ['28px', '0px'])

  return (
    <section ref={ref} id="solution" style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div className="container" style={{ width: '100%' }}>

          {/* Kicker */}
          <div className="kicker" style={{ marginBottom: 32 }}>Our solution</div>

          {/* Device + Steps row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}>

            {/* 3D device */}
            <div style={{ perspective: '900px' }}>
              <motion.div style={{
                rotateY,
                scale,
                opacity: devOp,
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid rgba(82,176,90,.20)',
                boxShadow: '0 0 80px rgba(82,176,90,.14), 0 28px 64px rgba(0,0,0,.55)',
                transformStyle: 'preserve-3d',
              }}>
                <img src={deviceClose} alt="SEWCS device" style={{ display: 'block', width: '100%' }} />
              </motion.div>
            </div>

            {/* Steps */}
            <div style={{ display: 'grid', gap: 28 }}>
              {content.howItWorks.map((step, i) => (
                <motion.div key={step.step} style={{ opacity: stepOpacities[i], y: stepYs[i] }}>
                  <div className="badge" style={{ marginBottom: 10 }}>{step.step}</div>
                  <div style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.25 }}>{step.title}</div>
                  <div className="p" style={{ marginTop: 6 }}>{step.body}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Description — appears on further scroll */}
          <motion.p style={{
            opacity: descOp,
            y: descY,
            marginTop: 40,
            fontSize: 17,
            lineHeight: 1.75,
            color: 'var(--muted)',
            maxWidth: 760,
            margin: '40px 0 0',
          }}>
            Spectroscopy enhanced waste classification system (SEWCS): material characterization,
            indicator-based guidance, user education, and real-time data collection.
          </motion.p>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #solution [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
