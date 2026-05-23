import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const serif = "'Instrument Serif', serif"

const quotes = [
  { text: "Que Sera Sera — Whatever will be, will be.", author: "Doris Day" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Code is poetry.", author: "WordPress" },
  { text: "Design is not just what it looks like. Design is how it works.", author: "Steve Jobs" },
]

const loves = [
  { emoji: "{ }", label: "Coding", desc: "Building things at 2am when the vibe hits" },
  { emoji: "◎", label: "Photography", desc: "Street shots, golden hour, candid moments" },
  { emoji: "⬡", label: "Video Editing", desc: "Cutting stories together frame by frame" },
  { emoji: "⟡", label: "AI", desc: "Going down rabbit holes that never end" },
  { emoji: "♪", label: "Music", desc: "Always in the background, always vibing" },
  { emoji: "✦", label: "Night drives", desc: "Chandigarh at 1am hits different" },
]

const facts = [
  "I code better after midnight",
  "My first project was a mess — I shipped it anyway",
  "I've never used a template for anything I'm proud of",
  "I think in pixels and frames",
  "Chandigarh raised me, the internet shaped me",
  "19 years old and already out of storage on my phone",
  "I restart my laptop and call it debugging",
  "Dark mode only. Always.",
]

function QuoteCard({ quote, i }: { quote: typeof quotes[0]; i: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: i % 2 === 0 ? -0.5 : 0.5 } : {}}
      whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
      transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'rgba(232,228,217,0.03)', border: '0.5px solid rgba(232,228,217,0.08)', borderRadius: 16, padding: 'clamp(24px,3vw,36px)', cursor: 'default' }}>
      <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,2.5vw,28px)', color: 'rgba(232,228,217,0.8)', lineHeight: 1.4, letterSpacing: '-0.02em', marginBottom: 16 }}>
        "{quote.text}"
      </p>
      <p style={{ fontSize: 12, color: 'rgba(232,228,217,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>— {quote.author}</p>
    </motion.div>
  )
}

export default function Vibes() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  useEffect(() => {
    const el = marqueeRef.current; if (!el) return
    let x = 0, raf: number
    const tick = () => { x -= 0.5; if (x < -el.scrollWidth/2) x = 0; el.style.transform = `translateX(${x}px)`; raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ background: '#07100d', color: '#e8e4d9', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", overflowX: 'hidden' }}>
      <div ref={cursorRef} className="desktop-cursor" style={{ position: 'fixed', width: 12, height: 12, background: '#4ade80', borderRadius: '50%', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', left: '-100px', top: '-100px', boxShadow: '0 0 12px rgba(74,222,128,0.8)' }} />
      <div ref={trailRef} className="desktop-cursor" style={{ position: 'fixed', width: 44, height: 44, border: '1px solid rgba(74,222,128,0.25)', borderRadius: '50%', pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)', left: '-100px', top: '-100px' }} />

      <Nav />

      {/* HERO */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'flex-end', padding: '120px clamp(20px,5vw,80px) 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', overflow: 'hidden' }}>
          <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(100px,20vw,280px)', color: 'transparent', WebkitTextStroke: '1px rgba(232,228,217,0.04)', letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap' }}>Que Sera Sera</span>
        </div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 20 }}>My world</motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1 initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: serif, fontSize: 'clamp(52px,10vw,120px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: 20 }}>
              Things that<br /><em style={{ color: 'rgba(232,228,217,0.3)', fontStyle: 'italic' }}>move me.</em>
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={{ fontSize: 'clamp(14px,2vw,18px)', color: 'rgba(232,228,217,0.4)', fontWeight: 300, maxWidth: 480, lineHeight: 1.7 }}>
            Beyond the code — the quotes, things I love, random facts about me. The stuff that makes me, me.
          </motion.p>
        </div>
      </section>

      {/* QUOTES */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,80px) 80px' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 32 }}>(Quotes I live by)</motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {quotes.map((q, i) => <QuoteCard key={i} quote={q} i={i} />)}
        </div>
      </section>

      {/* FACTS MARQUEE */}
      <div style={{ overflow: 'hidden', borderTop: '0.5px solid rgba(232,228,217,0.06)', borderBottom: '0.5px solid rgba(232,228,217,0.06)', padding: '16px 0', marginBottom: 80 }}>
        <div ref={marqueeRef} style={{ display: 'flex', gap: 48, width: 'max-content' }}>
          {[...facts, ...facts].map((f, i) => (
            <span key={i} style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 15, whiteSpace: 'nowrap', color: 'rgba(232,228,217,0.2)' }}>
              {f} <span style={{ color: 'rgba(232,228,217,0.08)', margin: '0 8px' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* THINGS I LOVE */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,80px) 80px' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 32 }}>(Things I love)</motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          {loves.map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8 }}
              style={{ padding: '20px 24px', borderBottom: '0.5px solid rgba(232,228,217,0.07)', display: 'flex', gap: 20, alignItems: 'start', cursor: 'default' }}>
              <span style={{ fontFamily: serif, fontSize: 20, color: 'rgba(232,228,217,0.25)', flexShrink: 0, paddingTop: 2 }}>{l.emoji}</span>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, color: '#e8e4d9', marginBottom: 4 }}>{l.label}</h3>
                <p style={{ fontSize: 13, color: 'rgba(232,228,217,0.4)', lineHeight: 1.6, fontWeight: 300 }}>{l.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUE SERA SERA */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px,5vw,80px) 120px' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ borderTop: '0.5px solid rgba(232,228,217,0.06)', paddingTop: 80, textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 24 }}>My mantra</p>
          <h2 style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(36px,7vw,80px)', fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em', color: 'rgba(232,228,217,0.6)', marginBottom: 16 }}>
            "Que Sera Sera"
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(232,228,217,0.3)', fontWeight: 300, marginBottom: 48 }}>Whatever will be, will be.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/about" style={{ borderRadius: 9999, padding: '12px 28px', background: '#e8e4d9', color: '#07100d', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>Know me more →</Link>
            <Link to="/contact" style={{ borderRadius: 9999, padding: '12px 28px', border: '0.5px solid rgba(232,228,217,0.2)', color: 'rgba(232,228,217,0.6)', fontSize: 13, textDecoration: 'none' }}>Say hello</Link>
          </div>
        </motion.div>
      </section>

      <footer style={{ padding: '24px clamp(20px,5vw,48px)', fontSize: 12, color: 'rgba(232,228,217,0.18)', borderTop: '0.5px solid rgba(232,228,217,0.05)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span>Design & Dev by Shivish · 2025</span>
        <span style={{ fontFamily: serif, fontStyle: 'italic' }}>Que Sera Sera.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (min-width: 769px) { * { cursor: none; } .desktop-cursor { display: block !important; } }
        @media (max-width: 768px) { .desktop-cursor { display: none !important; } }
      `}</style>
    </div>
  )
}