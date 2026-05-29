import SectionHeading from './SectionHeading'
import { content } from '../content'
import aru from '../assets/Aru.jpeg'
import rohit from '../assets/rohit.png'
import daksh from '../assets/daksh.jpeg'
import buildlab from '../assets/ppt/image53.png'
import cic from '../assets/cic2.jpeg'
import cto from '../assets/cto.jpeg'

export default function Team() {
    return (
        <section id="team" className="section">
            <div className="container">
                <SectionHeading
                    kicker="Eco dream team"
                    title="Operators + builders."
                    description="A team focused on pragmatic climate impact through better recycling outcomes."
                />

                <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 22 }}>
                    {[{ img: aru, position: '50% 10%' }, { img: rohit, position: '50% 20%' }, { img: daksh, position: '50% 15%' }].map((item, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                padding: 18,
                                display: 'grid',
                                gridTemplateColumns: '120px 1fr',
                                gap: 14,
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={item.img}
                                alt={content.team[i].name}
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 18,
                                    objectFit: 'cover',
                                    objectPosition: item.position,
                                    border: '1px solid rgba(255,255,255,.14)',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 900, fontSize: 18 }}>{content.team[i].name}</div>
                                <div className="p" style={{ marginTop: 2 }}>{content.team[i].role}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="card"
                    style={{
                        padding: 18,
                        marginTop: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        flexWrap: 'wrap',
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 900, fontSize: 18 }}>Supported by BU innovation ecosystem</div>
                        <div className="p" style={{ marginTop: 6 }}>
                            Build Lab + campus partners help accelerate prototyping and validation.
                        </div>
                    </div>
                    <img src={buildlab} alt="Build Lab" style={{ height: 38, width: 'auto', opacity: 0.95 }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <img src={cic} alt="BU Climate Innovation Challenge winners" style={{ width: '100%', display: 'block', borderRadius: 14 }} />
                        <div style={{ padding: '14px 18px 18px' }}>
                            <div style={{ fontWeight: 800, fontSize: 16 }}>BU Climate Innovation Challenge</div>
                            <div className="p" style={{ marginTop: 4, fontSize: 14 }}>Winners — $2,500 prize from Innovate@BU, March 2025.</div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <img src={cto} alt="Cleantech Open 2026 Cohort" style={{ width: '100%', display: 'block', borderRadius: 14 }} />
                        <div style={{ padding: '14px 18px 18px' }}>
                            <div style={{ fontWeight: 800, fontSize: 16 }}>Cleantech Open — 2026 Cohort</div>
                            <div className="p" style={{ marginTop: 4, fontSize: 14 }}>Selected for the world's largest cleantech accelerator program.</div>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 860px){
                        .recog-grid { grid-template-columns: 1fr !important }
                    }
                `}</style>
            </div>
        </section>
    )
}