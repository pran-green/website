import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { content } from '../content'

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t)
}

// ─── Device built from Three.js primitives ────────────────────────────────────
function SEWCSDevice({ scrollRef }) {
  const group = useRef()

  useFrame(({ clock }) => {
    if (!group.current) return
    const sp = scrollRef.current
    const t  = easeInOut(Math.min(sp / 0.38, 1))

    // Vertical rotation: scroll tilts the device forward, revealing sensor face
    group.current.rotation.x = 0.65 - t * 0.50
    // Fixed Y angle keeps the 3/4 side view throughout
    group.current.rotation.y = -0.42
    // Gentle float
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.9) * 0.025
  })

  // Device dimensions (half-extents) — scaled up to fill canvas
  const BW = 0.95, BH = 0.22, BD = 0.55

  // Dome position
  const DX = -0.40, DZ = 0.0, DR = 0.14

  // LED positions
  const G_LED = [0.22, BH + 0.008, 0]
  const R_LED = [0.46, BH + 0.008, 0]

  const FOOT_POS = [
    [-BW + 0.10, -BH - 0.018,  -BD + 0.10],
    [ BW - 0.10, -BH - 0.018,  -BD + 0.10],
    [-BW + 0.10, -BH - 0.018,   BD - 0.10],
    [ BW - 0.10, -BH - 0.018,   BD - 0.10],
  ]

  return (
    <group ref={group}>

      {/* ── Body — rounded edges ── */}
      <RoundedBox
        args={[BW * 2, BH * 2, BD * 2]}
        radius={0.045}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#4a4f4a" roughness={0.55} metalness={0.30} />
      </RoundedBox>

      {/* Top face panel — slightly lighter */}
      <mesh position={[0, BH + 0.0005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BW * 2, BD * 2]} />
        <meshStandardMaterial color="#555e55" roughness={0.45} metalness={0.25} />
      </mesh>

      {/* Subtle grid texture lines on top */}
      {[-0.1, 0.0, 0.1].map((z, i) => (
        <mesh key={i} position={[0, BH + 0.001, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[BW * 2, 0.003]} />
          <meshStandardMaterial color="#404840" roughness={1} />
        </mesh>
      ))}

      {/* ── Dome recess (dark ring) ── */}
      <mesh position={[DX, BH + 0.001, DZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[DR * 1.18, 48]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
      </mesh>

      {/* ── Dome lens ── */}
      <mesh position={[DX, BH + 0.004, DZ]} castShadow>
        {/* Half-sphere: thetaStart=0, thetaLength=PI/2 */}
        <sphereGeometry args={[DR, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#223322"
          roughness={0.08}
          metalness={0.05}
          transmission={0.35}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.9}
        />
      </mesh>

      {/* Dome outer ring */}
      <mesh position={[DX, BH + 0.003, DZ]}>
        <torusGeometry args={[DR * 1.04, 0.007, 16, 64]} />
        <meshStandardMaterial color="#2d4a35" roughness={0.4} metalness={0.6} emissive="#0a1a0e" />
      </mesh>

      {/* ── Green LED ── */}
      <mesh position={G_LED} castShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.013, 32]} />
        <meshStandardMaterial
          color="#00dd44"
          emissive="#00cc33"
          emissiveIntensity={3.0}
          roughness={0.15}
          metalness={0.0}
        />
      </mesh>
      {/* Green LED glow */}
      <pointLight
        position={[G_LED[0], G_LED[1] + 0.05, G_LED[2]]}
        intensity={1.2} color="#00ee44" distance={0.9} decay={2}
      />

      {/* ── Red LED ── */}
      <mesh position={R_LED} castShadow>
        <cylinderGeometry args={[0.028, 0.028, 0.013, 32]} />
        <meshStandardMaterial
          color="#dd2200"
          emissive="#bb1100"
          emissiveIntensity={2.0}
          roughness={0.15}
          metalness={0.0}
        />
      </mesh>

      {/* ── USB port (right front face) ── */}
      <mesh position={[BW - 0.002, -0.03, 0.22]}>
        <boxGeometry args={[0.014, 0.075, 0.130]} />
        <meshStandardMaterial color="#2a2e2a" roughness={0.9} />
      </mesh>
      <mesh position={[BW + 0.001, -0.03, 0.22]}>
        <boxGeometry args={[0.010, 0.052, 0.100]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} />
      </mesh>

      {/* ── Rubber feet ── */}
      {FOOT_POS.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <cylinderGeometry args={[0.032, 0.032, 0.016, 16]} />
          <meshStandardMaterial color="#2e2e2e" roughness={0.95} />
        </mesh>
      ))}

      {/* ── PRAN label on front face ── */}
      <mesh position={[-0.10, 0.0, BD + 0.001]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.26, 0.055]} />
        <meshStandardMaterial color="#3a6a44" roughness={0.8} emissive="#1a3020" emissiveIntensity={0.5} />
      </mesh>

    </group>
  )
}

