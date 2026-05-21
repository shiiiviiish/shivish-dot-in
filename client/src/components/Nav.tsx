import { Link, useLocation } from 'react-router-dom'

const links = [
  ['work', '/work'],
  ['gallery', '/gallery'],
  ['clients', '/clients'],
  ['about', '/about'],
  ['contact', '/contact'],
]

const serif = "'Instrument Serif', serif"

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(7,16,13,0.85)',backdropFilter:'blur(12px)'}}>
      <Link to="/" style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',textDecoration:'none'}}>Shivish</Link>
      <div style={{display:'flex',gap:32}}>
        {links.map(([l,p])=>(
          <Link key={l} to={p} style={{color:pathname===p?'#e8e4d9':'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em',transition:'color 0.3s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')}
            onMouseLeave={e=>(e.currentTarget.style.color=pathname===p?'#e8e4d9':'rgba(232,228,217,0.45)')}>
            {l}
          </Link>
        ))}
      </div>
    </nav>
  )
}