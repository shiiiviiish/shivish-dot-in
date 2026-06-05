import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ExternalLink, Star, Clock, Calendar } from 'lucide-react'
import Nav from '../components/Nav'

const projects = [
  {
    num: '01', title: 'Happiness Through Art', category: 'Client Project',
    year: '2025', type: 'Web Design', role: '1st Build',
    desc: 'Portfolio website for artist Kavya Atray. Designed and built end-to-end — layout, deployment, everything.',
    tags: ['TypeScript', 'React', 'Vercel'], url: 'https://hta-seven.vercel.app/',
  },
  {
    num: '02', title: 'This Portfolio', category: 'Personal',
    year: '2025', type: 'Full Stack', role: 'Ongoing',
    desc: 'Cinematic dark portfolio. Video hero, fog canvas, animations, liquid glass, multi-page routing. Built from scratch.',
    tags: ['React', 'GSAP', 'Framer Motion'], url: 'https://shivish.in',
  },
  {
    num: '03', title: 'Pixable Studios', category: 'Client Project',
    year: '2025', type: 'Web Design', role: 'In Progress',
    desc: 'Details will be published soon. Something big is in the works — stay tuned.',
    tags: ['Coming Soon'], url: 'https://github.com/shiiiviiish',
  },
  {
    num: '04', title: 'Next Project', category: 'Coming Soon',
    year: '2025', type: 'TBD', role: 'In Progress',
    desc: 'Something new is cooking. Watch the GitHub for updates.',
    tags: ['???'], url: 'https://github.com/shiiiviiish',
  },
]

