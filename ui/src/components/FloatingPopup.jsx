import { useState, useEffect } from 'react'

const validEmail = (e) => e.includes('@') && e.trim().length > 0

export default function FloatingPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupEmail, setPopupEmail] = useState('')
  const [checked, setChecked] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('veil_popup_dismissed') === 'true') return

    let triggered = false
    const trigger = () => {
      if (triggered) return
      triggered = true
      setShowPopup(true)
    }

    const timer = setTimeout(trigger, 6000)

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrolled >= 0.4) trigger()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const dismissPopup = () => {
    setShowPopup(false)
    localStorage.setItem('veil_popup_dismissed', 'true')
  }

  if (!showPopup) return null

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-72 z-50 bg-white border border-gray-200 shadow-sm p-6">
      <button
        type="button"
        aria-label="Close popup"
        className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 leading-none focus:outline-none"
        onClick={dismissPopup}
      >
        ×
      </button>
      <p className="font-black text-sm tracking-tight text-[#2d2d2d] mb-1.5 pr-6">
        Stay updated with Veil<span className="text-red-600">.</span>
      </p>
      <p className="text-gray-600 text-xs leading-relaxed mb-4">Get product updates and new releases directly in your inbox.</p>
      {status === 'success' ? (
        <p className="text-green-600 text-sm font-bold py-2">Subscribed!</p>
      ) : (
        <>
          <input
            id="popup-email"
            name="popup-email"
            type="email"
            aria-label="Email address"
            placeholder="Enter your email"
            value={popupEmail}
            onChange={(e) => setPopupEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2.5 text-sm font-mono text-[#2d2d2d] placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors bg-white mb-3"
          />
          <label className="flex items-center space-x-2 mb-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="accent-red-600 w-3.5 h-3.5"
            />
            <span className="text-gray-500 text-xs">I agree to receive updates</span>
          </label>
          {status === 'error' && <p className="text-red-600 text-xs font-bold mb-2">Failed. Try again.</p>}
          <button
            type="button"
            disabled={!validEmail(popupEmail) || !checked}
            className="w-full bg-black text-white text-xs font-bold tracking-wide uppercase py-2.5 hover:bg-[#2d2d2d] transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={async () => {
              try {
                const BASE_URL = import.meta.env.VITE_API_URL || ""
                const res = await fetch(`${BASE_URL}/api/feedback`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: popupEmail, message: '' }),
                })
                if (!res.ok) throw new Error()
                setStatus('success')
                setTimeout(dismissPopup, 1500)
              } catch {
                setStatus('error')
              }
            }}
          >
            Subscribe
          </button>
        </>
      )}
    </div>
  )
}
