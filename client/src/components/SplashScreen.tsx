import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mono = "'DM Mono', monospace"

// Foggy forest image — free from Unsplash
const BG_IMAGE = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80'

function playHorrorWelcome() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.7, ctx.currentTime)
    master.connect(ctx.destination)

    const drone = ctx.createOscillator()
    const droneGain = ctx.createGain()
    drone.type = 'sawtooth'
    drone.frequency.setValueAtTime(40, ctx.currentTime)
    drone.frequency.linearRampToValueAtTime(30, ctx.currentTime + 3)
    droneGain.gain.setValueAtTime(0, ctx.currentTime)
    droneGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3)
    droneGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3)
    droneGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4)
    drone.connect(droneGain); droneGain.connect(master)
    drone.start(ctx.currentTime); drone.stop(ctx.currentTime + 4)

    const whine = ctx.createOscillator()
    const whineGain = ctx.createGain()
    whine.type = 'sine'
    whine.frequency.setValueAtTime(800, ctx.currentTime + 0.5)
    whine.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 2.5)
    whineGain.gain.setValueAtTime(0, ctx.currentTime + 0.5)
    whineGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1)
    whineGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5)
    whine.connect(whineGain); whineGain.connect(master)
    whine.start(ctx.currentTime + 0.5); whine.stop(ctx.currentTime + 3.5)

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
    impact.connect(impactDistort); impactDistort.connect(impactGain); impactGain.connect(master)
    impact.start(ctx.currentTime); impact.stop(ctx.currentTime + 1.2)

    setTimeout(() => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Welcome')
        utterance.rate = 0.5; utterance.pitch = 0.1; utterance.volume = 1.0
        const voices = window.speechSynthesis.getVoices()
        const deep = voices.find(v => v.name.toLowerCase().includes('daniel') ||
          v.name.toLowerCase().includes('fred') || v.name.toLowerCase().includes('alex'))
        if (deep) utterance.voice = deep
        window.speechSynthesis.speak(utterance)
      }
    }, 200)

    const tail = ctx.createOscillator()
    const tailGain = ctx.createGain()
    tail.type = 'sine'
    tail.frequency.setValueAtTime(55, ctx.currentTime + 1)
    tailGain.gain.setValueAtTime(0, ctx.currentTime + 1)
    tailGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.5)
    tailGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5)
    tail.connect(tailGain); tailGain.connect(master)
    tail.start(ctx.currentTime + 1); tail.stop(ctx.currentTime + 4.5)
  } catch(e) { console.log('Audio not supported') }
}

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase]     = useState<'intro'|'ready'|'exit'>('intro')
  const [glitch, setGlitch]   = useState(false)
  const [flicker, setFlicker] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const img = new Image()
    img.src = BG_IMAGE
    img.onload = () => setImgLoaded(true)
    img.onerror = () => setImgLoaded(true) // fallback — show anyway
    const t = setTimeout(() => setPhase('ready'), 1400)
    return () => clearTimeout(t)
  }, [])

  const handleEnter = () => {
    if (hasPlayed.current) return
    hasPlayed.current = true
    playHorrorWelcome()
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
            cursor: phase === 'ready' ? 'pointer' : 'default',
            userSelect: 'none', overflow: 'hidden',
          }}>

          {/* Background photo */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: imgLoaded ? `url(${BG_IMAGE})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#07100d',
            filter: `brightness(${flicker ? 0.25 : 0.45}) saturate(0.6)`,
            transition: 'filter 0.08s',
            transform: 'scale(1.04)',
          }}/>

          {/* Dark overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 100%)',
          }}/>

          {/* Heavy vignette */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.95) 100%)',
          }}/>

          {/* Film grain */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '160px', opacity: 0.06, mixBlendMode: 'overlay',
          }}/>

          {/* Scan lines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)',
          }}/>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono&display=swap');
            @keyframes glowPulse {
              0%,100%{text-shadow:0 0 30px rgba(232,228,217,0.1)}
              50%{text-shadow:0 0 60px rgba(232,228,217,0.25),0 0 100px rgba(232,228,217,0.1)}
            }
          `}</style>

          {/* POSTER LAYOUT */}
          <div style={{
            position: 'relative', zIndex: 2,
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(24px,5vw,52px)',
          }}>

            {/* TOP */}
            <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:1}}
              style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80' }}/>
                <span style={{ fontFamily:mono, fontSize:'clamp(9px,1.2vw,11px)', letterSpacing:'0.25em', color:'rgba(232,228,217,0.5)', textTransform:'uppercase' }}>
                  Portfolio · 2025
                </span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <motion.img
                  src="/Favicon1.png" alt="S"
                  animate={glitch ? { filter:'hue-rotate(180deg) brightness(3)' } : { filter:'drop-shadow(0 0 8px rgba(74,222,128,0.4))' }}
                  style={{ width:32, height:32, borderRadius:'50%' }}
                />
              </div>
            </motion.div>

            {/* CENTER — big name */}
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
              <motion.h1
                initial={{ opacity:0, y:50, filter:'blur(20px)' }}
                animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                transition={{ delay:0.5, duration:1.4, ease:[0.16,1,0.3,1] }}
                style={{
                  fontFamily:"'Instrument Serif', serif",
                  fontSize: 'clamp(64px,15vw,180px)',
                  fontWeight: 400,
                  lineHeight: 0.85,
                  letterSpacing: '-0.04em',
                  color: glitch ? '#ff2200' : '#e8e4d9',
                  margin: 0,
                  transition: 'color 0.08s',
                  animation: phase === 'ready' ? 'glowPulse 4s ease-in-out infinite' : 'none',
                  textShadow: '0 4px 40px rgba(0,0,0,0.8)',
                }}>
                SHIVISH
              </motion.h1>

              {/* Green line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 1.1, duration: 1.2, ease:[0.16,1,0.3,1] }}
                style={{ height:1, background:'linear-gradient(to right, rgba(74,222,128,0.7), transparent)', marginTop:16, marginBottom:12, maxWidth:520 }}/>

              <motion.p
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay:1.4, duration:0.8 }}
                style={{ fontFamily:mono, fontSize:'clamp(9px,1.3vw,12px)', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(232,228,217,0.5)', margin:0 }}>
                Developer · Vibe Coder · Chandigarh
              </motion.p>
            </div>

            {/* BOTTOM */}
            <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.6,duration:0.8}}
              style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>

              <AnimatePresence>
                {phase === 'ready' && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                    style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <motion.p
                      animate={{ opacity:[0.35,1,0.35] }}
                      transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
                      style={{ fontFamily:mono, fontSize:'clamp(9px,1.1vw,11px)', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(232,228,217,0.6)', margin:0 }}>
                      Click anywhere to enter
                    </motion.p>
                    <motion.div
                      animate={{ scaleX:[0,1,0] }}
                      transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
                      style={{ width:80, height:1, background:'rgba(74,222,128,0.5)', transformOrigin:'left' }}/>
                  </motion.div>
                )}
              </AnimatePresence>

              <span style={{ fontFamily:mono, fontSize:'clamp(8px,1vw,10px)', letterSpacing:'0.15em', color:'rgba(232,228,217,0.2)', textTransform:'uppercase' }}>
                shivish.in
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}