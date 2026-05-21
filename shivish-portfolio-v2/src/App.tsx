import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useScroll, useTransform } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ── MAGNETIC BUTTON ──
function MagneticBtn({ children, className, href, }: { children: React.ReactNode; className?: string; href?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
 

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 })
  }
  const handleLeave = () => { setPos({ x: 0, y: 0 }); (false) }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onMouseMove={handleMove}
      onMouseEnter={() => (true)}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-block', textDecoration: 'none' }}
    >
      {children}
    </motion.a>
  )
}

// ── ANIMATED TEXT (character by character) ──
function AnimatedText({ text, className, }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.2'] })

  return (
    <p ref={ref} className={className} style={{ position: 'relative' }}>
      {text.split('').map((char, i) => {
        const start = i / text.length
        const end = start + 1 / text.length + 0.05
        return (
          <AnimatedChar key={i} char={char} progress={scrollYProgress} start={start} end={end} />
        )
      })}
    </p>
  )
}

function AnimatedChar({ char, progress, start, end }: { char: string; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  return (
    <motion.span style={{ opacity, display: 'inline' }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

// ── STICKY PROJECT CARD ──
function ProjectCard({ project, index, total }: { project: any; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const targetScale = 1 - (total - 1 - index) * 0.04
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} style={{ height: '85vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <motion.div
        style={{ scale, top: `${80 + index * 28}px`, position: 'sticky', width: '100%', transformOrigin: 'top center' }}
        className="glass rounded-[24px] p-6 md:p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-white/35 mb-1">{project.chip}</p>
            <h3 className="font-normal text-white text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>{project.title}</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/20 text-6xl font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>0{index + 1}</span>
            <a href={project.url} target="_blank" className="rounded-full border border-white/15 px-5 py-2 text-white/60 text-[12px] uppercase tracking-wider hover:bg-white/5 transition-colors no-underline">
              View ↗
            </a>
          </div>
        </div>
        <p className="text-white/40 text-[13px] leading-relaxed font-light mb-6 max-w-lg">{project.desc}</p>
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((t: string) => (
            <span key={t} className="text-[11px] px-3 py-1 rounded-full border border-white/10 text-white/30">{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function App() {
  const fogRef = useRef<HTMLCanvasElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const faceRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Scroll-driven marquee
  const { scrollY } = useScroll()
  const row1X = useTransform(scrollY, [0, 3000], [0, -400])
  const row2X = useTransform(scrollY, [0, 3000], [0, 400])

  // FOG
  useEffect(() => {
    const canvas = fogRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    type P = { x: number; y: number; r: number; dx: number; dy: number; a: number; warm: boolean }
    let particles: P[] = [], animId: number
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    const makeP = (): P => ({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*280+100, dx:(Math.random()-0.5)*0.22, dy:(Math.random()-0.5)*0.1, a:Math.random()*0.055+0.015, warm:Math.random()>0.5 })
    const draw = () => {
      ctx.clearRect(0,0,W,H); ctx.fillStyle='#080d0a'; ctx.fillRect(0,0,W,H)
      for(const p of particles){ const c=p.warm?'100,180,130':'60,140,110'; const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r); g.addColorStop(0,`rgba(${c},${p.a})`); g.addColorStop(1,`rgba(${c},0)`); ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=g; ctx.fill(); p.x+=p.dx; p.y+=p.dy; if(p.x<-p.r)p.x=W+p.r; if(p.x>W+p.r)p.x=-p.r; if(p.y<-p.r)p.y=H+p.r; if(p.y>H+p.r)p.y=-p.r }
      animId=requestAnimationFrame(draw)
    }
    resize(); particles=Array.from({length:22},makeP); draw()
    window.addEventListener('resize',resize)
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  }, [])

  // CURSOR
  useEffect(() => {
    let mX=0,mY=0,tX=0,tY=0,rafId:number
    const onMove=(e:MouseEvent)=>{ mX=e.clientX; mY=e.clientY; if(cursorRef.current){cursorRef.current.style.left=mX+'px';cursorRef.current.style.top=mY+'px'} }
    const animTrail=()=>{ tX+=(mX-tX)*0.1; tY+=(mY-tY)*0.1; if(trailRef.current){trailRef.current.style.left=tX+'px';trailRef.current.style.top=tY+'px'} rafId=requestAnimationFrame(animTrail) }
    document.addEventListener('mousemove',onMove); animTrail()
    return ()=>{ document.removeEventListener('mousemove',onMove); cancelAnimationFrame(rafId) }
  }, [])

  // CAR DRIFT
  useEffect(() => {
    const car = carRef.current
    if (!car) return
    gsap.set(car, { x: '120vw', rotation: -5, opacity: 1 })
    const tl = gsap.timeline({ delay: 0.6 })
    tl.to(car, { x: '18vw', rotation: 2, duration: 1.3, ease: 'power3.out' })
    tl.to(car, { x: '22vw', rotation: 0, duration: 0.6, ease: 'back.out(2)' })
    ScrollTrigger.create({
      trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true,
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(car, { y: p*300, opacity: 1-p*1.5 })
        if(faceRef.current) gsap.set(faceRef.current, { y: p*-30, opacity: 1-p*0.4 })
      }
    })
    return ()=>{ tl.kill(); ScrollTrigger.getAll().forEach(t=>t.kill()) }
  }, [])

  const projects = [
    { title: 'Happiness Through Art', chip: 'Client Project · 2025', desc: 'Portfolio for artist Kavya Atray. Built end-to-end — layout, deployment, everything.', tags: ['TypeScript', 'React', 'Vercel'], url: 'https://hta-seven.vercel.app/' },
    { title: 'This Portfolio', chip: 'Personal · 2025', desc: 'React + Tailwind + GSAP + Framer Motion. Fog, glass, drift animation, custom cursor.', tags: ['React', 'GSAP', 'Framer Motion', 'Tailwind'], url: 'https://shivish.in' },
    { title: 'Next Project', chip: 'Coming Soon', desc: 'Something new is cooking. Watch the GitHub.', tags: ['???'], url: 'https://github.com/shiiiviiish' },
  ]

  const skills = ['HTML & CSS', 'JavaScript', 'TypeScript (learning)', 'React', 'Git & GitHub', 'Vercel · Deployment']

  const marqueeItems = ['HTML & CSS', '·', 'JavaScript', '·', 'TypeScript', '·', 'Vibe Coder', '·', 'Vercel', '·', 'GitHub', '·', 'Building in Public', '·', 'Ludhiana, Punjab', '·']

  return (
    <div className="bg-[#080d0a] text-white min-h-screen overflow-x-hidden" style={{ cursor: 'none', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Cursor */}
      <div ref={cursorRef} className="fixed z-[99999] w-3 h-3 bg-white rounded-full pointer-events-none mix-blend-difference" style={{ transform: 'translate(-50%,-50%)', transition: 'width 0.2s, height 0.2s' }} />
      <div ref={trailRef} className="fixed z-[99998] w-9 h-9 border border-white/25 rounded-full pointer-events-none" style={{ transform: 'translate(-50%,-50%)' }} />

      {/* Fog */}
      <canvas ref={fogRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-4xl mx-auto px-7 py-3 rounded-full flex items-center justify-between glass">
          <a href="#hero" className="font-normal text-xl text-white no-underline" style={{ fontFamily: "'Instrument Serif', serif" }}>S.</a>
          <ul className="hidden md:flex gap-7 list-none">
            {['Work', 'About', 'Contact'].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="text-white/60 text-sm no-underline hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
          <a href="https://github.com/shiiiviiish" target="_blank" className="glass rounded-full px-5 py-2 text-white text-sm no-underline flex items-center gap-2 hover:bg-white/5 transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-[20.5%] right-[30%] h-[3px] rounded-full" style={{ width: '36%', background: 'linear-gradient(to left, transparent, rgba(100,200,140,0.35), transparent)' }} />
        <div className="absolute bottom-[21.5%] right-[28%] h-[2px] rounded-full" style={{ width: '28%', background: 'linear-gradient(to left, transparent, rgba(100,200,140,0.2), transparent)' }} />
        <div className="absolute bottom-[18%] left-[35%] w-[30%] h-20 rounded-full opacity-60" style={{ background: 'radial-gradient(ellipse at center, rgba(100,200,140,0.1) 0%, transparent 70%)' }} />

        {/* Car */}
        <div ref={carRef} className="absolute bottom-[10%] z-[4] pointer-events-none" style={{ width: 'clamp(200px,28vw,340px)' }}>
          <img src="/images/porsche.png" alt="Porsche" className="w-full" style={{ mixBlendMode: 'screen', filter: 'brightness(1.1) contrast(1.05) saturate(0.85)', transform: 'perspective(800px) rotateY(-8deg) scaleX(-1)' }} />
        </div>

        {/* Face */}
        <div ref={faceRef} className="relative z-[12] flex flex-col items-center gap-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16,1,0.3,1] }}
            className="rounded-full overflow-hidden border border-[rgba(100,200,140,0.12)] shadow-[0_0_60px_rgba(100,200,140,0.06)]"
            style={{ width: 'clamp(200px,26vw,280px)', height: 'clamp(200px,26vw,280px)' }}
          >
            <img src="/images/shivishanimated.png" alt="Shivish" className="w-full h-full object-cover object-top scale-105" />
          </motion.div>

          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8 }}
              className="flex items-center justify-center gap-2 text-white/40 text-[11px] tracking-[0.2em] uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full shadow-[0_0_8px_#4ade80] animate-pulse" />
              Available for work
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.9, ease: [0.16,1,0.3,1] }}
              className="font-normal leading-[0.95] tracking-[-0.03em]"
              style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(48px,8vw,96px)' }}>
              Shivish<br /><em style={{ color: 'rgba(255,255,255,0.28)' }}>vibe coder.</em>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6, duration: 0.8 }}
              className="text-white/40 text-sm mt-3 font-light">
              Building things for the web. One project at a time.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 0.8 }}
              className="flex gap-3 justify-center mt-7">
              <MagneticBtn href="#work" className="rounded-full px-7 py-3 bg-white text-black text-sm font-medium no-underline hover:opacity-85 transition-opacity" style={{}}>
                See my work
              </MagneticBtn>
              <MagneticBtn href="#contact" className="glass rounded-full px-7 py-3 text-white text-sm no-underline hover:bg-white/5 transition-colors" style={{}}>
                Say hello →
              </MagneticBtn>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.2em] text-white/25 uppercase z-20">
          <span>Scroll</span>
          <div className="w-px h-9 bg-gradient-to-b from-white/25 to-transparent animate-scrollPulse" />
        </motion.div>
      </div>

      {/* Scroll-driven Marquee */}
      <div ref={marqueeRef} className="overflow-hidden border-y border-white/5 py-5 relative z-10">
        <motion.div style={{ x: row1X }} className="flex gap-12 w-max mb-3">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="italic text-[17px] whitespace-nowrap" style={{ fontFamily: "'Instrument Serif', serif", color: t === '·' ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)' }}>{t}</span>
          ))}
        </motion.div>
        <motion.div style={{ x: row2X }} className="flex gap-12 w-max">
          {[...marqueeItems.reverse(), ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="italic text-[17px] whitespace-nowrap" style={{ fontFamily: "'Instrument Serif', serif", color: t === '·' ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)' }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Projects — Sticky Stack */}
      <section id="work" className="max-w-4xl mx-auto px-6 py-28 relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-10">Selected Work</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-normal leading-[1.05] tracking-[-0.02em] mb-16"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px,5vw,60px)' }}>
          Things I've<br /><em style={{ color: 'rgba(255,255,255,0.28)' }}>built.</em>
        </motion.h2>

        {/* Sticky stacking cards */}
        <div>
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} total={projects.length} />)}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-16">
          {[{ count: 2, label: 'Projects Shipped' }, { count: 88, label: 'GitHub Commits' }, { count: 3, label: 'Weeks Coding' }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
              className="glass rounded-[20px] p-7 text-center">
              <div className="text-5xl font-normal text-white leading-none mb-2" style={{ fontFamily: "'Instrument Serif', serif" }} data-count={s.count}>0</div>
              <div className="text-[12px] text-white/35 tracking-[0.05em]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-10">About</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="font-normal leading-[1.05] tracking-[-0.02em] mb-12"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px,5vw,60px)' }}>
          Who's<br /><em style={{ color: 'rgba(255,255,255,0.28)' }}>Shivish?</em>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10  style={{ transform: 'translate(-50%,-50%)', opacity: 0 }}">
          <div>
            <AnimatedText
              text="I'm a student who codes for the vibe of it. Started building websites to upskill — ended up actually loving the craft. Currently learning, shipping real projects, and figuring out the web one line of code at a time. Based in Ludhiana, Punjab. Always building something."
              className="text-[15px] leading-[1.8] font-light"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            {skills.map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
                className="glass rounded-xl px-[18px] py-3.5 flex items-center gap-3 hover:translate-x-1.5 transition-transform duration-300">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.25)' }} />
                <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-10">Contact</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="font-normal leading-[1.05] tracking-[-0.02em]"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(36px,5vw,60px)' }}>
          Let's<br /><em style={{ color: 'rgba(255,255,255,0.28)' }}>talk.</em>
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}>
          <MagneticBtn href="mailto:hello@shivish.in"
            className="inline-block mt-10 no-underline italic hover:tracking-wide transition-all duration-300"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(22px,4vw,44px)', color: 'rgba(255,255,255,0.35)' }}>
            hello@shivish.in
          </MagneticBtn>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center gap-3 mt-10">
          <a href="https://github.com/shiiiviiish" target="_blank" className="glass rounded-full p-3.5 text-white/40 hover:text-white hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 no-underline flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
        </motion.div>
      </section>

      <footer className="relative z-10 text-center py-10 text-[12px] border-t border-white/5" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Built by Shivish · shivish.in
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { cursor: none; box-sizing: border-box; }
        .glass {
          background: rgba(255,255,255,0.01);
          backdrop-filter: blur(32px) brightness(0.85) saturate(2.5);
          -webkit-backdrop-filter: blur(32px) brightness(0.85) saturate(2.5);
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0.75px hsl(205 20% 10%/0.2), 8px 9px 14px -2.5px hsl(205 20% 10%/0.15);
          position: relative;
          overflow: hidden;
        }
        .glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.4) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .glass > * { position: relative; z-index: 2; }
        @keyframes scrollPulse { 0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom} }
        .animate-scrollPulse { animation: scrollPulse 1.5s ease infinite; }
      `}</style>
    </div>
  )
}