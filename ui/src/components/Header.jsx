import { useState } from 'react'

const path = window.location.pathname
const isHome = path === '/'
const isInstruction = path === '/instruction'
const isAbout = path === '/about'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navClass = (active) =>
    active
      ? 'text-black transition-colors flex flex-col items-center'
      : 'hover:text-black transition-colors'

  const menuItemClass = (active) =>
    `w-full text-left px-5 py-3 text-sm font-bold tracking-wide uppercase transition-colors ${
      active ? 'text-red-600 bg-gray-50' : 'text-gray-500 hover:text-black hover:bg-gray-50'
    }`

  return (
    <header className="absolute top-0 left-0 w-full py-8 flex justify-between items-center z-10">
      <div className="flex-1 max-w-4xl mx-auto px-6 flex items-center">
        <div className="flex items-center space-x-10">
          <button
            type="button"
            aria-label="Go to home"
            className="relative w-4 h-4 cursor-pointer focus:outline-none"
            onClick={() => { window.location.href = '/' }}
          >
            <div className="absolute top-0 left-0 w-3 h-3 bg-red-600"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2d2d2d]"></div>
          </button>
          <nav className="hidden md:flex space-x-6 text-sm font-bold tracking-wide text-gray-500 uppercase">
            <a className={navClass(isHome)} href="/">
              Home
              {isHome && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </a>
            <a className={navClass(isInstruction)} href="/instruction">
              Instruction
              {isInstruction && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </a>
            <a className={navClass(isAbout)} href="/about">
              About
              {isAbout && <span className="w-1 h-1 bg-black rounded-full mt-1"></span>}
            </a>
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
            <button type="button" className={menuItemClass(isHome)} onClick={() => { window.location.href = '/' }}>Home</button>
            <button type="button" className={menuItemClass(isInstruction)} onClick={() => { window.location.href = '/instruction' }}>Instruction</button>
            <button type="button" className={menuItemClass(isAbout)} onClick={() => { window.location.href = '/about' }}>About</button>
          </div>
        )}
      </div>
    </header>
  )
}
