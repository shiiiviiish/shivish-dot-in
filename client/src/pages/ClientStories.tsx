// ─────────────────────────────────────────────────────────────────────────────
// ClientStories.tsx — Ready to use, not yet added to routes
//
// TO ACTIVATE:
// 1. In App.tsx add:
//      import ClientStories from './pages/ClientStories'
//      <Route path="/client-stories" element={<ClientStories />} />
// 2. In Nav.tsx add to links array:
//      ['stories', '/client-stories']
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const serif = "'Instrument Serif', serif"
const mono  = "'DM Mono', monospace"
const sans  = "'DM Sans', sans-serif"

const clients = [
  {
    id: 'hta',
    name: 'Kavya Atray',
    role: 'Founder, Happiness Through Art',
    handle: 'KA',
    accent: '#4ade80',
    accentDim: 'rgba(74,222,128,0.1)',
    accentBorder: 'rgba(74,222,128,0.2)',
    url: 'https://hta-seven.vercel.app/',
    year: '2025',
    type: 'Web Design & Development',
    tags: ['React', 'TypeScript', 'Vercel', 'Framer Motion'],
    quote: 'He understood the brand before I even finished explaining it. The whole process felt collaborative — he\'d show me something, I\'d give feedback, and it would come back better than I imagined. The site doesn\'t just look good, it actually feels like HTA.',
    timeline: [
      {
        step: '01',
        phase: 'Discovery',
        photo: 'First call',
        desc: 'Understanding HTA — the brand, the audience, the feeling Kavya wanted visitors to leave with.',
        quote: '"He asked the right questions — not just what I wanted, but why."',
      },
      {
        step: '02',
        phase: 'Design & Build',
        photo: 'In progress',
        desc: 'Built in React + TypeScript. Shop, therapy page, gallery, dog mascot Joey, Instagram reels, WhatsApp ordering.',
        quote: '"Every revision came back better. It felt like working with someone who genuinely cared."',
      },
      {
        step: '03',
        phase: 'Launch',
        photo: 'Going live',
        desc: 'Deployed on Vercel. Google Analytics connected. Coupon codes, SKU system, all working.',
        quote: '"The day we launched, I couldn\'t stop sharing it with everyone."',
      },
    ],
  },
  {
    id: 'pixable',
    name: 'Sahil Dev',
    role: 'Founder, Pixable Studios',
    handle: 'SD',
    accent: '#60a5fa',
    accentDim: 'rgba(96,165,250,0.1)',
    accentBorder: 'rgba(96,165,250,0.2)',
    url: 'https://github.com/shiiiviiish',
    year: '2025',
    type: 'Web Design',
    tags: ['Coming Soon'],
    quote: 'Shivish never just builds what you ask — he thinks about what you actually need. Quick to respond, honest about timelines, and the output is always cleaner than expected.',
    timeline: [
      {
        step: '01',
        phase: 'Discovery',
        photo: 'Brief',
        desc: 'Understanding Pixable Studios — scope, timeline, goals.',
        quote: '"Clear communication from day one."',
      },
      {
        step: '02',
        phase: 'Design',
        photo: 'In progress',
        desc: 'Details to be published soon.',
        quote: '"Something big is in the works."',
      },
      {
        step: '03',
        phase: 'Launch',
        photo: 'Coming soon',
        desc: 'Launching soon — watch this space.',
        quote: '"Stay tuned."',
      },
    ],
  },
]

