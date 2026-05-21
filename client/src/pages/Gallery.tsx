import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { id: 1, title: 'Urban Fog', category: 'Photography', color: '#0d1f17', accent: '#4ade80' },
  { id: 2, title: 'Night Lights', category: 'Editing', color: '#0f1525', accent: '#60a5fa' },
  { id: 3, title: 'Street Life', category: 'Photography', color: '#1f100a', accent: '#f59e0b' },
  { id: 4, title: 'Golden Hour', category: 'Photography', color: '#1f150a', accent: '#fb923c' },
  { id: 5, title: 'Motion Blur', category: 'Editing', color: '#130a1f', accent: '#a78bfa' },
  { id: 6, title: 'Chandigarh', category: 'Photography', color: '#0a1f12', accent: '#34d399' },
  { id: 7, title: 'Abstract', category: 'Editing', color: '#1f0a12', accent: '#f472b6' },
  { id: 8, title: 'Architecture', category: 'Photography', color: '#12121f', accent: '#818cf8' },
  { id: 9, title: 'Portrait', category: 'Photography', color: '#1f1212', accent: '#f87171' },
]

export default function Gallery() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')
  const serif = "'Instrument Serif', serif"

  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  const filtered = filter === 'All' ? photos : photos.filter(p => p.category === filter)
  const selectedPhoto = selected !== null ? photos.find(p => p.id === selected) : null

  const handleDownload = (photo: typeof photos[0]) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1920; canvas.height = 1080
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = photo.color
    ctx.fillRect(0,0,1920,1080)
    const grad = ctx.createRadialGradient(960,540,0,960,540,700)
    grad.addColorStop(0, photo.accent+'30'); grad.addColorStop(1,'transparent')
    ctx.fillStyle=grad; ctx.fillRect(0,0,1920,1080)
    ctx.globalAlpha=0.7; ctx.fillStyle=photo.accent
    ctx.font='bold 72px serif'; ctx.textAlign='center'; ctx.fillText(photo.title,960,500)
    ctx.globalAlpha=0.35; ctx.fillStyle='#e8e4d9'
    ctx.font='28px sans-serif'; ctx.fillText('Shot by Shivish · shivish.in',960,590)
    const a=document.createElement('a'); a.href=canvas.toDataURL('image/png')
    a.download=`shivish-${photo.title.toLowerCase().replace(/ /g,'-')}.png`; a.click()
  }

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',cursor:'none',fontFamily:"'DM Sans',sans-serif"}}>
      <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
      <div ref={trailRef} style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <Nav />

      <div style={{maxWidth:1200,margin:'0 auto',padding:'140px 48px 80px'}}>
        {/* Header */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.9,ease:[0.16,1,0.3,1]}}>
          <p style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:20}}>Photography & Editing</p>
          <h1 style={{fontFamily:serif,fontSize:'clamp(56px,10vw,120px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.04em',marginBottom:20}}>
            Gallery<br/><em style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}>& shots.</em>
          </h1>
          <p style={{fontSize:14,color:'rgba(232,228,217,0.4)',fontWeight:300,maxWidth:420,lineHeight:1.7,marginBottom:56}}>
            Visual work — street photography, portraits, edits. Click to preview. Download as wallpaper.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.7}}
          style={{display:'flex',gap:10,marginBottom:48}}>
          {['All','Photography','Editing'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{
              borderRadius:9999,padding:'9px 22px',
              border:`0.5px solid ${filter===f?'rgba(232,228,217,0.35)':'rgba(232,228,217,0.1)'}`,
              background:filter===f?'rgba(232,228,217,0.07)':'transparent',
              color:filter===f?'#e8e4d9':'rgba(232,228,217,0.38)',
              fontSize:12,cursor:'none',transition:'all 0.25s',letterSpacing:'0.06em',textTransform:'uppercase'
            }}>
              {f}
            </button>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        <div style={{columns:3,gap:12,columnFill:'balance'}}>
          {filtered.map((photo,i)=>(
            <motion.div key={photo.id}
              initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}}
              transition={{delay:i*0.06,duration:0.7,ease:[0.16,1,0.3,1]}}
              whileHover={{scale:1.015}}
              onClick={()=>setSelected(photo.id)}
              style={{
                breakInside:'avoid',marginBottom:12,borderRadius:14,overflow:'hidden',
                cursor:'none',position:'relative',
                aspectRatio:i%3===1?'3/4':'4/3',
                background:photo.color,
                border:'0.5px solid rgba(232,228,217,0.07)',
                display:'block'
              }}>
              <div style={{position:'absolute',inset:0,background:`radial-gradient(circle at 40% 50%, ${photo.accent}18 0%, transparent 65%)`}}/>
              <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:photo.accent,opacity:0.4}}/>
                <p style={{fontFamily:serif,fontSize:17,color:'rgba(232,228,217,0.65)',fontStyle:'italic'}}>{photo.title}</p>
                <p style={{fontSize:10,color:'rgba(232,228,217,0.28)',letterSpacing:'0.14em',textTransform:'uppercase'}}>{photo.category}</p>
              </div>
              <span style={{position:'absolute',top:10,left:10,fontSize:9,padding:'2px 8px',borderRadius:9999,background:'rgba(0,0,0,0.3)',color:'rgba(232,228,217,0.3)',letterSpacing:'0.1em'}}>PLACEHOLDER</span>
              <button onClick={e=>{e.stopPropagation();handleDownload(photo)}}
                style={{position:'absolute',bottom:10,right:10,borderRadius:9999,padding:'6px 14px',background:'rgba(232,228,217,0.1)',border:'0.5px solid rgba(232,228,217,0.18)',color:'rgba(232,228,217,0.7)',display:'flex',alignItems:'center',gap:5,fontSize:11,cursor:'none',transition:'all 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(232,228,217,0.2)';e.currentTarget.style.color='#e8e4d9'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(232,228,217,0.1)';e.currentTarget.style.color='rgba(232,228,217,0.7)'}}>
                <Download size={12}/> Save
              </button>
            </motion.div>
          ))}
        </div>

        <p style={{textAlign:'center',fontSize:12,color:'rgba(232,228,217,0.18)',marginTop:56,fontFamily:serif,fontStyle:'italic'}}>
          Real photos coming soon. Placeholders for now.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
            style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.94)',display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(28px)'}}
            onClick={()=>setSelected(null)}>
            <button style={{position:'absolute',top:24,right:24,width:44,height:44,borderRadius:'50%',background:'rgba(232,228,217,0.08)',border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',display:'flex',alignItems:'center',justifyContent:'center',cursor:'none'}} onClick={()=>setSelected(null)}>
              <X size={18}/>
            </button>
            <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} transition={{duration:0.4,ease:[0.16,1,0.3,1]}}
              style={{width:'65vw',maxWidth:860,aspectRatio:'4/3',borderRadius:22,background:selectedPhoto.color,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:18,position:'relative',border:'0.5px solid rgba(232,228,217,0.1)'}}
              onClick={e=>e.stopPropagation()}>
              <div style={{position:'absolute',inset:0,borderRadius:22,background:`radial-gradient(circle at center, ${selectedPhoto.accent}20 0%, transparent 65%)`}}/>
              <div style={{width:56,height:56,borderRadius:'50%',background:selectedPhoto.accent,opacity:0.45}}/>
              <p style={{fontFamily:serif,fontSize:38,color:'rgba(232,228,217,0.85)',fontStyle:'italic',letterSpacing:'-0.02em'}}>{selectedPhoto.title}</p>
              <p style={{fontSize:11,color:'rgba(232,228,217,0.35)',letterSpacing:'0.14em',textTransform:'uppercase'}}>{selectedPhoto.category} · Placeholder</p>
              <button onClick={()=>handleDownload(selectedPhoto)}
                style={{marginTop:8,borderRadius:9999,padding:'13px 32px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,border:'none',cursor:'none',display:'flex',alignItems:'center',gap:8,transition:'opacity 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.opacity='0.85')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                <Download size={15}/> Download as Wallpaper
              </button>
            </motion.div>
            {['prev','next'].map(dir=>(
              <button key={dir} style={{position:'absolute',[dir==='prev'?'left':'right']:24,top:'50%',transform:'translateY(-50%)',width:44,height:44,borderRadius:'50%',background:'rgba(232,228,217,0.08)',border:'0.5px solid rgba(232,228,217,0.15)',color:'#e8e4d9',display:'flex',alignItems:'center',justifyContent:'center',cursor:'none'}}
                onClick={e=>{e.stopPropagation();const idx=photos.findIndex(p=>p.id===selected);setSelected(photos[(idx+(dir==='next'?1:-1)+photos.length)%photos.length].id)}}>
                {dir==='prev'?<ChevronLeft size={20}/>:<ChevronRight size={20}/>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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