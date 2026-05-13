import { createContext, useContext, useEffect, useRef, useState } from 'react'

const TerminalContext = createContext(false)

export function Terminal({ children }) {
  const terminalRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    if (!terminalRef.current || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(terminalRef.current)

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const restartTimer = setTimeout(() => {
      setCycleKey(k => k + 1)
    }, 10700)

    return () => clearTimeout(restartTimer)
  }, [isVisible, cycleKey])

  return (
    <div
      ref={terminalRef}
      className="bg-[#2d2d2d] rounded-xl border border-[#1a1a1a] w-full max-w-full h-[30rem] min-h-[30rem] max-h-[30rem] overflow-hidden"
    >
      <div className="flex items-center space-x-2 px-6 py-4">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <TerminalContext.Provider value={isVisible}>
        <div key={cycleKey} className="px-6 pb-5 font-mono text-base space-y-0.5 overflow-x-auto">
          {children}
        </div>
      </TerminalContext.Provider>
    </div>
  )
}

export function TypingAnimation({ children, delay = 0, speed = 60, className = '', active: activeProp }) {
  const contextActive = useContext(TerminalContext)
  const active = activeProp ?? contextActive
  const text = typeof children === 'string' ? children.trim() : String(children).trim()
  const [started, setStarted] = useState(false)
  const [displayedLength, setDisplayedLength] = useState(0)
  const [done, setDone] = useState(false)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [active, delay])

  useEffect(() => {
    if (!active || !started || done) return
    if (displayedLength >= text.length) {
      setDone(true)
      return
    }
    const t = setTimeout(() => setDisplayedLength(n => n + 1), speed)
    return () => clearTimeout(t)
  }, [active, started, displayedLength, text, speed, done])

  useEffect(() => {
    if (!active || done) return
    const t = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(t)
  }, [active, done])

  if (!active || !started) return null

  return (
    <div className={`text-white ${className}`}>
      {text.slice(0, displayedLength)}
      {!done && <span style={{ opacity: cursorOn ? 1 : 0 }}>▋</span>}
    </div>
  )
}

export function AnimatedSpan({ children, className = '', delay = 0, active: activeProp }) {
  const contextActive = useContext(TerminalContext)
  const active = activeProp ?? contextActive
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) return
    let revealTimer
    const t = setTimeout(() => {
      setShow(true)
      revealTimer = setTimeout(() => setVisible(true), 16)
    }, delay)
    return () => {
      clearTimeout(t)
      clearTimeout(revealTimer)
    }
  }, [active, delay])

  if (!active || !show) return null

  return (
    <div
      className={`transition-opacity duration-300 ${className}`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  )
}