export default function ClientStories() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef  = useRef<HTMLDivElement>(null)
  const isMobile  = window.innerWidth < 768

  useEffect(() => {
    if (isMobile) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove); loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  }, [])

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',fontFamily:sans,overflowX:'hidden'}}>
      {!isMobile && <>
        <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
        <div ref={trailRef}  style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      </>}

      <Nav />

      {/* Hero */}
      <section style={{padding:'clamp(120px,16vw,180px) clamp(20px,5vw,80px) 80px'}}>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
          style={{fontFamily:mono,fontSize:10,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:20}}>
          Client Stories
        </motion.p>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:1,ease:[0.16,1,0.3,1]}}
          style={{fontFamily:serif,fontSize:'clamp(52px,10vw,120px)',fontWeight:400,lineHeight:0.88,letterSpacing:'-0.04em',marginBottom:24}}>
          Working<br/><em style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}>with me.</em>
        </motion.h1>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.8}}
          style={{fontSize:14,color:'rgba(232,228,217,0.4)',fontWeight:300,lineHeight:1.8,maxWidth:480}}>
          Real projects. Real people. The full journey — from first call to launch day.
        </motion.p>
      </section>

      {/* Clients */}
      {clients.map((client, ci) => (
        <section key={client.id} style={{maxWidth:1100,margin:'0 auto',padding:'0 clamp(20px,5vw,48px) 100px'}}>

          {/* Split screen */}
          <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
            style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'1fr 1fr',borderRadius:20,overflow:'hidden',border:'0.5px solid rgba(232,228,217,0.07)',marginBottom:24}}>

            {/* Photo side */}
            <div style={{background:'rgba(255,255,255,0.02)',padding:isMobile?'28px':'40px',display:'flex',flexDirection:'column',gap:12,justifyContent:'center',alignItems:'center',order:ci%2===0?1:2}}>
              <div style={{width:'100%',maxWidth:280,height:180,borderRadius:12,background:'rgba(255,255,255,0.04)',border:`0.5px solid ${client.accentBorder}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,background:`linear-gradient(145deg,${client.accentDim},transparent)`}}/>
                <div style={{width:52,height:52,borderRadius:'50%',background:client.accentDim,border:`0.5px solid ${client.accentBorder}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:serif,fontSize:18,color:client.accent,position:'relative',zIndex:1}}>
                  {client.handle}
                </div>
                <span style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.2)',letterSpacing:'0.12em',textTransform:'uppercase',position:'relative',zIndex:1}}>
                  Add photo here
                </span>
              </div>
              <div style={{display:'flex',gap:12,width:'100%',maxWidth:280}}>
                {['Working session','Launch day'].map((label,i)=>(
                  <div key={i} style={{flex:1,height:100,borderRadius:10,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{fontFamily:mono,fontSize:8,color:'rgba(232,228,217,0.15)',letterSpacing:'0.1em',textTransform:'uppercase',textAlign:'center',padding:'0 6px'}}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote side */}
            <div style={{background:'rgba(0,0,0,0.3)',padding:isMobile?'28px':'48px',display:'flex',flexDirection:'column',justifyContent:'center',order:ci%2===0?2:1}}>
              <p style={{fontFamily:mono,fontSize:9,color:`${client.accent}80`,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:20}}>
                {client.type} · {client.year}
              </p>
              <p style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(17px,2.5vw,26px)',color:'rgba(232,228,217,0.9)',lineHeight:1.7,marginBottom:32,letterSpacing:'-0.01em'}}>
                "{client.quote}"
              </p>
              <div style={{borderTop:'0.5px solid rgba(232,228,217,0.07)',paddingTop:20}}>
                <p style={{fontFamily:serif,fontSize:16,color:'#e8e4d9',marginBottom:4}}>{client.name}</p>
                <p style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.35)',letterSpacing:'0.08em',marginBottom:12}}>{client.role}</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
                  {client.tags.map(t=>(
                    <span key={t} style={{fontSize:10,padding:'2px 10px',borderRadius:9999,border:`0.5px solid ${client.accentBorder}`,color:client.accent,fontFamily:mono,opacity:0.6}}>{t}</span>
                  ))}
                </div>
                <a href={client.url} target="_blank" rel="noopener noreferrer"
                  style={{fontFamily:mono,fontSize:9,color:`${client.accent}80`,letterSpacing:'0.1em',textDecoration:'none',borderBottom:`0.5px solid ${client.accent}30`,paddingBottom:2}}>
                  View Project ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div style={{display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:12,position:'relative'}}>
            {!isMobile && (
              <div style={{position:'absolute',top:28,left:'calc(16.66% + 20px)',right:'calc(16.66% + 20px)',height:'0.5px',background:`linear-gradient(to right,${client.accent}30,${client.accent}08)`,zIndex:0}}/>
            )}
            {client.timeline.map((t,ti)=>(
              <motion.div key={ti} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay:ti*0.1,duration:0.8,ease:[0.16,1,0.3,1]}}
                style={{background:'rgba(255,255,255,0.02)',border:`0.5px solid ${client.accentBorder}`,borderRadius:14,padding:'22px',display:'flex',flexDirection:'column',gap:12,position:'relative',zIndex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:client.accentDim,border:`0.5px solid ${client.accentBorder}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:mono,fontSize:9,color:client.accent,flexShrink:0}}>
                    {t.step}
                  </div>
                  <p style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.4)',letterSpacing:'0.12em',textTransform:'uppercase'}}>{t.phase}</p>
                </div>
                <div style={{width:'100%',height:88,borderRadius:8,background:'rgba(255,255,255,0.03)',border:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:mono,fontSize:8,color:'rgba(232,228,217,0.12)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{t.photo}</span>
                </div>
                <p style={{fontFamily:sans,fontSize:12,color:'rgba(232,228,217,0.4)',lineHeight:1.65,fontWeight:300}}>{t.desc}</p>
                <p style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:`${client.accent}80`,lineHeight:1.6}}>{t.quote}</p>
              </motion.div>
            ))}
          </div>

          {ci < clients.length - 1 && (
            <div style={{borderBottom:'0.5px solid rgba(232,228,217,0.06)',marginTop:80}}/>
          )}
        </section>
      ))}

      {/* CTA */}
      <section style={{maxWidth:1100,margin:'0 auto',padding:'0 clamp(20px,5vw,48px) 100px',textAlign:'center'}}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:1}}>
          <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.25)',marginBottom:20}}>Next up</p>
          <h2 style={{fontFamily:serif,fontSize:'clamp(36px,7vw,80px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',marginBottom:32}}>
            Your project<br/><em style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}>could be here.</em>
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (min-width: 769px) { * { cursor: none; } }
      `}</style>
    </div>
  )
}