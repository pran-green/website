import SectionHeading from './SectionHeading'
import productImg from '../assets/ppt/image29.png'
import epicImg from '../assets/ppt/image57.png'
import buChallenge from '../assets/ppt/image58.png'

export default function Product() {
  return (
    <section id="product" className="section">
      <div className="container">
        <SectionHeading
          kicker="Product"
          title="Standalone or integrated — built to fit existing workflows."
          description="Deploy SEWCS on top of current bins and signage, or integrate the module directly into bin infrastructure."
        />

        <div className="grid" style={{gridTemplateColumns:'1.1fr .9fr', gap:18, marginTop:22}}>
          <div style={{padding:'0 4px'}}>
            <div style={{fontWeight:850, fontSize:18}}>Unit mockup</div>
            <div className="p" style={{marginTop:6}}>Drop-in module with clear indicators for fast decisions.</div>
            <div style={{marginTop:12}}>
              <img src={productImg} alt="Standalone and integrated mockup" style={{width:'100%', borderRadius:14, filter:'brightness(0.55)'}} />
            </div>
          </div>

          <div className="grid" style={{gridTemplateRows:'1fr 1fr', gap:18}}>
            <div className="card" style={{padding:18, overflow:'hidden'}}>
              <div style={{fontWeight:850, fontSize:18}}>Built + tested with makers</div>
              <div className="p" style={{marginTop:6}}>MVP development and deployment support with EPIC / Build Lab ecosystem.</div>
              <div style={{marginTop:12, borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,.10)'}}>
                <img src={epicImg} alt="EPIC lab" />
              </div>
            </div>
            <div className="card" style={{padding:18}}>
              <div style={{fontWeight:850, fontSize:18}}>Climate innovation aligned</div>
              <div className="p" style={{marginTop:6}}>Designed to contribute to climate justice and practical waste diversion.</div>
              <div style={{marginTop:12, borderRadius:14, overflow:'hidden', border:'1px solid rgba(255,255,255,.10)'}}>
                <img src={buChallenge} alt="BU Climate Innovation Challenge" />
              </div>
            </div>
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
