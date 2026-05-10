import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Instruction from './pages/Instruction'
import About from './pages/About'
import Unsupported from './pages/Unsupported'
import Releases from './pages/Releases'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/about" element={<About />} />
        <Route path="/unsupported" element={<Unsupported />} />
        <Route path="/os-warning" element={<Unsupported />} />
        <Route path="/releases" element={<Releases />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
