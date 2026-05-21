import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {} from 'react-router-dom'
import Nav from '../components/Nav'

export default function Contact() {
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

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:'none',fontFamily:"'DM Sans',sans-serif",display:'flex',flexDirection:'column'}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(100,200,140,0.8)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:44,height:44,border:'1px solid rgba(100,200,140,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <Nav />

      <div style={{maxWidth:1100,margin:'0 auto',padding:'140px 48px 80px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:60}}>Contact</motion.p>

        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:serif,fontSize:'clamp(60px,10vw,140px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',marginBottom:60}}>
          Let's make<br/><em style={{color:'rgba(232,228,217,0.3)',fontStyle:'italic'}}>something</em><br/>together.
        </motion.h1>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4,duration:0.8}}
          style={{display:'flex',gap:40,alignItems:'center',flexWrap:'wrap'}}>
          <a href="mailto:hello@shivish.in" style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(18px,3vw,32px)',color:'rgba(232,228,217,0.4)',textDecoration:'none',transition:'color 0.3s'}}
            onMouseEnter={e=>{e.currentTarget.style.color='#e8e4d9'}} onMouseLeave={e=>{e.currentTarget.style.color='rgba(232,228,217,0.4)'}}>
            hello@shivish.in
          </a>
          <a href="https://github.com/shiiiviiish" target="_blank" style={{fontSize:13,color:'rgba(232,228,217,0.35)',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase',transition:'color 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.35)')}>
            GitHub ↗
          </a>
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