import { useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    let mX = 0, mY = 0, tX = 0, tY = 0, rafId: number
    const onMove = (e: MouseEvent) => {
      mX = e.clientX; mY = e.clientY
      if (cursorRef.current) { cursorRef.current.style.left = mX + 'px'; cursorRef.current.style.top = mY + 'px' }
    }
    const loop = () => {
      tX += (mX - tX) * 0.08; tY += (mY - tY) * 0.08
      if (trailRef.current) { trailRef.current.style.left = tX + 'px'; trailRef.current.style.top = tY + 'px' }
      rafId = requestAnimationFrame(loop)
    }
    document.addEventListener('mousemove', onMove); loop()
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  const serif = "'Instrument Serif', serif"
  const isHome = location.pathname === '/'

  return (
    <div style={{ background: '#07100d', color: '#e8e4d9', minHeight: '100vh', overflowX: 'hidden', cursor: 'none', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Glow cursor */}
      <div ref={cursorRef} style={{ position: 'fixed', width: 12, height: 12, background: '#4ade80', borderRadius: '50%', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', left: '-100px', top: '-100px', boxShadow: '0 0 12px rgba(100,200,140,0.8), 0 0 28px rgba(100,200,140,0.4)' }} />
      <div ref={trailRef} style={{ position: 'fixed', width: 44, height: 44, border: '1px solid rgba(100,200,140,0.25)', borderRadius: '50%', pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)', left: '-100px', top: '-100px' }} />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mixBlendMode: isHome ? 'difference' : 'normal' }}>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Link to="/" style={{ fontFamily: serif, fontSize: 22, color: '#e8e4d9', textDecoration: 'none', letterSpacing: '-0.02em' }}>Shivish</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {[['Work', '/work'], ['About', '/about'], ['Contact', '/contact']].map(([label, path]) => (
            <Link key={path} to={path} style={{ color: location.pathname === path ? '#e8e4d9' : 'rgba(232,228,217,0.45)', fontSize: 13, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e8e4d9')}
              onMouseLeave={e => (e.currentTarget.style.color = location.pathname === path ? '#e8e4d9' : 'rgba(232,228,217,0.45)')}>
              {label}
            </Link>
          ))}
          <a href="https://github.com/shiiiviiish" target="_blank" style={{ color: 'rgba(232,228,217,0.45)', fontSize: 13, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.12em', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e8e4d9')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,228,217,0.45)')}>
            GitHub ↗
          </a>
        </motion.div>
      </nav>

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <footer style={{ position: 'relative', zIndex: 10, padding: '28px 48px', fontSize: 12, color: 'rgba(232,228,217,0.18)', borderTop: '0.5px solid rgba(232,228,217,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Shivish · 2025</span>
        <span style={{ fontFamily: serif, fontStyle: 'italic' }}>Built with vibe.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { cursor: none; box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        @keyframes scrollPulse { 0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom} }
      `}</style>
    </div>
  )
}