import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { content } from '../content'

function Phase({ opacity, y, children, style = {} }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        opacity,
        y,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function ScrollStory() {
  const ref = useRef()
  const { scrollYProgress: sp } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Phase 1 — Tagline (0 → 0.18)
  const p1o = useTransform(sp, [0, 0.01, 0.13, 0.18], [1, 1, 1, 0])
  const p1y = useTransform(sp, [0.13, 0.18], ['0px', '-50px'])

  // Phase 2 — $11.4B (0.18 → 0.36)
  const p2o = useTransform(sp, [0.18, 0.24, 0.30, 0.36], [0, 1, 1, 0])
  const p2y = useTransform(sp, [0.18, 0.24, 0.30, 0.36], ['50px', '0px', '0px', '-50px'])
  const p2s = useTransform(sp, [0.18, 0.24], [0.85, 1])

  // Phase 3 — 14% (0.36 → 0.52)
  const p3o = useTransform(sp, [0.36, 0.42, 0.46, 0.52], [0, 1, 1, 0])
  const p3y = useTransform(sp, [0.36, 0.42, 0.46, 0.52], ['50px', '0px', '0px', '-50px'])
  const p3s = useTransform(sp, [0.36, 0.42], [0.85, 1])

  // Phase 4 — Solution (0.52 → 0.68)
  const p4o = useTransform(sp, [0.52, 0.58, 0.63, 0.68], [0, 1, 1, 0])
  const p4y = useTransform(sp, [0.52, 0.58, 0.63, 0.68], ['50px', '0px', '0px', '-50px'])

  // Phase 5 — 98.6% (0.68 → 0.83)
  const p5o = useTransform(sp, [0.68, 0.74, 0.79, 0.83], [0, 1, 1, 0])
  const p5y = useTransform(sp, [0.68, 0.74, 0.79, 0.83], ['50px', '0px', '0px', '-50px'])
  const p5s = useTransform(sp, [0.68, 0.74], [0.85, 1])

  // Phase 6 — CTA (0.83 → 1.0)
  const p6o = useTransform(sp, [0.83, 0.90], [0, 1])
  const p6y = useTransform(sp, [0.83, 0.90], ['50px', '0px'])

  return (
    <section
      ref={ref}
      id="top"
      style={{ height: '540vh', position: 'relative' }}
    >
      {/* Sticky viewport-height stage */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>

        {/* ── Phase 1: Brand tagline ── */}
        <Phase opacity={p1o} y={p1y}>
          <p style={{ color: 'var(--accent2)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 20px' }}>
            Introducing SEWCS
          </p>
          <h1 style={{
            fontSize: 'clamp(44px, 7.5vw, 100px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.04,
            textAlign: 'center',
            maxWidth: 900,
            margin: 0,
          }}>
            Smarter sorting.<br />
            <span style={{ color: 'var(--accent2)' }}>Cleaner recycling streams.</span>
          </h1>
          <p style={{
            color: 'var(--muted)',
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            lineHeight: 1.7,
            maxWidth: 580,
            textAlign: 'center',
            margin: '24px 0 0',
          }}>
            {content.brand.description}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn primary" href="#product">Learn About SEWCS <ArrowRight size={18} /></a>
            <a className="btn" href="#contact">Partner with us</a>
          </div>
        </Phase>

        {/* ── Phase 2: $11.4B ── */}
        <Phase opacity={p2o} y={p2y}>
          <motion.div style={{ scale: p2s, textAlign: 'center' }}>
            <p style={{ color: 'var(--accent2)', fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 12px' }}>
              Lost annually to contamination
            </p>
            <div style={{
              fontSize: 'clamp(72px, 16vw, 180px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #fff 30%, var(--accent2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              overflow: 'visible',
              display: 'inline-block',
              padding: '0 8px',
            }}>
              $11.4B
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 18, marginTop: 16 }}>
              in recyclable material value — every year.
            </p>
          </motion.div>
        </Phase>

        {/* ── Phase 3: 14% ── */}
        <Phase opacity={p3o} y={p3y}>
          <motion.div style={{ scale: p3s, textAlign: 'center' }}>
            <p style={{ color: 'var(--accent2)', fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 12px' }}>
              Only
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{
                fontSize: 'clamp(72px, 16vw, 180px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #fff 30%, var(--accent2) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}>
                14
              </div>
              <div style={{
                fontSize: 'clamp(36px, 7vw, 80px)',
                fontWeight: 900,
                color: 'var(--accent2)',
                marginTop: '0.15em',
              }}>
                %
              </div>
            </div>
             <p style={{ color: 'var(--muted)', fontSize: 18, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
               Of plastic packaging is actually recycled
             </p>
             <p style={{ color: 'var(--muted)', fontSize: 18, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
               The rest is contaminated or sent straight to landfill.
             </p>
          </motion.div>
        </Phase>

        {/* ── Phase 4: Solution statement ── */}
        <Phase opacity={p4o} y={p4y}>
          <p style={{ color: 'var(--accent2)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 20px' }}>
            The fix
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            textAlign: 'center',
            maxWidth: 800,
            margin: 0,
          }}>
            Identify the material.<br />
            At the bin.<br />
            <span style={{ color: 'var(--accent2)' }}>Before it becomes waste.</span>
          </h2>
          <p style={{
            color: 'var(--muted)',
            fontSize: 'clamp(15px, 1.6vw, 18px)',
            lineHeight: 1.7,
            maxWidth: 540,
            textAlign: 'center',
            margin: '24px 0 0',
          }}>
            SEWCS uses spectroscopy to classify material composition at the point of disposal — educating users in real time and eliminating contamination at the source.
          </p>
        </Phase>

        {/* ── Phase 5: 98.6% accuracy ── */}
        <Phase opacity={p5o} y={p5y}>
          <motion.div style={{ scale: p5s, textAlign: 'center' }}>
            <p style={{ color: 'var(--accent2)', fontSize: 15, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 12px' }}>
              Projected classification accuracy
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{
                fontSize: 'clamp(64px, 14vw, 160px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 60%, #fff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                98.6
              </div>
              <div style={{
                fontSize: 'clamp(32px, 6vw, 72px)',
                fontWeight: 900,
                color: 'var(--accent)',
                marginTop: '0.12em',
              }}>
                %
              </div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 18, marginTop: 16 }}>
              Spectroscopy-driven. Real time. Zero guesswork.
            </p>
          </motion.div>
        </Phase>

        {/* ── Phase 6: CTA ── */}
        <Phase opacity={p6o} y={p6y}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            textAlign: 'center',
            maxWidth: 700,
            margin: 0,
          }}>
            Ready to fix how<br />
            <span style={{ color: 'var(--accent2)' }}>the world sorts waste?</span>
          </h2>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn primary" href="#product">Learn About SEWCS <ArrowRight size={18} /></a>
            <a className="btn" href="#contact">Partner with us</a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
            marginTop: 48,
            maxWidth: 640,
            width: '100%',
          }}>
            {content.stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>
                  {s.value}{s.suffix && <span style={{ color: 'var(--muted)', fontSize: 14, marginLeft: 3 }}>{s.suffix}</span>}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Phase>

        {/* Scroll hint — fades out quickly */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: useTransform(sp, [0, 0.06], [1, 0]),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: 'var(--muted)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--muted), transparent)',
          }} />
        </motion.div>

        <style>{`
          @media (max-width: 640px) {
            [data-phase] h1, [data-phase] h2 { font-size: 36px !important; }
            [data-phase] .stat-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
