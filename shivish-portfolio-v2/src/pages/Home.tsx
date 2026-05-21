import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Home() {
  const fogRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = fogRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, animId: number
    type P = { x: number; y: number; r: number; dx: number; dy: number; a: number; warm: boolean }
    let ps: P[] = []
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    const makeP = (): P => ({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*300+120, dx:(Math.random()-0.5)*0.18, dy:(Math.random()-0.5)*0.09, a:Math.random()*0.04+0.008, warm:Math.random()>0.5 })
    const draw = () => {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#07100d'; ctx.fillRect(0,0,W,H)
      for(const p of ps){const c=p.warm?'80,160,110':'50,120,90';const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(${c},${p.a})`);g.addColorStop(1,`rgba(${c},0)`);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<-p.r)p.x=W+p.r;if(p.x>W+p.r)p.x=-p.r;if(p.y<-p.r)p.y=H+p.r;if(p.y>H+p.r)p.y=-p.r}
      animId=requestAnimationFrame(draw)
    }
    resize(); ps=Array.from({length:18},makeP); draw()
    window.addEventListener('resize',resize)
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  }, [])

  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return ()=>{ document.removeEventListener('mousemove',onMove); cancelAnimationFrame(rafId) }
  }, [])

  const serif = "'Instrument Serif', serif"

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',overflowX:'hidden',cursor:'none',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(100,200,140,0.8),0 0 28px rgba(100,200,140,0.4)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:44,height:44,border:'1px solid rgba(100,200,140,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      <canvas ref={fogRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>

      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:50,padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.2}}
          style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',letterSpacing:'-0.02em'}}>
          Shivish
        </motion.div>
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.4}}
          style={{display:'flex',gap:40,alignItems:'center'}}>
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
        </motion.div>
      </nav>

      <section style={{position:'relative',minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-end',zIndex:10,overflow:'hidden',padding:16}}>
        <div style={{position:'absolute',inset:16,borderRadius:24,overflow:'hidden',zIndex:0,border:'1px solid rgba(255,255,255,0.1)'}}>
          <video autoPlay loop muted playsInline style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:0}}>
            <source src="/videos/homevideo.mp4" type="video/mp4"/>
          </video>
          <div style={{position:'absolute',inset:0,zIndex:1,opacity:0.55,mixBlendMode:'overlay',backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'200px',pointerEvents:'none'}}/>
          <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,transparent 35%,rgba(0,0,0,0.75) 100%)',pointerEvents:'none'}}/>
        </div>

        <motion.div animate={{y:[0,-8,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
          style={{position:'absolute',top:36,right:72,zIndex:10}}>
          <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.08)',backdropFilter:'blur(12px)',border:'0.5px solid rgba(255,255,255,0.15)',borderRadius:9999,padding:'8px 16px'}}>
            <span style={{width:6,height:6,background:'#4ade80',borderRadius:'50%',boxShadow:'0 0 8px #4ade80',animation:'pulse 2s infinite',display:'inline-block'}}/>
            <span style={{fontSize:12,color:'rgba(232,228,217,0.8)',letterSpacing:'0.1em',textTransform:'uppercase'}}>Available for work</span>
          </div>
        </motion.div>

        <div style={{position:'absolute',top:'50%',right:64,transform:'translateY(-50%)',maxWidth:260,zIndex:10}}>
          <motion.p initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.4,duration:0.9,ease:[0.16,1,0.3,1]}}
            style={{fontSize:14,color:'rgba(232,228,217,0.6)',lineHeight:1.7,fontWeight:300}}>
            BTech student & vibe coder from Chandigarh. Building things for the web — one project at a time.
          </motion.p>
        </div>

        <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3,duration:0.5}}
          style={{fontFamily:serif,fontSize:'clamp(90px,16vw,220px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.04em',margin:0,position:'relative',zIndex:10,paddingBottom:60,paddingLeft:32}}>
          <span style={{display:'block',overflow:'hidden'}}>
            <motion.span style={{display:'block'}} initial={{y:'100%'}} animate={{y:0}} transition={{delay:0.5,duration:1.1,ease:[0.16,1,0.3,1]}}>
              Shivish
            </motion.span>
          </span>
          <span style={{display:'block',overflow:'hidden'}}>
            <motion.span style={{display:'block',color:'rgba(232,228,217,0.5)',fontStyle:'italic'}} initial={{y:'100%'}} animate={{y:0}} transition={{delay:0.65,duration:1.1,ease:[0.16,1,0.3,1]}}>
              vibe coder.
            </motion.span>
          </span>
        </motion.h1>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.6,duration:0.8}}
          style={{display:'flex',gap:16,position:'relative',zIndex:10,paddingLeft:32,paddingBottom:32,alignItems:'center'}}>
          <Link to="/work" style={{borderRadius:9999,padding:'12px 28px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            See my work
          </Link>
          <Link to="/contact" style={{fontSize:13,color:'rgba(232,228,217,0.5)',textDecoration:'none',letterSpacing:'0.05em',transition:'color 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.5)')}>
            Say hello →
          </Link>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2,duration:0.8}}
          style={{position:'absolute',bottom:40,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.3)',textTransform:'uppercase',zIndex:10}}>
          <span>Scroll</span>
          <div style={{width:1,height:36,background:'linear-gradient(to bottom,rgba(232,228,217,0.3),transparent)',animation:'scrollPulse 1.5s ease infinite'}}/>
        </motion.div>
      </section>

      <div style={{overflow:'hidden',borderTop:'0.5px solid rgba(232,228,217,0.06)',borderBottom:'0.5px solid rgba(232,228,217,0.06)',padding:'16px 0',position:'relative',zIndex:10}}>
        <div style={{display:'flex',gap:56,width:'max-content',animation:'marquee 28s linear infinite'}}>
          {['BTech Student','—','Vibe Coder','—','AI Enthusiast','—','Web Dev','—','Photography','—','Video Editing','—','Chandigarh','—',
            'BTech Student','—','Vibe Coder','—','AI Enthusiast','—','Web Dev','—','Photography','—','Video Editing','—','Chandigarh','—'].map((t,i)=>(
            <span key={i} style={{fontFamily:serif,fontStyle:'italic',fontSize:18,whiteSpace:'nowrap',color:t==='—'?'rgba(232,228,217,0.2)':'rgba(232,228,217,0.12)'}}>{t}</span>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *{cursor:none;box-sizing:border-box;margin:0;padding:0}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes scrollPulse{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
      `}</style>
    </div>
  )
}