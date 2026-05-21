import { motion } from 'framer-motion'

function WordPullUp({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'block' }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.3em' }}>
          <motion.span style={{ display: 'inline-block', ...style }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Contact() {
  const serif = "'Instrument Serif', serif"

  return (
    <div style={{maxWidth:1100,margin:'0 auto',padding:'160px 48px 120px'}}>
      <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
        style={{fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(232,228,217,0.3)',marginBottom:60}}>Contact</motion.p>

      <h1 style={{fontFamily:serif,fontSize:'clamp(60px,10vw,140px)',fontWeight:400,lineHeight:0.9,letterSpacing:'-0.04em',marginBottom:80}}>
        <WordPullUp text="Let's make" delay={0}/>
        <WordPullUp text="something" delay={0.1} style={{color:'rgba(232,228,217,0.22)',fontStyle:'italic'}}/>
        <WordPullUp text="together." delay={0.2}/>
      </h1>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6,duration:0.8}}
        style={{display:'flex',gap:40,alignItems:'center',flexWrap:'wrap',marginBottom:80}}>
        <a href="mailto:hello@shivish.in" style={{fontFamily:serif,fontStyle:'italic',fontSize:'clamp(18px,3vw,32px)',color:'rgba(232,228,217,0.4)',textDecoration:'none',transition:'color 0.3s'}}
          onMouseEnter={e=>{e.currentTarget.style.color='#e8e4d9'}} onMouseLeave={e=>{e.currentTarget.style.color='rgba(232,228,217,0.4)'}}>
          hello@shivish.in
        </a>
        <a href="https://github.com/shiiiviiish" target="_blank" style={{fontSize:13,color:'rgba(232,228,217,0.35)',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase',transition:'color 0.2s'}}
          onMouseEnter={e=>{e.currentTarget.style.color='#e8e4d9'}} onMouseLeave={e=>{e.currentTarget.style.color='rgba(232,228,217,0.35)'}}>
          GitHub ↗
        </a>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8,duration:0.8}}
        style={{borderTop:'0.5px solid rgba(232,228,217,0.06)',paddingTop:48}}>
        <p style={{fontSize:13,color:'rgba(232,228,217,0.25)',lineHeight:1.7,maxWidth:400}}>
          Open to freelance projects, collaborations, and interesting ideas. Based in Chandigarh, working remotely.
        </p>
      </motion.div>
    </div>
  )
}