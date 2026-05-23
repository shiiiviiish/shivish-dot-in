import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Nav from '../components/Nav'

const serif = "'Instrument Serif', serif"

const slides = [
  { label: 'Shivish 01', mood: 'Photographer', color: '#0d1f17', accent: '#4ade80', textColor: '#4ade80' },
  { label: 'Shivish 02', mood: 'Developer', color: '#0f1525', accent: '#60a5fa', textColor: '#60a5fa' },
  { label: 'Shivish 03', mood: 'Editor', color: '#1f150a', accent: '#fb923c', textColor: '#fb923c' },
  { label: 'Shivish 04', mood: 'Vibe Coder', color: '#130a1f', accent: '#a78bfa', textColor: '#a78bfa' },
]

export default function Contact() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)
  const touchStartX = useRef(0)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (window.innerWidth < 768) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimating) return
    setIsAnimating(true)
    setActive(prev => dir === 'next' ? (prev + 1) % slides.length : (prev + slides.length - 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 650)
  }

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 'next' : 'prev')
  }

  // Auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => navigate('next'), 3000)
    return () => clearInterval(interval)
  }, [])

  const center = active
  const left = (active + slides.length - 1) % slides.length
  const right = (active + 1) % slides.length

  const getRole = (i: number) => {
    if (i === center) return 'center'
    if (i === left) return 'left'
    if (i === right) return 'right'
    return 'back'
  }

  const roleStyle = (role: string) => {
    switch (role) {
      case 'center': return { left: '50%', height: isMobile ? '55%' : '80%', bottom: 0, transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.4})`, filter: 'none', opacity: 1, zIndex: 20 }
      case 'left': return { left: isMobile ? '12%' : '22%', height: isMobile ? '22%' : '30%', bottom: isMobile ? '8%' : '5%', transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.6, zIndex: 10 }
      case 'right': return { left: isMobile ? '88%' : '78%', height: isMobile ? '22%' : '30%', bottom: isMobile ? '8%' : '5%', transform: 'translateX(-50%) scale(1)', filter: 'blur(2px)', opacity: 0.6, zIndex: 10 }
      default: return { left: '50%', height: isMobile ? '14%' : '20%', bottom: isMobile ? '8%' : '5%', transform: 'translateX(-50%) scale(1)', filter: 'blur(4px)', opacity: 0.4, zIndex: 5 }
    }
  }

  const slide = slides[active]

  return (
    <div style={{ background: '#07100d', color: '#e8e4d9', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif", overflowX: 'hidden' }}>
      <div ref={cursorRef} className="desktop-cursor" style={{ position: 'fixed', width: 12, height: 12, background: '#4ade80', borderRadius: '50%', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', left: '-100px', top: '-100px', boxShadow: '0 0 12px rgba(74,222,128,0.8)' }} />
      <div ref={trailRef} className="desktop-cursor" style={{ position: 'fixed', width: 44, height: 44, border: '1px solid rgba(74,222,128,0.25)', borderRadius: '50%', pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)', left: '-100px', top: '-100px' }} />

      <Nav />

      {/* CAROUSEL SECTION */}
      <div
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative', width: '100%', height: '100vh', overflow: 'hidden',
          backgroundColor: slide.color,
          transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)'
        }}>

        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50, opacity: 0.35, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />

        {/* Ghost text */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 2, paddingTop: '10%' }}>
          <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: `clamp(80px,${isMobile ? '18' : '22'}vw,300px)`, fontWeight: 400, color: 'rgba(232,228,217,0.04)', lineHeight: 1, whiteSpace: 'nowrap', letterSpacing: '-0.04em', userSelect: 'none', transition: 'all 650ms' }}>
            {slide.mood}
          </span>
        </div>

        {/* Carousel cards */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
          {slides.map((s, i) => {
            const role = getRole(i)
            const rs = roleStyle(role)
            return (
              <div key={i} style={{
                position: 'absolute', aspectRatio: '0.65/1',
                transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform,filter,opacity', ...rs
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: 16, background: s.color, border: `1px solid ${s.accent}30`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${s.accent}15 0%, transparent 70%)` }} />
                  <div style={{ position: 'absolute', width: '55%', aspectRatio: '1', borderRadius: '50%', border: `1px solid ${s.accent}20`, animation: 'ringPulse 3s ease-in-out infinite' }} />
                  <div style={{ position: 'absolute', width: '68%', aspectRatio: '1', borderRadius: '50%', border: `1px solid ${s.accent}10`, animation: 'ringPulse 3s ease-in-out infinite', animationDelay: '0.5s' }} />
                  <div style={{ width: '52%', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden', border: `1px solid ${s.accent}25`, animation: 'float 4s ease-in-out infinite', position: 'relative', zIndex: 2 }}>
                    <img src="/images/shivishanimated.png" alt="Shivish" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', animation: 'breathe 4s ease-in-out infinite' }} />
                  </div>
                  <div style={{ position: 'absolute', top: '22%', right: '22%', width: 10, height: 10, background: '#4ade80', borderRadius: '50%', border: '2px solid #07100d', boxShadow: '0 0 8px #4ade80', zIndex: 3 }} />
                  <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 16, color: 'rgba(232,228,217,0.7)', zIndex: 2 }}>{s.label}</p>
                  <p style={{ fontSize: 10, color: 'rgba(232,228,217,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', zIndex: 2 }}>{s.mood}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom left — contact info */}
        <div style={{ position: 'absolute', bottom: isMobile ? 24 : 48, left: isMobile ? 20 : 48, zIndex: 60, maxWidth: 320 }}>
          <p style={{ fontFamily: serif, fontSize: isMobile ? 18 : 24, fontWeight: 400, color: '#e8e4d9', marginBottom: 4, letterSpacing: '-0.02em' }}>{slide.label}</p>
          <p style={{ fontSize: 11, color: 'rgba(232,228,217,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{slide.mood} · Placeholder</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('prev')} style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(232,228,217,0.4)', background: 'transparent', color: '#e8e4d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,228,217,0.12)'; e.currentTarget.style.transform = 'scale(1.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}>
              <ArrowLeft size={18} strokeWidth={2.25} />
            </button>
            <button onClick={() => navigate('next')} style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(232,228,217,0.4)', background: 'transparent', color: '#e8e4d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,228,217,0.12)'; e.currentTarget.style.transform = 'scale(1.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}>
              <ArrowRight size={18} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Center arrows */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', pointerEvents: 'none' }}>
          <button onClick={() => navigate('prev')} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(232,228,217,0.25)', background: 'rgba(7,16,13,0.4)', backdropFilter: 'blur(8px)', color: '#e8e4d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', pointerEvents: 'all', transition: 'all 0.2s', fontSize: 18 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,228,217,0.15)'; e.currentTarget.style.borderColor = 'rgba(232,228,217,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(7,16,13,0.4)'; e.currentTarget.style.borderColor = 'rgba(232,228,217,0.25)' }}>
            ←
          </button>
          <button onClick={() => navigate('next')} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid rgba(232,228,217,0.25)', background: 'rgba(7,16,13,0.4)', backdropFilter: 'blur(8px)', color: '#e8e4d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', pointerEvents: 'all', transition: 'all 0.2s', fontSize: 18 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,228,217,0.15)'; e.currentTarget.style.borderColor = 'rgba(232,228,217,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(7,16,13,0.4)'; e.currentTarget.style.borderColor = 'rgba(232,228,217,0.25)' }}>
            →
          </button>
        </div>

        {/* Counter */}
        <div style={{ position: 'absolute', bottom: isMobile ? 24 : 48, right: isMobile ? 20 : 48, zIndex: 60, textAlign: 'right' }}>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: isMobile ? 16 : 22, color: 'rgba(232,228,217,0.35)', letterSpacing: '-0.02em' }}>
            {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </p>
          <p style={{ fontSize: 10, color: 'rgba(232,228,217,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Swipe or drag</p>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 9, letterSpacing: '0.2em', color: 'rgba(232,228,217,0.2)', textTransform: 'uppercase' }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom,rgba(74,222,128,0.3),transparent)', animation: 'scrollPulse 1.5s ease infinite' }} />
        </div>
      </div>

      {/* CONTACT SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px clamp(20px,5vw,80px)', position: 'relative' }}>
        <div style={{ maxWidth: 1100, width: '100%', display: 'grid', gap: 80, alignItems: 'start' }} className="contact-grid">

          {/* Left — big text */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 20 }}>(Contact)</p>

            <h1 style={{ fontFamily: serif, fontSize: 'clamp(48px,8vw,96px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '-0.04em', marginBottom: 32 }}>
              Feel free<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(232,228,217,0.25)' }}>to contact.</em>
            </h1>

            {/* Availability */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, padding: '10px 16px', background: 'rgba(74,222,128,0.06)', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: 9999, width: 'fit-content' }}>
              <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 6px #4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, color: 'rgba(232,228,217,0.7)', letterSpacing: '0.05em' }}>Currently available for freelance · Response within 24h</span>
            </div>

            {/* Big email */}
            <a href="mailto:hello@shivish.in" style={{ display: 'block', fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(18px,3vw,36px)', color: 'rgba(232,228,217,0.5)', textDecoration: 'none', marginBottom: 32, transition: 'color 0.3s', letterSpacing: '-0.01em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8e4d9')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,217,0.5)')}>
              hello@shivish.in ↗
            </a>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { icon: '↗', label: 'GitHub', url: 'https://github.com/shiiiviiish' },
                { icon: '✉', label: 'Email', url: 'mailto:hello@shivish.in' },
                { icon: '◎', label: 'Instagram', url: '#' },
                { icon: 'in', label: 'LinkedIn', url: '#' },
              ].map(s => (
                <a key={s.label} href={s.url} target={s.url.startsWith('http') ? '_blank' : undefined}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, borderRadius: 9999, padding: '10px 18px', border: '0.5px solid rgba(232,228,217,0.12)', color: 'rgba(232,228,217,0.5)', textDecoration: 'none', fontSize: 13, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,228,217,0.35)'; e.currentTarget.style.color = '#e8e4d9' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,228,217,0.12)'; e.currentTarget.style.color = 'rgba(232,228,217,0.5)' }}>
                  <span style={{fontSize:14}}>{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — glass form */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(232,228,217,0.08)', borderRadius: 20, padding: 'clamp(24px,4vw,40px)' }}>
              <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 28 }}>Send a message</p>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 20 }}>✓</div>
                  <p style={{ fontFamily: serif, fontSize: 22, color: '#e8e4d9', marginBottom: 8 }}>Message sent!</p>
                  <p style={{ fontSize: 13, color: 'rgba(232,228,217,0.4)' }}>I'll get back to you within 24h.</p>
                </motion.div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Name */}
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', display: 'block', marginBottom: 8 }}>Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      style={{ width: '100%', background: 'rgba(232,228,217,0.04)', border: '0.5px solid rgba(232,228,217,0.1)', borderRadius: 10, padding: '12px 16px', color: '#e8e4d9', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(232,228,217,0.3)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(232,228,217,0.1)')} />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', display: 'block', marginBottom: 8 }}>Email</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="your@email.com" type="email"
                      style={{ width: '100%', background: 'rgba(232,228,217,0.04)', border: '0.5px solid rgba(232,228,217,0.1)', borderRadius: 10, padding: '12px 16px', color: '#e8e4d9', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(232,228,217,0.3)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(232,228,217,0.1)')} />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', display: 'block', marginBottom: 8 }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about your project..."
                      rows={5}
                      style={{ width: '100%', background: 'rgba(232,228,217,0.04)', border: '0.5px solid rgba(232,228,217,0.1)', borderRadius: 10, padding: '12px 16px', color: '#e8e4d9', fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: 'none', resize: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(232,228,217,0.3)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(232,228,217,0.1)')} />
                  </div>

                  <button
                    onClick={() => { if (form.name && form.email && form.message) { window.location.href = `mailto:hello@shivish.in?subject=Message from ${form.name}&body=${form.message}%0A%0AFrom: ${form.email}`; setSent(true) } }}
                    style={{ borderRadius: 9999, padding: '14px 32px', background: '#e8e4d9', color: '#07100d', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'none', transition: 'opacity 0.2s', width: '100%', fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Send message →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ padding: '24px clamp(20px,5vw,48px)', fontSize: 12, color: 'rgba(232,228,217,0.18)', borderTop: '0.5px solid rgba(232,228,217,0.05)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span>Design & Dev by Shivish · 2025</span>
        <span style={{ fontFamily: serif, fontStyle: 'italic' }}>Built with vibe.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: rgba(232,228,217,0.2); }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes ringPulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes scrollPulse { 0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom} }
        .contact-grid { grid-template-columns: 1fr 1fr; }
        @media (min-width: 769px) { * { cursor: none; } .desktop-cursor { display: block !important; } }
        @media (max-width: 768px) { .desktop-cursor { display: none !important; } .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </div>
  )
}