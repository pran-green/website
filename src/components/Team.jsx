import SectionHeading from './SectionHeading'
import { content } from '../content'
import aru from '../assets/ppt/image56.png'
import buildlab from '../assets/ppt/image53.png'

export default function Team() {
    return (
        <section id="team" className="section">
            <div className="container">
                <SectionHeading
                    kicker="Eco dream team"
                    title="Operators + builders."
                    description="A team focused on pragmatic climate impact through better recycling outcomes."
                />

                <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 18, marginTop: 22 }}>
                    <div
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
                            src={aru}
                            alt="Aru Pandey"
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 18,
                                objectFit: 'cover',
                                border: '1px solid rgba(255,255,255,.14)',
                            }}
                        />
                        <div>
                            <div style={{ fontWeight: 900, fontSize: 18 }}>{content.team[0].name}</div>
                            <div className="p" style={{ marginTop: 2 }}>
                                {content.team[0].role} • {content.team[0].org}
                            </div>
                        </div>
                    </div>
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
            </div>
        </section>
    )
}