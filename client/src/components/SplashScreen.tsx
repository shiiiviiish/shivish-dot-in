import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mono  = "'DM Mono', monospace"

function playHorrorWelcome() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.7, ctx.currentTime)
    master.connect(ctx.destination)

    // ── Deep drone/rumble ──────────────────────────────────────────
    const drone = ctx.createOscillator()
    const droneGain = ctx.createGain()
    drone.type = 'sawtooth'
    drone.frequency.setValueAtTime(40, ctx.currentTime)
    drone.frequency.linearRampToValueAtTime(30, ctx.currentTime + 3)
    droneGain.gain.setValueAtTime(0, ctx.currentTime)
    droneGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3)
    droneGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3)
    droneGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)
    drone.connect(droneGain)
    droneGain.connect(master)
    drone.start(ctx.currentTime)
    drone.stop(ctx.currentTime + 4)

    // ── Creepy high whine ──────────────────────────────────────────
    const whine = ctx.createOscillator()
    const whineGain = ctx.createGain()
    whine.type = 'sine'
    whine.frequency.setValueAtTime(800, ctx.currentTime + 0.5)
    whine.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 2.5)
    whineGain.gain.setValueAtTime(0, ctx.currentTime + 0.5)
    whineGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1)
    whineGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2.5)
    whineGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5)
    whine.connect(whineGain)
    whineGain.connect(master)
    whine.start(ctx.currentTime + 0.5)
    whine.stop(ctx.currentTime + 3.5)

    // ── Distorted impact hit ────────────────────────────────────────
    const impact = ctx.createOscillator()
    const impactGain = ctx.createGain()
    const impactDistort = ctx.createWaveShaper()
    const curve = new Float32Array(256)
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1
      curve[i] = (Math.PI + 400) * x / (Math.PI + 400 * Math.abs(x))
    }
    impactDistort.curve = curve
    impact.type = 'sawtooth'
    impact.frequency.setValueAtTime(90, ctx.currentTime)
    impact.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 1.2)
    impactGain.gain.setValueAtTime(0.8, ctx.currentTime)
    impactGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
    impact.connect(impactDistort)
    impactDistort.connect(impactGain)
    impactGain.connect(master)
    impact.start(ctx.currentTime)
    impact.stop(ctx.currentTime + 1.2)

    // ── "Welcome" whisper using speech synthesis ─────────────────────
    setTimeout(() => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Welcome')
        utterance.rate   = 0.5     // very slow
        utterance.pitch  = 0.1     // very low pitch
        utterance.volume = 1.0
        // pick darkest voice available
        const voices = window.speechSynthesis.getVoices()
        const deep   = voices.find(v => v.name.toLowerCase().includes('daniel') ||
                                        v.name.toLowerCase().includes('male')   ||
                                        v.name.toLowerCase().includes('fred')   ||
                                        v.name.toLowerCase().includes('alex'))
        if (deep) utterance.voice = deep
        window.speechSynthesis.speak(utterance)
      }
    }, 200)

    // ── Low reverb tail ────────────────────────────────────────────
    const tail = ctx.createOscillator()
    const tailGain = ctx.createGain()
    tail.type = 'sine'
    tail.frequency.setValueAtTime(55, ctx.currentTime + 1)
    tailGain.gain.setValueAtTime(0, ctx.currentTime + 1)
    tailGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.5)
    tailGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5)
    tail.connect(tailGain)
    tailGain.connect(master)
    tail.start(ctx.currentTime + 1)
    tail.stop(ctx.currentTime + 4.5)

  } catch(e) {
    console.log('Audio not supported')
  }
}

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase]   = useState<'intro'|'ready'|'exit'>('intro')
  const [glitch, setGlitch] = useState(false)
  const [flicker, setFlicker] = useState(false)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setPhase('ready'), 1200)
    return () => clearTimeout(t)
  }, [])

  const handleEnter = () => {
    if (hasPlayed.current) return
    hasPlayed.current = true

    playHorrorWelcome()

    // Screen flicker effect
    let flickerCount = 0
    const flickerInterval = setInterval(() => {
      setFlicker(f => !f)
      flickerCount++
      if (flickerCount > 6) clearInterval(flickerInterval)
    }, 80)

    setGlitch(true)
    setTimeout(() => setGlitch(false), 600)

    setTimeout(() => {
      setPhase('exit')
      setTimeout(onEnter, 1200)
    }, 900)
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          onClick={phase === 'ready' ? handleEnter : undefined}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: flicker ? '#0a0a0a' : '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            cursor: phase === 'ready' ? 'pointer' : 'default',
            userSelect: 'none',
          }}>

          {/* Noise overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px', opacity: 0.04, mixBlendMode: 'overlay',
          }}/>

          {/* Vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)',
          }}/>

          {/* Horror font import */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&display=swap');
            @keyframes blurReveal {
              0%   { filter: blur(40px); opacity: 0; letter-spacing: 0.8em; }
              60%  { filter: blur(6px);  opacity: 0.7; letter-spacing: 0.15em; }
              100% { filter: blur(0px);  opacity: 1; letter-spacing: 0.05em; }
            }
            @keyframes bloodDrip {
              0%,100% { text-shadow: 0 0 20px rgba(74,222,128,0.4), 0 0 60px rgba(74,222,128,0.15); }
              50%     { text-shadow: 0 0 40px rgba(74,222,128,0.7), 0 0 80px rgba(74,222,128,0.3), 0 2px 0 #4ade80; }
            }
          `}</style>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

            {/* Favicon logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}>

              <motion.div
                animate={glitch ? {
                  x: [0, -10, 14, -5, 0],
                  filter: ['none', 'hue-rotate(180deg) brightness(4)', 'invert(1)', 'none'],
                } : {
                  filter: [
                    'drop-shadow(0 0 10px rgba(74,222,128,0.25))',
                    'drop-shadow(0 0 35px rgba(74,222,128,0.6))',
                    'drop-shadow(0 0 10px rgba(74,222,128,0.25))',
                  ],
                }}
                transition={glitch ? { duration: 0.5 } : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
                <img
                  src="/Favicon1.png"
                  alt="Shivish"
                  style={{ width: 130, height: 130, borderRadius: '50%', display: 'block' }}
                />
              </motion.div>
            </motion.div>

            {/* Shivish — horror font + blur reveal animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}>
              <p style={{
                fontFamily: "'Nosifer', cursive",
                fontSize: 'clamp(28px,5.5vw,72px)',
                color: glitch ? '#ff2200' : '#4ade80',
                margin: 0,
                animation: 'blurReveal 2s cubic-bezier(0.16,1,0.3,1) 0.6s both, bloodDrip 4s ease-in-out 2.6s infinite',
                transition: 'color 0.08s',
              }}>
                Shivish
              </p>
            </motion.div>

            {/* Click to enter */}
            <AnimatePresence>
              {phase === 'ready' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>

                  <motion.p
                    animate={{ opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(232,228,217,0.45)',
                      margin: 0,
                    }}>
                    Click to enter
                  </motion.p>

                  <motion.div
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: 32, height: 1, background: 'rgba(74,222,128,0.3)', transformOrigin: 'center' }}/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Coordinates */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            style={{ position: 'absolute', bottom: 24, left: 24, fontFamily: mono, fontSize: 9, color: 'rgba(232,228,217,0.12)', letterSpacing: '0.1em', margin: 0, zIndex: 2 }}>
            30.7333° N · 76.7794° E
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
            style={{ position: 'absolute', bottom: 24, right: 24, fontFamily: mono, fontSize: 9, color: 'rgba(232,228,217,0.12)', letterSpacing: '0.1em', margin: 0, zIndex: 2 }}>
            CHANDIGARH · IN
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}