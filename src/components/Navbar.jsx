import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import logo from '../assets/ppt/image8.png'

const links = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'product', label: 'Product' },
  { id: 'impact', label: 'Impact' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header style={{
      position:'sticky', top:0, zIndex:30,
      backdropFilter:'blur(10px)',
      background: scrolled ? 'rgba(7,10,15,.72)' : 'rgba(7,10,15,.35)',
      borderBottom:'1px solid rgba(255,255,255,.10)'
    }}>
      <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px'}}>
        <a href="#top" style={{display:'flex', alignItems:'center', gap:12}}>
          <img src={logo} alt="WasteWiz" style={{height:28, width:'auto'}} />
          <span style={{fontWeight:650, letterSpacing:'.02em'}}>WasteWiz</span>
        </a>

        <nav className="hide-mobile" style={{display:'flex', gap:18, alignItems:'center'}}>
          {links.map(l => (
            <a key={l.id} href={'#' + l.id} style={{color:'var(--muted)', fontSize:14}}>
              {l.label}
            </a>
          ))}
          <a className="btn small primary" href="#contact">Get in touch</a>
        </nav>

        <button className="btn small show-mobile" onClick={() => setOpen(v => !v)} aria-label="Open menu">
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>

      {open && (
        <div style={{borderTop:'1px solid rgba(255,255,255,.10)', background:'rgba(7,10,15,.92)'}}>
          <div className="container" style={{padding:'14px 20px 18px'}}>
            <div style={{display:'grid', gap:10}}>
              {links.map(l => (
                <a key={l.id} href={'#' + l.id} onClick={() => setOpen(false)} className="btn" style={{justifyContent:'flex-start'}}>
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn primary">Get in touch</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .show-mobile{display:none}
        @media (max-width: 860px){
          .hide-mobile{display:none}
          .show-mobile{display:inline-flex}
        }
      `}</style>
    </header>
  )
}