// ─── Scene lights ──────────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} color="#e0e8e0" />
      {/* Key light — upper left */}
      <directionalLight position={[-3, 5, 4]} intensity={1.4} color="#ffffff" castShadow />
      {/* Fill light — right */}
      <directionalLight position={[4, 2, -2]} intensity={0.5} color="#c8d8c8" />
      {/* Rim light — behind for depth */}
      <directionalLight position={[0, -2, -4]} intensity={0.3} color="#405040" />
    </>
  )
}

// ─── Solution section ──────────────────────────────────────────────────────────
export default function Solution() {
  const ref       = useRef()
  const scrollRef = useRef(0)

  const { scrollYProgress: sp } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useEffect(() => sp.on('change', v => { scrollRef.current = v }), [sp])

  const devOp  = useTransform(sp, [0, 0.18], [0, 1])

  const s1Op = useTransform(sp, [0.12, 0.26], [0, 1])
  const s1Y  = useTransform(sp, [0.12, 0.26], ['22px', '0px'])
  const s2Op = useTransform(sp, [0.24, 0.38], [0, 1])
  const s2Y  = useTransform(sp, [0.24, 0.38], ['22px', '0px'])
  const s3Op = useTransform(sp, [0.36, 0.50], [0, 1])
  const s3Y  = useTransform(sp, [0.36, 0.50], ['22px', '0px'])

  const stepOpacities = [s1Op, s2Op, s3Op]
  const stepYs        = [s1Y,  s2Y,  s3Y]

  const descOp = useTransform(sp, [0.64, 0.82], [0, 1])
  const descY  = useTransform(sp, [0.64, 0.82], ['28px', '0px'])

  return (
    <section ref={ref} id="solution" style={{ height: '300vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div className="container" style={{ width: '100%' }}>

          <div className="kicker" style={{ marginBottom: 32 }}>Our solution</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>

            {/* 3D device canvas */}
            <motion.div style={{ opacity: devOp }} className="solution-canvas-wrap">
              <Canvas
                camera={{ position: [0.3, 2.2, 4.2], fov: 38 }}
                gl={{ antialias: true, alpha: true }}
                dpr={Math.min(window.devicePixelRatio, 2)}
                style={{ background: 'transparent', width: '100%', height: '100%' }}
              >
                <Lights />
                <SEWCSDevice scrollRef={scrollRef} />
              </Canvas>
            </motion.div>

            {/* Steps */}
            <div style={{ display: 'grid', gap: 28 }} className="solution-steps">
              {content.howItWorks.map((step, i) => (
                <motion.div key={step.step} style={{ opacity: stepOpacities[i], y: stepYs[i] }}>
                  <div className="badge" style={{ marginBottom: 10 }}>{step.step}</div>
                  <div style={{ fontWeight: 800, fontSize: 20, lineHeight: 1.25 }}>{step.title}</div>
                  <div className="p" style={{ marginTop: 6 }}>{step.body}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Description */}
          <motion.p style={{
            opacity: descOp, y: descY,
            margin: '40px 0 0', fontSize: 17, lineHeight: 1.75,
            color: 'var(--muted)', maxWidth: 760,
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
