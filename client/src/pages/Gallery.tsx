import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Nav from '../components/Nav'

const featured = [
  { id: 1, title: 'Urban Fog',    category: 'Photography', bg: '#0d1f17', accent: '#4ade80' },
  { id: 2, title: 'Night Lights', category: 'Editing',     bg: '#0f1525', accent: '#60a5fa' },
  { id: 3, title: 'Golden Hour',  category: 'Photography', bg: '#1f150a', accent: '#fb923c' },
  { id: 4, title: 'Abstract',     category: 'Editing',     bg: '#1f0a12', accent: '#a78bfa' },
]

const photos = [
  { id: 1, title: 'Urban Fog',    category: 'Photography', color: '#0d1f17', accent: '#4ade80' },
  { id: 2, title: 'Night Lights', category: 'Editing',     color: '#0f1525', accent: '#60a5fa' },
  { id: 3, title: 'Street Life',  category: 'Photography', color: '#1f100a', accent: '#f59e0b' },
  { id: 4, title: 'Golden Hour',  category: 'Photography', color: '#1f150a', accent: '#fb923c' },
  { id: 5, title: 'Motion Blur',  category: 'Editing',     color: '#130a1f', accent: '#a78bfa' },
  { id: 6, title: 'Chandigarh',   category: 'Photography', color: '#0a1f12', accent: '#34d399' },
  { id: 7, title: 'Abstract',     category: 'Editing',     color: '#1f0a12', accent: '#f472b6' },
  { id: 8, title: 'Architecture', category: 'Photography', color: '#12121f', accent: '#818cf8' },
  { id: 9, title: 'Portrait',     category: 'Photography', color: '#1f1212', accent: '#f87171' },
]

