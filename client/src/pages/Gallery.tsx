import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Nav from '../components/Nav'

const photos = [
  { id: 1, title: 'Urban Fog',    category: 'Photography', color: '#0d1f17', accent: '#4ade80' },
  { id: 2, title: 'Night Lights', category: 'Editing',     color: '#0f1525', accent: '#60a5fa' },
  { id: 3, title: 'Golden Hour',  category: 'Photography', color: '#1f150a', accent: '#fb923c' },
  { id: 4, title: 'Motion Blur',  category: 'Editing',     color: '#130a1f', accent: '#a78bfa' },
  { id: 5, title: 'Chandigarh',   category: 'Photography', color: '#0a1f12', accent: '#34d399' },
  { id: 6, title: 'Street Life',  category: 'Photography', color: '#1f100a', accent: '#f59e0b' },
  { id: 7, title: 'Abstract',     category: 'Editing',     color: '#1f0a12', accent: '#f472b6' },
  { id: 8, title: 'Architecture', category: 'Photography', color: '#12121f', accent: '#818cf8' },
  { id: 9, title: 'Portrait',     category: 'Photography', color: '#1f1212', accent: '#f87171' },
]

function makeRoundedRectTexture(
  w: number, h: number, r: number,
  bg: string, accent: string, title: string, category: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width  = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const path = new Path2D()
  path.moveTo(r, 0)
  path.lineTo(w - r, 0)
  path.arcTo(w, 0, w, r, r)
  path.lineTo(w, h - r)
  path.arcTo(w, h, w - r, h, r)
  path.lineTo(r, h)
  path.arcTo(0, h, 0, h - r, r)
  path.lineTo(0, r)
  path.arcTo(0, 0, r, 0, r)
  path.closePath()

  ctx.save()
  ctx.clip(path)

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  const ac = new THREE.Color(accent)
  const grd = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, w * 0.7)
  grd.addColorStop(0, `rgba(${Math.round(ac.r*255)},${Math.round(ac.g*255)},${Math.round(ac.b*255)},0.25)`)
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, w, h)

  ctx.strokeStyle = 'rgba(232,228,217,0.12)'
  ctx.lineWidth = 2
  ctx.stroke(path)

  ctx.fillStyle = accent
  ctx.globalAlpha = 0.6
  ctx.beginPath()
  ctx.arc(w / 2, h * 0.35, 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1

  ctx.fillStyle = 'rgba(232,228,217,0.9)'
  ctx.font = `italic ${Math.round(w * 0.1)}px Georgia, serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(title, w / 2, h * 0.55)

  ctx.fillStyle = 'rgba(232,228,217,0.3)'
  ctx.font = `${Math.round(w * 0.065)}px sans-serif`
  ctx.fillText(category.toUpperCase(), w / 2, h * 0.72)

  ctx.restore()
  return new THREE.CanvasTexture(canvas)
}

export default function Gallery() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    cards: THREE.Mesh[]
    cardData: typeof photos
    helixAngle: number
    targetHelixAngle: number
    scrollY: number
    rafId: number
    particleSystem: THREE.Points | null
    particleTargets: THREE.Vector3[]
    particlePhase: 'exploding' | 'resolving' | 'done'
    particleT: number
    mouse: THREE.Vector2
    raycaster: THREE.Raycaster
    hoveredCard: THREE.Mesh | null
    isMobile: boolean
  } | null>(null)

  const [selected,  setSelected]  = useState<number | null>(null)
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 768)
  const [phase,     setPhase]     = useState<'loading' | 'done'>('loading')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const serif = "'Instrument Serif', serif"

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x07100d, 1)
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200)
    camera.position.set(0, 0, 14)

    scene.fog = new THREE.FogExp2(0x07100d, 0.045)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const dir = new THREE.DirectionalLight(0x4ade80, 0.8)
    dir.position.set(5, 10, 5)
    scene.add(dir)

    const HELIX_RADIUS = isMobile ? 2.8 : 3.8
    const HELIX_PITCH  = 2.2
    const TURNS        = 1.8
    const N            = photos.length

    const helixPositions = photos.map((_, i) => {
      const t      = i / (N - 1)
      const angle  = t * Math.PI * 2 * TURNS
      const y      = (t - 0.5) * HELIX_PITCH * TURNS * 1.6
      const strand = i % 2 === 0 ? 1 : -1
      return new THREE.Vector3(
        Math.cos(angle + strand * Math.PI * 0.5) * HELIX_RADIUS,
        y,
        Math.sin(angle + strand * Math.PI * 0.5) * HELIX_RADIUS,
      )
    })

    const PARTICLE_COUNT = 600
    const pPositions = new Float32Array(PARTICLE_COUNT * 3)
    const pColors    = new Float32Array(PARTICLE_COUNT * 3)
    const accentColors = photos.map(p => new THREE.Color(p.accent))

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 8
      pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPositions[i * 3 + 2] = r * Math.cos(phi)
      const c = accentColors[i % accentColors.length]
      pColors[i * 3]     = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 1, sizeAttenuation: true })
    const particleSystem = new THREE.Points(pGeo, pMat)
    scene.add(particleSystem)

    const particleTargets = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
      helixPositions[i % helixPositions.length].clone().add(
        new THREE.Vector3((Math.random()-0.5)*0.4, (Math.random()-0.5)*0.4, (Math.random()-0.5)*0.4)
      )
    )

    const cardW = isMobile ? 1.6 : 2.0
    const cardH = cardW * 0.72
    const cards: THREE.Mesh[] = []

    photos.forEach((photo, i) => {
      const tex  = makeRoundedRectTexture(512, 370, 40, photo.color, photo.accent, photo.title, photo.category)
      const geo  = new THREE.PlaneGeometry(cardW, cardH)
      const mat  = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(helixPositions[i])
      mesh.position.x += (Math.random() - 0.5) * 12
      mesh.position.y += (Math.random() - 0.5) * 12
      mesh.position.z += (Math.random() - 0.5) * 12
      mesh.userData = { photoId: photo.id, targetPos: helixPositions[i], index: i }
      mesh.lookAt(new THREE.Vector3(0, helixPositions[i].y, 0))
      scene.add(mesh)
      cards.push(mesh)
    })

    const backbonePoints: number[] = []
    const BACKBONE_SEGMENTS = 120
    for (let strand = 0; strand < 2; strand++) {
      for (let i = 0; i <= BACKBONE_SEGMENTS; i++) {
        const t     = i / BACKBONE_SEGMENTS
        const angle = t * Math.PI * 2 * TURNS + strand * Math.PI
        const y     = (t - 0.5) * HELIX_PITCH * TURNS * 1.6
        backbonePoints.push(Math.cos(angle) * HELIX_RADIUS, y, Math.sin(angle) * HELIX_RADIUS)
      }
    }
    const backboneGeo = new THREE.BufferGeometry()
    backboneGeo.setAttribute('position', new THREE.Float32BufferAttribute(backbonePoints, 3))
    const backboneMat = new THREE.PointsMaterial({ color: 0x4ade80, size: 0.04, transparent: true, opacity: 0.25 })
    scene.add(new THREE.Points(backboneGeo, backboneMat))

    const rungMat = new THREE.LineBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.08 })
    for (let i = 0; i <= 28; i++) {
      const t     = i / 28
      const angle = t * Math.PI * 2 * TURNS
      const y     = (t - 0.5) * HELIX_PITCH * TURNS * 1.6
      const p1    = new THREE.Vector3(Math.cos(angle) * HELIX_RADIUS, y, Math.sin(angle) * HELIX_RADIUS)
      const p2    = new THREE.Vector3(Math.cos(angle + Math.PI) * HELIX_RADIUS, y, Math.sin(angle + Math.PI) * HELIX_RADIUS)
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p1, p2]), rungMat))
    }

    sceneRef.current = {
      renderer, scene, camera, cards, cardData: photos,
      helixAngle: 0, targetHelixAngle: 0, scrollY: 0, rafId: 0,
      particleSystem, particleTargets,
      particlePhase: 'exploding', particleT: 0,
      mouse: new THREE.Vector2(-999, -999),
      raycaster: new THREE.Raycaster(),
      hoveredCard: null, isMobile,
    }

    const onScroll = () => {
      const s = sceneRef.current; if (!s) return
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const t = maxScroll > 0 ? window.scrollY / maxScroll : 0
      s.targetHelixAngle = t * Math.PI * 4
    }
    window.addEventListener('scroll', onScroll)

    const onMouseMove = (e: MouseEvent) => {
      const s = sceneRef.current; if (!s) return
      const rect = mount.getBoundingClientRect()
      s.mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
      s.mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
    }
    mount.addEventListener('mousemove', onMouseMove)

    const onClick = (e: MouseEvent) => {
      const s = sceneRef.current; if (!s || s.particlePhase !== 'done') return
      const rect = mount.getBoundingClientRect()
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width)  * 2 - 1,
       -((e.clientY - rect.top)  / rect.height) * 2 + 1,
      )
      s.raycaster.setFromCamera(mouse, s.camera)
      const hits = s.raycaster.intersectObjects(s.cards)
      if (hits.length > 0) setSelected(hits[0].object.userData.photoId as number)
    }
    mount.addEventListener('click', onClick)

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchMove  = (e: TouchEvent) => {
      const s = sceneRef.current; if (!s) return
      s.targetHelixAngle += (touchStartY - e.touches[0].clientY) * 0.004
      touchStartY = e.touches[0].clientY
    }
    mount.addEventListener('touchstart', onTouchStart, { passive: true })
    mount.addEventListener('touchmove',  onTouchMove,  { passive: true })

    const clock = new THREE.Clock()
    let introT = 0

    const animate = () => {
      const s = sceneRef.current; if (!s) return
      s.rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      introT = Math.min(introT + delta * 0.38, 1)

      if (s.particlePhase === 'exploding') {
        s.particleT += delta * 0.6
        const pPos = pGeo.attributes.position.array as Float32Array
        const t    = Math.min(s.particleT, 1)
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const scale = 1 + ease * 0.5
          pPos[i*3]   *= scale; pPos[i*3+1] *= scale; pPos[i*3+2] *= scale
        }
        pGeo.attributes.position.needsUpdate = true
        if (s.particleT >= 1) { s.particlePhase = 'resolving'; s.particleT = 0 }

      } else if (s.particlePhase === 'resolving') {
        s.particleT += delta * 0.55
        const t    = Math.min(s.particleT, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        const pPos = pGeo.attributes.position.array as Float32Array
        ;(pMat as THREE.PointsMaterial).opacity = 1 - ease * 0.85
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const tgt = s.particleTargets[i]
          pPos[i*3]   += (tgt.x - pPos[i*3])   * ease * 0.08
          pPos[i*3+1] += (tgt.y - pPos[i*3+1]) * ease * 0.08
          pPos[i*3+2] += (tgt.z - pPos[i*3+2]) * ease * 0.08
        }
        pGeo.attributes.position.needsUpdate = true
        // ── fix: unused i removed ──
        cards.forEach((card) => {
          const mat = card.material as THREE.MeshBasicMaterial
          mat.opacity = Math.min(mat.opacity + delta * 0.6, ease)
        })
        if (s.particleT >= 1) {
          s.particlePhase = 'done'
          s.scene.remove(s.particleSystem!)
          cards.forEach((card) => { ;(card.material as THREE.MeshBasicMaterial).opacity = 1 })
          setPhase('done')
        }
      }

      s.helixAngle += (s.targetHelixAngle - s.helixAngle) * 0.06
      s.scene.children.forEach(obj => {
        if (obj !== s.particleSystem && obj.type !== 'AmbientLight' && obj.type !== 'DirectionalLight') {
          obj.rotation.y = s.helixAngle
        }
      })

      if (s.particlePhase === 'done') s.targetHelixAngle += delta * 0.08

      if (!s.isMobile && s.particlePhase === 'done') {
        camera.position.x += (s.mouse.x * 1.5 - camera.position.x) * 0.03
        camera.position.y += (s.mouse.y * 1.0 - camera.position.y) * 0.03
        camera.lookAt(0, 0, 0)
      }

      if (s.particlePhase !== 'done') {
        s.cards.forEach((card, i) => {
          const delay = i / N * 0.4
          const t     = Math.max(0, Math.min((introT - delay) / (1 - delay), 1))
          const ease  = 1 - Math.pow(1 - t, 3)
          const tgt   = card.userData.targetPos as THREE.Vector3
          card.position.lerp(tgt, ease * 0.05)
        })
      }

      if (s.particlePhase === 'done' && !s.isMobile) {
        s.raycaster.setFromCamera(s.mouse, camera)
        const hits = s.raycaster.intersectObjects(s.cards)
        const hit  = hits.length > 0 ? hits[0].object as THREE.Mesh : null
        if (hit !== s.hoveredCard) {
          if (s.hoveredCard) { s.hoveredCard.scale.setScalar(1); setHoveredId(null) }
          s.hoveredCard = hit
          if (hit) setHoveredId(hit.userData.photoId)
        }
        s.cards.forEach(card => {
          const targetS = card === s.hoveredCard ? 1.18 : 1
          card.scale.lerp(new THREE.Vector3(targetS, targetS, targetS), 0.12)
        })
        mount.style.cursor = hit ? 'pointer' : 'default'
      }

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = mount.clientWidth; const h = mount.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      const s = sceneRef.current; if (s) cancelAnimationFrame(s.rafId)
      window.removeEventListener('scroll',  onScroll)
      window.removeEventListener('resize',  onResize)
      mount.removeEventListener('mousemove', onMouseMove)
      mount.removeEventListener('click',     onClick)
      mount.removeEventListener('touchstart', onTouchStart)
      mount.removeEventListener('touchmove',  onTouchMove)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      sceneRef.current = null
    }
  }, [isMobile])

  const selectedPhoto = selected !== null ? photos.find(p => p.id === selected) : null

  const handleDownload = (photo: typeof photos[0]) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1920; canvas.height = 1080
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = photo.color; ctx.fillRect(0, 0, 1920, 1080)
    const grad = ctx.createRadialGradient(960, 540, 0, 960, 540, 700)
    grad.addColorStop(0, photo.accent + '30'); grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 1920, 1080)
    ctx.globalAlpha = 0.7; ctx.fillStyle = photo.accent
    ctx.font = 'bold 72px serif'; ctx.textAlign = 'center'; ctx.fillText(photo.title, 960, 500)
    ctx.globalAlpha = 0.35; ctx.fillStyle = '#e8e4d9'
    ctx.font = '28px sans-serif'; ctx.fillText('Shot by Shivish · shivish.in', 960, 590)
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `shivish-${photo.title.toLowerCase().replace(/ /g, '-')}.png`
    a.click()
  }

  return (
    <div style={{ background: '#07100d', minHeight: '100vh', fontFamily: "'DM Sans',sans-serif" }}>
      <Nav />
      <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 1, background: '#07100d' }} />
      <div style={{ height: '400vh', position: 'relative', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: isMobile ? '80px 20px 32px' : '88px 48px 40px' }}>
        <div>
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.3)', marginBottom: 10 }}>
            Gallery · Photography & Editing
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(28px,4vw,54px)', fontWeight: 400, color: '#e8e4d9', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Browse <em style={{ color: 'rgba(232,228,217,0.25)' }}>the shots.</em>
          </motion.h1>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase === 'done' ? 1 : 0 }} transition={{ duration: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(232,228,217,0.22)', textTransform: 'uppercase', textAlign: 'center' }}>
            {isMobile ? 'Drag to rotate · Tap a card' : 'Scroll to rotate · Click a card · Mouse to parallax'}
          </p>
          <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom,rgba(74,222,128,0.4),transparent)', animation: 'scrollPulse 1.5s ease infinite' }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {hoveredId !== null && phase === 'done' && (() => {
          const p = photos.find(ph => ph.id === hoveredId)!
          return (
            <motion.div key={hoveredId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}
              style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 20, pointerEvents: 'none', textAlign: 'center', background: 'rgba(7,16,13,0.7)', backdropFilter: 'blur(12px)', border: `0.5px solid ${p.accent}40`, borderRadius: 9999, padding: '8px 24px' }}>
              <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: 15, color: '#e8e4d9', fontStyle: 'italic' }}>{p.title}</span>
              <span style={{ fontSize: 10, color: 'rgba(232,228,217,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: 12 }}>{p.category}</span>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#07100d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, pointerEvents: 'none' }}>
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,228,217,0.25)' }}>Assembling helix</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(28px)', padding: isMobile ? 16 : 0 }}
            onClick={() => setSelected(null)}>
            <button style={{ position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(232,228,217,0.08)', border: '0.5px solid rgba(232,228,217,0.15)', color: '#e8e4d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              onClick={() => setSelected(null)}><X size={16} /></button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: isMobile ? '100%' : '65vw', maxWidth: 860, aspectRatio: '4/3', borderRadius: isMobile ? 16 : 22, background: selectedPhoto.color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, position: 'relative', border: '0.5px solid rgba(232,228,217,0.1)' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', background: `radial-gradient(circle at center, ${selectedPhoto.accent}20, transparent 65%)` }} />
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: selectedPhoto.accent, opacity: 0.45 }} />
              <p style={{ fontFamily: serif, fontSize: isMobile ? 28 : 38, color: 'rgba(232,228,217,0.85)', fontStyle: 'italic', letterSpacing: '-0.02em', margin: 0 }}>{selectedPhoto.title}</p>
              <p style={{ fontSize: 11, color: 'rgba(232,228,217,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>{selectedPhoto.category}</p>
              <button onClick={() => handleDownload(selectedPhoto)}
                style={{ marginTop: 8, borderRadius: 9999, padding: '12px 28px', background: '#e8e4d9', color: '#07100d', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Download size={14} /> Download Wallpaper
              </button>
            </motion.div>
            {!isMobile && ['prev', 'next'].map(dir => (
              <button key={dir}
                style={{ position: 'absolute', [dir === 'prev' ? 'left' : 'right']: 24, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(232,228,217,0.08)', border: '0.5px solid rgba(232,228,217,0.15)', color: '#e8e4d9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={e => { e.stopPropagation(); const idx = photos.findIndex(p => p.id === selected); setSelected(photos[(idx + (dir === 'next' ? 1 : -1) + photos.length) % photos.length].id) }}>
                {dir === 'prev' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes scrollPulse { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }
      `}</style>
    </div>
  )
}