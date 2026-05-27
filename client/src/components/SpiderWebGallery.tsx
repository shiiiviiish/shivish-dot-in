import { useEffect, useRef, useState } from 'react'

const photos = [
  { id:1,  title:'Urban Fog',    category:'Photography', color:'#0d1f17', accent:'#4ade80', src:'/images/1.jpg' },
  { id:2,  title:'Night Lights', category:'Editing',     color:'#0f1525', accent:'#60a5fa', src:'/images/2.jpg' },
  { id:3,  title:'Golden Hour',  category:'Photography', color:'#1f150a', accent:'#fb923c', src:'/images/3.jpg' },
  { id:4,  title:'Motion Blur',  category:'Editing',     color:'#130a1f', accent:'#a78bfa', src:'/images/4.jpg' },
  { id:5,  title:'Chandigarh',   category:'Photography', color:'#0a1f12', accent:'#34d399', src:'/images/5.jpg' },
  { id:6,  title:'Street Life',  category:'Photography', color:'#1f100a', accent:'#f59e0b', src:'/images/6.jpg' },
  { id:7,  title:'Abstract',     category:'Editing',     color:'#1f0a12', accent:'#f472b6', src:'/images/7.jpg' },
  { id:8,  title:'Architecture', category:'Photography', color:'#12121f', accent:'#818cf8', src:'/images/8.jpg' },
  { id:9,  title:'Portrait',     category:'Photography', color:'#1f1212', accent:'#f87171', src:'/images/9.jpg' },
  { id:10, title:'Fog & Light',  category:'Photography', color:'#0d1a1f', accent:'#67e8f9', src:'/images/10.jpg' },
  { id:11, title:'Dusk',         category:'Editing',     color:'#1a1218', accent:'#e879f9', src:'/images/11.jpg' },
  { id:12, title:'Macro',        category:'Photography', color:'#0f1f10', accent:'#86efac', src:'/images/12.jpg' },
]

interface Node {
  x:number; y:number
  baseX:number; baseY:number
  r:number; main:boolean
  phase:number; speed:number
  photoIdx:number
}
interface Edge { a:number; b:number }

