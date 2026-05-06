import Home from './pages/Home'
import Instruction from './pages/Instruction'
import About from './pages/About'
import Unsupported from './pages/Unsupported'
import Releases from './pages/Releases'
import NotFound from './pages/NotFound'

const path = window.location.pathname
const isHome = path === '/'
const isInstruction = path === '/instruction'
const isAbout = path === '/about'
const isUnsupported = path === '/unsupported'
const isOsWarning = path === '/os-warning'
const isReleases = path === '/releases'
const isKnownPath = ['/', '/instruction', '/about', '/unsupported', '/os-warning', '/releases'].includes(path)

export default function App() {
  return (
    <>
      {isHome && <Home />}
      {isInstruction && <Instruction />}
      {isAbout && <About />}
      {isUnsupported && <Unsupported />}
      {isOsWarning && <Unsupported />}
      {isReleases && <Releases />}
      {!isKnownPath && <NotFound />}
    </>
  )
}
