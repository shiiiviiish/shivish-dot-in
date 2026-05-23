import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Clients from './pages/Clients'
import Vibes from './pages/Vibes'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<Gallery />} />
<Route path="/clients" element={<Clients />} />
<Route path="/vibes" element={<Vibes />} />
    </Routes>
  )
}