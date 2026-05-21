import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

function AnimatedChar({ char, progress, start, end }: { char: string; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  return <motion.span style={{ opacity, display: 'inline' }}>{char === ' ' ? '\u00A0' : char}</motion.span>
}

function AnimatedText({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.15'] })
  return (
    <p ref={ref} style={style}>
      {text.split('').map((char, i) => {
        const start = i / text.length
        const end = Math.min(start + 0.05, 1)
        return <AnimatedChar key={i} char={char} progress={scrollYProgress} start={start} end={end} />
      })}
    </p>
  )
}

function WordPullUp({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <span ref={ref} style={{ display: 'block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
          <motion.span style={{ display: 'inline-block', ...style }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function About() {
  const serif = "'Instrument Serif', serif"
  const skills = ['HTML & CSS', 'JavaScript', 'TypeScript', 'React', 'Git & GitHub', 'Vercel', 'GSAP', 'Framer Motion']

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'160px 48px 120px'}}>
      <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:80}}>
        <div>
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
            style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:32}}>About</motion.p>
          <h1 style={{fontFamily:serif,fontSize:'clamp(48px,6vw,80px)',fontWeight:400,lineHeight:0.95,letterSpacing:'-0.03em',marginBottom:48}}>
            <WordPullUp text="Who's" delay={0}/>
            <WordPullUp text="Shivish?" delay={0.1} style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}/>
          </h1>
          <AnimatedText
            text="19 year old BTech student from Chandigarh. I code for the vibe of it — started building websites to upskill, ended up actually loving the craft. When I'm not coding, I'm editing videos, shooting photos, or going down AI rabbit holes. Always building something."
            style={{fontSize:15,color:'rgba(232,228,217,0.55)',lineHeight:1.85,fontWeight:300}}
          />
        </div>
        <div style={{paddingTop:80}}>
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}}
            style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:32}}>Skills</motion.p>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            {skills.map((s,i)=>(
              <motion.div key={s} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*0.07+0.3,duration:0.6}}
                style={{padding:'16px 0',borderBottom:'0.5px solid rgba(232,228,217,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontSize:14,color:'rgba(232,228,217,0.55)',fontWeight:300}}>{s}</span>
                <span style={{fontSize:11,color:'rgba(232,228,217,0.2)',letterSpacing:'0.1em'}}>—</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div style={{marginTop:100}}>
        <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:48}}>What I do</motion.p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:0}}>
          {[
            {num:'01',title:'Code',desc:'Building websites and web apps. React, TypeScript, Tailwind. Learning in public.'},
            {num:'02',title:'Edit',desc:'Motion graphics and video editing. Visual storytelling through cuts and effects.'},
            {num:'03',title:'Shoot',desc:'Photography — street, portrait, aesthetic. Capturing moments that matter.'},
            {num:'04',title:'AI',desc:'BTech student exploring AI, machine learning, and what comes next.'},
          ].map((item,i)=>(
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:0.8}}
              style={{padding:'32px 0',borderBottom:'0.5px solid rgba(232,228,217,0.07)',paddingRight:40}}>
              <span style={{fontFamily:serif,fontStyle:'italic',fontSize:12,color:'rgba(232,228,217,0.2)',display:'block',marginBottom:12}}>{item.num}</span>
              <h3 style={{fontFamily:serif,fontSize:28,fontWeight:400,color:'#e8e4d9',marginBottom:10}}>{item.title}</h3>
              <p style={{fontSize:13,color:'rgba(232,228,217,0.4)',lineHeight:1.65,fontWeight:300}}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}