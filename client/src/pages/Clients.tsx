import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

const clients = [
  {
    name: 'Kavya Atray',
    role: 'Visual Artist',
    project: 'Happiness Through Art',
    year: '2025',
    desc: 'Portfolio website showcasing original artwork, paintings and bookmarks. Built end-to-end.',
    url: 'https://hta-seven.vercel.app/',
    initials: 'KA',
    color: '#0d1f17',
    accent: '#4ade80',
    tags: ['Web Design', 'React', 'TypeScript']
  },
  {
    name: 'Client 2',
    role: 'Coming Soon',
    project: 'Project TBA',
    year: '2025',
    desc: 'Next client project in progress. Stay tuned.',
    url: '#',
    initials: 'C2',
    color: '#0f1525',
    accent: '#60a5fa',
    tags: ['TBD']
  },
  {
    name: 'Client 3',
    role: 'Coming Soon',
    project: 'Project TBA',
    year: '2025',
    desc: 'Always open to new collaborations. Get in touch.',
    url: '/contact',
    initials: 'C3',
    color: '#1f100a',
    accent: '#fb923c',
    tags: ['Open']
  },
]

const stats = [
  { num: '3', label: 'Clients' },
  { num: '2', label: 'Projects Live' },
  { num: '100%', label: 'Satisfaction' },
  { num: '∞', label: 'Vibes' },
]

export default function Clients() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const serif = "'Instrument Serif', serif"

  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:'none',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(7,16,13,0.85)',backdropFilter:'blur(12px)'}}>
        <Link to="/" style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',textDecoration:'none'}}>Shivish</Link>
        <div style={{display:'flex',gap:32}}>
          {[['work','/work'],['gallery','/gallery'],['clients','/clients'],['about','/about'],['contact','/contact']].map(([l,p])=>(
            <Link key={l} to={p} style={{color:p==='/clients'?'#e8e4d9':'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em',transition:'color 0.3s'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')} onMouseLeave={e=>(e.currentTarget.style.color=p==='/clients'?'#e8e4d9':'rgba(232,228,217,0.45)')}>{l}</Link>
          ))}
        </div>
      </nav>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'140px 48px 80px'}}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}} style={{marginBottom:80}}>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:20}}>Who I've worked with</p>
          <h1 style={{fontFamily:serif,fontSize:'clamp(56px,10vw,120px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.04em',marginBottom:20}}>
            Clients<br/><em style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}>& collabs.</em>
          </h1>
          <p style={{fontSize:14,color:'rgba(232,228,217,0.4)',fontWeight:300,maxWidth:420,lineHeight:1.7}}>
            Real projects for real people. Every client gets full attention, clean code, and a site they're proud of.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}}
          style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,borderTop:'0.5px solid rgba(232,228,217,0.06)',borderBottom:'0.5px solid rgba(232,228,217,0.06)',marginBottom:80}}>
          {stats.map((s,i)=>(
            <div key={i} style={{padding:'36px 28px',borderRight:i<3?'0.5px solid rgba(232,228,217,0.06)':'none'}}>
              <div style={{fontFamily:serif,fontSize:'clamp(36px,5vw,56px)',fontWeight:400,color:'#e8e4d9',lineHeight:1,marginBottom:8}}>{s.num}</div>
              <div style={{fontSize:11,color:'rgba(232,228,217,0.3)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Client cards */}
        <div style={{display:'flex',flexDirection:'column',gap:0}}>
          {clients.map((client,i)=>(
            <motion.div key={i} initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:0.3+i*0.12,duration:0.9,ease:[0.16,1,0.3,1]}}
              style={{padding:'48px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',display:'grid',gridTemplateColumns:'80px 1fr auto',gap:40,alignItems:'start'}}>
              {/* Number */}
              <span style={{fontFamily:serif,fontStyle:'italic',fontSize:14,color:'rgba(232,228,217,0.2)',paddingTop:6}}>0{i+1}</span>

              {/* Info */}
              <div>
                {/* Client identity */}
                <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
                  <div style={{width:52,height:52,borderRadius:'50%',background:client.color,border:`1px solid ${client.accent}30`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:serif,fontSize:18,color:client.accent,flexShrink:0}}>
                    {client.initials}
                  </div>
                  <div>
                    <p style={{fontSize:18,color:'#e8e4d9',fontWeight:400,marginBottom:2}}>{client.name}</p>
                    <p style={{fontSize:12,color:'rgba(232,228,217,0.35)',letterSpacing:'0.05em'}}>{client.role}</p>
                  </div>
                </div>
                <h3 style={{fontFamily:serif,fontSize:'clamp(24px,3vw,40px)',fontWeight:400,color:'#e8e4d9',letterSpacing:'-0.02em',marginBottom:12}}>{client.project}</h3>
                <p style={{fontSize:13,color:'rgba(232,228,217,0.45)',lineHeight:1.7,fontWeight:300,maxWidth:520,marginBottom:20}}>{client.desc}</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {client.tags.map(t=>(
                    <span key={t} style={{fontSize:11,padding:'3px 12px',borderRadius:9999,border:'0.5px solid rgba(232,228,217,0.1)',color:'rgba(232,228,217,0.35)'}}>{t}</span>
                  ))}
                  <span style={{fontSize:11,padding:'3px 12px',borderRadius:9999,border:'0.5px solid rgba(232,228,217,0.1)',color:'rgba(232,228,217,0.35)'}}>{client.year}</span>
                </div>
              </div>

              {/* Link */}
              <a href={client.url} target={client.url.startsWith('http')?'_blank':'_self'}
                style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'rgba(232,228,217,0.35)',textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.1em',paddingTop:8,transition:'color 0.3s',flexShrink:0}}
                onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.35)')}>
                {client.url.startsWith('http')?<><ExternalLink size={14}/> View</>:'→ Collab'}
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.8,duration:0.8}}
          style={{marginTop:80,padding:'60px',borderRadius:20,border:'0.5px solid rgba(232,228,217,0.08)',background:'rgba(232,228,217,0.02)',textAlign:'center'}}>
          <p style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(28px,4vw,52px)',color:'rgba(232,228,217,0.7)',marginBottom:24,letterSpacing:'-0.02em'}}>
            "Want to work together?"
          </p>
          <Link to="/contact" style={{display:'inline-block',borderRadius:9999,padding:'14px 36px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            Say hello →
          </Link>
        </motion.div>
      </div>

      <footer style={{padding:'28px 48px',fontSize:12,color:'rgba(232,228,217,0.18)',borderTop:'0.5px solid rgba(232,228,217,0.05)',display:'flex',justifyContent:'space-between'}}>
        <span>Shivish · 2025</span>
        <span style={{fontFamily:serif,fontStyle:'italic'}}>Built with vibe.</span>
      </footer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *{cursor:none;box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  )
}