export default function SpiderWebGallery() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef     = useRef<{nodes:Node[];edges:Edge[];activeNode:number|null;mouse:{x:number;y:number};rafId:number}|null>(null)
  const [activeNode, setActiveNode] = useState<number|null>(null)
  const [cardPos,    setCardPos]    = useState<{x:number;y:number}|null>(null)
  const [canvasSize, setCanvasSize] = useState({w:800, h:500})

  const buildWeb = (W:number, H:number) => {
    const cx=W/2, cy=H/2
    const nodes:Node[] = []
    let pi = 0 // photo index

    const mkNode=(x:number,y:number,r:number,main=false):Node=>({
      x,y,baseX:x,baseY:y,r,main,
      phase:Math.random()*Math.PI*2,
      speed:0.3+Math.random()*0.5,
      photoIdx: pi++ % photos.length,
    })

    nodes.push(mkNode(cx,cy,9,true))
    for(let i=0;i<5;i++){const a=(i/5)*Math.PI*2-Math.PI/2;nodes.push(mkNode(cx+Math.cos(a)*115,cy+Math.sin(a)*90,6))}
    for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/6;nodes.push(mkNode(cx+Math.cos(a)*215,cy+Math.sin(a)*170,5))}
    const outerA=[0.2,0.7,1.1,1.6,2.0,2.5,2.9,3.4,3.9,4.3,4.8,5.3]
    outerA.forEach(a=>{
      const rx=Math.min(W*0.41,285), ry=Math.min(H*0.41,215)
      nodes.push(mkNode(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,4))
    })

    const edges:Edge[]=[]
    const addE=(a:number,b:number)=>{if(a<nodes.length&&b<nodes.length)edges.push({a,b})}
    for(let i=1;i<=5;i++) addE(0,i)
    addE(1,6);addE(1,7);addE(2,7);addE(2,8);addE(3,8);addE(3,9);addE(4,9);addE(4,10);addE(5,10);addE(5,6)
    for(let i=1;i<5;i++) addE(i,i+1); addE(5,1)
    for(let i=6;i<13;i++) addE(i,i+1); addE(13,6)
    for(let i=6;i<=13;i++) addE(i,i+8)
    for(let i=14;i<nodes.length-1;i++) addE(i,i+1)
    if(nodes.length>14) addE(nodes.length-1,14)
    addE(6,8);addE(8,10);addE(10,12);addE(7,11);addE(9,13)
    return {nodes,edges}
  }

  useEffect(()=>{
    const obs=new ResizeObserver(entries=>{
      const w=Math.floor(entries[0].contentRect.width)
      if(w>0) setCanvasSize({w, h:Math.min(540,Math.floor(w*0.62))})
    })
    if(containerRef.current) obs.observe(containerRef.current)
    return ()=>obs.disconnect()
  },[])

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const ctx=canvas.getContext('2d')!
    const {w:W,h:H}=canvasSize
    const {nodes,edges}=buildWeb(W,H)
    stateRef.current={nodes,edges,activeNode:null,mouse:{x:W/2,y:H/2},rafId:0}
    const s=stateRef.current

    const onMouseMove=(e:MouseEvent)=>{
      const r=canvas.getBoundingClientRect()
      s.mouse.x=(e.clientX-r.left)*(W/r.width)
      s.mouse.y=(e.clientY-r.top)*(H/r.height)
    }
    canvas.addEventListener('mousemove',onMouseMove)

    let lastT=0
    const loop=(t:number)=>{
      lastT=t
      ctx.clearRect(0,0,W,H)

      s.nodes.forEach(n=>{
        const e=t*0.001
        const tx=n.baseX+Math.sin(e*n.speed+n.phase)*16
        const ty=n.baseY+Math.cos(e*n.speed*0.7+n.phase+1)*11
        const dx=n.x-s.mouse.x, dy=n.y-s.mouse.y
        const dist=Math.sqrt(dx*dx+dy*dy)
        let rx=0,ry=0
        if(dist<85&&dist>0){const f=(85-dist)/85*14;rx=dx/dist*f;ry=dy/dist*f}
        n.x+=(tx+rx-n.x)*0.06
        n.y+=(ty+ry-n.y)*0.06
      })

      // Lines — white/grey
      s.edges.forEach(({a,b})=>{
        const na=s.nodes[a],nb=s.nodes[b]
        const dist=Math.sqrt((nb.x-na.x)**2+(nb.y-na.y)**2)
        const isActive=s.activeNode!==null&&(a===s.activeNode||b===s.activeNode)
        const alpha=isActive?0.5+0.2*Math.sin(t*0.004):Math.max(0.04,0.16-dist/2600)
        ctx.beginPath(); ctx.moveTo(na.x,na.y); ctx.lineTo(nb.x,nb.y)
        ctx.strokeStyle=isActive?`rgba(74,222,128,${alpha})`:`rgba(210,220,215,${alpha})`
        ctx.lineWidth=isActive?1.1:0.5
        ctx.stroke()
      })

      // Dots — green
      s.nodes.forEach((n,i)=>{
        const isActive=i===s.activeNode
        const pulse=1+0.22*Math.sin(t*0.004+n.phase)
        // Glow
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*5)
        g.addColorStop(0,isActive?'rgba(74,222,128,0.5)':'rgba(74,222,128,0.12)')
        g.addColorStop(1,'rgba(0,0,0,0)')
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*5,0,Math.PI*2)
        ctx.fillStyle=g; ctx.fill()
        // Dot
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*(isActive?1.5:pulse),0,Math.PI*2)
        ctx.fillStyle=isActive?'#4ade80':'rgba(74,222,128,0.85)'
        ctx.fill()
        if(n.main){
          ctx.beginPath(); ctx.arc(n.x,n.y,n.r+5+1.5*Math.sin(t*0.003),0,Math.PI*2)
          ctx.strokeStyle='rgba(74,222,128,0.2)'; ctx.lineWidth=1; ctx.stroke()
        }
      })

      s.rafId=requestAnimationFrame(loop)
    }
    s.rafId=requestAnimationFrame(loop)
    return ()=>{
      if(s.rafId) cancelAnimationFrame(s.rafId)
      canvas.removeEventListener('mousemove',onMouseMove)
      stateRef.current=null
    }
  },[canvasSize])

  const handleClick=(e:React.MouseEvent<HTMLCanvasElement>)=>{
    const canvas=canvasRef.current; if(!canvas||!stateRef.current) return
    const s=stateRef.current
    const rect=canvas.getBoundingClientRect()
    const {w:W}=canvasSize
    const mx=(e.clientX-rect.left)*(W/rect.width)
    const my=(e.clientY-rect.top)*(W/rect.width)
    let hit=-1
    s.nodes.forEach((n,i)=>{
      if(Math.sqrt((mx-n.x)**2+(my-n.y)**2)<n.r+14) hit=i
    })
    if(hit>=0){
      const same=hit===s.activeNode
      s.activeNode=same?null:hit
      setActiveNode(same?null:hit)
      if(!same){
        const scaleX=containerRef.current?containerRef.current.offsetWidth/W:1
        setCardPos({x:s.nodes[hit].x*scaleX, y:s.nodes[hit].y*scaleX})
      } else {
        setCardPos(null)
      }
    } else {
      s.activeNode=null; setActiveNode(null); setCardPos(null)
    }
  }

  const activePhoto = activeNode!==null ? photos[stateRef.current?.nodes[activeNode]?.photoIdx??0] : null

  return (
    <div ref={containerRef} style={{position:'relative',width:'100%',background:'#07100d',borderRadius:20,overflow:'hidden',userSelect:'none'}}>
      <canvas
        ref={canvasRef}
        width={canvasSize.w} height={canvasSize.h}
        onClick={handleClick}
        style={{display:'block',width:'100%',height:canvasSize.h,cursor:'crosshair'}}
      />

      {/* Single photo card */}
      {activePhoto && cardPos && (
        <div style={{
          position:'absolute', left:cardPos.x, top:cardPos.y,
          transform:'translate(-50%, -130%)',
          zIndex:20, pointerEvents:'none',
          animation:'cardPop 0.4s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* Connector line */}
          <div style={{position:'absolute',bottom:-20,left:'50%',transform:'translateX(-50%)',width:1,height:20,background:`linear-gradient(to bottom,${activePhoto.accent}60,transparent)`}}/>
          {/* Card */}
          <div style={{
            width:120, padding:'12px 14px',
            background:activePhoto.color,
            border:`1px solid ${activePhoto.accent}60`,
            borderRadius:12,
            display:'flex',flexDirection:'column',alignItems:'center',gap:8,
            boxShadow:`0 8px 32px rgba(0,0,0,0.6), 0 0 24px ${activePhoto.accent}25`,
          }}>
            {/* Placeholder image area */}
            <div style={{width:'100%',height:70,borderRadius:8,background:`linear-gradient(135deg,${activePhoto.color},${activePhoto.accent}30)`,display:'flex',alignItems:'center',justifyContent:'center',border:`0.5px solid ${activePhoto.accent}30`}}>
              <div style={{width:18,height:18,borderRadius:'50%',background:activePhoto.accent,opacity:0.7}}/>
            </div>
            <p style={{fontFamily:"'Instrument Serif',serif",fontStyle:'italic',fontSize:11,color:'rgba(232,228,217,0.9)',margin:0,textAlign:'center'}}>{activePhoto.title}</p>
            <p style={{fontSize:8,color:'rgba(232,228,217,0.35)',margin:0,letterSpacing:'0.1em',textTransform:'uppercase'}}>{activePhoto.category}</p>
          </div>
        </div>
      )}

      <div style={{position:'absolute',bottom:14,left:'50%',transform:'translateX(-50%)',fontFamily:"'DM Mono',monospace",fontSize:9,color:'rgba(74,222,128,0.3)',letterSpacing:'0.16em',textTransform:'uppercase',pointerEvents:'none',whiteSpace:'nowrap'}}>
        Click any dot · Move to push web
      </div>

      <style>{`
        @keyframes cardPop {
          from { transform: translate(-50%,-110%) scale(0.7); opacity:0; }
          to   { transform: translate(-50%,-130%) scale(1);   opacity:1; }
        }
      `}</style>
    </div>
  )
}