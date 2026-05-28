import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Clients from './pages/Clients'
import Vibes from './pages/Vibes'
import GuidedTour from './components/GuidedTour'
import SplashScreen from './components/SplashScreen'


function shouldShowSplash(): boolean {
  try {
    return !sessionStorage.getItem('splash-seen')

  } catch {
    return true
  }
}

function SplinePreloader() {
  const location = useLocation()
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.setAttribute('as', 'fetch')
    link.crossOrigin = 'anonymous'
    link.href = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
    document.head.appendChild(link)
  }, [])
  useEffect(() => {
    if (location.pathname !== '/contact') {
      const timer = setTimeout(() => {
        fetch('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode', {
          method: 'GET', mode: 'cors', cache: 'force-cache',
        }).catch(() => {})
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])
  return null
}

export default function App() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash)

  const handleEnter = () => {
    try { sessionStorage.setItem('splash-seen', '1') } catch {}
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && (
        <SplashScreen onEnter={handleEnter} />
      )}

      {!showSplash && (
        <>
          <SplinePreloader />
          <GuidedTour />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/vibes" element={<Vibes />} />
          </Routes>
        </>
      )}
    </>
  )
}