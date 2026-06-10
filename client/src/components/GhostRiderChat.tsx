// GhostRiderChat.tsx — Add to App.tsx like GuidedTour
// import GhostRiderChat from './components/GhostRiderChat'
// <GhostRiderChat /> (place alongside GuidedTour in App.tsx)

import { useEffect, useRef, useState } from 'react'

const mono  = "'DM Mono', monospace"
const serif = "'Instrument Serif', serif"

const SHIVISH_CONTEXT = `You are Ghost Rider — but you're helping visitors navigate Shivish's portfolio website (shivish.in). Stay in character: speak briefly, powerfully, with a dark flair. You know everything about Shivish.

About Shivish:
- 19-year-old BTech student, Chandigarh, India. CSE with AI & ML specialization.
- Freelance web developer and creative coder.
- Email: hello@shivish.in | GitHub: github.com/shiiiviiish
- Stack: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Canvas API, Web Audio API
- Clients: Kavya Atray (Happiness Through Art - hta-seven.vercel.app), Sahil Dev (Pixable Studios - in progress)
- Portfolio pages: Home (/), Work (/work), About (/about), Gallery (/gallery), Soul (/vibes), Clients (/clients), Contact (/contact)
- Design: Dark cinematic — #07100d background, cream text, #4ade80 green accent
- Inspired by ning-h.com
- Available for freelance. Open to new projects.
- Philosophy: Que Sera Sera.

Answer questions about Shivish's work, skills, how to contact him, navigate the site.
Keep responses SHORT (2-3 sentences). Dark, cool tone. A bit dramatic. Never break character completely.
Example: "Looking for his work? Ride to /work — three projects forged in fire."
If you don't know something, say so in character.`

