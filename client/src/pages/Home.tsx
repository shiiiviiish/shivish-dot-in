import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import WhoIsShivish from '../components/WhoIsShivish'
import Nav from '../components/Nav'
import FaceTilt from '../components/FaceTilt'

function WordPullUp({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <span ref={ref} style={{ display: 'block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
          <motion.span style={{ display: 'inline-block', ...style }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

const serif = "'Instrument Serif', serif"

export default function Home() {
  const fogRef    = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = fogRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, animId: number
    type P = { x: number; y: number; r: number; dx: number; dy: number; a: number; warm: boolean }
    let ps: P[] = []
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    const makeP = (): P => ({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*320+140, dx:(Math.random()-0.5)*0.18, dy:(Math.random()-0.5)*0.09, a:Math.random()*0.04+0.008, warm:Math.random()>0.5 })
    const draw = () => {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#07100d'; ctx.fillRect(0,0,W,H)
      for(const p of ps){const c=p.warm?'80,160,110':'50,120,90';const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(${c},${p.a})`);g.addColorStop(1,`rgba(${c},0)`);ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();p.x+=p.dx;p.y+=p.dy;if(p.x<-p.r)p.x=W+p.r;if(p.x>W+p.r)p.x=-p.r;if(p.y<-p.r)p.y=H+p.r;if(p.y>H+p.r)p.y=-p.r}
      animId=requestAnimationFrame(draw)
    }
    resize(); ps=Array.from({length:8},makeP); draw()
    window.addEventListener('resize',resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize); ctx.clearRect(0,0,W,H) }
  }, [])

  useEffect(() => {
    if (window.innerWidth < 768) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove); loop()
    return () => { document.removeEventListener('mousemove',onMove); cancelAnimationFrame(rafId) }
  }, [])

  const projects = [
    {num:'01',title:'Happiness Through Art',chip:'Client · 2025',desc:'Portfolio for artist Kavya Atray. Built end-to-end.',tags:['TypeScript','React','Vercel'],url:'https://hta-seven.vercel.app/'},
    {num:'02',title:'This Portfolio',chip:'Personal · 2025',desc:'Cinematic dark portfolio with fog, glass and animations.',tags:['React','GSAP','Framer Motion'],url:'https://shivish.in'},
  ]

  const what = [
    {icon:'{ }',label:'Code',desc:'Building websites and web apps. React, TypeScript, Tailwind.'},
    {icon:'◎',label:'Edit',desc:'Motion graphics and video editing. Visual storytelling.'},
    {icon:'⬡',label:'Shoot',desc:'Photography — street, portrait, aesthetic.'},
  ]

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',overflowX:'hidden',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} className="desktop-cursor" style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(100,200,140,0.8)'}}/>
      <div ref={trailRef}  className="desktop-cursor" style={{position:'fixed',width:44,height:44,border:'1px solid rgba(100,200,140,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      <canvas ref={fogRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>

      <Nav/>

      {/* ── HERO ── */}
      <section style={{position:'relative',minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-end',zIndex:10,overflow:'hidden',padding:12}}>
        <div style={{position:'absolute',inset:12,borderRadius:20,overflow:'hidden',zIndex:0,border:'1px solid rgba(255,255,255,0.1)'}}>
          <video autoPlay loop muted playsInline style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:0}}>
            <source src="/videos/homevideo.mp4" type="video/mp4"/>
          </video>
          <div style={{position:'absolute',inset:0,zIndex:1,opacity:0.55,mixBlendMode:'overlay',backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:'200px',pointerEvents:'none'}}/>
          <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,transparent 40%,rgba(0,0,0,0.8) 100%)',pointerEvents:'none'}}/>
        </div>

        {/* Hero heading */}
        <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3,duration:0.5}}
          style={{fontFamily:serif,fontSize:'clamp(72px,18vw,220px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.04em',margin:0,position:'relative',zIndex:10,paddingBottom:'clamp(80px,12vw,120px)',paddingLeft:'clamp(16px,4vw,32px)'}}>
          <span style={{display:'block',overflow:'hidden'}}>
            <motion.span style={{display:'block'}} initial={{y:'100%'}} animate={{y:0}} transition={{delay:0.5,duration:1.1,ease:[0.16,1,0.3,1]}}>Shivish</motion.span>
          </span>
          <span style={{display:'block',overflow:'hidden'}}>
            <motion.span style={{display:'block',color:'rgba(232,228,217,0.5)',fontStyle:'italic'}} initial={{y:'100%'}} animate={{y:0}} transition={{delay:0.65,duration:1.1,ease:[0.16,1,0.3,1]}}>vibe coder.</motion.span>
          </span>
        </motion.h1>

        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.2,duration:0.8}}
          className="hero-desc"
          style={{fontSize:13,color:'rgba(232,228,217,0.55)',lineHeight:1.65,fontWeight:300,position:'relative',zIndex:10,paddingLeft:'clamp(16px,4vw,32px)',paddingBottom:16,maxWidth:320}}>
          BTech student & vibe coder from Chandigarh. Building things for the web.
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.5,duration:0.8}}
          style={{display:'flex',gap:12,position:'relative',zIndex:10,paddingLeft:'clamp(16px,4vw,32px)',paddingBottom:'clamp(24px,5vw,32px)',alignItems:'center',flexWrap:'wrap'}}>
          <Link to="/work" style={{borderRadius:9999,padding:'11px 24px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>See my work</Link>
          <Link to="/contact" style={{fontSize:13,color:'rgba(232,228,217,0.5)',textDecoration:'none',letterSpacing:'0.05em'}}>Say hello →</Link>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2,duration:0.8}}
          style={{position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:6,fontSize:9,letterSpacing:'0.2em',color:'rgba(232,228,217,0.3)',textTransform:'uppercase',zIndex:10}}>
          <span>Scroll</span>
          <div style={{width:1,height:28,background:'linear-gradient(to bottom,rgba(232,228,217,0.3),transparent)',animation:'scrollPulse 1.5s ease infinite'}}/>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div style={{overflow:'hidden',borderTop:'0.5px solid rgba(232,228,217,0.06)',borderBottom:'0.5px solid rgba(232,228,217,0.06)',padding:'14px 0',position:'relative',zIndex:10}}>
        <div style={{display:'flex',gap:40,width:'max-content',animation:'marquee 22s linear infinite'}}>
          {['BTech Student','—','Vibe Coder','—','AI Enthusiast','—','Web Dev','—','Photography','—','Chandigarh','—',
            'BTech Student','—','Vibe Coder','—','AI Enthusiast','—','Web Dev','—','Photography','—','Chandigarh','—'].map((t,i)=>(
            <span key={i} style={{fontFamily:serif,fontStyle:'italic',fontSize:16,whiteSpace:'nowrap',color:t==='—'?'rgba(232,228,217,0.2)':'rgba(232,228,217,0.12)'}}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── FACE INTRO SECTION ── */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'80px 20px',position:'relative',zIndex:10}}>
        <div className="face-intro-grid">
          {/* Left — text */}
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
            style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:20}}>{'{HOLA}'}</p>
            <h2 style={{fontFamily:serif,fontSize:'clamp(36px,6vw,72px)',fontWeight:400,lineHeight:1,letterSpacing:'-0.03em',marginBottom:24}}>
              I'm Shivish.<br/>
              <em style={{color:'rgba(232,228,217,0.25)',fontStyle:'italic'}}>Vibe Coder.</em>
            </h2>
            <p style={{fontSize:15,color:'rgba(232,228,217,0.45)',lineHeight:1.8,fontWeight:300,maxWidth:400,marginBottom:32}}>
              19 year old BTech student from Chandigarh. I build cinematic websites, shoot street photography, and go down AI rabbit holes at 2am.
            </p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {['React','TypeScript','Framer Motion','Photography'].map(s=>(
                <span key={s} style={{fontSize:11,padding:'5px 14px',borderRadius:9999,border:'0.5px solid rgba(232,228,217,0.1)',color:'rgba(232,228,217,0.4)',letterSpacing:'0.04em'}}>{s}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — FaceTilt */}
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.2,duration:1,ease:[0.16,1,0.3,1]}}
            style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <FaceTilt
  width="clamp(260px,30vw,380px)"
  noBackground={true}
/>
          </motion.div>
        </div>
      </section>

      {/* WHO IS SHIVISH */}
      <WhoIsShivish />

      {/* WHAT I DO */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'60px 20px 80px',position:'relative',zIndex:10}} className="what-section">
        <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:24}}>What I do</motion.p>
        <div className="what-grid">
          <h2 style={{fontFamily:serif,fontSize:'clamp(40px,8vw,80px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:40}}>
            <WordPullUp text="Code." delay={0}/>
            <WordPullUp text="Edit." delay={0.1}/>
            <WordPullUp text="Shoot." delay={0.2}/>
            <WordPullUp text="Vibe." delay={0.3} style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}/>
          </h2>
          <div style={{display:'flex',flexDirection:'column'}}>
            {what.map((item,i)=>(
              <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.8}}
                style={{padding:'20px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',display:'flex',gap:20}}>
                <span style={{fontFamily:serif,fontSize:18,color:'rgba(232,228,217,0.2)',paddingTop:3,flexShrink:0}}>{item.icon}</span>
                <div>
                  <h3 style={{fontFamily:serif,fontSize:20,fontWeight:400,color:'#e8e4d9',marginBottom:6}}>{item.label}</h3>
                  <p style={{fontSize:13,color:'rgba(232,228,217,0.4)',lineHeight:1.6,fontWeight:300}}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 20px 80px',position:'relative',zIndex:10}}>
        <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:32}}>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)'}}>Selected Work</p>
          <Link to="/work" style={{fontSize:12,color:'rgba(232,228,217,0.35)',textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.08em'}}>All ↗</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
          {projects.map((p,i)=>(
            <motion.a key={i} href={p.url} target="_blank" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.8}}
              style={{display:'grid',gridTemplateColumns:'40px 1fr auto',gap:16,padding:'28px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',textDecoration:'none',alignItems:'start',transition:'padding-left 0.4s'}}
              onMouseEnter={e=>{e.currentTarget.style.paddingLeft='12px'}} onMouseLeave={e=>{e.currentTarget.style.paddingLeft='0'}}>
              <span style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:'rgba(232,228,217,0.2)',paddingTop:4}}>{p.num}</span>
              <div>
                <p style={{fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:6}}>{p.chip}</p>
                <h3 style={{fontFamily:serif,fontSize:'clamp(18px,4vw,32px)',fontWeight:400,color:'#e8e4d9',marginBottom:8,letterSpacing:'-0.02em'}}>{p.title}</h3>
                <p style={{fontSize:12,color:'rgba(232,228,217,0.35)',lineHeight:1.6,fontWeight:300}}>{p.desc}</p>
                <div style={{display:'flex',gap:6,marginTop:12,flexWrap:'wrap'}}>
                  {p.tags.map(t=><span key={t} style={{fontSize:10,padding:'2px 8px',borderRadius:9999,border:'0.5px solid rgba(232,228,217,0.1)',color:'rgba(232,228,217,0.3)'}}>{t}</span>)}
                </div>
              </div>
              <span style={{fontSize:18,color:'rgba(232,228,217,0.2)',paddingTop:20}}>↗</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 20px 80px',position:'relative',zIndex:10}}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}
          style={{borderTop:'0.5px solid rgba(232,228,217,0.06)',paddingTop:60,display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:32}}>
          <div>
            <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:20}}>Got a project?</p>
            <h2 style={{fontFamily:serif,fontSize:'clamp(36px,8vw,96px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.03em'}}>
              Let's make<br/><em style={{color:'rgba(232,228,217,0.25)',fontStyle:'italic'}}>something.</em>
            </h2>
          </div>
          <Link to="/contact" style={{borderRadius:9999,padding:'14px 32px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>
            Say hello →
          </Link>
        </motion.div>
      </section>

      <footer style={{position:'relative',zIndex:10,padding:'24px 20px',fontSize:12,color:'rgba(232,228,217,0.18)',borderTop:'0.5px solid rgba(232,228,217,0.05)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span>Shivish · 2025</span>
        <span style={{fontFamily:serif,fontStyle:'italic'}}>Built with vibe.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes scrollPulse{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        @media (min-width: 769px) {
          * { cursor: none; }
          .desktop-cursor { display: block !important; }
          .what-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
          .what-section { padding: 80px 48px 120px !important; }
          section { padding-left: 48px !important; padding-right: 48px !important; }
          .hero-desc { display: none; }
          .face-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        }
        @media (max-width: 768px) {
          .desktop-cursor { display: none !important; }
          .what-grid { display: block; }
          .face-intro-grid { display: flex; flex-direction: column-reverse; gap: 40px; }
        }
      `}</style>
    </div>
  )
}