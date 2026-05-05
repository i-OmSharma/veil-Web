import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Unsupported() {
  return (
    <>
      <Header />
      <main className="h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-black tracking-tighter text-[#2d2d2d]">
            Platform not supported<span className="text-red-600">.</span>
          </h1>
          <p className="text-gray-600 text-lg mt-4 max-w-md">
            This platform is not supported yet. Linux is the only supported platform.
          </p>
          <div className="mt-10">
            <a
              href="/"
              className="font-bold tracking-wide uppercase text-[#2d2d2d] border-b-2 border-[#2d2d2d] pb-1 hover:text-red-600 hover:border-red-600 transition-colors duration-300 text-sm"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
