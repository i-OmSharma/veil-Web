import Header from '../components/Header'
import Footer from '../components/Footer'

const releases = [
  {
    version: 'v0.1.0',
    date: 'May 2025',
    tag: 'latest',
    description: 'Initial release — namespaces, cgroups v2, OverlayFS, OCI image pull/push, veth networking, port forwarding, volume mounts.',
    assets: [
      {
        os: 'Linux (x86_64)',
        file: 'veil-linux-amd64',
        available: true,
        url: 'https://github.com/i-OmSharma/veil/releases/latest/download/veil-linux-amd64'
      },
      { os: 'macOS (arm64)', file: 'veil-darwin-arm64', available: false },
      { os: 'Windows (x86_64)', file: 'veil-windows-amd64.exe', available: false },
    ],
  },
]

const toOsQuery = (osName) => {
  if (osName.toLowerCase().includes('windows')) return 'windows'
  if (osName.toLowerCase().includes('mac')) return 'mac'
  return 'linux'
}

export default function Releases() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 relative z-0">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2">
              Releases<span className="text-red-600">.</span>
            </h1>
          </div>

          <section className="w-full py-20 border-t border-gray-100 mt-12">
            <h2 className="text-xs font-bold tracking-wide uppercase text-gray-500 mb-6">All Versions</h2>
            <div className="space-y-10">
              {releases.map((release) => (
                <div key={release.version}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black tracking-tight text-[#2d2d2d]">{release.version}</h3>
                    <span className="text-xs font-bold tracking-wide uppercase text-gray-500">{release.date}</span>
                    <span className="text-xs font-bold tracking-wide uppercase text-red-600 border border-red-200 px-2 py-1">
                      {release.tag}
                    </span>
                  </div>
                  <p className="text-gray-600 text-base mt-3 max-w-2xl">{release.description}</p>

                  <div className="mt-6 space-y-3">
                    {release.assets.map((asset) => (
                      <div key={asset.file} className="border border-gray-100 px-4 py-3 flex justify-between items-center gap-4">
                        <div>
                          <p className="font-bold text-sm text-[#2d2d2d]">{asset.os}</p>
                          <code className="font-mono text-xs text-gray-500">{asset.file}</code>
                        </div>
                        {asset.available ? (
                          <button
                            type="button"
                            className="bg-black text-white text-xs font-bold tracking-wide uppercase px-4 py-2 hover:bg-[#2d2d2d] transition-colors duration-300"
                            onClick={() => { window.location.href = asset.url }}
                          >
                            Download
                          </button>
                        ) : (
                          <span className="text-gray-400 text-xs font-bold tracking-wide uppercase border border-gray-200 px-4 py-2">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
