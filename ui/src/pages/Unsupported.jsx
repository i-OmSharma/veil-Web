import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Unsupported() {
  const query = new URLSearchParams(window.location.search)
  const os = query.get('os')
  const osLabel = os === 'windows' ? 'Windows' : os === 'mac' ? 'macOS' : 'This'

  return (
    <>
      <Header />
      <main className="h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2 text-[#2d2d2d]">
            {osLabel} version coming soon<span className="text-red-600">.</span>
          </h1>
          <p className="text-gray-600 text-lg mt-4 max-w-xl">
            Veil is currently Linux-only. {osLabel} support is on the roadmap.
          </p>
          <p className="text-gray-600 text-base mt-3 max-w-xl">
            You can still download the Linux binary and run it in a VM or WSL.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => {
                window.location.href = '/download?os=linux'
              }}
              className="bg-black text-white text-sm font-bold tracking-wide uppercase px-6 py-3 hover:bg-[#2d2d2d] transition-colors duration-300"
            >
              Download Linux version anyway
            </button>
            <Link
              to="/"
              className="font-bold tracking-wide uppercase text-[#2d2d2d] border-b-2 border-[#2d2d2d] pb-1 hover:text-red-600 hover:border-red-600 transition-colors duration-300 text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
