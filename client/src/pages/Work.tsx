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

  const [showToast, setShowToast] = useState(false)

  const navigate=(dir:number)=>{
    if(dir===1 && active===projects.length-1){
      setShowToast(true)
      setTimeout(()=>setShowToast(false), 12000)
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
              onClick={()=>window.location.href='/client-stories'}
              className="animate-blur-fade-up liquid-glass"
              style={{borderRadius:9999,padding:'8px 16px',fontSize:11,color:'rgba(255,255,255,0.5)',background:'transparent',border:'none',cursor:isMobile?'pointer':'none',letterSpacing:'0.1em',textTransform:'uppercase',animationDelay:'1100ms',marginTop:4}}>
              Client Stories ↗
            </button>
          </div>
        </div>
      </div>



      {/* ── HALF SCREEN POPUP ── */}
      {showToast && (
        <div style={{
          position:'fixed',inset:0,zIndex:300,
          display:'flex',alignItems:'center',justifyContent:'center',
          background:'rgba(0,0,0,0.5)',backdropFilter:'blur(6px)',
          animation:'fadeInOverlay 0.4s ease forwards',
        }}>
          <div style={{
            width:'clamp(300px,92vw,1000px)',
            height:'clamp(400px,90vh,90vh)',
            background:'rgba(0,0,0,0.7)',
            border:'0.5px solid rgba(74,222,128,0.15)',
            borderRadius:24,
            overflow:'hidden',
            boxShadow:'0 32px 80px rgba(0,0,0,0.9)',
            animation:'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            position:'relative',
            display:'flex',
            flexDirection:'column',
          }}>
            {/* Close button */}
            <button onClick={()=>setShowToast(false)}
              style={{position:'absolute',top:20,right:20,width:40,height:40,borderRadius:'50%',
                background:'rgba(232,228,217,0.06)',border:'0.5px solid rgba(232,228,217,0.12)',
                color:'rgba(232,228,217,0.5)',cursor:'pointer',display:'flex',alignItems:'center',
                justifyContent:'center',fontSize:20,zIndex:10,transition:'all 0.2s'}}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(232,228,217,0.12)';e.currentTarget.style.color='#e8e4d9'}}
              onMouseLeave={e=>{e.currentTarget.style.background='rgba(232,228,217,0.06)';e.currentTarget.style.color='rgba(232,228,217,0.5)'}}>
              ×
            </button>

            {/* Photo area — top half */}
            <div style={{
              flex:1,
              background:'linear-gradient(145deg,rgba(74,222,128,0.05),rgba(0,0,0,0.6))',
              display:'flex',alignItems:'center',justifyContent:'center',
              position:'relative',overflow:'hidden',
              borderBottom:'0.5px solid rgba(232,228,217,0.06)',
            }}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 40% 60%,rgba(74,222,128,0.07) 0%,transparent 65%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 70% 30%,rgba(74,222,128,0.04) 0%,transparent 50%)',pointerEvents:'none'}}/>
              {/* Photo — replace with real photo */}
              <div style={{
                width:160,height:160,borderRadius:'50%',
                background:'radial-gradient(circle at 35% 35%,rgba(74,222,128,0.2),rgba(0,0,0,0.8))',
                border:'2px solid rgba(74,222,128,0.25)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:"'Instrument Serif',serif",fontSize:48,color:'rgba(74,222,128,0.6)',
                boxShadow:'0 0 60px rgba(74,222,128,0.1)',
                position:'relative',overflow:'hidden',
              }}>
                {/* Replace with: <img src="/images/shivish.jpg" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}}/> */}
                <div style={{position:'absolute',top:18,left:22,width:28,height:16,borderRadius:'50%',background:'rgba(255,255,255,0.15)',transform:'rotate(-30deg)'}}/>
                S
              </div>
            </div>

            {/* Content — bottom */}
            <div style={{padding:'36px 48px 44px',flexShrink:0}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 6px #4ade80'}}/>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'0.18em',color:'rgba(74,222,128,0.55)',textTransform:'uppercase'}}>Shivish · Available</span>
              </div>
              <h3 style={{fontFamily:"'Instrument Serif',serif",fontSize:'clamp(22px,3.5vw,36px)',fontWeight:400,color:'#e8e4d9',lineHeight:1.2,marginBottom:12,letterSpacing:'-0.02em'}}>
                Curious how I work<br/>with clients?
              </h3>
              <p style={{fontSize:14,color:'rgba(232,228,217,0.4)',lineHeight:1.75,fontWeight:300,marginBottom:28,maxWidth:480}}>
                Real projects, real people — see the full journey from first call to launch day.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <a href="/client-stories"
                  style={{borderRadius:9999,padding:'13px 28px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')}
                  onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                  See the stories →
                </a>
                <button onClick={()=>setShowToast(false)}
                  style={{borderRadius:9999,padding:'13px 24px',background:'transparent',border:'0.5px solid rgba(232,228,217,0.12)',color:'rgba(232,228,217,0.35)',fontSize:13,cursor:'pointer',transition:'all 0.2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.25)';e.currentTarget.style.color='rgba(232,228,217,0.6)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(232,228,217,0.12)';e.currentTarget.style.color='rgba(232,228,217,0.35)'}}>
                  Maybe later
                </button>
              </div>
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
        @keyframes fadeInOverlay { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
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