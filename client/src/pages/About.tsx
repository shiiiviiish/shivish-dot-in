import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

function AnimatedChar({ char, progress, start, end }: { char: string; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  return <motion.span style={{ opacity, display: 'inline' }}>{char === ' ' ? '\u00A0' : char}</motion.span>
}

function AnimatedText({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.15'] })
  return (
    <p ref={ref} style={style}>
      {text.split('').map((char, i) => {
        const start = i / text.length
        const end = Math.min(start + 0.05, 1)
        return <AnimatedChar key={i} char={char} progress={scrollYProgress} start={start} end={end} />
      })}
    </p>
  )
}

export default function About() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const serif = "'Instrument Serif', serif"
  const skills = ['HTML & CSS', 'JavaScript', 'TypeScript', 'React', 'Git & GitHub', 'Vercel']

  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return ()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  }, [])

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:'none',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(100,200,140,0.8)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:44,height:44,border:'1px solid rgba(100,200,140,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(7,16,13,0.8)',backdropFilter:'blur(12px)'}}>
        <Link to="/" style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',textDecoration:'none',letterSpacing:'-0.02em'}}>Shivish</Link>
        <div style={{display:'flex',gap:40}}>
          {[['work','/work'],['about','/about'],['contact','/contact']].map(([l,p])=>(
            <Link key={l} to={p} style={{color:p==='/about'?'#e8e4d9':'rgba(232,228,217,0.45)',fontSize:13,textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.12em'}}>{l}</Link>
          ))}
        </div>
      </nav>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'140px 48px 80px'}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:60}}>About</motion.p>
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:serif,fontSize:'clamp(48px,8vw,100px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:80}}>
          Who's<br/><em style={{color:'rgba(232,228,217,0.3)',fontStyle:'italic'}}>Shivish?</em>
        </motion.h1>

        <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:80}}>
          <div>
            <AnimatedText
              text="19 year old BTech student from Chandigarh. I code for the vibe of it — started building websites to upskill, ended up actually loving the craft. When I'm not coding, I'm editing videos, shooting photos, or going down AI rabbit holes. Always building something."
              style={{fontSize:16,color:'rgba(232,228,217,0.55)',lineHeight:1.85,fontWeight:300}}
            />
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.3,duration:0.8}}
              style={{marginTop:40,display:'flex',gap:16}}>
              <Link to="/work" style={{borderRadius:9999,padding:'12px 28px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>See my work</Link>
              <Link to="/contact" style={{borderRadius:9999,padding:'12px 28px',border:'0.5px solid rgba(232,228,217,0.2)',color:'#e8e4d9',fontSize:13,textDecoration:'none'}}>Say hello</Link>
            </motion.div>
          </div>

          <div>
            <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
              style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:32}}>Skills</motion.p>
            <div style={{display:'flex',flexDirection:'column'}}>
              {skills.map((s,i)=>(
                <motion.div key={s} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.07,duration:0.6}}
                  style={{padding:'16px 0',borderBottom:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontSize:14,color:'rgba(232,228,217,0.55)',fontWeight:300}}>{s}</span>
                  <span style={{fontSize:11,color:'rgba(232,228,217,0.2)',letterSpacing:'0.1em'}}>—</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *{cursor:none;box-sizing:border-box;margin:0;padding:0}
      `}</style>
    </div>
  )
}