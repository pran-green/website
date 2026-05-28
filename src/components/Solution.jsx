import { useMemo, useState } from 'react'
import SectionHeading from './SectionHeading'
import { content } from '../content'
import { ScanLine, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react'

import deviceClose from '../assets/ppt/image28.png'

// Demo scenarios (makes the demo feel real + relevant)
const scenarios = [
    { id: 'office', label: 'Office kitchen' },
    { id: 'campus', label: 'Campus dining' },
    { id: 'stadium', label: 'Stadium / event' },
    { id: 'retail', label: 'Retail / back-of-house' },
]

// Demo items (add as many as you want)
// NOTE: real facilities vary — these are illustrative examples.
const demoItems = [
    // Office kitchen
    {
        scenario: 'office',
        label: 'Plastic water bottle (empty)',
        result: 'Recyclable',
        stream: 'Plastic',
        ok: true,
        confidence: 0.92,
        why: 'Rigid PET bottles are commonly accepted when empty.',
        tip: 'Empty it + cap on (rules vary).',
    },
    {
        scenario: 'office',
        label: 'Coffee cup (lined)',
        result: 'Trash',
        stream: 'Residual',
        ok: false,
        confidence: 0.86,
        why: 'Many paper cups have a plastic lining that contaminates paper recycling.',
        tip: 'If your city has cup recycling, follow local signage.',
    },
    {
        scenario: 'office',
        label: 'Aluminum can',
        result: 'Recyclable',
        stream: 'Metal',
        ok: true,
        confidence: 0.95,
        why: 'Aluminum is high-value and widely accepted.',
        tip: 'Quick rinse helps reduce contamination.',
    },
    {
        scenario: 'office',
        label: 'Greasy paper plate',
        result: 'Trash',
        stream: 'Residual',
        ok: false,
        confidence: 0.83,
        why: 'Oil/food residue reduces recyclability of paper products.',
        tip: 'If compost exists, choose compost for food-soiled paper.',
    },

    // Campus dining
    {
        scenario: 'campus',
        label: 'Compostable bowl (BPI certified)',
        result: 'Compost',
        stream: 'Organics',
        ok: true,
        confidence: 0.78,
        why: 'Certified compostables are accepted where industrial compost is available.',
        tip: 'Only compost if bins/signage explicitly allow compostables.',
    },
    {
        scenario: 'campus',
        label: 'Pizza box (clean top)',
        result: 'Recyclable',
        stream: 'Paper',
        ok: true,
        confidence: 0.72,
        why: 'Clean cardboard is commonly accepted; greasy bottoms usually aren’t.',
        tip: 'Tear off greasy parts → trash/compost (if allowed).',
    },
    {
        scenario: 'campus',
        label: 'Plastic clamshell (salad container)',
        result: 'Recyclable',
        stream: 'Plastic',
        ok: true,
        confidence: 0.64,
        why: 'Rigid clear plastics are sometimes accepted if clean.',
        tip: 'If it’s cloudy/film-like, it’s often trash.',
    },
    {
        scenario: 'campus',
        label: 'Plastic straw',
        result: 'Trash',
        stream: 'Residual',
        ok: false,
        confidence: 0.9,
        why: 'Small items fall through sorting equipment.',
        tip: 'Avoid or use reusable; if paper straw, still usually trash unless compost program accepts.',
    },

    // Stadium / event
    {
        scenario: 'stadium',
        label: 'Aluminum beer can',
        result: 'Recyclable',
        stream: 'Metal',
        ok: true,
        confidence: 0.93,
        why: 'Aluminum recovery is strong in venue programs.',
        tip: 'Empty it. No food inside.',
    },
    {
        scenario: 'stadium',
        label: 'Nacho tray (food-soiled)',
        result: 'Trash',
        stream: 'Residual',
        ok: false,
        confidence: 0.8,
        why: 'Food contamination makes mixed materials difficult to process.',
        tip: 'If venue has compost for food serviceware, follow venue signage.',
    },
    {
        scenario: 'stadium',
        label: 'Plastic cup',
        result: 'Recyclable',
        stream: 'Plastic',
        ok: true,
        confidence: 0.6,
        why: 'Some venues accept cups; others treat as trash depending on program.',
        tip: 'Look for the cup-only bin or event signage.',
    },
    {
        scenario: 'stadium',
        label: 'Foam container (styrofoam)',
        result: 'Trash',
        stream: 'Residual',
        ok: false,
        confidence: 0.94,
        why: 'Foam is rarely accepted curbside and contaminates streams.',
        tip: 'Avoid if possible; dispose as trash.',
    },

    // Retail / back-of-house
    {
        scenario: 'retail',
        label: 'Shrink wrap / plastic film',
        result: 'Trash',
        stream: 'Residual',
        ok: false,
        confidence: 0.82,
        why: 'Film plastics require specialized collection.',
        tip: 'If your facility has film bales/collection, route there.',
    },
    {
        scenario: 'retail',
        label: 'Corrugated cardboard (clean)',
        result: 'Recyclable',
        stream: 'Cardboard',
        ok: true,
        confidence: 0.96,
        why: 'Clean corrugate is highly recyclable and valuable.',
        tip: 'Flatten boxes to reduce volume.',
    },
    {
        scenario: 'retail',
        label: 'Glass bottle',
        result: 'Recyclable',
        stream: 'Glass',
        ok: true,
        confidence: 0.86,
        why: 'Glass is accepted in many recycling systems.',
        tip: 'Keep it empty; lids may vary by facility.',
    },
    {
        scenario: 'retail',
        label: 'Battery (AA/AAA)',
        result: 'Special handling',
        stream: 'Hazardous',
        ok: true,
        confidence: 0.9,
        why: 'Batteries can cause fires in sorting equipment.',
        tip: 'Use battery drop-off or hazardous waste program.',
    },
]

export default function Solution() {
    const [scenario, setScenario] = useState('office')
    const itemsForScenario = useMemo(
        () => demoItems.filter(i => i.scenario === scenario),
        [scenario]
    )

    const [choice, setChoice] = useState(itemsForScenario[0]?.label || '')
    const [scanning, setScanning] = useState(false)
    const [revealed, setRevealed] = useState(false)
    const [history, setHistory] = useState([]) // {label, scenario, ts}

    // Keep selection valid when scenario changes
    useMemo(() => {
        if (!itemsForScenario.some(i => i.label === choice)) {
            const next = itemsForScenario[0]?.label || ''
            setChoice(next)
            setRevealed(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scenario])

    const outcome = useMemo(() => {
        const found = demoItems.find(d => d.scenario === scenario && d.label === choice)
        return found || itemsForScenario[0]
    }, [scenario, choice, itemsForScenario])

    function simulateScan() {
        if (!outcome) return
        setScanning(true)
        setRevealed(false)

        window.setTimeout(() => {
            setScanning(false)
            setRevealed(true)
            setHistory(prev => {
                const next = [{ label: outcome.label, scenario, ts: Date.now() }, ...prev]
                return next.slice(0, 6)
            })
        }, 900)
    }

    function resetHistory() {
        setHistory([])
    }

    return (
        <section id="solution" className="section">
            <div className="container">
                <SectionHeading
                    kicker="Our solution"
                    title="Point-of-disposal classification that scales."
                    description="WasteWiz helps users sort correctly in the moment, reduces contamination fees, and generates real-time waste stream data."
                />

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 22 }}>
                    {/* Live demo */}
                    <div className="card" style={{ padding: 18 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                            <div className="badge">
                                <ScanLine size={16} /> Live demo
                            </div>

                            <div style={{ display: 'flex', gap: 10 }}>
                                <button
                                    type="button"
                                    onClick={simulateScan}
                                    className="btn"
                                    style={{ padding: '10px 12px', borderRadius: 12 }}
                                    disabled={scanning}
                                >
                                    <Sparkles size={16} /> {scanning ? 'Scanning…' : 'Simulate scan'}
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={{ color: 'var(--muted)', fontSize: 14 }}>Scenario</label>
                                    <select
                                        value={scenario}
                                        onChange={(e) => {
                                            setScenario(e.target.value)
                                            setRevealed(false)
                                        }}
                                        style={{
                                            marginTop: 8,
                                            width: '100%',
                                            padding: '12px 12px',
                                            borderRadius: 12,
                                            background: 'rgba(0,0,0,.25)',
                                            color: 'var(--text)',
                                            border: '1px solid rgba(255,255,255,.16)',
                                        }}
                                    >
                                        {scenarios.map(s => (
                                            <option key={s.id} value={s.id}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ color: 'var(--muted)', fontSize: 14 }}>Pick an item</label>
                                    <select
                                        value={choice}
                                        onChange={(e) => {
                                            setChoice(e.target.value)
                                            setRevealed(false)
                                        }}
                                        style={{
                                            marginTop: 8,
                                            width: '100%',
                                            padding: '12px 12px',
                                            borderRadius: 12,
                                            background: 'rgba(0,0,0,.25)',
                                            color: 'var(--text)',
                                            border: '1px solid rgba(255,255,255,.16)',
                                        }}
                                    >
                                        {itemsForScenario.map(d => (
                                            <option key={d.label} value={d.label}>{d.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Result card */}
                            <div
                                className="card"
                                style={{
                                    padding: 14,
                                    background: 'rgba(0,0,0,.20)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Scan overlay */}
                                {scanning && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'rgba(0,0,0,.35)',
                                            borderRadius: 14,
                                            display: 'grid',
                                            placeItems: 'center',
                                            zIndex: 2,
                                        }}
                                    >
                                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    top: 0,
                                                    height: 2,
                                                    background: 'rgba(255,255,255,.75)',
                                                    boxShadow: '0 0 24px rgba(255,255,255,.35)',
                                                    animation: 'wwScanSweep 900ms linear infinite',
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 14,
                                                    bottom: 14,
                                                    color: 'rgba(255,255,255,.90)',
                                                    fontWeight: 800,
                                                    letterSpacing: '-0.01em',
                                                }}
                                            >
                                                Scanning…
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 800, fontSize: 18 }}>Classification</div>
                                    {revealed && !scanning ? (
                                        outcome?.ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />
                                    ) : null}
                                </div>

                                <div style={{ marginTop: 10, fontSize: 28, fontWeight: 900, letterSpacing: '-.02em' }}>
                                    {scanning ? 'Analyzing…' : (revealed ? outcome?.result : '—')}
                                </div>

                                <div className="p" style={{ marginTop: 6 }}>
                                    Stream: <span style={{ color: 'var(--text)' }}>{revealed ? outcome?.stream : '—'}</span>
                                </div>

                                {revealed && !scanning ? (
                                    <>
                                        {/* Confidence */}
                                        <div style={{ marginTop: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 13 }}>
                                                <span>Confidence</span>
                                                <span>{Math.round((outcome?.confidence || 0) * 100)}%</span>
                                            </div>
                                            <div style={{ marginTop: 6, height: 10, borderRadius: 999, background: 'rgba(255,255,255,.10)', overflow: 'hidden' }}>
                                                <div
                                                    style={{
                                                        width: `${Math.round((outcome?.confidence || 0) * 100)}%`,
                                                        height: '100%',
                                                        background: 'rgba(255,255,255,.55)',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Why / Tip */}
                                        <div className="p" style={{ marginTop: 12 }}>
                                            <span style={{ color: 'var(--muted)' }}>Why:</span> {outcome?.why}
                                        </div>
                                        <div className="p" style={{ marginTop: 6 }}>
                                            <span style={{ color: 'var(--muted)' }}>Tip:</span> {outcome?.tip}
                                        </div>
                                    </>
                                ) : (
                                    <div className="p" style={{ marginTop: 12, color: 'var(--muted)' }}>
                                        Click “Simulate scan” to see the classification.
                                    </div>
                                )}
                            </div>

                            {/* Recent history */}
                            <div className="card" style={{ padding: 14, background: 'rgba(0,0,0,.16)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontWeight: 800 }}>Recent scans</div>
                                    <button
                                        type="button"
                                        onClick={resetHistory}
                                        className="btn"
                                        style={{ padding: '8px 10px', borderRadius: 12 }}
                                        disabled={history.length === 0}
                                        title="Clear history"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </div>

                                {history.length === 0 ? (
                                    <div className="p" style={{ marginTop: 8, color: 'var(--muted)' }}>
                                        Click “Simulate scan” to populate recent results.
                                    </div>
                                ) : (
                                    <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                                        {history.map(h => {
                                            const scenarioLabel = scenarios.find(s => s.id === h.scenario)?.label || h.scenario
                                            return (
                                                <button
                                                    key={h.ts}
                                                    type="button"
                                                    onClick={() => {
                                                        setScenario(h.scenario)
                                                        setChoice(h.label)
                                                        setRevealed(true)
                                                    }}
                                                    className="card"
                                                    style={{
                                                        textAlign: 'left',
                                                        padding: 10,
                                                        background: 'rgba(0,0,0,.18)',
                                                        border: '1px solid rgba(255,255,255,.10)',
                                                        borderRadius: 12,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <div style={{ fontWeight: 700 }}>{h.label}</div>
                                                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{scenarioLabel}</div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="p" style={{ color: 'var(--muted)' }}>
                                Demo UI only. In production, the classifier is driven by spectroscopy + indicator logic and tuned to the facility’s rules.
                            </div>
                        </div>
                    </div>

                    {/* Right column cards */}
                    <div className="grid" style={{ gridTemplateRows: 'auto auto', gap: 18 }}>
                        <div className="card" style={{ padding: 18 }}>
                            <div style={{ fontWeight: 800, fontSize: 18 }}>What’s inside</div>
                            <div className="p" style={{ marginTop: 6 }}>
                                Spectroscopy enhanced waste classification system (SEWCS): material characterization, indicator-based guidance, user education, and real-time data collection.
                            </div>
                            <div style={{ marginTop: 12, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,.10)' }}>
                                <img src={deviceClose} alt="Device closeup" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* How it works cards */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 18 }}>
                    {content.howItWorks.map(s => (
                        <div key={s.step} className="card" style={{ padding: 18 }}>
                            <div className="badge">{s.step}</div>
                            <div style={{ fontWeight: 800, fontSize: 18, marginTop: 12 }}>{s.title}</div>
                            <div className="p" style={{ marginTop: 6 }}>{s.body}</div>
                        </div>
                    ))}
                </div>

                <style>{`
          @media (max-width: 860px){
            .grid{grid-template-columns:1fr !important}
          }
          @keyframes wwScanSweep {
            0% { transform: translateY(10px); opacity: .35; }
            15% { opacity: .9; }
            100% { transform: translateY(calc(100% - 18px)); opacity: .25; }
          }
        `}</style>
            </div>
        </section>
    )
}