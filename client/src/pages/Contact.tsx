import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Nav from '../components/Nav'
import { SplineScene } from '../components/ui/splite'

const serif = "'Instrument Serif', serif"
const sans  = "'DM Sans', sans-serif"
const mono  = "'DM Mono', monospace"

export default function Contact() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef  = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  return (
    <div style={{background:'#07100d',color:'#e8e4d9',minHeight:'100vh',fontFamily:sans,overflowX:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .lg{background:rgba(255,255,255,0.02);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 1px rgba(255,255,255,0.08);position:relative;overflow:hidden;}
        .lg::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(180deg,rgba(255,255,255,0.35) 0%,rgba(255,255,255,0.08) 30%,rgba(255,255,255,0) 50%,rgba(255,255,255,0.08) 70%,rgba(255,255,255,0.35) 100%);-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.3);}
        @media(min-width:769px){*{cursor:none;}.desktop-cursor{display:block!important;}}
        @media(max-width:768px){.desktop-cursor{display:none!important;}.contact-layout{grid-template-columns:1fr!important;}.robot-col{display:none!important;}}
      `}</style>

      <div ref={cursorRef} className="desktop-cursor" style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
      <div ref={trailRef}  className="desktop-cursor" style={{position:'fixed',width:44,height:44,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>

      <Nav/>

      <div
        id="tour-contact-form"
        className="contact-layout"
        style={{display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'100vh',paddingTop:80}}>

        {/* ── LEFT — form ── */}
        <motion.div
          initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}} transition={{duration:1,ease:[0.16,1,0.3,1]}}
          style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px clamp(24px,4vw,64px)',overflowY:'auto'}}>

          <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:20}}>{'{CONTACT · 2025}'}</p>

          <h1 style={{fontFamily:serif,fontSize:'clamp(40px,5.5vw,80px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',marginBottom:28}}>
            Feel free<br/>
            <em style={{fontStyle:'italic',color:'rgba(232,228,217,0.22)'}}>to contact.</em>
          </h1>

          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:24,padding:'9px 16px',background:'rgba(74,222,128,0.06)',border:'0.5px solid rgba(74,222,128,0.2)',borderRadius:9999,width:'fit-content'}}>
            <span style={{width:6,height:6,background:'#4ade80',borderRadius:'50%',boxShadow:'0 0 6px #4ade80',display:'inline-block',animation:'pulse 2s infinite'}}/>
            <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.6)',letterSpacing:'0.06em'}}>Currently available · Response within 24h</span>
          </div>

          <a href="mailto:hello@shivish.in"
            style={{display:'block',fontFamily:serif,fontStyle:'italic',fontSize:'clamp(15px,2vw,24px)',color:'rgba(232,228,217,0.45)',textDecoration:'none',marginBottom:24,transition:'color 0.3s'}}
            onMouseEnter={e=>(e.currentTarget.style.color='#e8e4d9')}
            onMouseLeave={e=>(e.currentTarget.style.color='rgba(232,228,217,0.45)')}>
            hello@shivish.in ↗
          </a>

          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
            {[
              {icon:'↗',label:'GitHub',    url:'https://github.com/shiiiviiish'},
              {icon:'✉',label:'Email',     url:'mailto:hello@shivish.in'},
              {icon:'◎',label:'Instagram', url:'#'},
              {icon:'in',label:'LinkedIn', url:'#'},
            ].map(s=>(
              <a key={s.label} href={s.url} target={s.url.startsWith('http')?'_blank':undefined}
                className="lg"
                style={{display:'flex',alignItems:'center',gap:6,borderRadius:9999,padding:'8px 14px',color:'rgba(232,228,217,0.5)',textDecoration:'none',fontSize:12,fontFamily:mono,letterSpacing:'0.06em',transition:'color 0.2s'}}
                onMouseEnter={e=>{e.currentTarget.style.color='#e8e4d9'}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(232,228,217,0.5)'}}>
                <span>{s.icon}</span> {s.label}
              </a>
            ))}
          </div>

          {/* Glass form */}
          <div className="lg" style={{borderRadius:20,padding:'clamp(20px,3vw,32px)',background:'rgba(255,255,255,0.015)'}}>
            <p style={{fontFamily:mono,fontSize:9,letterSpacing:'0.2em',color:'rgba(232,228,217,0.25)',marginBottom:20}}>{'{SEND_A_MESSAGE}'}</p>

            {sent ? (
              <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} style={{textAlign:'center',padding:'28px 0'}}>
                <div style={{width:48,height:48,borderRadius:'50%',background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.3)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:20}}>✓</div>
                <p style={{fontFamily:serif,fontSize:22,color:'#e8e4d9',marginBottom:8}}>Message sent!</p>
                <p style={{fontSize:13,color:'rgba(232,228,217,0.4)'}}>I'll get back to you within 24h.</p>
              </motion.div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {[
                  {key:'name', label:'Name',  placeholder:'Your name',      type:'text'},
                  {key:'email',label:'Email', placeholder:'your@email.com', type:'email'},
                ].map(f=>(
                  <div key={f.key}>
                    <label style={{fontFamily:mono,fontSize:9,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(232,228,217,0.25)',display:'block',marginBottom:8}}>{f.label}</label>
                    <div className="lg" style={{borderRadius:10,padding:'12px 16px'}}>
                      <input
                        value={form[f.key as keyof typeof form]}
                        onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                        placeholder={f.placeholder} type={f.type}
                        style={{width:'100%',background:'transparent',border:'none',outline:'none',color:'#e8e4d9',fontSize:14,fontFamily:sans}}/>
                    </div>
                  </div>
                ))}
                <div>
                  <label style={{fontFamily:mono,fontSize:9,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(232,228,217,0.25)',display:'block',marginBottom:8}}>Message</label>
                  <div className="lg" style={{borderRadius:10,padding:'12px 16px'}}>
                    <textarea
                      value={form.message}
                      onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                      placeholder="Tell me about your project..."
                      rows={4}
                      style={{width:'100%',background:'transparent',border:'none',outline:'none',color:'#e8e4d9',fontSize:14,fontFamily:sans,resize:'none'}}/>
                  </div>
                </div>
                <button
                  onClick={()=>{if(form.name&&form.email&&form.message){window.location.href=`mailto:hello@shivish.in?subject=Message from ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`;setSent(true)}}}
                  className="lg"
                  style={{borderRadius:9999,padding:'14px 32px',color:'#e8e4d9',fontSize:13,fontWeight:500,border:'none',cursor:'pointer',width:'100%',fontFamily:sans,display:'flex',alignItems:'center',justifyContent:'center',gap:8,transition:'all 0.2s'}}
                  onMouseEnter={e=>(e.currentTarget.style.background='rgba(74,222,128,0.08)')}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                  Send message <ArrowRight size={16}/>
                </button>
              </div>
            )}
          </div>


        </motion.div>

        {/* ── RIGHT — Robot ── */}
        <motion.div
          className="robot-col"
          initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:1.2,ease:[0.16,1,0.3,1]}}
          style={{position:'sticky',top:0,height:'100vh',overflow:'hidden'}}>

          {/* Spline robot — no lazy load, loads immediately */}
          <div style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* Fades */}
          <div style={{position:'absolute',top:0,left:0,right:0,height:100,background:'linear-gradient(to bottom,#07100d,transparent)',pointerEvents:'none',zIndex:3}}/>
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to top,#07100d,transparent)',pointerEvents:'none',zIndex:3}}/>
          <div style={{position:'absolute',top:0,left:0,bottom:0,width:80,background:'linear-gradient(to right,#07100d,transparent)',pointerEvents:'none',zIndex:3}}/>

          {/* Label */}
          <div style={{position:'absolute',bottom:28,right:28,zIndex:10,pointerEvents:'none'}}>
            <div className="lg" style={{borderRadius:9999,padding:'5px 14px'}}>
              <span style={{fontFamily:mono,fontSize:9,letterSpacing:'0.16em',color:'rgba(232,228,217,0.3)'}}>Interactive · Drag me</span>
            </div>
          </div>
        </motion.div>
      </div>

      <footer style={{padding:'20px clamp(20px,5vw,48px)',borderTop:'0.5px solid rgba(232,228,217,0.05)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12,background:'#07100d'}}>
        <span style={{fontFamily:mono,fontSize:10,color:'rgba(232,228,217,0.18)'}}>Design & Dev by Shivish · 2025</span>
        <span style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:'rgba(232,228,217,0.18)'}}>Built with vibe.</span>
      </footer>
    </div>
  )
}