export default function Gallery() {
  const cursorRef   = useRef<HTMLDivElement>(null)
  const trailRef    = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile,    setIsMobile]    = useState(window.innerWidth < 768)
  const [selected,    setSelected]    = useState<number | null>(null)
  const [filter,      setFilter]      = useState('All')
  const serif       = "'Instrument Serif', serif"
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove); loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[isMobile])

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex(prev => dir === 'next'
      ? (prev + 1) % featured.length
      : (prev + featured.length - 1) % featured.length)
    setTimeout(() => setIsAnimating(false), 650)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(dx) > 50 && dy < 80) navigate(dx < 0 ? 'next' : 'prev')
  }

  const center = activeIndex
  const left   = (activeIndex + featured.length - 1) % featured.length
  const right  = (activeIndex + 1) % featured.length

  const getRole = (i: number) => {
    if (i === center) return 'center'
    if (i === left)   return 'left'
    if (i === right)  return 'right'
    return 'back'
  }

  const roleStyle = (role: string) => {
    switch (role) {
      case 'center': return {
        left: '50%', height: isMobile ? '55%' : '82%', bottom: 0,
        transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.45})`,
        filter: 'none', opacity: 1, zIndex: 20,
      }
      case 'left': return {
        left: isMobile ? '12%' : '20%', height: isMobile ? '22%' : '30%',
        bottom: isMobile ? '8%' : '4%',
        transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.65, zIndex: 10,
      }
      case 'right': return {
        left: isMobile ? '88%' : '80%', height: isMobile ? '22%' : '30%',
        bottom: isMobile ? '8%' : '4%',
        transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.65, zIndex: 10,
      }
      default: return {
        left: '50%', height: isMobile ? '14%' : '20%',
        bottom: isMobile ? '8%' : '4%',
        transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 0.4, zIndex: 5,
      }
    }
  }

  const filtered     = filter === 'All' ? photos : photos.filter(p => p.category === filter)
  const selectedPhoto = selected !== null ? photos.find(p => p.id === selected) : null
  const cols         = isMobile ? 2 : 3
  const activeCard   = featured[activeIndex]

  const handleDownload = (photo: typeof photos[0]) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1920; canvas.height = 1080
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = photo.color; ctx.fillRect(0,0,1920,1080)
    const grad = ctx.createRadialGradient(960,540,0,960,540,700)
    grad.addColorStop(0, photo.accent+'30'); grad.addColorStop(1,'transparent')
    ctx.fillStyle=grad; ctx.fillRect(0,0,1920,1080)
    ctx.globalAlpha=0.7; ctx.fillStyle=photo.accent
    ctx.font='bold 72px serif'; ctx.textAlign='center'; ctx.fillText(photo.title,960,500)
    ctx.globalAlpha=0.35; ctx.fillStyle='#e8e4d9'
    ctx.font='28px sans-serif'; ctx.fillText('Shot by Shivish · shivish.in',960,590)
    const a=document.createElement('a')
    a.href=canvas.toDataURL('image/png')
    a.download=`shivish-${photo.title.toLowerCase().replace(/ /g,'-')}.png`
    a.click()
  }

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:isMobile?'auto':'none',fontFamily:"'DM Sans',sans-serif"}}>
      {!isMobile && <>
        <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
        <div ref={trailRef}  style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      </>}

      <Nav/>

      {/* ── CAROUSEL SECTION ── */}
      <div
        style={{position:'relative',width:'100%',height:'100vh',overflow:'hidden',background:'#07100d'}}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

        {/* Ghost title bg */}
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:1}}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.04}}
              transition={{duration:0.6}}
              style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(80px,18vw,220px)',fontWeight:400,color:'rgba(232,228,217,0.04)',lineHeight:1,whiteSpace:'nowrap',letterSpacing:'-0.04em',userSelect:'none'}}>
              {activeCard.title}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Side fades */}
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:'12%',background:'linear-gradient(to right,#07100d,transparent)',zIndex:10,pointerEvents:'none'}}/>
        <div style={{position:'absolute',right:0,top:0,bottom:0,width:'12%',background:'linear-gradient(to left,#07100d,transparent)',zIndex:10,pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:'30%',background:'linear-gradient(to top,#07100d,transparent)',zIndex:10,pointerEvents:'none'}}/>

        {/* Top label */}
        <div style={{position:'absolute',top:90,left:'50%',transform:'translateX(-50%)',zIndex:20,textAlign:'center',whiteSpace:'nowrap'}}>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:8}}>Gallery · Photography & Editing</p>
          <h2 style={{fontFamily:serif,fontSize:'clamp(28px,4vw,52px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.03em',color:'#e8e4d9'}}>
            Browse <em style={{color:'rgba(232,228,217,0.25)',fontStyle:'italic'}}>the shots.</em>
          </h2>
        </div>

        {/* Cards */}
        <div id="tour-gallery-grid" style={{position:'absolute',inset:0,zIndex:5}}>
          {featured.map((card,i) => {
            const role = getRole(i)
            const rs   = roleStyle(role)
            return (
              <div key={card.id} style={{
                position:'absolute',aspectRatio:'0.65/1',
                transition:'all 650ms cubic-bezier(0.4,0,0.2,1)',
                willChange:'transform,opacity',
                ...rs,
              }}>
                <div style={{
                  width:'100%',height:'100%',borderRadius:20,
                  background:card.bg,
                  border:'0.5px solid rgba(232,228,217,0.08)',
                  boxShadow:'0 20px 60px rgba(0,0,0,0.6)',
                  display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,
                  overflow:'hidden',position:'relative',cursor:'pointer',
                }} onClick={()=>role==='center'&&setSelected(card.id)}>
                  <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at center, ${card.accent}18 0%, transparent 70%)`}}/>
                  <div style={{width:48,height:48,borderRadius:'50%',background:card.accent,opacity:0.5,boxShadow:`0 0 24px ${card.accent}60`}}/>
                  <p style={{fontFamily:serif,fontStyle:'italic',fontSize:18,color:'rgba(232,228,217,0.85)',zIndex:1}}>{card.title}</p>
                  <p style={{fontSize:10,color:'rgba(232,228,217,0.35)',letterSpacing:'0.14em',textTransform:'uppercase',zIndex:1}}>{card.category}</p>
                  {role==='center'&&<p style={{fontSize:9,color:'rgba(232,228,217,0.2)',letterSpacing:'0.1em',textTransform:'uppercase',marginTop:4}}>Placeholder</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── LEFT ARROW — middle of screen ── */}
        <button
          onClick={()=>navigate('prev')}
          style={{
            position:'absolute',left:isMobile?12:32,top:'50%',transform:'translateY(-50%)',
            zIndex:30,width:isMobile?40:52,height:isMobile?40:52,borderRadius:'50%',
            background:'rgba(255,255,255,0.06)',backdropFilter:'blur(12px)',
            border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',
            display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.borderColor='rgba(232,228,217,0.35)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='rgba(232,228,217,0.15)'}}>
          <ChevronLeft size={isMobile?18:22} strokeWidth={1.5}/>
        </button>

        {/* ── RIGHT ARROW — middle of screen ── */}
        <button
          onClick={()=>navigate('next')}
          style={{
            position:'absolute',right:isMobile?12:32,top:'50%',transform:'translateY(-50%)',
            zIndex:30,width:isMobile?40:52,height:isMobile?40:52,borderRadius:'50%',
            background:'rgba(255,255,255,0.06)',backdropFilter:'blur(12px)',
            border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',
            display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.borderColor='rgba(232,228,217,0.35)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='rgba(232,228,217,0.15)'}}>
          <ChevronRight size={isMobile?18:22} strokeWidth={1.5}/>
        </button>

        {/* Bottom — card name + counter + dots + hint */}
        <div style={{position:'absolute',bottom:isMobile?20:36,left:0,right:0,zIndex:20,display:'flex',alignItems:'flex-end',justifyContent:'space-between',padding:isMobile?'0 20px':'0 48px'}}>
          {/* Left — active card info */}
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.4}}>
              <p style={{fontFamily:serif,fontSize:isMobile?18:24,color:'#e8e4d9',marginBottom:4,letterSpacing:'-0.02em'}}>{activeCard.title}</p>
              <p style={{fontSize:10,color:'rgba(232,228,217,0.35)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12}}>{activeCard.category} · Placeholder</p>
              {/* Dot indicators */}
              <div style={{display:'flex',gap:6}}>
                {featured.map((_,i)=>(
                  <button key={i} onClick={()=>{if(!isAnimating){setIsAnimating(true);setActiveIndex(i);setTimeout(()=>setIsAnimating(false),650)}}}
                    style={{width:i===activeIndex?24:8,height:8,borderRadius:9999,background:i===activeIndex?'#e8e4d9':'rgba(232,228,217,0.2)',border:'none',cursor:'pointer',transition:'all 0.3s',padding:0}}/>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right — counter + drag hint */}
          <div style={{textAlign:'right'}}>
            <p style={{fontFamily:serif,fontStyle:'italic',fontSize:isMobile?16:22,color:'rgba(232,228,217,0.3)',marginBottom:6,letterSpacing:'-0.02em'}}>
              {String(activeIndex+1).padStart(2,'0')} / {String(featured.length).padStart(2,'0')}
            </p>
            <p style={{fontSize:9,color:'rgba(232,228,217,0.2)',letterSpacing:'0.16em',textTransform:'uppercase'}}>Drag or Swipe</p>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{position:'absolute',bottom:isMobile?80:100,left:'50%',transform:'translateX(-50%)',zIndex:20,display:'flex',flexDirection:'column',alignItems:'center',gap:6,fontSize:9,letterSpacing:'0.2em',color:'rgba(232,228,217,0.15)',textTransform:'uppercase'}}>
          <span>Scroll for grid</span>
          <div style={{width:1,height:24,background:'linear-gradient(to bottom,rgba(74,222,128,0.3),transparent)',animation:'scrollPulse 1.5s ease infinite'}}/>
        </div>
      </div>

      {/* ── GRID SECTION ── */}
      <div style={{maxWidth:1200,margin:'0 auto',padding:isMobile?'60px 20px':'100px 48px 80px'}}>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:12}}>All Photos</p>
          <h2 style={{fontFamily:serif,fontSize:'clamp(32px,6vw,72px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:36}}>
            Browse <em style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}>the shots.</em>
          </h2>
        </motion.div>

        {/* Filters */}
        <div style={{display:'flex',gap:8,marginBottom:32,flexWrap:'wrap'}}>
          {['All','Photography','Editing'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              borderRadius:9999,padding:isMobile?'7px 16px':'8px 20px',
              border:`0.5px solid ${filter===f?'rgba(232,228,217,0.35)':'rgba(232,228,217,0.1)'}`,
              background:filter===f?'rgba(232,228,217,0.07)':'transparent',
              color:filter===f?'#e8e4d9':'rgba(232,228,217,0.38)',
              fontSize:isMobile?11:12,cursor:'pointer',transition:'all 0.25s',
              letterSpacing:'0.06em',textTransform:'uppercase' as const,
            }}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap:isMobile?8:12}}>
          {filtered.map((photo,i)=>(
            <motion.div key={photo.id}
              initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
              transition={{delay:i*0.05,duration:0.7,ease:[0.16,1,0.3,1]}}
              whileHover={{y:-4}} whileTap={{scale:0.97}}
              onClick={()=>setSelected(photo.id)}
              style={{borderRadius:isMobile?10:14,overflow:'hidden',cursor:'pointer',position:'relative',aspectRatio:'4/3',background:photo.color,border:'0.5px solid rgba(232,228,217,0.07)'}}>
              <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 40% 50%, ${photo.accent}18 0%, transparent 65%)`}}/>
              <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8}}>
                <div style={{width:20,height:20,borderRadius:'50%',background:photo.accent,opacity:0.4}}/>
                <p style={{fontFamily:serif,fontSize:isMobile?13:16,color:'rgba(232,228,217,0.65)',fontStyle:'italic',textAlign:'center',padding:'0 8px',margin:0}}>{photo.title}</p>
                <p style={{fontSize:9,color:'rgba(232,228,217,0.28)',letterSpacing:'0.12em',textTransform:'uppercase',margin:0}}>{photo.category}</p>
              </div>
              <button onClick={e=>{e.stopPropagation();handleDownload(photo)}}
                style={{position:'absolute',bottom:8,right:8,borderRadius:9999,padding:'5px 10px',background:'rgba(232,228,217,0.1)',border:'0.5px solid rgba(232,228,217,0.15)',color:'rgba(232,228,217,0.6)',display:'flex',alignItems:'center',gap:4,fontSize:10,cursor:'pointer'}}>
                <Download size={11}/> {!isMobile&&'Save'}
              </button>
            </motion.div>
          ))}
        </div>

        <p style={{textAlign:'center',fontSize:12,color:'rgba(232,228,217,0.18)',marginTop:40,fontFamily:serif,fontStyle:'italic'}}>
          Real photos coming soon.
        </p>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
            style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.94)',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(28px)',padding:isMobile?16:0}}
            onClick={()=>setSelected(null)}>
            <button style={{position:'absolute',top:16,right:16,width:40,height:40,borderRadius:'50%',background:'rgba(232,228,217,0.08)',border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
              onClick={()=>setSelected(null)}><X size={16}/></button>
            <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
              transition={{duration:0.4,ease:[0.16,1,0.3,1]}}
              style={{width:isMobile?'100%':'65vw',maxWidth:860,aspectRatio:'4/3',borderRadius:isMobile?16:22,background:selectedPhoto.color,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,position:'relative',border:'0.5px solid rgba(232,228,217,0.1)'}}
              onClick={e=>e.stopPropagation()}>
              <div style={{position:'absolute',inset:0,borderRadius:'inherit',background:`radial-gradient(circle at center, ${selectedPhoto.accent}20 0%, transparent 65%)`}}/>
              <div style={{width:48,height:48,borderRadius:'50%',background:selectedPhoto.accent,opacity:0.45}}/>
              <p style={{fontFamily:serif,fontSize:isMobile?28:38,color:'rgba(232,228,217,0.85)',fontStyle:'italic',letterSpacing:'-0.02em',margin:0}}>{selectedPhoto.title}</p>
              <p style={{fontSize:11,color:'rgba(232,228,217,0.35)',letterSpacing:'0.14em',textTransform:'uppercase',margin:0}}>{selectedPhoto.category}</p>
              <button onClick={()=>handleDownload(selectedPhoto)}
                style={{marginTop:8,borderRadius:9999,padding:'12px 28px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:8}}>
                <Download size={14}/> Download Wallpaper
              </button>
            </motion.div>
            {!isMobile && ['prev','next'].map(dir=>(
              <button key={dir}
                style={{position:'absolute',[dir==='prev'?'left':'right']:24,top:'50%',transform:'translateY(-50%)',width:44,height:44,borderRadius:'50%',background:'rgba(232,228,217,0.08)',border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={e=>{e.stopPropagation();const idx=photos.findIndex(p=>p.id===selected);setSelected(photos[(idx+(dir==='next'?1:-1)+photos.length)%photos.length].id)}}>
                {dir==='prev'?<ChevronLeft size={20}/>:<ChevronRight size={20}/>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{padding:isMobile?'20px 24px':'28px 48px',fontSize:12,color:'rgba(232,228,217,0.18)',borderTop:'0.5px solid rgba(232,228,217,0.05)',display:'flex',justifyContent:'space-between'}}>
        <span>Shivish · 2025</span>
        <span style={{fontFamily:serif,fontStyle:'italic'}}>Built with vibe.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes scrollPulse{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
      `}</style>
    </div>
  )
}