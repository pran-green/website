import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COUNT = 4500

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t)
}

function buildChapters() {
  // Ch 0 — Peaceful scatter (behind hero / story section)
  const c0 = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    c0[i*3]   = (Math.random() - 0.5) * 28
    c0[i*3+1] = (Math.random() - 0.5) * 16
    c0[i*3+2] = (Math.random() - 0.5) * 7
  }

  // Ch 1 — Messy contaminated blobs (Problem section)
  const c1 = new Float32Array(COUNT * 3)
  const BX = [-7, -1, 4, 9], BY = [2, -4, 1, -2]
  for (let i = 0; i < COUNT; i++) {
    const b = i % 4
    c1[i*3]   = BX[b] + (Math.random() - 0.5) * 9
    c1[i*3+1] = BY[b] + (Math.random() - 0.5) * 9
    c1[i*3+2] = (Math.random() - 0.5) * 4
  }

  // Ch 2 — Flat convergence band (Solution section — being scanned)
  const c2 = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    c2[i*3]   = (Math.random() - 0.5) * 24
    c2[i*3+1] = (Math.random() - 0.5) * 1.4
    c2[i*3+2] = (Math.random() - 0.5) * 1.2
  }

  // Ch 3 — Globe / constellation (Impact + Team + Contact)
  const c3 = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const r     = 5.2 + (Math.random() - 0.5) * 1.6
    c3[i*3]   = r * Math.sin(phi) * Math.cos(theta)
    c3[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.52
    c3[i*3+2] = r * Math.cos(phi) * 0.36
  }

  return [c0, c1, c2, c3]
}

function Particles() {
  const ref       = useRef()
  const scrollPct = useRef(0)

  const chapters  = useMemo(() => buildChapters(), [])
  const positions = useMemo(() => new Float32Array(chapters[0]), [chapters])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollPct.current = max > 0 ? Math.min(window.scrollY / max, 1) : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t   = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array
    const sp  = scrollPct.current

    // Direct scroll-to-position mapping — scroll = animation frame
    const N     = chapters.length - 1
    const raw   = Math.min(sp * N, N - 0.0001)
    const chIdx = Math.floor(raw)
    const chT   = easeInOut(raw - chIdx)
    const chA   = chapters[chIdx]
    const chB   = chapters[chIdx + 1]

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      pos[i3]   = chA[i3]   + (chB[i3]   - chA[i3])   * chT
      pos[i3+1] = chA[i3+1] + (chB[i3+1] - chA[i3+1]) * chT
      pos[i3+2] = chA[i3+2] + (chB[i3+2] - chA[i3+2]) * chT

      // Tiny organic drift only while in the peaceful hero state
      if (sp < 0.15) {
        const alive = 1 - sp / 0.15
        pos[i3+1] += Math.sin(t * 0.26 + i * 0.61) * 0.005 * alive
        pos[i3]   += Math.cos(t * 0.18 + i * 0.39) * 0.003 * alive
      }

    }

    ref.current.geometry.attributes.position.needsUpdate = true

    // Opacity + size shift to match each chapter's mood
    const mat = ref.current.material
    if (chIdx === 0) {
      mat.opacity = 0.55
      mat.size    = 0.046
    } else if (chIdx === 1) {
      mat.opacity = 0.42 + chT * 0.18
      mat.size    = 0.036
    } else if (chIdx === 2) {
      mat.opacity = 0.60 + chT * 0.10
      mat.size    = 0.042 + chT * 0.010
    } else {
      mat.opacity = 0.52
      mat.size    = 0.050
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.046}
        color="#6DC876"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      camera={{ position: [0, 0, 11], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
    >
      <Particles />
    </Canvas>
  )
}
