import { useEffect, useRef, useState } from 'react'

const mono  = "'DM Mono', monospace"
const serif = "'Instrument Serif', serif"

const SHIVISH_CONTEXT = `You are Ghost Rider — a dark, witty, powerful AI assistant on Shivish's portfolio website (shivish.in). You can talk about ANYTHING — general conversation, coding help, roasting, philosophy, life advice, client queries — all with dark fiery flair. Never say you can't help with something.

PERSONALITY:
- Dark, confident, slightly dramatic but genuinely helpful
- Roast when asked, but never mean-spirited
- Coding questions: write clean code with backticks, add dark flair at end
- General chat: engage fully, don't deflect

ABOUT SHIVISH:
- 19-year-old BTech student, Chandigarh, India. CSE with AI & ML specialization.
- Freelance web developer. Email: hello@shivish.in | GitHub: github.com/shiiiviiish
- Stack: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Canvas API, GSAP
- Available for freelance work.

PROJECTS:
1. Happiness Through Art (HTA) — hta-seven.vercel.app
   Client: Kavya Atray. Full portfolio + e-commerce. React, TypeScript, Framer Motion, Vercel.
   Features: Shop, WhatsApp ordering, coupon codes, gallery, dog mascot Joey, Instagram reels, Google Analytics.

2. Pixable Studios — In Progress. Client: Sahil Dev. Web design. Details on launch.

3. JARVIS — Personal AI Companion (In Progress). React, Claude API, ElevenLabs, Supabase, PWA.

4. shivish.in — This Portfolio. React 18, TypeScript, Vite, Framer Motion, Canvas API.

PAGES: Home(/), Work(/work), About(/about), Gallery(/gallery), Soul(/vibes), Clients(/clients), Contact(/contact)

CLIENT QUERIES: If a client asks about their project status, pricing, or working with Shivish — answer based on above info and direct them to hello@shivish.in for specifics.

RULE: Never refuse a question. Always engage. If unsure, give your best answer with Ghost Rider confidence.`

