import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'

const serif  = "'Instrument Serif', serif"
const mono   = "'DM Mono', monospace"
const sans   = "'DM Sans', sans-serif"

/* ── SONGS ── */
const songs = [
  {
    id: 1,
    title: 'Ae Ajnabee',
    artist: 'Aditya Rikhari, Rannvijay, Kute Khan',
    album: 'Coke Bharat',
    year: '2024',
    color: '#1a0f2e',
    accent: '#a78bfa',
    spotifyUrl: 'https://open.spotify.com/search/Ae%20Ajnabee%20Aditya%20Rikhari',
    lyrics: [
      'Ek umar yeh beet gayi dastak hue darwaze par',
      'Yoon aaya tu, warna ke hum soye the apne janaaze par',
      'Tumse mile, phir ik dafa jeene ki khwaahish si hui',
      'Ke tu mere seene mein yeh saansein meri chalte rehne de',
    ],
  },
  {
    id: 2,
    title: 'Safar',
    artist: 'Bayaan & Sherazam',
    album: '2024',
    year: '2024',
    color: '#0a1f1a',
    accent: '#4ade80',
    spotifyUrl: 'https://open.spotify.com/search/Safar%20Bayaan%20Sherazam',
    lyrics: [
      'Main bhaaga-bhaaga, sadiyon se jaaga',
      'Aayaa hoon meelon gaon se',
      'Naa humsafar koi, naa apna ghar, yaara',
      'Rehta hoon behti naon pe',
    ],
  },
]

/* ── QUOTES ── */
const quotes = [
  { text: 'Que Sera Sera', sub: 'Whatever will be, will be.', real: true },
  { text: 'Your quote here', sub: 'Add something that moves you.', real: false },
  { text: 'Your quote here', sub: 'Add something that moves you.', real: false },
]

/* ── OBSESSIONS ── */
const obsessions = [
  { emoji: '🎬', label: 'Movie / Show', value: 'Coming soon...', placeholder: true },
  { emoji: '🎮', label: 'Game',         value: 'Coming soon...', placeholder: true },
  { emoji: '📺', label: 'YouTube',      value: 'Coming soon...', placeholder: true },
  { emoji: '🎵', label: 'Artist',       value: 'Bayaan & Aditya Rikhari', placeholder: false },
]

/* ── SPINNING RING ── */
function SpotifyRing({ color, accent }: { color: string; accent: string }) {
  return (
    <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
      <svg width="80" height="80" viewBox="0 0 80 80"
        style={{ position: 'absolute', inset: 0, animation: 'spinRing 3s linear infinite' }}>
        <circle cx="40" cy="40" r="36" fill="none" stroke={accent}
          strokeWidth="2" strokeDasharray="8 5" strokeLinecap="round" opacity={0.8}/>
      </svg>
      <div style={{
        position: 'absolute', inset: 6, borderRadius: '50%',
        background: `radial-gradient(circle at 35% 35%, ${accent}30, ${color})`,
        border: `1px solid ${accent}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 20px ${accent}40`,
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={accent}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    </div>
  )
}

/* ── LYRICS DISPLAY ── */
function LyricsBlock({ lyrics, accent }: { lyrics: string[]; accent: string }) {
  return (
    <div style={{
      marginTop: 20,
      padding: '16px 20px',
      borderLeft: `2px solid ${accent}60`,
      background: `${accent}08`,
      borderRadius: '0 10px 10px 0',
    }}>
      {lyrics.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          style={{
            fontFamily: serif,
            fontStyle: 'italic',
            fontSize: 'clamp(13px,2vw,15px)',
            color: 'rgba(232,228,217,0.75)',
            lineHeight: 1.9,
            margin: 0,
            letterSpacing: '0.01em',
          }}>
          {line}
        </motion.p>
      ))}
    </div>
  )
}

