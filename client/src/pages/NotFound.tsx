import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const serif = "'Instrument Serif', serif"
const mono  = "'DM Mono', monospace"

export default function NotFound() {
  const fogRef    = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef  = useRef<HTMLDivElement>(null)
  const isMobile  = window.innerWidth < 768

  // Fog canvas
  useEffect(() => {
    const canvas = fogRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W=0, H=0, raf=0
    const ps: any[] = []
    const resize = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight }
    resize()
    for(let i=0;i<6;i++) ps.push({x:Math.random()*W,y:Math.random()*H,r:180+Math.random()*300,dx:(Math.random()-.5)*.15,dy:(Math.random()-.5)*.08,a:.018+Math.random()*.028})
    const draw = () => {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#07100d'; ctx.fillRect(0,0,W,H)
      for(const p of ps){
        const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r)
        g.addColorStop(0,`rgba(74,222,128,${p.a})`); g.addColorStop(1,'transparent')
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill()
        p.x+=p.dx; p.y+=p.dy
        if(p.x<-p.r)p.x=W+p.r; if(p.x>W+p.r)p.x=-p.r
        if(p.y<-p.r)p.y=H+p.r; if(p.y>H+p.r)p.y=-p.r
      }
      raf=requestAnimationFrame(draw)
    }
    draw(); window.addEventListener('resize',resize)
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])

  // Cursor
  useEffect(() => {
    if(isMobile)return
    let mX=0,mY=0,tX=0,tY=0,rafId=0
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*.08;tY+=(mY-tY)*.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove); loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',height:'100vh',overflow:'hidden',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>

      <canvas ref={fogRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>

      {!isMobile && <>
        <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
        <div ref={trailRef}  style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      </>}

      {/* Vignette */}
      <div style={{position:'fixed',inset:0,background:'radial-gradient(ellipse at center,transparent 30%,rgba(0,0,0,0.7) 100%)',pointerEvents:'none',zIndex:1}}/>

      {/* Content */}
      <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'0 24px'}}>

        {/* 404 number */}
        <div style={{position:'relative',marginBottom:8}}>
          <p style={{
            fontFamily:serif,
            fontSize:'clamp(140px,25vw,280px)',
            fontWeight:400,
            lineHeight:0.85,
            letterSpacing:'-0.06em',
            color:'rgba(232,228,217,0.04)',
            margin:0,
            userSelect:'none',
            pointerEvents:'none',
          }}>404</p>
          <p style={{
            fontFamily:serif,
            fontStyle:'italic',
            fontSize:'clamp(28px,5vw,60px)',
            fontWeight:400,
            letterSpacing:'-0.03em',
            color:'#e8e4d9',
            position:'absolute',
            inset:0,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            margin:0,
          }}>
            Dog mode. 🐕
          </p>
        </div>

        {/* Dog message */}
        <p style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(15px,2vw,20px)',color:'rgba(232,228,217,0.55)',marginBottom:8,lineHeight:1.7,maxWidth:480,margin:'0 auto 8px'}}>
          Shivish is out playing with his dogs right now.
        </p>
        <p style={{fontFamily:mono,fontSize:'clamp(10px,1.3vw,12px)',letterSpacing:'0.14em',color:'rgba(232,228,217,0.25)',marginBottom:40}}>
          Not in work mode. Check back later.
        </p>

        {/* Links */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/" style={{borderRadius:9999,padding:'12px 28px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')}
            onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
            Go home →
          </Link>
          <Link to="/work" style={{borderRadius:9999,padding:'12px 24px',border:'0.5px solid rgba(232,228,217,0.2)',color:'rgba(232,228,217,0.6)',fontSize:13,textDecoration:'none',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.4)';e.currentTarget.style.color='#e8e4d9'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.2)';e.currentTarget.style.color='rgba(232,228,217,0.6)'}}>
            See my work
          </Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono&family=Instrument+Serif:ital@0;1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @media(min-width:769px){*{cursor:none;}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}