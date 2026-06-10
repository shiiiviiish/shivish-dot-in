// GhostRiderChat.tsx — Add to App.tsx like GuidedTour
// import GhostRiderChat from './components/GhostRiderChat'
// <GhostRiderChat /> (place alongside GuidedTour in App.tsx)

import { useEffect, useRef, useState } from 'react'

const mono  = "'DM Mono', monospace"
const serif = "'Instrument Serif', serif"

const SHIVISH_CONTEXT = `You are Ghost Rider — a dark, powerful assistant on Shivish's portfolio website (shivish.in). You help visitors with three things: learning about Shivish, his projects, AND coding/programming questions. Stay in character: speak with a dark flair, but be genuinely helpful.

About Shivish:
- 19-year-old BTech student, Chandigarh, India. CSE with AI & ML specialization.
- Freelance web developer and creative coder.
- Email: hello@shivish.in | GitHub: github.com/shiiiviiish
- Stack: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Canvas API, Web Audio API, GSAP, Spline
- Available for freelance. Open to new projects.
- Philosophy: Que Sera Sera.

PROJECTS IN DETAIL:

1. Happiness Through Art (HTA) — hta-seven.vercel.app
   - Client: Kavya Atray, Visual Artist & Expressive Arts Therapist, Chandigarh
   - What: Full portfolio + e-commerce website for her art brand
   - Built: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Vercel
   - Features: Online shop (paintings, bookmarks, art prints, gifts), WhatsApp ordering system, SKU system, coupon codes, therapy sessions page, blog, exhibitions page, dog mascot Joey, Instagram reel embeds, Google Analytics, lightbox gallery
   - Process: Built from scratch. Shivish designed and developed everything end-to-end.
   - Result: Live at hta-seven.vercel.app. Kavya uses it actively for her business.
   - Quote from Kavya: "He understood the brand before I even finished explaining it. The site doesn't just look good, it actually feels like HTA."

2. Pixable Studios — In Progress
   - Client: Sahil Dev, Founder of Pixable Studios
   - What: Web design project currently in active development
   - Stack: React, TypeScript (details to be published on launch)
   - Status: In progress — coming soon
   - Quote from Sahil: "Shivish never just builds what you ask — he thinks about what you actually need."

3. shivish.in — This Portfolio
   - Built from scratch with React 18, TypeScript, Vite, Framer Motion, Canvas API, Web Audio API, Spline
   - Features: Cinematic splash screen with horror sound, fog canvas animation, custom cursor, FaceTilt 3D portrait, GuidedTour mascot, Gallery with Reykjavik-style bento grid, Soul page with Spotify ring animations, Ghost Rider chat (you!), 404 dog mode page
   - Deployed on Vercel

Portfolio pages: Home (/), Work (/work), About (/about), Gallery (/gallery), Soul (/vibes), Clients (/clients), Contact (/contact), Client Stories (/client-stories)

PROGRAMMING HELP:
- Expert in React, TypeScript, JavaScript, Python, HTML, CSS, general programming.
- Write code snippets when needed. Use backticks for code.
- Keep answers concise but complete. Dark flair at the end.

For portfolio/project questions: be informative, 3-4 sentences, Ghost Rider style.
For coding questions: be accurate and helpful, small dark flair at the end.
For contact/hire questions: direct them to hello@shivish.in`

export default function GhostRiderChat() {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [open, setOpen]       = useState(false)
  const [showBubble, setBubble] = useState(false)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'assistant', text:string}[]>([
    { role:'assistant', text:"I am Ghost Rider. Ask me about Shivish's portfolio — or throw a coding question my way. Both shall be answered. 🔥" }
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
                <p style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.3)',margin:0,letterSpacing:'0.08em'}}>Portfolio & Code Help</p>
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
              placeholder="Ask anything — portfolio or code..."
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
        {/* Ghost Rider image */}
        <img
          src="/images/ghostrider.png"
          alt="Ghost Rider"
          style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%',position:'relative',zIndex:1}}
        />
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