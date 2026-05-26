import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const serif = "'Instrument Serif', serif"
const mono  = "'DM Mono', monospace"

const experience = [
  { year: '2025 — now', role: 'Freelance Web Developer', place: 'Chandigarh', desc: 'Built portfolio websites for clients. HTA — Happiness Through Art.' },
  { year: '2024', role: 'Started Coding', place: 'Self-taught', desc: 'Picked up React, TypeScript and Tailwind. Never stopped.' },
  { year: '2023', role: 'BTech Started', place: 'Chandigarh', desc: 'Enrolled in BTech. Started exploring design and tech seriously.' },
]

const skillGroups = {
  'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'Tools':    ['Git & GitHub', 'Vercel', 'VS Code', 'Figma'],
  'Creative': ['Photography', 'Video Editing', 'UI Design'],
}

const skillsFlat = ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Git & GitHub', 'Vercel', 'Figma', 'Photography', 'Video Editing']

// skill bars for the KVS section
const skillBars = [
  { name: '{CODE}',       pct: 88 },
  { name: '{DESIGN}',     pct: 78 },
  { name: '{EDIT}',       pct: 75 },
  { name: '{SHOOT}',      pct: 70 },
  { name: '{VIBE}',       pct: 100, inf: true },
]

const polaroids = [
  { label: 'At my desk',         color: '#0d1f17', accent: '#4ade80',  rotate: -3   },
  { label: 'Out shooting',       color: '#0f1525', accent: '#60a5fa',  rotate:  2   },
  { label: 'Late night coding',  color: '#1f0a12', accent: '#f472b6',  rotate: -1.5 },
]

const services = [
  { num: '01', title: 'Web Design',          desc: 'Clean, cinematic websites that feel premium and work flawlessly.' },
  { num: '02', title: 'Web Development',     desc: 'React, TypeScript, Tailwind. Fast, scalable, well-structured code.' },
  { num: '03', title: 'Motion & Interaction',desc: 'Animations and interactions that bring interfaces to life.' },
]

function NameReveal({ trigger }: { trigger: boolean }) {
  const text = 'Shivish.'
  if (!trigger) return <span style={{opacity:0}}>{text}</span>
  return (
    <span style={{display:'inline-flex'}}>
      {text.split('').map((c,i)=>(
        <span key={i} style={{display:'inline-block',animation:'blurIn 0.7s ease forwards',animationDelay:`${i*0.08}s`,opacity:0}}>{c}</span>
      ))}
    </span>
  )
}

function CountUp({ value, delay=0 }: { value: string; delay?: number }) {
  const ref   = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref,{once:true,margin:'-50px'})
  const isNum = !isNaN(Number(value))
  useEffect(()=>{
    if(!isInView||!isNum||!ref.current)return
    const target=Number(value),duration=2000,start=performance.now(),chars='0123456789'
    const tick=(now:number)=>{
      const progress=Math.min((now-start)/duration,1)
      const eased=1-Math.pow(1-progress,4)
      const current=Math.floor(eased*target)
      if(progress<0.85){
        const scrambled=String(current).split('').map(d=>Math.random()>0.5?d:chars[Math.floor(Math.random()*chars.length)]).join('')
        if(ref.current)ref.current.textContent='+'+scrambled
      }else{if(ref.current)ref.current.textContent='+'+current}
      if(progress<1)requestAnimationFrame(tick)
      else if(ref.current)ref.current.textContent='+'+target
    }
    setTimeout(()=>requestAnimationFrame(tick),delay)
  },[isInView])
  return <span ref={ref} style={{display:'inline-block'}}>{isNum?'+0':`+${value}`}</span>
}

// Animated skill bar
function SkillBar({ pct }: { pct: number; inf?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref,{once:true,margin:'-40px'})
  return (
    <div ref={ref} style={{width:90,height:1,background:'rgba(232,228,217,0.08)',position:'relative',flexShrink:0}}>
      <div style={{
        position:'absolute',left:0,top:0,height:1,background:'#4ade80',
        width: isInView ? `${pct}%` : '0%',
        transition:'width 1.2s cubic-bezier(0.16,1,0.3,1)',
      }}/>
    </div>
  )
}

