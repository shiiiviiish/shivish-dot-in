import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function WhoIsShivish() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const portraitRef = useRef<HTMLDivElement>(null)
  const [magnetXY, setMagnetXY] = useState({ x: 0, y: 0 })
  const serif = "'Instrument Serif', serif"

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = portraitRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) / 3
    const y = (e.clientY - r.top - r.height / 2) / 3
    setMagnetXY({ x, y })
  }
  const handleMouseLeave = () => setMagnetXY({ x: 0, y: 0 })

  return (
    <section ref={ref} style={{
      background: '#07100d', padding: '100px 48px 120px',
      position: 'relative', zIndex: 10, overflow: 'hidden'
    }}>
      {/* Ghost text background */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', paddingRight: '5%',
        pointerEvents: 'none', zIndex: 0, overflow: 'hidden'
      }}>
        <span style={{
          fontFamily: serif, fontSize: 'clamp(140px, 24vw, 360px)', fontWeight: 400,
          color: 'transparent', WebkitTextStroke: '1px rgba(232,228,217,0.06)',
          letterSpacing: '-0.04em', lineHeight: 1, whiteSpace: 'nowrap',
          userSelect: 'none', fontStyle: 'italic'
        }}>Shivish.</span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Big top heading */}
        <div style={{ marginBottom: 80, overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: serif, fontSize: 'clamp(60px, 10vw, 140px)', fontWeight: 400,
              lineHeight: 0.9, letterSpacing: '-0.04em',
              background: 'linear-gradient(180deg, #e8e4d9 0%, rgba(232,228,217,0.3) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            Meet <em style={{ fontStyle: 'italic' }}>Shivish.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: serif, fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'rgba(232,228,217,0.3)',
              letterSpacing: '-0.01em', marginTop: 8
            }}>
            19. BTech Student. Vibe Coder. Builder.
          </motion.p>
        </div>

        {/* Main grid — shifted right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center', marginLeft: 'auto' }}>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
            <motion.div
              ref={portraitRef}
              animate={{ x: magnetXY.x, y: magnetXY.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 18 }}
              style={{ position: 'relative', cursor: 'none' }}>
              <div style={{
                position: 'absolute', inset: -24, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(100,200,140,0.07) 0%, transparent 70%)',
              }} />
              <div style={{
                width: 'clamp(240px, 28vw, 340px)', height: 'clamp(240px, 28vw, 340px)',
                borderRadius: '50%', overflow: 'hidden',
                border: '1px solid rgba(100,200,140,0.12)',
                boxShadow: '0 0 80px rgba(100,200,140,0.06), inset 0 0 40px rgba(0,0,0,0.2)',
                position: 'relative'
              }}>
                <img src="/images/shivishanimated.png" alt="Shivish"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: 'scale(1.08)' }} />
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%', opacity: 0.2,
                  mixBlendMode: 'overlay', pointerEvents: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '100px'
                }} />
              </div>
              <div style={{
                position: 'absolute', top: '8%', right: '6%',
                width: 12, height: 12, background: '#4ade80', borderRadius: '50%',
                border: '3px solid #07100d', boxShadow: '0 0 10px rgba(74,222,128,0.6)'
              }} />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 24 }}>
              Who is Shivish?
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.6 }}
              style={{ fontSize: 'clamp(14px,1.4vw,17px)', color: 'rgba(232,228,217,0.55)', lineHeight: 1.85, fontWeight: 300, marginBottom: 40, maxWidth: 420 }}>
              BTech student from Chandigarh. Started coding to upskill — ended up loving the craft. When I'm not building websites, I'm editing videos, shooting photos, or going down AI rabbit holes. Always building something new.
            </motion.p>

            {/* Skills row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              {['Web Dev', 'AI', 'Photography', 'Editing', 'React'].map(s => (
                <span key={s} style={{
                  fontSize: 11, padding: '5px 14px', borderRadius: 9999,
                  border: '0.5px solid rgba(232,228,217,0.12)',
                  color: 'rgba(232,228,217,0.4)', letterSpacing: '0.05em'
                }}>{s}</span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <Link to="/about" style={{
                borderRadius: 9999, padding: '12px 28px', background: '#e8e4d9',
                color: '#07100d', fontSize: 13, fontWeight: 500, textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                Full story →
              </Link>
              <Link to="/contact" style={{
                fontSize: 13, color: 'rgba(232,228,217,0.4)', textDecoration: 'none',
                letterSpacing: '0.05em', transition: 'color 0.2s'
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e8e4d9')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,217,0.4)')}>
                Say hello →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}