import Home from './pages/Home'
import Instruction from './pages/Instruction'
import About from './pages/About'
import Unsupported from './pages/Unsupported'

const path = window.location.pathname
const isHome = path === '/'
const isInstruction = path === '/instruction'
const isAbout = path === '/about'
const isUnsupported = path === '/unsupported'

export default function App() {
  return (
    <>
      {isHome && <Home />}
      {isInstruction && <Instruction />}
      {isAbout && <About />}
      {isUnsupported && <Unsupported />}
    </>
  )
}
