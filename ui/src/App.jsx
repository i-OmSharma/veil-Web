import Home from './pages/Home'
import Instruction from './pages/Instruction'
import About from './pages/About'

const path = window.location.pathname
const isHome = path === '/'
const isInstruction = path === '/instruction'
const isAbout = path === '/about'

export default function App() {
  return (
    <>
      {isHome && <Home />}
      {isInstruction && <Instruction />}
      {isAbout && <About />}
    </>
  )
}
