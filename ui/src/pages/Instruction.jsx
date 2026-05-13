import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-md border border-gray-300 bg-[#ececec] text-gray-500 hover:text-[#2d2d2d] hover:bg-[#e1e1e1] transition-colors duration-150 focus:outline-none flex items-center justify-center"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      )}
    </button>
  )
}

export default function Instruction() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 relative z-0">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2">
              Instruction<span className="text-red-600">.</span>
            </h1>
          </div>
          <div className="mt-8 space-y-8">
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">01</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Download veil</h3>
                <div className="text-gray-600 text-base mt-2 max-w-lg space-y-2">
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">curl -Lo veil https://github.com/i-OmSharma/veil/releases/latest/download/veil-linux-amd64</code>
                    <CopyButton text="curl -Lo veil https://github.com/i-OmSharma/veil/releases/latest/download/veil-linux-amd64" />
                  </div>
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">chmod +x veil && sudo mv veil /usr/local/bin/</code>
                    <CopyButton text="chmod +x veil && sudo mv veil /usr/local/bin/" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">02</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Run your first container</h3>
                <div className="mt-2 max-w-lg">
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">sudo veil run ubuntu:22.04 /bin/bash</code>
                    <CopyButton text="sudo veil run ubuntu:22.04 /bin/bash" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">03</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Explore inside the container</h3>
                <p className="text-gray-600 text-base mt-2 max-w-lg">Inside your container: <code className="bg-[#f4f4f4] px-2 py-0.5 text-sm font-mono">echo $$</code> shows PID 1, <code className="bg-[#f4f4f4] px-2 py-0.5 text-sm font-mono">hostname</code> shows veil-XXXX. Full namespace isolation — your processes cannot see the host.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">04</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Pull any OCI image</h3>
                <div className="mt-2 max-w-lg space-y-2">
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">sudo veil pull alpine:3.19</code>
                    <CopyButton text="sudo veil pull alpine:3.19" />
                  </div>
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">sudo veil run alpine:3.19 /bin/sh</code>
                    <CopyButton text="sudo veil run alpine:3.19 /bin/sh" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">05</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">List running containers</h3>
                <div className="mt-2 max-w-lg">
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">sudo veil ps</code>
                    <CopyButton text="sudo veil ps" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">06</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Stop a container</h3>
                <div className="mt-2 max-w-lg">
                  <div className="relative">
                    <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 pr-14 block overflow-x-auto whitespace-nowrap">sudo veil stop &lt;container-id&gt;</code>
                    <CopyButton text="sudo veil stop <container-id>" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">07</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Requirements</h3>
                <p className="text-gray-600 text-base mt-2 max-w-lg">Linux kernel 5.14+ with cgroups v2 enabled, x86_64, sudo access.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