/* ── SONG CARD ── */
function SongCard({ song }: { song: typeof songs[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: `linear-gradient(135deg, ${song.color}, rgba(7,16,13,0.9))`,
        border: `0.5px solid ${song.accent}40`,
        borderRadius: 20,
        padding: 'clamp(20px,4vw,28px)',
        boxShadow: `0 8px 40px ${song.accent}15`,
      }}>

      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <SpotifyRing color={song.color} accent={song.accent} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 6 }}>
            Now Playing
          </p>
          <h3 style={{ fontFamily: serif, fontSize: 'clamp(18px,3vw,26px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#e8e4d9', margin: 0, marginBottom: 4 }}>
            {song.title}
          </h3>
          <p style={{ fontFamily: sans, fontSize: 12, color: 'rgba(232,228,217,0.45)', margin: 0, fontWeight: 300 }}>
            {song.artist} · {song.year}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: song.accent,
              textDecoration: 'none', opacity: 0.7,
              borderBottom: `0.5px solid ${song.accent}40`,
              paddingBottom: 2,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}>
            Spotify ↗
          </a>
        </div>
      </div>

      <LyricsBlock lyrics={song.lyrics} accent={song.accent} />
    </motion.div>
  )
}

/* ── MAIN PAGE ── */
export default function Vibes() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef  = useRef<HTMLDivElement>(null)
  const isMobile  = window.innerWidth < 768

  useEffect(() => {
    if (isMobile) return
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{mX=e.clientX;mY=e.clientY;if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'}}
    const loop=()=>{tX+=(mX-tX)*0.08;tY+=(mY-tY)*0.08;if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'}rafId=requestAnimationFrame(loop)}
    document.addEventListener('mousemove',onMove);loop()
    return()=>{document.removeEventListener('mousemove',onMove);cancelAnimationFrame(rafId)}
  },[])

  return (
    <div style={{ background:'#07100d', color:'#e8e4d9', minHeight:'100vh', fontFamily:sans, overflowX:'hidden' }}>
      {!isMobile && <>
        <div ref={cursorRef} style={{position:'fixed',width:12,height:12,background:'#4ade80',borderRadius:'50%',pointerEvents:'none',zIndex:99999,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px',boxShadow:'0 0 12px rgba(74,222,128,0.8)'}}/>
        <div ref={trailRef}  style={{position:'fixed',width:40,height:40,border:'1px solid rgba(74,222,128,0.25)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,transform:'translate(-50%,-50%)',left:'-100px',top:'-100px'}}/>
      </>}

      <Nav />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(120px,16vw,180px) clamp(20px,5vw,80px) 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 20% 50%, rgba(74,222,128,0.04) 0%, transparent 60%)', pointerEvents:'none' }}/>
        <motion.p
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
          style={{ fontFamily:mono, fontSize:10, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(232,228,217,0.3)', marginBottom:20 }}>
          Soul · Things that move me
        </motion.p>
        <motion.h1
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:1, ease:[0.16,1,0.3,1] }}
          style={{ fontFamily:serif, fontSize:'clamp(52px,10vw,120px)', fontWeight:400, lineHeight:0.9, letterSpacing:'-0.04em', margin:0, marginBottom:24 }}>
          This is what<br/>
          <em style={{ color:'rgba(232,228,217,0.22)', fontStyle:'italic' }}>I feel.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.8 }}
          style={{ fontFamily:sans, fontSize:14, color:'rgba(232,228,217,0.4)', fontWeight:300, lineHeight:1.8, maxWidth:480 }}>
          Songs, thoughts, obsessions — the things that make me, me. No filter.
        </motion.p>
      </section>

      {/* ── NOW PLAYING ── */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(20px,5vw,48px) 80px' }}>
        <motion.p
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:mono, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(232,228,217,0.25)', marginBottom:24 }}>
          — On repeat
        </motion.p>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {songs.map(song => <SongCard key={song.id} song={song} />)}
        </div>
      </section>

      {/* ── QUOTES ── */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(20px,5vw,48px) 80px' }}>
        <motion.p
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:mono, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(232,228,217,0.25)', marginBottom:32 }}>
          — Words I live by
        </motion.p>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.1, duration:0.8 }}
              style={{
                padding:'24px 28px',
                borderRadius:16,
                background: q.real ? 'rgba(74,222,128,0.04)' : 'rgba(232,228,217,0.02)',
                border: `0.5px solid ${q.real ? 'rgba(74,222,128,0.15)' : 'rgba(232,228,217,0.06)'}`,
                opacity: q.real ? 1 : 0.4,
              }}>
              <p style={{ fontFamily:serif, fontStyle:'italic', fontSize:'clamp(20px,3.5vw,32px)', color: q.real ? '#e8e4d9' : 'rgba(232,228,217,0.3)', margin:0, marginBottom:8, letterSpacing:'-0.02em' }}>
                "{q.text}"
              </p>
              <p style={{ fontFamily:sans, fontSize:12, color:'rgba(232,228,217,0.3)', margin:0, fontWeight:300, fontStyle: q.real ? 'normal' : 'italic' }}>
                {q.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CURRENTLY OBSESSED ── */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(20px,5vw,48px) 80px' }}>
        <motion.p
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:mono, fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(232,228,217,0.25)', marginBottom:24 }}>
          — Currently obsessed with
        </motion.p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12 }}>
          {obsessions.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
              transition={{ delay:i*0.08, duration:0.6 }}
              style={{
                padding:'20px',
                borderRadius:14,
                background:'rgba(232,228,217,0.02)',
                border:'0.5px solid rgba(232,228,217,0.07)',
                opacity: o.placeholder ? 0.4 : 1,
              }}>
              <span style={{ fontSize:24, display:'block', marginBottom:10 }}>{o.emoji}</span>
              <p style={{ fontFamily:mono, fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(232,228,217,0.3)', margin:0, marginBottom:6 }}>{o.label}</p>
              <p style={{ fontFamily:serif, fontStyle: o.placeholder ? 'italic' : 'normal', fontSize:14, color: o.placeholder ? 'rgba(232,228,217,0.25)' : '#e8e4d9', margin:0 }}>{o.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── QUE SERA SERA CTA ── */}
      <section style={{ maxWidth:900, margin:'0 auto', padding:'0 clamp(20px,5vw,48px) 100px' }}>
        <motion.div
          initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1 }}
          style={{ borderTop:'0.5px solid rgba(232,228,217,0.06)', paddingTop:60, textAlign:'center' }}>
          <p style={{ fontFamily:mono, fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(232,228,217,0.25)', marginBottom:24 }}>A philosophy</p>
          <h2 style={{ fontFamily:serif, fontSize:'clamp(40px,8vw,100px)', fontWeight:400, letterSpacing:'-0.04em', lineHeight:0.9, margin:0, marginBottom:16 }}>
            Que Sera
          </h2>
          <h2 style={{ fontFamily:serif, fontStyle:'italic', fontSize:'clamp(40px,8vw,100px)', fontWeight:400, letterSpacing:'-0.04em', lineHeight:0.9, margin:0, marginBottom:32, color:'rgba(232,228,217,0.22)' }}>
            Sera.
          </h2>
          <p style={{ fontFamily:sans, fontSize:13, color:'rgba(232,228,217,0.35)', fontWeight:300, letterSpacing:'0.05em' }}>Whatever will be, will be.</p>
        </motion.div>
      </section>

      <footer style={{ padding:'24px clamp(20px,5vw,48px)', borderTop:'0.5px solid rgba(232,228,217,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontFamily:mono, fontSize:11, color:'rgba(232,228,217,0.18)' }}>Shivish · 2025</span>
        <span style={{ fontFamily:serif, fontStyle:'italic', fontSize:12, color:'rgba(232,228,217,0.18)' }}>Built with vibe.</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spinRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 769px) { * { cursor: none; } }
      `}</style>
    </div>
  )
}