export default function GhostRiderChat() {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [open, setOpen]       = useState(false)
  const [showBubble, setBubble] = useState(false)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'assistant', text:string}[]>([
    { role:'assistant', text:"I am Ghost Rider. Ask me anything about this portfolio — or face my wrath. 🔥" }
  ])
  const isMobile = window.innerWidth < 768

  // Show speech bubble after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setBubble(true), 3000)
    const t2 = setTimeout(() => setBubble(false), 8000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role:'user', text:userMsg }])
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system: SHIVISH_CONTEXT,
          messages: [
            ...messages.map(m => ({ role:m.role, content:m.text })),
            { role:'user', content:userMsg }
          ]
        })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "The flames obscure my vision. Ask again."
      setMessages(prev => [...prev, { role:'assistant', text:reply }])
    } catch {
      setMessages(prev => [...prev, { role:'assistant', text:"Something interferes with my power. Try again." }])
    }
    setLoading(false)
  }

  return (
    <div style={{position:'fixed',bottom:isMobile?16:24,left:isMobile?16:32,zIndex:9990,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:12}}>

      {/* Chat window */}
      {open && (
        <div style={{
          width:isMobile?'calc(100vw - 32px)':'340px',
          background:'rgba(5,8,6,0.97)',
          backdropFilter:'blur(24px)',
          border:'0.5px solid rgba(255,80,0,0.25)',
          borderRadius:20,
          overflow:'hidden',
          boxShadow:'0 16px 48px rgba(0,0,0,0.9), 0 0 40px rgba(255,60,0,0.08)',
          animation:'slideUpChat 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        }}>
          {/* Header */}
          <div style={{padding:'14px 18px',borderBottom:'0.5px solid rgba(255,80,0,0.12)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(255,40,0,0.05)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{fontSize:16}}>🔥</div>
              <div>
                <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,120,0,0.8)',margin:0}}>Ghost Rider</p>
                <p style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.3)',margin:0,letterSpacing:'0.08em'}}>Portfolio Guide</p>
              </div>
            </div>
            <button onClick={()=>setOpen(false)}
              style={{width:28,height:28,borderRadius:'50%',background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(255,255,255,0.08)',color:'rgba(232,228,217,0.4)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{height:240,overflowY:'auto',padding:'14px',display:'flex',flexDirection:'column',gap:10}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                <div style={{
                  maxWidth:'88%',padding:'9px 13px',
                  borderRadius:m.role==='user'?'13px 13px 3px 13px':'13px 13px 13px 3px',
                  background:m.role==='user'?'rgba(232,228,217,0.9)':'rgba(255,60,0,0.08)',
                  color:m.role==='user'?'#07100d':'rgba(232,228,217,0.85)',
                  fontSize:13,lineHeight:1.6,fontFamily:"'DM Sans',sans-serif",
                  border:m.role==='user'?'none':'0.5px solid rgba(255,80,0,0.15)',
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display:'flex',justifyContent:'flex-start'}}>
                <div style={{padding:'9px 13px',borderRadius:'13px 13px 13px 3px',background:'rgba(255,60,0,0.08)',border:'0.5px solid rgba(255,80,0,0.15)',display:'flex',gap:4}}>
                  {[0,1,2].map(i=>(
                    <div key={i} style={{width:6,height:6,borderRadius:'50%',background:'rgba(255,100,0,0.7)',animation:'flamePulse 0.6s ease infinite',animationDelay:`${i*0.15}s`}}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>

          {/* Input */}
          <div style={{padding:'10px 14px',borderTop:'0.5px solid rgba(255,80,0,0.1)',display:'flex',gap:8}}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&sendMessage()}
              placeholder="Ask the Rider..."
              style={{flex:1,background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(255,80,0,0.12)',borderRadius:9999,padding:'8px 14px',color:'#e8e4d9',fontSize:13,outline:'none',fontFamily:"'DM Sans',sans-serif"}}
            />
            <button onClick={sendMessage} disabled={loading}
              style={{width:34,height:34,borderRadius:'50%',background:loading?'rgba(255,80,0,0.2)':'#ff4400',border:'none',cursor:loading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:14,flexShrink:0,transition:'all 0.2s',boxShadow:loading?'none':'0 0 12px rgba(255,80,0,0.4)'}}>
              →
            </button>
          </div>
        </div>
      )}

      {/* Speech bubble */}
      {showBubble && !open && (
        <div style={{
          background:'rgba(5,8,6,0.95)',
          border:'0.5px solid rgba(255,80,0,0.25)',
          borderRadius:'12px 12px 12px 4px',
          padding:'10px 16px',
          maxWidth:200,
          position:'relative',
          animation:'fadeInBubble 0.4s ease forwards',
          boxShadow:'0 8px 24px rgba(0,0,0,0.6)',
        }}>
          <p style={{fontFamily:serif,fontStyle:'italic',fontSize:13,color:'rgba(232,228,217,0.85)',margin:0,lineHeight:1.5}}>
            "Need help finding something? Ask me."
          </p>
          <div style={{position:'absolute',bottom:-6,left:16,width:10,height:10,background:'rgba(5,8,6,0.95)',border:'0.5px solid rgba(255,80,0,0.25)',transform:'rotate(45deg)',borderTop:'none',borderLeft:'none'}}/>
        </div>
      )}

      {/* Ghost Rider button */}
      <button
        onClick={()=>{setOpen(o=>!o);setBubble(false)}}
        style={{
          width:64,height:64,
          borderRadius:'50%',
          background:'radial-gradient(circle at 35% 35%, rgba(255,80,0,0.3), rgba(5,8,6,0.95))',
          border:'1.5px solid rgba(255,80,0,0.4)',
          cursor:'pointer',
          display:'flex',alignItems:'center',justifyContent:'center',
          boxShadow:'0 0 20px rgba(255,60,0,0.3), 0 4px 16px rgba(0,0,0,0.5)',
          position:'relative',overflow:'hidden',
          animation:'riderFloat 3s ease-in-out infinite',
          transition:'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.1)';e.currentTarget.style.boxShadow='0 0 32px rgba(255,60,0,0.5), 0 4px 16px rgba(0,0,0,0.5)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 0 20px rgba(255,60,0,0.3), 0 4px 16px rgba(0,0,0,0.5)'}}>
        {/* Flame glow */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 30%,rgba(255,100,0,0.2),transparent 70%)',pointerEvents:'none'}}/>
        {/* Skull SVG */}
        <svg viewBox="0 0 40 44" width="36" height="40" xmlns="http://www.w3.org/2000/svg">
          <style>{`@keyframes eyeFlicker{0%,100%{opacity:1}50%{opacity:0.3}}@keyframes flameFlick{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.8)}}`}</style>
          {/* Flame top */}
          <path d="M20 2 Q16 8 18 14 Q20 8 22 14 Q24 8 20 2 Z" fill="#ff4400" style={{animation:'flameFlick 0.4s ease infinite'}}/>
          <path d="M20 4 Q18 9 19 13 Q20 9 21 13 Q22 9 20 4 Z" fill="#ffaa00" style={{animation:'flameFlick 0.35s ease infinite 0.05s'}}/>
          {/* Skull */}
          <ellipse cx="20" cy="26" rx="14" ry="13" fill="#0d0500"/>
          <ellipse cx="20" cy="26" rx="12" ry="11" fill="#1a0800"/>
          {/* Eye sockets */}
          <ellipse cx="14.5" cy="24" rx="4" ry="4.5" fill="#ff5500" style={{animation:'eyeFlicker 0.5s ease infinite'}}/>
          <ellipse cx="25.5" cy="24" rx="4" ry="4.5" fill="#ff5500" style={{animation:'eyeFlicker 0.5s ease infinite 0.2s'}}/>
          <ellipse cx="14.5" cy="24" rx="2.5" ry="3" fill="#ffaa00"/>
          <ellipse cx="25.5" cy="24" rx="2.5" ry="3" fill="#ffaa00"/>
          {/* Nose */}
          <path d="M18.5 29 L20 32 L21.5 29" fill="#ff4400" opacity="0.8"/>
          {/* Teeth */}
          <path d="M12 34 L12 37 M15.5 35 L15.5 38 M19 35.5 L19 38.5 M21 35.5 L21 38.5 M24.5 35 L24.5 38 M28 34 L28 37" stroke="#ff5500" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M11 34 Q20 38 29 34" fill="none" stroke="#ff3300" strokeWidth="1"/>
        </svg>
      </button>

      <style>{`
        @keyframes riderFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes slideUpChat{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInBubble{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        @keyframes flamePulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.3);opacity:1}}
      `}</style>
    </div>
  )
}