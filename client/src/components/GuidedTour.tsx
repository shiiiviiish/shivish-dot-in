import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const serif = "'Instrument Serif', serif"
const sans = "'DM Sans', sans-serif"

const tourStops = [
  {
    path: '/',
    title: 'Home',
    emoji: '🏠',
    msg: 'This is where I live on the internet. The fog, the vibe — that\'s all me.',
  },
  {
    path: '/work',
    title: 'Work',
    emoji: '💼',
    msg: 'I worked with HTA — a Therapy and Art brand. First real client. Still gives me chills.',
  },
  {
    path: '/about',
    title: 'About',
    emoji: '👤',
    msg: '19. BTech student from Chandigarh. Always building something people actually feel.',
  },
  {
    path: '/gallery',
    title: 'Gallery',
    emoji: '📸',
    msg: 'These are some of my favorite shots — street, golden hour, candid moments.',
  },
  {
    path: '/vibes',
    title: 'Vibes',
    emoji: '✨',
    msg: 'Que Sera Sera — my whole life philosophy in 3 words. Everything else lives here too.',
  },
  {
    path: '/contact',
    title: 'Contact',
    emoji: '💬',
    msg: 'If you\'ve made it this far — let\'s make something together. I\'m available!',
  },
]

export default function GuidedTour() {
  const [phase, setPhase] = useState<'hidden' | 'bubble' | 'touring' | 'done'>('hidden')
  const [step, setStep] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const timerRef = useRef<number | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const seen = sessionStorage.getItem('tour-seen')
    if (seen) { setDismissed(true); return }
    timerRef.current = window.setTimeout(() => setPhase('bubble'), 3000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const startTour = () => {
    setPhase('touring')
    setStep(0)
    navigate(tourStops[0].path)
    sessionStorage.setItem('tour-seen', 'true')
  }

  const nextStop = () => {
    if (step < tourStops.length - 1) {
      const next = step + 1
      setStep(next)
      navigate(tourStops[next].path)
    } else {
      setPhase('done')
      setTimeout(() => { setPhase('hidden'); setDismissed(true) }, 3000)
    }
  }

  const skip = () => {
    setPhase('hidden')
    setDismissed(true)
    sessionStorage.setItem('tour-seen', 'true')
  }

  const toggleBubble = () => {
    if (phase === 'hidden') setPhase('bubble')
    else if (phase === 'bubble') setPhase('hidden')
  }

  if (dismissed) return null

  return (
    <>
      {/* MASCOT + BUBBLE */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

        {/* BUBBLE: Initial */}
        <AnimatePresence>
          {phase === 'bubble' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 240, background: 'rgba(8,18,12,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 16, padding: '18px', boxShadow: '0 16px 48px rgba(0,0,0,0.7)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -8, right: 22, width: 14, height: 14, background: 'rgba(8,18,12,0.97)', border: '1px solid rgba(74,222,128,0.2)', transform: 'rotate(45deg)', borderTop: 'none', borderLeft: 'none' }} />
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 15, color: '#e8e4d9', lineHeight: 1.5, marginBottom: 6 }}>
                Hey! I'm Shivish 👋
              </p>
              <p style={{ fontFamily: sans, fontSize: 12, color: 'rgba(232,228,217,0.45)', lineHeight: 1.7, marginBottom: 16, fontWeight: 300 }}>
                Want a quick tour of my portfolio?
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={startTour}
                  style={{ flex: 1, borderRadius: 9999, padding: '9px 0', background: '#e8e4d9', color: '#07100d', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: sans }}>
                  Yes please!
                </button>
                <button onClick={skip}
                  style={{ borderRadius: 9999, padding: '9px 12px', background: 'transparent', color: 'rgba(232,228,217,0.35)', fontSize: 12, border: '1px solid rgba(232,228,217,0.1)', cursor: 'pointer', fontFamily: sans }}>
                  Skip
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BUBBLE: Touring */}
        <AnimatePresence>
          {phase === 'touring' && (
            <motion.div
              key={`stop-${step}`}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 268, background: 'rgba(8,18,12,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 16, padding: '18px', boxShadow: '0 16px 48px rgba(0,0,0,0.7)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -8, right: 22, width: 14, height: 14, background: 'rgba(8,18,12,0.97)', border: '1px solid rgba(74,222,128,0.2)', transform: 'rotate(45deg)', borderTop: 'none', borderLeft: 'none' }} />

              {/* Progress bar */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                {tourStops.map((_, i) => (
                  <div key={i} style={{ height: 3, flex: 1, borderRadius: 9999, transition: 'background 0.4s', background: i <= step ? '#4ade80' : 'rgba(255,255,255,0.08)' }} />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>{tourStops[step].emoji}</span>
                <div>
                  <p style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 2 }}>
                    {step + 1} of {tourStops.length} · {tourStops[step].title}
                  </p>
                </div>
              </div>

              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14, color: 'rgba(232,228,217,0.8)', lineHeight: 1.7, marginBottom: 16 }}>
                "{tourStops[step].msg}"
              </p>

              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={nextStop}
                  style={{ flex: 1, borderRadius: 9999, padding: '9px 0', background: '#e8e4d9', color: '#07100d', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: sans }}>
                  {step < tourStops.length - 1 ? 'Next stop →' : 'Finish! 🎉'}
                </button>
                <button onClick={skip}
                  style={{ borderRadius: 9999, padding: '9px 12px', background: 'transparent', color: 'rgba(232,228,217,0.35)', fontSize: 12, border: '1px solid rgba(232,228,217,0.1)', cursor: 'pointer', fontFamily: sans }}>
                  Exit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BUBBLE: Done */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ width: 230, background: 'rgba(8,18,12,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 16, padding: '20px', textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.7)', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: -8, right: 22, width: 14, height: 14, background: 'rgba(8,18,12,0.97)', border: '1px solid rgba(74,222,128,0.25)', transform: 'rotate(45deg)', borderTop: 'none', borderLeft: 'none' }} />
              <p style={{ fontSize: 32, marginBottom: 10 }}>🎉</p>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 16, color: '#e8e4d9', marginBottom: 6 }}>That's the tour!</p>
              <p style={{ fontFamily: sans, fontSize: 12, color: 'rgba(232,228,217,0.4)', lineHeight: 1.6 }}>Hope you enjoyed it. Feel free to explore!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MASCOT FACE BUTTON */}
        <motion.button
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={toggleBubble}
          style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(74,222,128,0.45)', background: '#0d1f17', padding: 0, cursor: 'pointer', display: 'block', boxShadow: '0 0 24px rgba(74,222,128,0.18)', position: 'relative' }}>
          <img
            src="/images/shivishanimated.png"
            alt="Shivish"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: 'scale(1.15)' }} />
          {/* Online dot */}
          <div style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, background: '#4ade80', borderRadius: '50%', border: '2px solid #0d1f17', boxShadow: '0 0 6px #4ade80' }} />
        </motion.button>
      </motion.div>
    </>
  )
}