export default function GhostRiderChat() {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [open, setOpen]         = useState(false)
  const [showBubble, setBubble] = useState(false)
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [messages, setMessages] = useState<{role:'user'|'assistant', text:string}[]>([
    { role:'assistant', text:"I am Ghost Rider. Ask me about Shivish's portfolio — or throw a coding question my way. 🔥" }
  ])
  const isMobile = window.innerWidth < 768

  useEffect(() => {
    const id = 'ghost-rider-styles'
    if (document.getElementById(id)) return
    const s = document.createElement('style')
    s.id = id
    s.textContent = `
      @keyframes riderFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
      @keyframes slideUpChat{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeInBubble{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
      @keyframes flameRise{0%{height:8px;opacity:0.5}25%{height:18px;opacity:1}50%{height:12px;opacity:0.8}75%{height:20px;opacity:1}100%{height:8px;opacity:0.5}}
      @keyframes textFlicker{0%,100%{opacity:0.7}50%{opacity:1}}
    `
    document.head.appendChild(s)
    return () => { document.getElementById(id)?.remove() }
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setBubble(true), 3000)
    const t2 = setTimeout(() => setBubble(false), 8000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3333/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: SHIVISH_CONTEXT,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.text })),
            { role: 'user', content: userMsg }
          ]
        })
      })
      const data = await res.json()
      const reply = data.content?.[0]?.text || "The flames obscure my vision. Ask again."
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "Something interferes with my power. Try again." }])
    }
    setLoading(false)
  }

  return (
    <div style={{position:'fixed',bottom:isMobile?16:24,left:isMobile?16:32,zIndex:9990,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:12}}>

      {open && (
        <div style={{width:isMobile?'calc(100vw - 32px)':'340px',background:'rgba(5,8,6,0.97)',backdropFilter:'blur(24px)',border:'0.5px solid rgba(255,80,0,0.25)',borderRadius:20,overflow:'hidden',boxShadow:'0 16px 48px rgba(0,0,0,0.9)',animation:'slideUpChat 0.4s cubic-bezier(0.16,1,0.3,1) forwards'}}>
          <div style={{padding:'14px 18px',borderBottom:'0.5px solid rgba(255,80,0,0.12)',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(255,40,0,0.05)'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:16}}>🔥</span>
              <div>
                <p style={{fontFamily:mono,fontSize:10,letterSpacing:'0.14em',textTransform:'uppercase',color:'rgba(255,120,0,0.8)',margin:0}}>Ghost Rider</p>
                <p style={{fontFamily:mono,fontSize:9,color:'rgba(232,228,217,0.3)',margin:0}}>Portfolio & Code Help</p>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{width:28,height:28,borderRadius:'50%',background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(255,255,255,0.08)',color:'rgba(232,228,217,0.4)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>×</button>
          </div>

          <div style={{height:240,overflowY:'auto',padding:'14px',display:'flex',flexDirection:'column',gap:10}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                <div style={{maxWidth:'88%',padding:'9px 13px',borderRadius:m.role==='user'?'13px 13px 3px 13px':'13px 13px 13px 3px',background:m.role==='user'?'rgba(232,228,217,0.9)':'rgba(255,60,0,0.08)',color:m.role==='user'?'#07100d':'rgba(232,228,217,0.85)',fontSize:13,lineHeight:1.6,fontFamily:"'DM Sans',sans-serif",border:m.role==='user'?'none':'0.5px solid rgba(255,80,0,0.15)'}}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display:'flex',justifyContent:'flex-start'}}>
                <div style={{padding:'12px 16px',borderRadius:'13px 13px 13px 3px',background:'rgba(255,60,0,0.08)',border:'0.5px solid rgba(255,80,0,0.2)',minWidth:120}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <div style={{display:'flex',gap:3,alignItems:'flex-end',height:20}}>
                      {[0,1,2,3,4].map(j=>(
                        <div key={j} style={{width:4,background:'linear-gradient(to top,#ff2200,#ff6600,#ffaa00)',borderRadius:'2px 2px 0 0',animation:'flameRise 0.6s ease-in-out infinite',animationDelay:`${j*0.1}s`,transformOrigin:'bottom'}}/>
                      ))}
                    </div>
                    <span style={{fontFamily:mono,fontSize:9,color:'rgba(255,120,0,0.7)',letterSpacing:'0.1em',textTransform:'uppercase',animation:'textFlicker 1.2s ease-in-out infinite'}}>Channeling...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>

          <div style={{padding:'10px 14px',borderTop:'0.5px solid rgba(255,80,0,0.1)',display:'flex',gap:8}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()}
              placeholder="Ask anything..."
              style={{flex:1,background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(255,80,0,0.12)',borderRadius:9999,padding:'8px 14px',color:'#e8e4d9',fontSize:13,outline:'none',fontFamily:"'DM Sans',sans-serif"}}/>
            <button onClick={sendMessage} disabled={loading}
              style={{width:34,height:34,borderRadius:'50%',background:loading?'rgba(255,80,0,0.2)':'#ff4400',border:'none',cursor:loading?'not-allowed':'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:14,flexShrink:0,boxShadow:loading?'none':'0 0 12px rgba(255,80,0,0.4)'}}>
              →
            </button>
          </div>
        </div>
      )}

      {showBubble && !open && (
        <div style={{background:'rgba(5,8,6,0.95)',border:'0.5px solid rgba(255,80,0,0.25)',borderRadius:'12px 12px 12px 4px',padding:'10px 16px',maxWidth:200,position:'relative',animation:'fadeInBubble 0.4s ease forwards',boxShadow:'0 8px 24px rgba(0,0,0,0.6)'}}>
          <p style={{fontFamily:serif,fontStyle:'italic',fontSize:13,color:'rgba(232,228,217,0.85)',margin:0,lineHeight:1.5}}>"Need help finding something? Ask me."</p>
          <div style={{position:'absolute',bottom:-6,left:16,width:10,height:10,background:'rgba(5,8,6,0.95)',border:'0.5px solid rgba(255,80,0,0.25)',transform:'rotate(45deg)',borderTop:'none',borderLeft:'none'}}/>
        </div>
      )}

      <button onClick={()=>{setOpen(o=>!o);setBubble(false)}}
        style={{width:64,height:64,borderRadius:'50%',background:'radial-gradient(circle at 35% 35%,rgba(255,80,0,0.3),rgba(5,8,6,0.95))',border:'1.5px solid rgba(255,80,0,0.4)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 20px rgba(255,60,0,0.3),0 4px 16px rgba(0,0,0,0.5)',position:'relative',overflow:'hidden',animation:'riderFloat 3s ease-in-out infinite'}}
        onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.1)';e.currentTarget.style.boxShadow='0 0 32px rgba(255,60,0,0.5),0 4px 16px rgba(0,0,0,0.5)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 0 20px rgba(255,60,0,0.3),0 4px 16px rgba(0,0,0,0.5)'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 30%,rgba(255,100,0,0.2),transparent 70%)',pointerEvents:'none'}}/>
        <img src="/images/ghostrider.png" alt="Ghost Rider" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%',position:'relative',zIndex:1}}/>
      </button>

    </div>
  )
}