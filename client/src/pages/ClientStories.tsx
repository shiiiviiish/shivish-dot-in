// ClientStories.tsx — Single scrollable page
// App.tsx: import ClientStories from './pages/ClientStories'
//          <Route path="/client-stories" element={<ClientStories />} />

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import Nav from '../components/Nav'

const serif = "'Instrument Serif', serif"
const mono  = "'DM Mono', monospace"
const sans  = "'DM Sans', sans-serif"

const clients = [
  {
    id: 'hta',
    name: 'Kavya Atray',
    role: 'Founder, Happiness Through Art',
    initials: 'KA',
    accent: '#4ade80',
    accentDim: 'rgba(74,222,128,0.1)',
    accentBorder: 'rgba(74,222,128,0.2)',
    url: 'https://hta-seven.vercel.app/',
    year: '2025',
    type: 'Web Design & Development',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Vercel', 'Google Analytics'],
    quote: 'He understood the brand before I even finished explaining it. The whole process felt collaborative — the site doesn\'t just look good, it actually feels like HTA.',
    process: [
      { num:'01', phase:'Discovery', desc:'Understanding HTA — the brand, the audience, the feeling Kavya wanted visitors to leave with.', quote:'"He asked the right questions — not just what I wanted, but why."' },
      { num:'02', phase:'Design & Build', desc:'React + TypeScript. Shop, therapy page, gallery, dog mascot Joey, WhatsApp ordering, coupon codes.', quote:'"Every revision came back better than I imagined."' },
      { num:'03', phase:'Launch', desc:'Deployed on Vercel. Google Analytics. Everything live and working perfectly.', quote:'"The day we launched, I couldn\'t stop sharing it with everyone."' },
    ],
  },
  {
    id: 'pixable',
    name: 'Sahil Dev',
    role: 'Founder, Pixable Studios',
    initials: 'SD',
    accent: '#60a5fa',
    accentDim: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.2)',
    url: 'https://github.com/shiiiviiish',
    year: '2025',
    type: 'Web Design',
    tags: ['Coming Soon'],
    quote: 'Shivish never just builds what you ask — he thinks about what you actually need. Quick to respond, honest about timelines, and the output is always cleaner than expected.',
    process: [
      { num:'01', phase:'Brief', desc:'Understanding Pixable Studios — scope, goals, timeline.', quote:'"Clear communication from day one."' },
      { num:'02', phase:'Design', desc:'Currently in active development. Details to be published on launch.', quote:'"Something big is in the works."' },
      { num:'03', phase:'Launch', desc:'Coming soon — watch this space.', quote:'"Stay tuned."' },
    ],
  },
]