export default function About() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const trailRef   = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [trigger, setTrigger] = useState(false)

  useEffect(()=>{ setTrigger(true) },[])

  useEffect(()=>{
    if(window.innerWidth<768)return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  useEffect(()=>{
    const el=marqueeRef.current;if(!el)return
    let x=0,raf:number
    const tick=()=>{x-=0.35;if(x<-el.scrollWidth/2)x=0;el.style.transform=`translateX(${x}px)`;raf=requestAnimationFrame(tick)}
    raf=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(raf)
  },[])

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',fontFamily:"'DM Sans',sans-serif",overflowX:'hidden'}}>
      <div ref={cursorRef} className="desktop-cursor" style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
      <div ref={trailRef}  className="desktop-cursor" style={{position:'fixed',width:44,height:44,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <Nav/>

      {/* ── HERO ── */}
      <section id="tour-about-hero" style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',zIndex:10,overflow:'hidden',padding:'80px clamp(20px,5vw,48px) 0'}}>
        <div style={{flex:1,position:'relative',zIndex:2}}>

          {/* KVS-style eyebrow */}
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}}
            style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
            <span style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)'}}>{'{ABOUT · 2025}'}</span>
            <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.06)',backdropFilter:'blur(12px)',border:'0.5px solid rgba(255,255,255,0.12)',borderRadius:9999,padding:'4px 10px'}}>
              <span style={{width:5,height:5,background:'#4ade80',borderRadius:'50%',boxShadow:'0 0 6px #4ade80',display:'inline-block'}}/>
              <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.7)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Open to work</span>
            </div>
          </motion.div>

          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.8}}
            style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(20px,3vw,32px)',color:'rgba(232,228,217,0.4)',marginBottom:8,letterSpacing:'-0.01em'}}>
            Hola! I'm
          </motion.p>

          <h1 style={{fontFamily:serif,fontSize:'clamp(64px,12vw,160px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.05em',marginBottom:20,color:'#e8e4d9'}}>
            <NameReveal trigger={trigger}/>
          </h1>

          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.8}}
            style={{fontFamily:mono,fontSize:'clamp(11px,1.5vw,14px)',color:'rgba(232,228,217,0.3)',letterSpacing:'0.04em',marginBottom:32,maxWidth:420}}>
            {'{ a developer & vibe coder from Chandigarh }'}
          </motion.p>

          {/* Stats — KVS style */}
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.8,duration:0.8}}
            style={{display:'flex',marginBottom:40,border:'0.5px solid rgba(232,228,217,0.07)',borderRadius:8,overflow:'hidden',flexWrap:'wrap'}}>
            {[
              {num:'2', label:'{PROJECTS}'},
              {num:'19',label:'{YEARS OLD}'},
              {num:'3', label:'{SKILL AREAS}'},
            ].map((s,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.9+i*0.15,duration:0.7}}
                style={{flex:1,padding:'20px 24px',borderRight:i<2?'0.5px solid rgba(232,228,217,0.07)':'none',minWidth:100}}>
                <p style={{fontFamily:serif,fontSize:'clamp(28px,4vw,52px)',fontWeight:400,color:'#e8e4d9',lineHeight:1,letterSpacing:'-0.03em',fontVariantNumeric:'tabular-nums'}}>
                  <CountUp value={s.num} delay={i*200}/>
                </p>
                <p style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.25)',letterSpacing:'0.16em',marginTop:8}}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1,duration:0.8}}
            style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',marginBottom:40}}>
            <Link to="/work" style={{borderRadius:9999,padding:'12px 28px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>
              (See my work)
            </Link>
            <a href="mailto:hello@shivish.in" style={{fontSize:13,color:'rgba(232,228,217,0.4)',textDecoration:'none',letterSpacing:'0.05em',borderBottom:'0.5px solid rgba(232,228,217,0.15)',paddingBottom:2}}>
              Say hello →
            </a>
          </motion.div>

          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4,duration:0.8}}
            style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.2)',letterSpacing:'0.15em'}}>
            {'{SCROLL DOWN ↓}'}
          </motion.p>
        </div>

        <motion.div initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{delay:0.4,duration:1.2,ease:[0.16,1,0.3,1]}}
          className="hero-face" style={{position:'relative',zIndex:2,flexShrink:0}}>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute',inset:-40,background:'radial-gradient(circle at center, rgba(74,222,128,0.08) 0%, transparent 70%)',pointerEvents:'none'}}/>
            <img src="/images/shivishanimated.png" alt="Shivish"
              style={{width:'clamp(280px,35vw,480px)',height:'auto',objectFit:'contain',objectPosition:'bottom',filter:'drop-shadow(0 0 40px rgba(74,222,128,0.1))',position:'relative',zIndex:1}}/>
          </div>
        </motion.div>
      </section>

      {/* ── INTRO SPLIT ── */}
      <section style={{maxWidth:1200,margin:'0 auto',padding:'100px clamp(20px,5vw,48px)'}}>
        <div className="intro-grid">
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}>
            {/* KVS label */}
            <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:24}}>{'{ABOUT_ME}'}</p>
            <h2 style={{fontFamily:serif,fontSize:'clamp(32px,5vw,64px)',fontWeight:400,lineHeight:1.05,letterSpacing:'-0.03em',color:'rgba(232,228,217,0.8)'}}>
              Shivish is a developer focused on digital experience and creative development.
            </h2>
          </motion.div>
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2,duration:1}} style={{paddingTop:60}}>
            <p style={{fontSize:'clamp(14px,1.5vw,16px)',color:'rgba(232,228,217,0.5)',lineHeight:1.85,fontWeight:300,marginBottom:20}}>
              With a strong eye for visual storytelling and interaction, I craft expressive, engaging websites that blend design with code. My work brings ideas to life through thoughtful aesthetics, smooth transitions, and immersive experiences.
            </p>
            <p style={{fontSize:'clamp(14px,1.5vw,16px)',color:'rgba(232,228,217,0.5)',lineHeight:1.85,fontWeight:300,marginBottom:32}}>
              I'm a 19 year old BTech student from Chandigarh. When I'm not building websites, I'm editing videos, shooting photos, or going down AI rabbit holes.
            </p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Link to="/work" style={{borderRadius:9999,padding:'11px 24px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>(See my work)</Link>
              <a href="mailto:hello@shivish.in" style={{borderRadius:9999,padding:'11px 24px',border:'0.5px solid rgba(232,228,217,0.2)',color:'rgba(232,228,217,0.6)',fontSize:13,textDecoration:'none'}}>(Contact)</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS MARQUEE ── */}
      <div style={{overflow:'hidden',borderTop:'0.5px solid rgba(232,228,217,0.06)',borderBottom:'0.5px solid rgba(232,228,217,0.06)',padding:'16px 0',position:'relative'}}>
        <div ref={marqueeRef} style={{display:'flex',gap:48,width:'max-content'}}>
          {[...skillsFlat,'·',...skillsFlat,'·',...skillsFlat].map((s,i)=>(
            <span key={i} style={{fontFamily:serif,fontStyle:'italic',fontSize:16,whiteSpace:'nowrap',color:s==='·'?'rgba(232,228,217,0.15)':'rgba(232,228,217,0.2)'}}>{s}</span>
          ))}
        </div>
      </div>

      {/* ── PORTRAIT + EXPERIENCE ── */}
      <section style={{maxWidth:1200,margin:'0 auto',padding:'100px clamp(20px,5vw,48px)'}}>
        <div className="portrait-grid">
          <motion.div initial={{opacity:0,x:-40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}>
            <div style={{position:'relative',maxWidth:420}}>
              <div style={{aspectRatio:'3/4',borderRadius:16,overflow:'hidden',border:'0.5px solid rgba(232,228,217,0.08)',position:'relative'}}>
                <img src="/images/shivishanimated.png" alt="Shivish" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center top'}}/>
                <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 60%,rgba(7,16,13,0.8) 100%)'}}/>
                <div style={{position:'absolute',bottom:20,left:20,right:20}}>
                  <div style={{background:'rgba(7,16,13,0.7)',backdropFilter:'blur(12px)',border:'0.5px solid rgba(74,222,128,0.15)',borderRadius:10,padding:'10px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <p style={{fontFamily:serif,fontSize:16,color:'#e8e4d9',margin:0}}>Shivish</p>
                      <p style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.4)',letterSpacing:'0.1em',textTransform:'uppercase',marginTop:2}}>{'{VIBE CODER}'}</p>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <span style={{width:6,height:6,background:'#4ade80',borderRadius:'50%',boxShadow:'0 0 6px #4ade80',display:'inline-block'}}/>
                      <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.6)',letterSpacing:'0.08em'}}>Open</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            {/* Experience */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}} style={{marginBottom:48}}>
              <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:24}}>{'{EXPERIENCE}'}</p>
              <div style={{display:'flex',flexDirection:'column'}}>
                {experience.map((e,i)=>(
                  <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.7}}
                    style={{padding:'20px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',display:'grid',gridTemplateColumns:'140px 1fr',gap:20}}>
                    <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.25)',letterSpacing:'0.05em',paddingTop:3}}>{e.year}</span>
                    <div>
                      <p style={{fontFamily:serif,fontSize:'clamp(16px,2.5vw,22px)',color:'#e8e4d9',fontWeight:400,marginBottom:2,letterSpacing:'-0.01em'}}>{e.role}</p>
                      <p style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.3)',marginBottom:4,letterSpacing:'0.08em'}}>· {e.place}</p>
                      <p style={{fontSize:13,color:'rgba(232,228,217,0.4)',lineHeight:1.6,fontWeight:300}}>{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* KVS skill bars */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1,duration:0.8}} style={{marginBottom:40}}>
              <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:20}}>{'{SKILLS}'}</p>
              <div style={{display:'flex',flexDirection:'column',gap:0}}>
                {skillBars.map((s,i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 0',borderBottom:'0.5px solid rgba(232,228,217,0.05)'}}>
                    <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.45)',letterSpacing:'0.1em'}}>{s.name}</span>
                    <SkillBar pct={s.pct} inf={s.inf}/>
                    <span style={{fontFamily:mono,fontSize:9,color:'rgba(74,222,128,0.55)',minWidth:28,textAlign:'right'}}>
                      {s.inf ? '∞%' : `${s.pct}%`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills tags */}
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.2,duration:0.8}}>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {skillsFlat.map(s=>(
                  <span key={s} style={{fontFamily:mono,fontSize:10,padding:'5px 14px',borderRadius:9999,border:'0.5px solid rgba(232,228,217,0.1)',color:'rgba(232,228,217,0.4)',letterSpacing:'0.06em',transition:'all 0.2s',cursor:'default'}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(74,222,128,0.3)';e.currentTarget.style.color='#4ade80'}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.1)';e.currentTarget.style.color='rgba(232,228,217,0.4)'}}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SKILLS CLEARING CARD ── */}
      <section style={{maxWidth:1200,margin:'0 auto',padding:'0 clamp(20px,5vw,48px) 80px'}}>
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}>
          <div style={{background:'rgba(13,31,23,0.5)',backdropFilter:'blur(20px)',border:'0.5px solid rgba(74,222,128,0.1)',borderRadius:20,padding:'48px clamp(20px,4vw,48px)'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:40}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 12px #4ade80'}}/>
              <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)'}}>{'{A CLEARING — SKILLS}'}</p>
            </div>
            <div className="skills-grid">
              {Object.entries(skillGroups).map(([cat,list])=>(
                <div key={cat}>
                  <p style={{fontFamily:mono,fontSize:9,letterSpacing:'0.15em',textTransform:'uppercase',color:'rgba(232,228,217,0.25)',marginBottom:16}}>{`{${cat.toUpperCase()}}`}</p>
                  {list.map((s,i)=>(
                    <motion.p key={s} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
                      transition={{delay:i*0.08,duration:0.5}}
                      style={{fontSize:14,color:'rgba(232,228,217,0.55)',marginBottom:8,fontWeight:300}}>
                      + {s}
                    </motion.p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── POLAROIDS ── */}
      <section style={{maxWidth:1200,margin:'0 auto',padding:'0 clamp(20px,5vw,48px) 80px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:32}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 12px #4ade80'}}/>
          <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)'}}>{'{MOMENTS ON THE PATH}'}</p>
        </div>
        <div className="polaroid-grid">
          {polaroids.map((p,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:40,rotate:0}} whileInView={{opacity:1,y:0,rotate:p.rotate}} viewport={{once:true}}
              transition={{delay:i*0.15,duration:0.9,ease:[0.16,1,0.3,1]}}
              whileHover={{scale:1.04,rotate:0,zIndex:10}}
              style={{background:'rgba(13,31,23,0.7)',backdropFilter:'blur(8px)',border:'0.5px solid rgba(232,228,217,0.08)',borderRadius:8,padding:10,position:'relative',cursor:'default'}}>
              <div style={{width:'100%',aspectRatio:'4/3',borderRadius:4,background:p.color,marginBottom:10,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at center, ${p.accent}20 0%, transparent 70%)`}}/>
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.2)',letterSpacing:'0.1em',textTransform:'uppercase'}}>photo placeholder</span>
                </div>
              </div>
              <p style={{fontFamily:serif,fontStyle:'italic',fontSize:13,color:'rgba(232,228,217,0.5)',textAlign:'center'}}>{p.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{maxWidth:1200,margin:'0 auto',padding:'0 clamp(20px,5vw,48px) 80px'}}>
        <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:40}}>{'{WHAT I DO}'}</motion.p>
        <div style={{display:'flex',flexDirection:'column'}}>
          {services.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.8}}
              style={{display:'grid',gridTemplateColumns:'60px 1fr auto',gap:24,padding:'28px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',alignItems:'center',transition:'padding-left 0.4s',cursor:'default'}}
              onMouseEnter={e=>{e.currentTarget.style.paddingLeft='16px'}} onMouseLeave={e=>{e.currentTarget.style.paddingLeft='0'}}>
              <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.2)',letterSpacing:'0.08em'}}>{s.num}</span>
              <div>
                <h3 style={{fontFamily:serif,fontSize:'clamp(20px,3vw,36px)',fontWeight:400,color:'#e8e4d9',letterSpacing:'-0.02em',marginBottom:6}}>{s.title}</h3>
                <p style={{fontSize:13,color:'rgba(232,228,217,0.4)',fontWeight:300,lineHeight:1.6}}>{s.desc}</p>
              </div>
              <span style={{fontSize:20,color:'rgba(232,228,217,0.15)'}}>+</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{maxWidth:1200,margin:'0 auto',padding:'0 clamp(20px,5vw,48px) 100px'}}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}
          style={{borderTop:'0.5px solid rgba(232,228,217,0.06)',paddingTop:80,textAlign:'center'}}>
          <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:24}}>{'{HAVE AN IDEA IN MIND?}'}</p>
          <h2 style={{fontFamily:serif,fontSize:'clamp(40px,8vw,100px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',marginBottom:40}}>
            Feel free<br/><em style={{fontStyle:'italic',color:'rgba(232,228,217,0.25)'}}>to contact.</em>
          </h2>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="mailto:hello@shivish.in"
              style={{borderRadius:9999,padding:'14px 36px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'}}
              onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')}
              onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
              (Say hello) →
            </a>
            <Link to="/work"
              style={{borderRadius:9999,padding:'14px 36px',border:'0.5px solid rgba(232,228,217,0.2)',color:'rgba(232,228,217,0.6)',fontSize:13,textDecoration:'none',transition:'all 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.4)';e.currentTarget.style.color='#e8e4d9'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.2)';e.currentTarget.style.color='rgba(232,228,217,0.6)'}}>
              (See my work)
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER — KVS coordinates ── */}
      <footer style={{padding:'24px clamp(20px,5vw,48px)',borderTop:'0.5px solid rgba(232,228,217,0.05)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <span style={{fontFamily:mono,fontSize:11,color:'rgba(232,228,217,0.18)'}}>Design & Dev by Shivish · 2025</span>
        {/* KVS-style coordinates */}
        <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.15)',letterSpacing:'0.08em'}}>
          30.7333° N, <span style={{color:'rgba(74,222,128,0.35)'}}>76.7794° E</span> — CHANDIGARH, IN
        </span>
        <div style={{display:'flex',gap:24}}>
          <a href="https://github.com/shiiiviiish" target="_blank" style={{fontFamily:mono,fontSize:11,color:'rgba(232,228,217,0.25)',textDecoration:'none',transition:'color 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.25)')}>GitHub</a>
          <a href="mailto:hello@shivish.in" style={{fontFamily:mono,fontSize:11,color:'rgba(232,228,217,0.25)',textDecoration:'none',transition:'color 0.2s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.25)')}>Email</a>
        </div>
        <span style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:'rgba(232,228,217,0.18)'}}>Built with vibe.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blurIn { from{opacity:0;filter:blur(16px);transform:translateY(8px)} to{opacity:1;filter:blur(0);transform:translateY(0)} }
        .intro-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .portrait-grid { display: grid; grid-template-columns: 420px 1fr; gap: 80px; align-items: start; }
        .skills-grid   { display: grid; grid-template-columns: repeat(3,1fr); gap: 32px; }
        .polaroid-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        @media (min-width: 769px) { * { cursor: none; } .desktop-cursor { display: block !important; } .hero-face { display: block !important; } }
        @media (max-width: 768px) {
          .desktop-cursor { display: none !important; }
          .hero-face { display: none !important; }
          .intro-grid    { grid-template-columns: 1fr; gap: 40px; }
          .portrait-grid { grid-template-columns: 1fr; gap: 40px; }
          .skills-grid   { grid-template-columns: 1fr; gap: 20px; }
          .polaroid-grid { grid-template-columns: repeat(2,1fr); gap: 12px; }
        }
      `}</style>
    </div>
  )
}