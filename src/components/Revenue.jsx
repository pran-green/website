import SectionHeading from './SectionHeading'
import { content } from '../content'

function money(n){ return '$' + Math.round(n).toLocaleString() }

export default function Revenue() {
  const r = content.revenue
  const totalInstall = r.installBins * r.sellingPrice
  const marginPerUnit = r.sellingPrice - r.costPrice
  const grossMargin = r.installBins * marginPerUnit

  const annualContaminationFees = r.contaminationTonsPerMonth * 12 * r.contaminationFeePerTon

  // simple payback: savings / cost
  const paybackYears = totalInstall / (annualContaminationFees || 1)

  return (
    <section id="revenue" className="section">
      <div className="container">
        <SectionHeading
          kicker="Revenue projection"
          title="Simple unit economics, clear incentives."
          description="A straightforward hardware margin plus measurable savings from avoided contamination fees."
        />

        <div className="grid" style={{gridTemplateColumns:'1fr 1fr 1fr', marginTop:22}}>
          <div className="card" style={{padding:18}}>
            <div className="kicker">Pricing</div>
            <div style={{marginTop:10, display:'grid', gap:8, color:'var(--muted)'}}>
              <div>Cost price: <b style={{color:'var(--text)'}}>{money(r.costPrice)}</b></div>
              <div>Selling price: <b style={{color:'var(--text)'}}>{money(r.sellingPrice)}</b></div>
              <div>Per-unit margin: <b style={{color:'var(--text)'}}>{money(marginPerUnit)}</b></div>
            </div>
          </div>

          <div className="card" style={{padding:18}}>
            <div className="kicker">Pilot scale (BU CDS)</div>
            <div style={{marginTop:10, display:'grid', gap:8, color:'var(--muted)'}}>
              <div>Bins: <b style={{color:'var(--text)'}}>{r.installBins}</b></div>
              <div>Install revenue: <b style={{color:'var(--text)'}}>{money(totalInstall)}</b></div>
              <div>Gross margin: <b style={{color:'var(--text)'}}>{money(grossMargin)}</b></div>
            </div>
          </div>

          <div className="card" style={{padding:18}}>
            <div className="kicker">Savings lever</div>
            <div style={{marginTop:10, display:'grid', gap:8, color:'var(--muted)'}}>
              <div>Monthly contaminated waste: <b style={{color:'var(--text)'}}>{r.contaminationTonsPerMonth} tons</b></div>
              <div>Fee per ton: <b style={{color:'var(--text)'}}>{money(r.contaminationFeePerTon)}</b></div>
              <div>Annual fees: <b style={{color:'var(--text)'}}>{money(annualContaminationFees)}</b></div>
            </div>
          </div>
        </div>

        <div className="card" style={{padding:18, marginTop:18}}>
          <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:10, alignItems:'center'}}>
            <div>
              <div style={{fontWeight:900, fontSize:22}}>Estimated payback</div>
              <div className="p" style={{marginTop:6}}>
                Based on annual contamination fees, a pilot install can pay back in roughly <b style={{color:'var(--text)'}}>{paybackYears.toFixed(1)} years</b>.
              </div>
            </div>
            <a className="btn primary" href="#contact">Request pilot pricing</a>
          </div>
          <div style={{marginTop:10, color:'var(--muted)', fontSize:13}}>
            Note: This section is a simplified model for the website. Replace with your latest assumptions as you validate pilots.
          </div>
        </div>

        <style>{`
          @media (max-width: 860px){
            .grid{grid-template-columns:1fr !important}
          }
        `}</style>
      </div>
    </section>
  )
}