export default function Work() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(0)
  const [key, setKey] = useState(0)
  const serif = "'Instrument Serif', serif"
  const isMobile = window.innerWidth < 768
  const touchStartX = useRef(0)

  useEffect(() => {
    if (isMobile) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  useEffect(()=>{
    const v=videoRef.current;if(!v)return
    let raf:number,fadingOut=false
    const fadeTo=(target:number,dur:number,cb?:()=>void)=>{
      const start=performance.now(),from=parseFloat(v.style.opacity||'0')
      const tick=(now:number)=>{
        const p=Math.min((now-start)/dur,1)
        v.style.opacity=String(from+(target-from)*p)
        if(p<1)raf=requestAnimationFrame(tick);else cb?.()
      }
      raf=requestAnimationFrame(tick)
    }
    const onTime=()=>{if(!fadingOut&&v.duration-v.currentTime<0.55){fadingOut=true;fadeTo(0,500,()=>{v.currentTime=0;v.play();fadingOut=false;fadeTo(1,500)})}}
    v.style.opacity='0';v.play().then(()=>fadeTo(1,500))
    v.addEventListener('timeupdate',onTime)
    return()=>{v.removeEventListener('timeupdate',onTime);cancelAnimationFrame(raf)}
  },[])

  const [showModal, setShowModal] = useState(false)

  const navigate=(dir:number)=>{
    // If on last project and clicking Next — open client stories modal
    if(dir===1 && active===projects.length-1){
      setShowModal(true)
      return
    }
    setActive(prev=>(prev+dir+projects.length)%projects.length)
    setKey(k=>k+1)
  }

  const handleTouchStart=(e:React.TouchEvent)=>{touchStartX.current=e.touches[0].clientX}
  const handleTouchEnd=(e:React.TouchEvent)=>{
    const dx=e.changedTouches[0].clientX-touchStartX.current
    if(Math.abs(dx)>50)navigate(dx<0?1:-1)
  }

  const p=projects[active]

  return (
    <div style={{background:'#000',minHeight:'100vh',width:'100%',fontFamily:"'Inter',sans-serif",position:'relative'}}>
      {!isMobile && <>
        <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
        <div ref={trailRef} style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      </>}

      <video ref={videoRef} autoPlay muted playsInline loop={false}
        style={{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:0,opacity:0}}>
        <source src="/videos/workportal.mp4" type="video/mp4"/>
      </video>

      <div style={{position:'fixed',inset:0,zIndex:1,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',pointerEvents:'none',maskImage:'linear-gradient(to top, black 0%, transparent 45%)',WebkitMaskImage:'linear-gradient(to top, black 0%, transparent 45%)'}}/>
      <div style={{position:'fixed',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,transparent 40%)',pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:50}}><Nav/></div>

      <div
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',justifyContent:'flex-end',height:'calc(100vh - 72px)',padding:isMobile?'0 20px 32px':'0 48px 64px'}}>
        <div className="work-bottom">

          {/* Left — project info */}
          <div style={{flex:1,maxWidth:700}} key={key}>
            <div className="animate-blur-fade-up" style={{display:'flex',gap:isMobile?12:24,marginBottom:isMobile?12:24,flexWrap:'wrap',animationDelay:'300ms'}}>
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,0.7)'}}><Star size={14} fill="white" color="white"/> {p.role}</span>
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,0.7)'}}><Clock size={14}/> {p.type}</span>
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,0.7)'}}><Calendar size={14}/> {p.year}</span>
              <span style={{fontSize:12,padding:'3px 10px',borderRadius:9999,border:'0.5px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.6)'}}>{p.category}</span>
            </div>

            <h1 className="animate-blur-fade-up" style={{
              fontFamily:serif,fontSize:isMobile?'clamp(32px,9vw,56px)':'clamp(40px,7vw,96px)',
              fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',color:'#fff',
              marginBottom:isMobile?12:20,animationDelay:'400ms'
            }}>{p.title}</h1>

            <p className="animate-blur-fade-up" style={{
              fontSize:isMobile?13:16,color:'rgba(255,255,255,0.55)',lineHeight:1.65,
              maxWidth:560,marginBottom:isMobile?16:32,fontWeight:300,animationDelay:'500ms'
            }}>{p.desc}</p>

            <div className="animate-blur-fade-up" style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap',animationDelay:'600ms'}}>
              <a href={p.url} target="_blank" style={{display:'inline-flex',alignItems:'center',gap:8,borderRadius:9999,padding:isMobile?'10px 20px':'12px 28px',background:'#fff',color:'#000',fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                <ExternalLink size={15}/> View Project
              </a>
              <div className="liquid-glass" style={{borderRadius:9999,padding:isMobile?'10px 16px':'12px 28px',display:'flex',gap:8,flexWrap:'wrap'}}>
                {p.tags.map(t=><span key={t} style={{fontSize:12,color:'rgba(255,255,255,0.7)',letterSpacing:'0.05em'}}>{t}</span>)}
              </div>
            </div>
          </div>

          {/* Right — nav */}
          <div style={{display:'flex',flexDirection:'column',alignItems:isMobile?'flex-start':'flex-end',gap:12,marginTop:isMobile?20:0}}>
            <div className="animate-blur-fade-up" style={{fontSize:12,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase',animationDelay:'700ms'}}>
              {String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
            </div>
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>navigate(-1)} className="liquid-glass animate-blur-fade-up"
                style={{borderRadius:9999,padding:'10px 18px',display:'flex',alignItems:'center',gap:6,color:'#fff',background:'transparent',border:'none',cursor:isMobile?'pointer':'none',fontSize:13,animationDelay:'800ms'}}>
                <ChevronLeft size={18}/> {!isMobile && 'Prev'}
              </button>
              <button onClick={()=>navigate(1)} className="liquid-glass animate-blur-fade-up"
                style={{borderRadius:9999,padding:'10px 18px',display:'flex',alignItems:'center',gap:6,color:'#fff',background:'transparent',border:'none',cursor:isMobile?'pointer':'none',fontSize:13,animationDelay:'900ms'}}>
                {!isMobile && 'Next'} <ChevronRight size={18}/>
              </button>
            </div>
            {!isMobile && <Link to="/contact" className="animate-blur-fade-up" style={{fontSize:12,color:'rgba(255,255,255,0.35)',textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.1em',transition:'color 0.2s',animationDelay:'1000ms'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.35)')}>
              Say hello →
            </Link>}
            {/* Client Stories button */}
            <button
              onClick={()=>setShowModal(true)}
              className="animate-blur-fade-up liquid-glass"
              style={{borderRadius:9999,padding:'8px 16px',fontSize:11,color:'rgba(255,255,255,0.5)',background:'transparent',border:'none',cursor:isMobile?'pointer':'none',letterSpacing:'0.1em',textTransform:'uppercase',animationDelay:'1100ms',marginTop:4}}>
              Client Stories ↗
            </button>
          </div>
        </div>
      </div>

      {/* ── CLIENT STORIES MODAL ── */}
      {showModal && (
        <div
          onClick={()=>setShowModal(false)}
          style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.92)',backdropFilter:'blur(24px)',overflowY:'auto',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:isMobile?'24px 16px':'48px'}}>
          <div
            onClick={e=>e.stopPropagation()}
            style={{width:'100%',maxWidth:1000,position:'relative'}}>

            {/* Close */}
            <button
              onClick={()=>setShowModal(false)}
              style={{position:'sticky',top:0,left:'100%',display:'flex',marginLeft:'auto',width:40,height:40,borderRadius:'50%',background:'rgba(232,228,217,0.08)',border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:18,zIndex:10,marginBottom:32}}>
              ×
            </button>

            {/* Heading */}
            <p style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:12}}>Client experience</p>
            <h2 style={{fontFamily:serif,fontSize:'clamp(36px,6vw,64px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',color:'#e8e4d9',marginBottom:48}}>
              Working<br/><em style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}>with me.</em>
            </h2>

            {/* ── KAVYA — SPLIT SCREEN ── */}
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?24:0,borderRadius:16,overflow:'hidden',border:'0.5px solid rgba(232,228,217,0.08)',marginBottom:16}}>
              {/* Left — photos */}
              <div style={{background:'rgba(255,255,255,0.02)',padding:'32px',display:'flex',flexDirection:'column',gap:12,justifyContent:'center',alignItems:'center'}}>
                <div style={{width:'100%',maxWidth:260,height:160,borderRadius:10,background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(74,222,128,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8}}>
                  <div style={{width:44,height:44,borderRadius:'50%',background:'rgba(74,222,128,0.1)',border:'0.5px solid rgba(74,222,128,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:serif,fontSize:16,color:'rgba(74,222,128,0.6)'}}>KA</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:'rgba(232,228,217,0.15)',letterSpacing:'0.12em',textTransform:'uppercase'}}>Add photo here</span>
                </div>
                <div style={{display:'flex',gap:10,width:'100%',maxWidth:260}}>
                  {['Working session','Launch day'].map((l,i)=>(
                    <div key={i} style={{flex:1,height:88,borderRadius:8,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:'rgba(232,228,217,0.15)',letterSpacing:'0.1em',textTransform:'uppercase',textAlign:'center',padding:'0 6px'}}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right — quote */}
              <div style={{background:'rgba(0,0,0,0.4)',padding:'36px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(74,222,128,0.5)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:16}}>Client · HTA · 2025</p>
                <p style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(16px,2vw,22px)',color:'rgba(232,228,217,0.9)',lineHeight:1.7,marginBottom:24,letterSpacing:'-0.01em'}}>
                  "He understood the brand before I even finished explaining it. The site doesn't just look good — it actually feels like HTA."
                </p>
                <div style={{borderTop:'0.5px solid rgba(232,228,217,0.07)',paddingTop:16}}>
                  <p style={{fontFamily:serif,fontSize:15,color:'#e8e4d9',marginBottom:2}}>Kavya Atray</p>
                  <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(232,228,217,0.35)',letterSpacing:'0.08em'}}>Founder, Happiness Through Art</p>
                  <a href="https://hta-seven.vercel.app" target="_blank" style={{display:'inline-block',marginTop:12,fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(74,222,128,0.5)',letterSpacing:'0.1em',textDecoration:'none',borderBottom:'0.5px solid rgba(74,222,128,0.2)',paddingBottom:2}}>hta-seven.vercel.app ↗</a>
                </div>
              </div>
            </div>

            {/* Process timeline — Kavya */}
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:12,marginBottom:40,position:'relative'}}>
              {!isMobile && <div style={{position:'absolute',top:28,left:'calc(16.66% + 20px)',right:'calc(16.66% + 20px)',height:'0.5px',background:'linear-gradient(to right,rgba(74,222,128,0.25),rgba(74,222,128,0.05))',zIndex:0}}/>}
              {[
                {step:'01',phase:'Discovery',photo:'First call',quote:'"He asked the right questions — not just what I wanted, but why."'},
                {step:'02',phase:'Design & Build',photo:'In progress',quote:'"Every revision came back better than I imagined."'},
                {step:'03',phase:'Launch',photo:'Going live',quote:'"The day we launched, I couldn\'t stop sharing it with everyone."'},
              ].map((t,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.02)',border:'0.5px solid rgba(74,222,128,0.1)',borderRadius:12,padding:'20px',display:'flex',flexDirection:'column',gap:12,position:'relative',zIndex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{width:28,height:28,borderRadius:'50%',background:'rgba(74,222,128,0.08)',border:'0.5px solid rgba(74,222,128,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(74,222,128,0.6)',flexShrink:0}}>{t.step}</div>
                    <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(232,228,217,0.4)',letterSpacing:'0.12em',textTransform:'uppercase'}}>{t.phase}</p>
                  </div>
                  <div style={{width:'100%',height:80,borderRadius:6,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.05)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:'rgba(232,228,217,0.12)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{t.photo}</span>
                  </div>
                  <p style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:'rgba(232,228,217,0.55)',lineHeight:1.6}}>{t.quote}</p>
                </div>
              ))}
            </div>

            {/* ── SAHIL — SPLIT SCREEN ── */}
            <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',gap:isMobile?24:0,borderRadius:16,overflow:'hidden',border:'0.5px solid rgba(232,228,217,0.08)',marginBottom:40}}>
              <div style={{background:'rgba(0,0,0,0.4)',padding:'36px',display:'flex',flexDirection:'column',justifyContent:'center',order:isMobile?2:1}}>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(96,165,250,0.5)',letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:16}}>Client · Pixable Studios · 2025</p>
                <p style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(16px,2vw,22px)',color:'rgba(232,228,217,0.9)',lineHeight:1.7,marginBottom:24,letterSpacing:'-0.01em'}}>
                  "Shivish never just builds what you ask — he thinks about what you actually need. Quick to respond, honest about timelines."
                </p>
                <div style={{borderTop:'0.5px solid rgba(232,228,217,0.07)',paddingTop:16}}>
                  <p style={{fontFamily:serif,fontSize:15,color:'#e8e4d9',marginBottom:2}}>Sahil Dev</p>
                  <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(232,228,217,0.35)',letterSpacing:'0.08em'}}>Founder, Pixable Studios</p>
                  <span style={{display:'inline-block',marginTop:12,fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(251,146,60,0.5)',letterSpacing:'0.1em'}}>In Progress</span>
                </div>
              </div>
              <div style={{background:'rgba(255,255,255,0.02)',padding:'32px',display:'flex',flexDirection:'column',gap:12,justifyContent:'center',alignItems:'center',order:isMobile?1:2}}>
                <div style={{width:'100%',maxWidth:260,height:160,borderRadius:10,background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(96,165,250,0.1)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8}}>
                  <div style={{width:44,height:44,borderRadius:'50%',background:'rgba(96,165,250,0.1)',border:'0.5px solid rgba(96,165,250,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:serif,fontSize:16,color:'rgba(96,165,250,0.6)'}}>SD</div>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:'rgba(232,228,217,0.15)',letterSpacing:'0.12em',textTransform:'uppercase'}}>Add photo here</span>
                </div>
                <div style={{display:'flex',gap:10,width:'100%',maxWidth:260}}>
                  {['Planning','Design'].map((l,i)=>(
                    <div key={i} style={{flex:1,height:88,borderRadius:8,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:'rgba(232,228,217,0.15)',letterSpacing:'0.1em',textTransform:'uppercase',textAlign:'center',padding:'0 6px'}}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{textAlign:'center',paddingBottom:40}}>
              <Link to="/contact" onClick={()=>setShowModal(false)}
                style={{display:'inline-block',borderRadius:9999,padding:'14px 36px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>
                Let's work together →
              </Link>
            </div>

          </div>
        </div>
      )}


      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .work-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; }
        @media (min-width: 769px) { * { cursor: none; } }
        @media (max-width: 768px) { .work-bottom { flex-direction: column; align-items: flex-start; } }
        .liquid-glass {
          background: rgba(255,255,255,0.01);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        @keyframes blurFadeUp {
          from { opacity: 0; filter: blur(20px); transform: translateY(40px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .animate-blur-fade-up {
          opacity: 0;
          animation: blurFadeUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  )
}