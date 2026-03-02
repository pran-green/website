import { useEffect, useMemo, useRef, useState } from 'react'

function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, options)
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [options])

  return [ref, inView]
}

export default function StatCounter({ value, suffix='', duration=900 }) {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const target = useMemo(() => Number(value), [value])
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const from = 0
    const to = target
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(from + (to - from) * eased)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  const display =
    Math.abs(target) >= 1000 ? Math.round(n).toLocaleString() :
    target % 1 !== 0 ? n.toFixed(1) :
    Math.round(n)

  return <span ref={ref}>{display}{suffix}</span>
}
