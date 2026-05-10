import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isHome = pathname === '/'
  const isInstruction = pathname === '/instruction'
  const isAbout = pathname === '/about'
  const isReleases = pathname === '/releases'

  const navClass = (active) =>
    active
      ? 'text-black transition-colors flex flex-col items-center'
      : 'hover:text-black transition-colors'

  const menuItemClass = (active) =>
    `w-full text-left px-5 py-3 text-sm font-bold tracking-wide uppercase transition-colors ${
      active ? 'text-red-600 bg-gray-50' : 'text-gray-500 hover:text-black hover:bg-gray-50'
    }`

  const closeAndNavigate = (to) => {
    setMenuOpen(false)
    navigate(to)
  }

  return (
    <header className="absolute top-0 left-0 w-full py-8 flex justify-between items-center z-10">
      <div className="flex-1 max-w-4xl mx-auto px-6 flex items-center">
        <div className="flex items-center space-x-10">
          <button
            type="button"
            aria-label="Go to home"
            className="relative w-4 h-4 cursor-pointer focus:outline-none"
            onClick={() => navigate('/')}
          >
            <div className="absolute top-0 left-0 w-3 h-3 bg-red-600"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2d2d2d]"></div>
          </button>
          <nav className="hidden md:flex space-x-6 text-sm font-bold tracking-wide text-gray-500 uppercase">
            <Link className={navClass(isHome)} to="/">
              Home
              {isHome && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </Link>
            <Link className={navClass(isInstruction)} to="/instruction">
              Instruction
              {isInstruction && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </Link>
            <Link className={navClass(isReleases)} to="/releases">
              Releases
              {isReleases && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </Link>
            <Link className={navClass(isAbout)} to="/about">
              About
              {isAbout && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </Link>
          </nav>
        </div>
      </div>
      <div className="relative pr-6 shrink-0">
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="w-10 h-10 bg-[#2d2d2d] rounded-full flex flex-col justify-center items-center space-y-1 hover:bg-black transition-colors focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-4 h-0.5 bg-white block transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`}></span>
          <span className={`w-4 h-0.5 bg-white block transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`}></span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 py-1 overflow-hidden">
            <button type="button" className={menuItemClass(isHome)} onClick={() => closeAndNavigate('/')}>Home</button>
            <button type="button" className={menuItemClass(isInstruction)} onClick={() => closeAndNavigate('/instruction')}>Instruction</button>
            <button type="button" className={menuItemClass(isAbout)} onClick={() => closeAndNavigate('/about')}>About</button>
            <button type="button" className={menuItemClass(isReleases)} onClick={() => closeAndNavigate('/releases')}>Releases</button>
          </div>
        )}
      </div>
    </header>
  )
}
