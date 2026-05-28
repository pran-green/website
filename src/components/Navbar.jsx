import { useEffect, useState } from 'react'
import { Menu, X, Linkedin } from 'lucide-react'
import logo from '../assets/pran-logo.png'

const LINKEDIN_URL = 'https://www.linkedin.com/company/pran-green/posts/?feedView=all'

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
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <img src={logo} alt="Pran" style={{ height: 100, width: 'auto' }} />
        </a>

        <nav className="nav-links hide-mobile">
          {links.map(l => (
            <a key={l.id} href={'#' + l.id}>
              {l.label}
            </a>
          ))}
          <a className="btn small primary" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <Linkedin size={15} style={{color:'var(--accent)'}} /> Get in touch
          </a>
        </nav>

        <button className="btn small show-mobile" onClick={() => setOpen(v => !v)} aria-label="Open menu">
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="container mobile-inner">
            <div className="grid">
              {links.map(l => (
                <a key={l.id} href={'#' + l.id} onClick={() => setOpen(false)} className="btn btn-block">
                  {l.label}
                </a>
              ))}
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn primary">
                <Linkedin size={16} style={{color:'var(--accent)'}} /> Get in touch
              </a>
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
