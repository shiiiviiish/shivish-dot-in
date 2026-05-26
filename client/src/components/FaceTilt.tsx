import { useRef, useEffect } from 'react'

const mono  = "'DM Mono', monospace"
const serif = "'Instrument Serif', serif"

interface FaceTiltProps {
  width?: number | string
  height?: number | string
  label?: string
  sublabel?: string
  showBadge?: boolean
  noBackground?: boolean  // removes card, floats face with bg removed
}

export default function FaceTilt({
  width        = 'clamp(280px,35vw,420px)',
  height       = 'auto',
  label        = 'Shivish',
  sublabel     = '{VIBE CODER}',
  showBadge    = true,
  noBackground = false,
}: FaceTiltProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const glowRef   = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current
    const card   = cardRef.current
    const glow   = glowRef.current
    const cursor = cursorRef.current
    if (!wrap || !card) return

    const onEnter = () => { if (cursor) cursor.style.display = 'block' }
    const onLeave = () => {
      if (cursor) cursor.style.display = 'none'
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)'
      if (glow) glow.style.background = 'transparent'
    }
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x  = e.clientX - rect.left
      const y  = e.clientY - rect.top
      const cx = rect.width  / 2
      const cy = rect.height / 2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy

      card.style.transform = `perspective(700px) rotateX(${-dy * 14}deg) rotateY(${dx * 18}deg) scale(1.03)`

      if (glow && !noBackground) {
        const gx = Math.round((x / rect.width)  * 100)
        const gy = Math.round((y / rect.height) * 100)
        glow.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(74,222,128,0.13) 0%, transparent 60%)`
      }

      if (cursor) {
        cursor.style.left = x + 'px'
        cursor.style.top  = y + 'px'
      }
    }

    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)
    wrap.addEventListener('mousemove',  onMove)
    return () => {
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
      wrap.removeEventListener('mousemove',  onMove)
    }
  }, [noBackground])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        width,
        aspectRatio: height === 'auto' ? (noBackground ? '3/4' : '3/4') : undefined,
        height: height !== 'auto' ? height : undefined,
        cursor: 'none',
      }}
    >
      <div
        ref={cardRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: noBackground ? 0 : 20,
          overflow: noBackground ? 'visible' : 'hidden',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.12s ease-out',
          border: noBackground ? 'none' : '0.5px solid rgba(74,222,128,0.12)',
          background: noBackground ? 'transparent' : '#0d1f17',
        }}
      >
        {/* Face image */}
        <img
          src="/images/shivishanimated.png"
          alt="Shivish"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
            // KEY: screen blend mode removes dark bg pixels
            mixBlendMode: noBackground ? 'screen' : 'normal',
            filter: noBackground
              ? 'drop-shadow(0 0 32px rgba(74,222,128,0.15)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
              : 'none',
          }}
        />

        {/* Mouse-follow glow — only in card mode */}
        {!noBackground && (
          <div
            ref={glowRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 20,
              transition: 'background 0.08s',
            }}
          />
        )}

        {/* Bottom gradient — only in card mode */}
        {!noBackground && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,16,13,0.72) 0%, rgba(7,16,13,0.15) 45%, transparent 70%)',
            pointerEvents: 'none',
            borderRadius: 20,
          }}/>
        )}

        {/* Name label — only in card mode */}
        {!noBackground && (
          <div style={{
            position: 'absolute', bottom: 20, left: 20, right: 20,
            pointerEvents: 'none',
          }}>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 20, color: '#e8e4d9', margin: 0, lineHeight: 1 }}>{label}</p>
            <p style={{ fontFamily: mono, fontSize: 10, color: 'rgba(74,222,128,0.7)', letterSpacing: '0.12em', margin: '6px 0 0' }}>{sublabel}</p>
          </div>
        )}

        {/* Badge — only in card mode */}
        {!noBackground && showBadge && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(7,16,13,0.65)',
            backdropFilter: 'blur(8px)',
            border: '0.5px solid rgba(74,222,128,0.2)',
            borderRadius: 9999,
            padding: '5px 12px',
            pointerEvents: 'none',
          }}>
            <span style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 6px #4ade80',
              display: 'inline-block',
              animation: 'facePulse 2s ease infinite',
            }}/>
            <span style={{ fontFamily: mono, fontSize: 9, color: 'rgba(232,228,217,0.6)', letterSpacing: '0.1em' }}>OPEN</span>
          </div>
        )}
      </div>

      {/* Green cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          width: 12, height: 12,
          background: '#4ade80',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 12px rgba(74,222,128,0.8)',
          display: 'none',
          zIndex: 10,
        }}
      />

      <style>{`
        @keyframes facePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
      `}</style>
    </div>
  )
}