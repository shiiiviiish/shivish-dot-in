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
    num: '03', title: 'Next Project', category: 'Coming Soon',
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

  useEffect(() => {
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

  const navigate=(dir:number)=>{
    setActive(prev=>(prev+dir+projects.length)%projects.length)
    setKey(k=>k+1)
  }

  const p=projects[active]

  return (
    <div style={{background:'#000',height:'100vh',width:'100%',overflow:'hidden',cursor:'none',fontFamily:"'Inter',sans-serif",position:'relative'}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      {/* Background video */}
      <video ref={videoRef} autoPlay muted playsInline loop={false}
        style={{position:'fixed',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:0,opacity:0}}>
        <source src="/videos/workportal.mp4" type="video/mp4"/>
      </video>

      {/* Bottom blur overlay */}
      <div style={{
        position:'fixed',inset:0,zIndex:1,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
        pointerEvents:'none',
        maskImage:'linear-gradient(to top, black 0%, transparent 45%)',
        WebkitMaskImage:'linear-gradient(to top, black 0%, transparent 45%)'
      }}/>

      {/* Dark gradient top */}
      <div style={{position:'fixed',inset:0,zIndex:1,background:'linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,transparent 40%)',pointerEvents:'none'}}/>

      {/* NAV */}
      <Nav />

      {/* Hero content at bottom */}
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',justifyContent:'flex-end',height:'calc(100vh - 88px)',padding:'0 48px 64px'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:32}}>

          {/* Left — project info */}
          <div style={{flex:1,maxWidth:700}} key={key}>
            {/* Meta row */}
            <div className="animate-blur-fade-up" style={{display:'flex',gap:24,marginBottom:24,animationDelay:'300ms'}}>
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,0.7)'}}>
                <Star size={14} fill="white" color="white"/> {p.role}
              </span>
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,0.7)'}}>
                <Clock size={14}/> {p.type}
              </span>
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,0.7)'}}>
                <Calendar size={14}/> {p.year}
              </span>
              <span style={{fontSize:12,padding:'3px 10px',borderRadius:9999,border:'0.5px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.6)'}}>
                {p.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="animate-blur-fade-up" style={{
              fontFamily:serif,fontSize:'clamp(40px,7vw,96px)',fontWeight:400,
              lineHeight:0.9,letterSpacing:'-0.04em',color:'#fff',marginBottom:20,
              animationDelay:'400ms'
            }}>{p.title}</h1>

            {/* Description */}
            <p className="animate-blur-fade-up" style={{
              fontSize:16,color:'rgba(255,255,255,0.55)',lineHeight:1.65,
              maxWidth:560,marginBottom:32,fontWeight:300,animationDelay:'500ms'
            }}>{p.desc}</p>

            {/* Tags + CTA */}
            <div className="animate-blur-fade-up" style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap',animationDelay:'600ms'}}>
              <a href={p.url} target="_blank" style={{
                display:'inline-flex',alignItems:'center',gap:8,
                borderRadius:9999,padding:'12px 28px',background:'#fff',color:'#000',
                fontSize:13,fontWeight:500,textDecoration:'none',transition:'opacity 0.2s'
              }}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')}
                onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                <ExternalLink size={15}/> View Project
              </a>
              <div className="liquid-glass" style={{borderRadius:9999,padding:'12px 28px',display:'flex',gap:8,flexWrap:'wrap'}}>
                {p.tags.map(t=>(
                  <span key={t} style={{fontSize:12,color:'rgba(255,255,255,0.7)',letterSpacing:'0.05em'}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — navigation + counter */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:16}}>
            <div className="animate-blur-fade-up" style={{fontSize:12,color:'rgba(255,255,255,0.3)',letterSpacing:'0.1em',textTransform:'uppercase',animationDelay:'700ms'}}>
              {String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}
            </div>
            <div style={{display:'flex',gap:12}} className="animate-blur-fade-up">
              <button onClick={()=>navigate(-1)} className="liquid-glass"
                style={{borderRadius:9999,padding:'12px 20px',display:'flex',alignItems:'center',gap:6,color:'#fff',background:'transparent',border:'none',cursor:'none',fontSize:13,transition:'opacity 0.2s',animationDelay:'800ms'}}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                <ChevronLeft size={18}/> Prev
              </button>
              <button onClick={()=>navigate(1)} className="liquid-glass"
                style={{borderRadius:9999,padding:'12px 20px',display:'flex',alignItems:'center',gap:6,color:'#fff',background:'transparent',border:'none',cursor:'none',fontSize:13,transition:'opacity 0.2s',animationDelay:'900ms'}}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.7')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                Next <ChevronRight size={18}/>
              </button>
            </div>
            <Link to="/contact" className="animate-blur-fade-up" style={{fontSize:12,color:'rgba(255,255,255,0.35)',textDecoration:'none',textTransform:'uppercase',letterSpacing:'0.1em',transition:'color 0.2s',animationDelay:'1000ms'}}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.35)')}>
              Say hello →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        *{cursor:none;box-sizing:border-box;margin:0;padding:0}

        .liquid-glass {
          background: rgba(255,255,255,0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
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