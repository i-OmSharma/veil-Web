export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="font-black text-lg tracking-tight text-[#2d2d2d]">veil<span className="text-red-600">.</span></span>
          <p className="text-gray-500 text-sm mt-1">support@veils.systems</p>
        </div>
        <div className="flex items-center space-x-6">
          <a href="https://github.com/i-OmSharma/veil" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#2d2d2d] text-sm font-bold tracking-wide uppercase transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/om-sharma-020b9a249/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#2d2d2d] text-sm font-bold tracking-wide uppercase transition-colors">LinkedIn</a>
        </div>
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Veil. All rights reserved.</p>
      </div>
    </footer>
  )
}
