import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  ['work', '/work'],
  ['gallery', '/gallery'],
  ['vibes', '/vibes'],
  ['clients', '/clients'],
  ['about', '/about'],
  ['contact', '/contact'],
]

const serif = "'Instrument Serif', serif"

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(7,16,13,0.85)',backdropFilter:'blur(12px)'}}>
        <Link to="/" onClick={()=>setOpen(false)} style={{fontFamily:serif,fontSize:20,color:'#e8e4d9',textDecoration:'none',letterSpacing:'-0.02em'}}>Shivish</Link>

        {/* Desktop nav */}
        <div style={{display:'flex',gap:32,alignItems:'center'}} className="desktop-nav">
          {links.map(([l,p])=>(
            <Link key={l} to={p} style={{color:pathname===p?'#e8e4d9':'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em',transition:'color 0.3s'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')}
              onMouseLeave={e=>(e.currentTarget.style.color=pathname===p?'#e8e4d9':'rgba(232,228,217,0.45)')}>
              {l}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={()=>setOpen(o=>!o)} className="mobile-menu-btn"
          style={{width:40,height:40,borderRadius:9999,background:'rgba(232,228,217,0.08)',border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',display:'none',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all 0.3s'}}>
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className="mobile-menu" style={{
        position:'fixed',top:72,left:0,right:0,zIndex:49,
        background:'rgba(7,16,13,0.97)',backdropFilter:'blur(20px)',
        borderBottom:'0.5px solid rgba(232,228,217,0.08)',
        transform:open?'translateY(0)':'translateY(-8px)',
        opacity:open?1:0,
        pointerEvents:open?'auto':'none',
        transition:'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        display:'none', flexDirection:'column', padding:'8px 0 16px'
      }}>
        {links.map(([l,p],i)=>(
          <Link key={l} to={p} onClick={()=>setOpen(false)}
            style={{
              padding:'14px 24px',fontSize:14,color:pathname===p?'#e8e4d9':'rgba(232,228,217,0.5)',
              textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em',
              borderBottom:'0.5px solid rgba(232,228,217,0.05)',
              display:'flex',alignItems:'center',justifyContent:'space-between',
              transition:'color 0.2s',
              transitionDelay:`${i*40}ms`,
              transform:open?'translateX(0)':'translateX(-10px)',
            }}>
            {l}
            <span style={{fontSize:12,opacity:0.3}}>→</span>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  )
}