import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

function NavBar() {
  const serif = "'Instrument Serif', serif"
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <Link to="/" style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',textDecoration:'none',letterSpacing:'-0.02em'}}>Shivish</Link>
      <div style={{display:'flex',gap:40,alignItems:'center'}}>
        {[{label:'Work',to:'/work'},{label:'About',to:'/about'},{label:'Contact',to:'/contact'}].map(l=>(
          <Link key={l.to} to={l.to} style={{color:'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em',transition:'color 0.3s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.45)')}>
            {l.label}
          </Link>
        ))}
        <a href="https://github.com/shiiiviiish" target="_blank" style={{color:'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em',transition:'color 0.3s'}}
          onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.45)')}>
          GitHub ↗
        </a>
      </div>
    </nav>
  )
}

export default function Work() {
  const serif = "'Instrument Serif', serif"
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return ()=>{ document.removeEventListener('mousemove',onMove); cancelAnimationFrame(rafId) }
  }, [])

  const projects = [
    {num:'01',title:'Happiness Through Art',chip:'Client · 2025',desc:'Portfolio website for artist Kavya Atray. Designed and built end-to-end — layout, deployment, everything.',tags:['TypeScript','React','Vercel'],url:'https://hta-seven.vercel.app/'},
    {num:'02',title:'This Portfolio',chip:'Personal · 2025',desc:'Cinematic dark portfolio. Pull-up animations, scroll-linked text, fog canvas, video hero.',tags:['React','GSAP','Framer Motion'],url:'https://shivish.in'},
    {num:'03',title:'Next Project',chip:'Coming Soon',desc:'Something new is cooking. Watch the GitHub.',tags:['???'],url:'https://github.com/shiiiviiish'},
  ]

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:'none',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(100,200,140,0.8),0 0 28px rgba(100,200,140,0.4)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:44,height:44,border:'1px solid rgba(100,200,140,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      <NavBar/>
      <main style={{maxWidth:1100,margin:'0 auto',padding:'160px 48px 120px'}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:60}}>Selected Work</motion.p>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:serif,fontSize:'clamp(60px,8vw,120px)',fontWeight:400,lineHeight:0.92,letterSpacing:'-0.04em',marginBottom:80}}>
          Things I've<br/><em style={{color:'rgba(232,228,217,0.25)',fontStyle:'italic'}}>built.</em>
        </motion.h1>
        <div style={{display:'flex',flexDirection:'column'}}>
          {projects.map((p,i)=>(
            <motion.a key={i} href={p.url} target="_blank" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.2+i*0.1,duration:0.8,ease:[0.16,1,0.3,1]}}
              style={{display:'grid',gridTemplateColumns:'60px 1fr auto',gap:32,padding:'36px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',textDecoration:'none',alignItems:'start',transition:'padding-left 0.4s'}}
              onMouseEnter={e=>{e.currentTarget.style.paddingLeft='16px'}} onMouseLeave={e=>{e.currentTarget.style.paddingLeft='0'}}>
              <span style={{fontFamily:serif,fontStyle:'italic',fontSize:13,color:'rgba(232,228,217,0.2)',paddingTop:6}}>{p.num}</span>
              <div>
                <p style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:8}}>{p.chip}</p>
                <h3 style={{fontFamily:serif,fontSize:'clamp(24px,3vw,40px)',fontWeight:400,color:'#e8e4d9',marginBottom:10,letterSpacing:'-0.02em'}}>{p.title}</h3>
                <p style={{fontSize:13,color:'rgba(232,228,217,0.35)',lineHeight:1.65,fontWeight:300,maxWidth:480}}>{p.desc}</p>
                <div style={{display:'flex',gap:8,marginTop:16,flexWrap:'wrap'}}>
                  {p.tags.map(t=><span key={t} style={{fontSize:11,padding:'3px 10px',borderRadius:9999,border:'0.5px solid rgba(232,228,217,0.1)',color:'rgba(232,228,217,0.3)'}}>{t}</span>)}
                </div>
              </div>
              <span style={{fontSize:22,color:'rgba(232,228,217,0.2)',paddingTop:24,transition:'color 0.3s'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color='#e8e4d9'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color='rgba(232,228,217,0.2)'}}>↗</span>
            </motion.a>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:60}}>
          {[{count:'2',label:'Projects Shipped'},{count:'88',label:'GitHub Commits'},{count:'3',label:'Weeks Coding'}].map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5+i*0.1,duration:0.7}}
              style={{borderRadius:20,padding:28,textAlign:'center',background:'rgba(255,255,255,0.015)',border:'0.5px solid rgba(232,228,217,0.07)'}}>
              <div style={{fontFamily:serif,fontSize:52,fontWeight:400,color:'#e8e4d9',lineHeight:1}}>{s.count}</div>
              <div style={{fontSize:12,color:'rgba(232,228,217,0.3)',marginTop:8,letterSpacing:'0.05em'}}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </main>
      <style>{`*{cursor:none;box-sizing:border-box;margin:0;padding:0}@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');`}</style>
    </div>
  )
}