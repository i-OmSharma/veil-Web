import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingPopup from '../components/FloatingPopup'

const validEmail = (e) => e.includes('@') && e.trim().length > 0

export default function Home() {
  const [nlEmail, setNlEmail] = useState('')
  const [nlChecked, setNlChecked] = useState(false)

  return (
    <>
      <Header />

      <main className="h-screen flex items-center justify-center relative z-0">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2">
              veil<span className="text-red-600">.</span> {/* UPDATED: goBox → veil */}
            </h1>
          </div>
          <p className="text-gray-600 text-lg md:text-xl font-normal tracking-wide mt-4 max-w-md">
            Isolation, simplification, native Containers.
          </p>
          <div className="mt-12">
            <button
              type="button"
              aria-label="Download veil for Linux" // UPDATED: Download goBox → Download veil
              className="group flex items-center space-x-4 focus:outline-none"
              onClick={() => {
                const p = navigator.platform
                const os = p.includes('Mac') ? 'mac' : p.includes('Win') ? 'windows' : 'linux'
                console.log('download_clicked', os)
                window.location.href = `/download?os=${os}`
              }}
            >
              <span className="font-bold tracking-wide uppercase text-[#2d2d2d] border-b-2 border-[#2d2d2d] pb-1 group-hover:text-red-600 group-hover:border-red-600 transition-colors duration-300 text-sm">
                Download Linux
              </span>
              <div className="w-12 h-12 bg-red-600 border border-red-600 rounded-full flex items-center justify-center group-hover:bg-[#2d2d2d] group-hover:border-[#2d2d2d] transition-all duration-300">
                <svg className="w-5 h-5 text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-gray-300 text-xs font-bold tracking-wide uppercase">Scroll</span>
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </main>

      <section className="w-full max-w-4xl mx-auto px-6 py-20">
        {/* UPDATED: What is Gobox → What is Veil */}
        <h2 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-6">What is Veil</h2>
        <p className="text-2xl font-black tracking-tight text-[#2d2d2d] leading-snug max-w-xl">
          A lightweight container runtime built on Linux primitives.
        </p>
        <p className="text-gray-600 text-lg mt-3 max-w-sm">
          No daemons, no overhead — just namespaces, cgroups, and a filesystem.
        </p>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 py-20 border-t border-gray-100">
        <h2 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-6">How it Works</h2>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">01</span>
            <div>
              <h3 className="font-bold text-lg tracking-wide">Namespaces</h3>
              <p className="text-gray-600 text-base mt-1 max-w-sm">Isolates PID, network, mount, and UTS per container using Linux kernel namespaces.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">02</span>
            <div>
              <h3 className="font-bold text-lg tracking-wide">Cgroups</h3>
              <p className="text-gray-600 text-base mt-1 max-w-sm">Limits CPU and memory per process group — no runaway containers.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">03</span>
            <div>
              <h3 className="font-bold text-lg tracking-wide">Filesystem</h3>
              <p className="text-gray-600 text-base mt-1 max-w-sm">Uses <code className="bg-[#f4f4f4] px-2 py-0.5 text-sm font-mono">pivot_root</code> to give each container its own root filesystem.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 py-20 border-t border-gray-100">
        <h2 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-6">CLI Example</h2>
        <div className="bg-[#2d2d2d] rounded-xl px-6 py-5 inline-block border border-[#1a1a1a]">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
          </div>
          <pre className="text-base font-mono text-gray-300 leading-relaxed">
            <span className="text-gray-500">$ </span>
            <span className="text-white">veil pull ubuntu:22.04</span>{/* UPDATED: sudo gobox → veil */}
            {'\n'}
            <span className="text-gray-500">→ pulling ubuntu:22.04 from registry</span>
            {'\n'}
            <span className="text-gray-500">→ unpacking 3 layers</span>
            {'\n'}
            <span className="text-green-400">✓ image ready</span>
            {'\n'}
            {'\n'}
            <span className="text-gray-500">$ </span>
            <span className="text-white">veil run ubuntu:22.04 /bin/bash</span>{/* UPDATED: sudo gobox → veil */}
            {'\n'}
            <span className="text-gray-500">→ creating namespaces</span>
            {'\n'}
            <span className="text-gray-500">→ mounting overlayfs</span>
            {'\n'}
            <span className="text-gray-500">→ applying cgroup limits (256MB / 50% cpu)</span>
            {'\n'}
            <span className="text-green-400">✓ container ready  [veil-4821]</span>{/* UPDATED: gobox-4821 → veil-4821 */}
            {'\n'}
            {'\n'}
            {'root@veil-4821:/# '}{/* UPDATED: gobox-4821 → veil-4821 */}
          </pre>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 py-20 border-t border-gray-100">
        {/* UPDATED: Why Gobox → Why Veil */}
        <h2 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-6">Why Veil</h2>
        <ul className="space-y-4">
          {[
            'Single binary — drop it in PATH and run.',
            'No daemon required. No background services.',
            'Native Linux syscalls only. Zero runtime deps.',
            'Fast cold start. Containers spin up in milliseconds.',
          ].map((point, i) => (
            <li key={i} className="flex items-start space-x-3">
              <span className="text-red-600 font-black mt-0.5">—</span>
              <span className="text-[#2d2d2d] text-base max-w-sm">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 py-20 border-t border-gray-100">
        <h2 className="text-2xl font-black tracking-tight text-[#2d2d2d]">
          Stay updated with veil<span className="text-red-600">.</span> {/* UPDATED: Gobox → veil */}
        </h2>
        <p className="text-gray-600 text-base mt-2">Get updates and releases</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-8">
          <input
            type="email"
            aria-label="Email address"
            placeholder="your@email.com"
            value={nlEmail}
            onChange={(e) => setNlEmail(e.target.value)}
            className="border border-gray-300 px-3 py-2.5 text-base font-mono text-[#2d2d2d] placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors bg-white w-full sm:w-64"
          />
          <button
            type="button"
            disabled={!validEmail(nlEmail) || !nlChecked}
            className="text-base font-bold tracking-wide uppercase text-[#2d2d2d] border-b-2 border-[#2d2d2d] pb-1 hover:text-red-600 hover:border-red-600 transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#2d2d2d] disabled:hover:border-[#2d2d2d]"
            onClick={() => {
              console.log('newsletter subscribe:', nlEmail)
              alert('Subscribed! You will receive Veil updates.')
            }}
          >
            Subscribe
          </button>
        </div>
        <label className="flex items-center space-x-2 mt-4 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={nlChecked}
            onChange={(e) => setNlChecked(e.target.checked)}
            className="accent-red-600 w-3.5 h-3.5"
          />
          <span className="text-gray-500 text-sm">I agree to receive updates</span>
        </label>
      </section>

      <Footer />
      <FloatingPopup />
    </>
  )
}
