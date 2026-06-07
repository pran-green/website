import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

// ─── Miniature SEWCS device (mounted on bin) ──────────────────────────────────
function SEWCSMini() {
  const BW = 0.17, BH = 0.048, BD = 0.115
  const DX  = -0.068, DR = 0.028
  const G   = [0.058,  BH + 0.004, 0]
  const R   = [0.108,  BH + 0.004, 0]

  return (
    <group>
      <RoundedBox args={[BW*2, BH*2, BD*2]} radius={0.010} smoothness={4} castShadow>
        <meshStandardMaterial color="#424842" roughness={0.55} metalness={0.30} />
      </RoundedBox>

      {/* Top face */}
      <mesh position={[0, BH+0.0003, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[BW*2, BD*2]} />
        <meshStandardMaterial color="#4e584e" roughness={0.45} />
      </mesh>

      {/* Dome recess */}
      <mesh position={[DX, BH+0.0005, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[DR*1.2, 36]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
      </mesh>

      {/* Dome lens */}
      <mesh position={[DX, BH+0.003, 0]}>
        <sphereGeometry args={[DR, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} />
        <meshPhysicalMaterial color="#1a2a1a" roughness={0.08} transmission={0.35} clearcoat={1} />
      </mesh>

      {/* Dome ring */}
      <mesh position={[DX, BH+0.002, 0]}>
        <torusGeometry args={[DR*1.06, 0.0025, 12, 48]} />
        <meshStandardMaterial color="#3a6040" emissive="#1a3020" emissiveIntensity={0.5} />
      </mesh>

      {/* Green LED */}
      <mesh position={G}>
        <cylinderGeometry args={[0.009, 0.009, 0.005, 20]} />
        <meshStandardMaterial color="#00dd44" emissive="#00cc33" emissiveIntensity={3} />
      </mesh>
      <pointLight position={[G[0], G[1]+0.02, G[2]]} intensity={0.4} color="#00ee44" distance={0.35} decay={2} />

      {/* Red LED */}
      <mesh position={R}>
        <cylinderGeometry args={[0.009, 0.009, 0.005, 20]} />
        <meshStandardMaterial color="#dd2200" emissive="#bb1100" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

// ─── Single bin ───────────────────────────────────────────────────────────────
function Bin({ x, isGreen }) {
  const BW = 0.255, BH = 0.58, BD = 0.230
  const bodyColor = isGreen ? '#4aaa55' : '#282828'
  const lidColor  = isGreen ? '#3a9040' : '#1e1e1e'
  const darkColor = isGreen ? '#2e7035' : '#161616'

  return (
    <group position={[x, 0, 0]}>

      {/* Body */}
      <RoundedBox args={[BW*2, BH*2, BD*2]} radius={0.022} smoothness={5} castShadow receiveShadow>
        <meshStandardMaterial color={bodyColor} roughness={0.58} metalness={0.08} />
      </RoundedBox>

      {/* Lid */}
      <RoundedBox
        args={[BW*2 + 0.038, 0.085, BD*2 + 0.036]}
        radius={0.018} smoothness={4}
        position={[0, BH + 0.0425, 0]}
        castShadow
      >
        <meshStandardMaterial color={lidColor} roughness={0.52} metalness={0.10} />
      </RoundedBox>

      {/* Lid handle */}
      <mesh position={[0, BH + 0.098, 0]}>
        <boxGeometry args={[0.15, 0.018, 0.036]} />
        <meshStandardMaterial color={darkColor} roughness={0.7} />
      </mesh>

      {/* Subtle panel line on body */}
      <mesh position={[0, 0, BD + 0.0012]} rotation={[0, 0, 0]}>
        <planeGeometry args={[BW*2 - 0.06, BH*2 - 0.10]} />
        <meshStandardMaterial color={isGreen ? '#42984c' : '#222222'} roughness={0.7} />
      </mesh>

      {/* Wheels */}
      {[
        [-BW+0.07, -BH-0.042,  BD-0.07],
        [ BW-0.07, -BH-0.042,  BD-0.07],
        [-BW+0.07, -BH-0.042, -BD+0.07],
        [ BW-0.07, -BH-0.042, -BD+0.07],
      ].map(([wx,wy,wz], i) => (
        <mesh key={i} position={[wx, wy, wz]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.038, 0.038, 0.028, 16]} />
          <meshStandardMaterial color="#181818" roughness={0.9} />
        </mesh>
      ))}

      {/* SEWCS device on front face of green bin */}
      {isGreen && (
        <group position={[-0.018, -0.05, BD + 0.050]}>
          <SEWCSMini />
        </group>
      )}

    </group>
  )
}

// ─── Full scene ───────────────────────────────────────────────────────────────
function Scene() {
  const group = useRef()

  useFrame(({ clock }) => {
    if (!group.current) return
    // Very slow breathing rotation
    group.current.rotation.y = -0.18 + Math.sin(clock.getElapsedTime() * 0.4) * 0.06
  })

  return (
    <group ref={group} rotation={[0.12, -0.18, 0]}>
      <Bin isGreen x={-0.32} />
      <Bin isGreen={false} x={0.34} />
    </group>
  )
}

// ─── Exported canvas component ────────────────────────────────────────────────
export default function BinMockup3D() {
  return (
    <Canvas
      camera={{ position: [0.3, 0.65, 3.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={Math.min(window.devicePixelRatio, 2)}
      style={{ width: '100%', height: '320px', background: 'transparent' }}
    >
      <ambientLight intensity={0.50} color="#ddeedd" />
      <directionalLight position={[-3, 6, 4]} intensity={1.4} color="#ffffff" castShadow />
      <directionalLight position={[4, 2, -2]} intensity={0.40} color="#c0d8c0" />
      <directionalLight position={[0, -2, -4]} intensity={0.18} color="#304030" />
      <Scene />
    </Canvas>
  )
}
