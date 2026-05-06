import Header from '../components/Header'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6">
          <h1 className="text-9xl font-black tracking-tighter leading-none mb-2 text-[#2d2d2d]">
            404<span className="text-red-600">.</span>
          </h1>
          <p className="text-[#2d2d2d] text-2xl font-black tracking-tight mt-4">
            Page not found.
          </p>
          <p className="text-gray-600 text-base mt-3 max-w-xl">
            This URL doesn&apos;t exist. Maybe you&apos;re looking for something that&apos;s coming soon.
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