function BallAvatar({ initials, accent, accentDim, accentBorder }: any) {
  return (
    <div
      style={{
        width:72, height:72, borderRadius:'50%', flexShrink:0,
        background:`radial-gradient(circle at 35% 35%, ${accent}30, rgba(7,16,13,0.95))`,
        border:`1.5px solid ${accentBorder}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:serif, fontSize:22, color:accent,
        cursor:'pointer', position:'relative', overflow:'hidden',
        boxShadow:`0 4px 24px rgba(0,0,0,0.5)`,
        transition:'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
      }}
      onMouseEnter={e=>{
        e.currentTarget.style.transform='rotate(25deg) scale(1.15)'
        e.currentTarget.style.boxShadow=`0 8px 32px rgba(0,0,0,0.6), 0 0 0 10px ${accentDim}`
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.transform='rotate(0deg) scale(1)'
        e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.5)'
      }}>
      <div style={{position:'absolute',top:12,left:15,width:18,height:10,borderRadius:'50%',background:'rgba(255,255,255,0.18)',transform:'rotate(-30deg)',pointerEvents:'none'}}/>
      {initials}
    </div>
  )
}

export default function ClientStories() {
  const isMobile = window.innerWidth < 768
  const fogRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = fogRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W=0, H=0, raf=0
    const ps: any[] = []
    const resize = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight }
    resize()
    for(let i=0;i<8;i++) ps.push({x:Math.random()*W,y:Math.random()*H,r:160+Math.random()*280,dx:(Math.random()-.5)*.2,dy:(Math.random()-.5)*.1,a:.025+Math.random()*.035})
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

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',fontFamily:sans,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',padding:'clamp(12px,2vw,24px)',position:'relative',overflow:'hidden'}}>

      {/* Fog background */}
      <canvas ref={fogRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:10,width:'100%'}}>
      <Nav/>

      {/* 90% screen modal card */}
      <div style={{
        width:'92vw',
        minHeight:'88vh',
        background:'rgba(0,0,0,0.72)',
        border:'0.5px solid rgba(255,255,255,0.07)',
        borderRadius:20,
        overflow:'hidden',
        backdropFilter:'blur(2px)',
        padding:isMobile?'40px 20px 60px':'60px 64px 80px',
        marginTop:16,
      }}>

      {/* HERO */}
      <section style={{marginBottom:60}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          style={{fontFamily:mono,fontSize:10,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:20}}>
          Client Stories
        </motion.p>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:serif,fontSize:'clamp(52px,10vw,120px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.04em',marginBottom:24}}>
          Working<br/><em style={{color:'rgba(232,228,217,0.22)'}}>with me.</em>
        </motion.h1>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.8}}
          style={{fontSize:15,color:'rgba(232,228,217,0.4)',fontWeight:300,lineHeight:1.8,maxWidth:480}}>
          Real projects. Real people. The full journey — from first call to launch day.
        </motion.p>
      </section>

      {/* CLIENTS */}
      {clients.map((client, ci) => (
        <section key={client.id} style={{marginBottom: ci < clients.length-1 ? 80 : 60}}>

          {/* Split screen */}
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
            style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',borderRadius:20,overflow:'hidden',border:'0.5px solid rgba(232,228,217,0.07)',marginBottom:20}}>

            {/* Photo side */}
            <div style={{background:'rgba(255,255,255,0.02)',padding:isMobile?'32px':'48px',display:'flex',flexDirection:'column',gap:16,justifyContent:'center',alignItems:'center',order:ci%2===0?1:2}}>
              <div style={{width:'100%',maxWidth:300,height:200,borderRadius:14,background:'rgba(255,255,255,0.03)',border:`0.5px solid ${client.accentBorder}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,background:`linear-gradient(145deg,${client.accentDim},transparent)`}}/>
                <BallAvatar {...client}/>
                <span style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.18)',letterSpacing:'0.12em',textTransform:'uppercase',position:'relative',zIndex:1}}>Add photo here</span>
              </div>
              <div style={{display:'flex',gap:12,width:'100%',maxWidth:300}}>
                {['Working session','Launch day'].map((l,i)=>(
                  <div key={i} style={{flex:1,height:100,borderRadius:10,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{fontFamily:mono,fontSize:8,color:'rgba(232,228,217,0.14)',letterSpacing:'0.1em',textTransform:'uppercase',textAlign:'center',padding:'0 6px'}}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote side */}
            <div style={{background:'rgba(0,0,0,0.3)',padding:isMobile?'32px':'52px',display:'flex',flexDirection:'column',justifyContent:'center',order:ci%2===0?2:1}}>
              <p style={{fontFamily:mono,fontSize:9,color:`${client.accent}80`,letterSpacing:'0.16em',textTransform:'uppercase',marginBottom:20}}>{client.type} · {client.year}</p>
              <p style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(18px,2.8vw,28px)',color:'rgba(232,228,217,0.92)',lineHeight:1.65,marginBottom:32,letterSpacing:'-0.01em'}}>
                "{client.quote}"
              </p>
              <div style={{borderTop:'0.5px solid rgba(232,228,217,0.07)',paddingTop:24}}>
                <p style={{fontFamily:serif,fontSize:18,color:'#e8e4d9',marginBottom:4}}>{client.name}</p>
                <p style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.35)',letterSpacing:'0.08em',marginBottom:16}}>{client.role}</p>
                <div style={{display:'flex',gap:7,flexWrap:'wrap',marginBottom:20}}>
                  {client.tags.map(t=>(
                    <span key={t} style={{fontSize:10,padding:'3px 10px',borderRadius:9999,border:`0.5px solid ${client.accentBorder}`,color:client.accent,fontFamily:mono,opacity:0.65}}>{t}</span>
                  ))}
                </div>
                <a href={client.url} target="_blank" rel="noopener noreferrer"
                  style={{display:'inline-flex',alignItems:'center',gap:6,fontFamily:mono,fontSize:10,color:`${client.accent}70`,letterSpacing:'0.1em',textDecoration:'none',borderBottom:`0.5px solid ${client.accent}30`,paddingBottom:2}}>
                  <ExternalLink size={11}/> View Project
                </a>
              </div>
            </div>
          </motion.div>

          {/* Process timeline */}
          <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:14,position:'relative'}}>
            {!isMobile && <div style={{position:'absolute',top:24,left:'calc(16.66% + 14px)',right:'calc(16.66% + 14px)',height:'0.5px',background:`linear-gradient(to right,${client.accent}35,${client.accent}05)`,zIndex:0}}/>}
            {client.process.map((t,ti)=>(
              <motion.div key={ti} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay:ti*0.1,duration:0.8}}
                style={{background:'rgba(255,255,255,0.02)',border:`0.5px solid ${client.accentBorder}`,borderRadius:14,padding:'22px',display:'flex',flexDirection:'column',gap:12,position:'relative',zIndex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:client.accentDim,border:`0.5px solid ${client.accentBorder}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:mono,fontSize:9,color:client.accent,flexShrink:0}}>{t.num}</div>
                  <p style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.4)',letterSpacing:'0.12em',textTransform:'uppercase'}}>{t.phase}</p>
                </div>
                <div style={{height:88,borderRadius:8,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.05)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:mono,fontSize:8,color:'rgba(232,228,217,0.1)',letterSpacing:'0.1em',textTransform:'uppercase'}}>photo</span>
                </div>
                <p style={{fontSize:12,color:'rgba(232,228,217,0.45)',lineHeight:1.65,fontWeight:300}}>{t.desc}</p>
                <p style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:`${client.accent}70`,lineHeight:1.5}}>{t.quote}</p>
              </motion.div>
            ))}
          </div>

          {ci < clients.length - 1 && (
            <div style={{borderBottom:'0.5px solid rgba(232,228,217,0.06)',marginTop:80}}/>
          )}
        </section>
      ))}

      {/* CTA */}
      <section style={{textAlign:'center',paddingTop:20}}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}>
          <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.25)',marginBottom:20}}>Next up</p>
          <h2 style={{fontFamily:serif,fontSize:'clamp(36px,7vw,80px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',marginBottom:32}}>
            Your project<br/><em style={{color:'rgba(232,228,217,0.22)'}}>could be here.</em>
          </h2>
          <Link to="/contact" style={{display:'inline-block',borderRadius:9999,padding:'14px 36px',background:'#e8e4d9',color:'#07100d',fontSize:13,fontWeight:500,textDecoration:'none'}}>
            Say hello →
          </Link>
        </motion.div>
      </section>

      <footer style={{padding:'24px clamp(20px,5vw,48px)',borderTop:'0.5px solid rgba(232,228,217,0.05)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:mono,fontSize:11,color:'rgba(232,228,217,0.18)'}}>Shivish · 2025</span>
        <span style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:'rgba(232,228,217,0.18)'}}>Built with vibe.</span>
      </footer>

      </div>{/* end modal card */}
      </div>{/* end nav wrapper */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono&family=Instrument+Serif:ital@0;1&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
    </div>
  )
}