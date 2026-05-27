import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Clients from './pages/Clients'
import Vibes from './pages/Vibes'
import GuidedTour from './components/GuidedTour'

// Preload Spline scene as soon as app loads
// so by the time user reaches Contact, it's already cached
function SplinePreloader() {
  const location = useLocation()

  useEffect(() => {
    // Start preloading immediately on app mount
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'fetch'
    link.crossOrigin = 'anonymous'
    link.href = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'
    document.head.appendChild(link)
  }, [])

  useEffect(() => {
    // When user hovers near Contact or visits any page,
    // also kick off a background fetch to warm the cache
    if (location.pathname !== '/contact') {
      const timer = setTimeout(() => {
        fetch('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode', {
          method: 'GET',
          mode: 'cors',
          cache: 'force-cache',
        }).catch(() => {}) // silent fail — just warming cache
      }, 2000) // 2s after page load, start fetching in bg
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  return null
}

export default function App() {
  return (
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
  )
}