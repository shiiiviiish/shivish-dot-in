import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Work() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const serif = "'Instrument Serif', serif"

  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return ()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  }, [])

  const projects = [
    {num:'01',title:'Happiness Through Art',chip:'Client · 2025',desc:'Portfolio website for artist Kavya Atray. Designed and built end-to-end — layout, deployment, everything.',tags:['TypeScript','React','Vercel'],url:'https://hta-seven.vercel.app/'},
    {num:'02',title:'This Portfolio',chip:'Personal · 2025',desc:'Cinematic dark portfolio. Pull-up animations, scroll-linked text, fog canvas, glassmorphism.',tags:['React','GSAP','Framer Motion'],url:'https://shivish.in'},
    {num:'03',title:'Next Project',chip:'Coming Soon',desc:'Something new is cooking. Watch the GitHub.',tags:['???'],url:'https://github.com/shiiiviiish'},
  ]

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:'none',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(100,200,140,0.8)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:44,height:44,border:'1px solid rgba(100,200,140,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(7,16,13,0.8)',backdropFilter:'blur(12px)'}}>
        <Link to="/" style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',textDecoration:'none',letterSpacing:'-0.02em'}}>Shivish</Link>
        <div style={{display:'flex',gap:40}}>
          {[['work','/work'],['about','/about'],['contact','/contact']].map(([l,p])=>(
            <Link key={l} to={p} style={{color:p==='/work'?'#e8e4d9':'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em'}}>{l}</Link>
          ))}
        </div>
      </nav>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'140px 48px 80px'}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:60}}>Selected Work</motion.p>
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:serif,fontSize:'clamp(48px,8vw,100px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:80}}>
          Things I've<br/><em style={{color:'rgba(232,228,217,0.3)',fontStyle:'italic'}}>built.</em>
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
              <span style={{fontSize:22,color:'rgba(232,228,217,0.2)',paddingTop:24}}>↗</span>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *{cursor:none;box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  )
}