import Header from '../components/Header'

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 relative z-0">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2">
              About<span className="text-red-600">.</span>
            </h1>
          </div>
          {/* UPDATED: description rewrite */}
          <p className="text-gray-600 text-lg md:text-xl font-normal tracking-wide mt-4 max-w-lg">
            veil is a daemonless, OCI-compliant container runtime written in Go — built from scratch on Linux primitives. No wrappers, no abstractions. Just syscalls.
          </p>

          {/* UPDATED: added 4th stat v2 / cgroups only */}
          <div className="mt-8 flex flex-wrap gap-12">
            <div>
              <span className="text-4xl font-black text-[#2d2d2d]">100<span className="text-red-600">%</span></span>
              <p className="text-gray-400 text-sm font-bold tracking-wide uppercase mt-1">Native Linux</p>
            </div>
            <div>
              <span className="text-4xl font-black text-[#2d2d2d]">&lt;8<span className="text-red-600">MB</span></span>
              <p className="text-gray-400 text-sm font-bold tracking-wide uppercase mt-1">Binary Size</p>
            </div>
            <div>
              <span className="text-4xl font-black text-[#2d2d2d]">0<span className="text-red-600">deps</span></span>
              <p className="text-gray-400 text-sm font-bold tracking-wide uppercase mt-1">Dependencies</p>
            </div>
            {/* UPDATED: new stat */}
            <div>
              <span className="text-4xl font-black text-[#2d2d2d]">v<span className="text-red-600">2</span></span>
              <p className="text-gray-400 text-sm font-bold tracking-wide uppercase mt-1">cgroups only</p>
            </div>
          </div>

          {/* UPDATED: Features section — How it Works style */}
          <section className="w-full py-20 border-t border-gray-100 mt-12">
            <h2 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-6">Features</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">01</span>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">Linux Namespaces</h3>
                  <p className="text-gray-600 text-base mt-1 max-w-sm">PID, UTS, Mount, IPC, and Network namespaces — each container gets a fully isolated view of the system via clone() syscall.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">02</span>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">cgroups v2 Resource Limits</h3>
                  <p className="text-gray-600 text-base mt-1 max-w-sm">Hard memory and CPU limits enforced by the kernel. OOM killer fires automatically. No runaway containers.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">03</span>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">OverlayFS Filesystem</h3>
                  <p className="text-gray-600 text-base mt-1 max-w-sm">Copy-on-write layered filesystem. Image layers stay read-only. Container writes go to a separate upper layer — deleted on exit.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">04</span>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">OCI Image Support</h3>
                  <p className="text-gray-600 text-base mt-1 max-w-sm">Pull from Docker Hub, GHCR, ECR, or any OCI-compliant registry. Push your container layers back as OCI images.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">05</span>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">Container Networking</h3>
                  <p className="text-gray-600 text-base mt-1 max-w-sm">veth pair + Linux bridge + iptables NAT. Every container gets its own IP address and full outbound internet access.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">06</span>
                <div>
                  <h3 className="font-bold text-lg tracking-wide">Daemonless Architecture</h3>
                  <p className="text-gray-600 text-base mt-1 max-w-sm">No background service. No socket. No single point of failure. Each container is a direct child process of the CLI.</p>
                </div>
              </div>
            </div>
          </section>

          {/* UPDATED: Comparison section — Why Veil style */}
          <section className="w-full py-20 border-t border-gray-100">
            <h2 className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-6">Veil vs The World</h2>

            {/* Comparison grid — 4 columns, no borders */}
            <div className="mb-10">
              <div className="grid grid-cols-4 gap-x-6 mb-4">
                <span className="text-xs font-bold tracking-wide uppercase text-gray-300"></span>
                <span className="text-xs font-bold tracking-wide uppercase text-gray-400">Docker</span>
                <span className="text-xs font-bold tracking-wide uppercase text-gray-400">Podman</span>
                <span className="text-xs font-bold tracking-wide uppercase text-[#2d2d2d]">veil</span>
              </div>
              {[
                ['Architecture',   'Daemon (dockerd)',   'Daemonless',       'Daemonless'],
                ['Root required',  'Rootless optional', 'Rootless native',  'Rootful (v1)'],
                ['Written in',     'Go + C (shim)',     'Go + C',           'Pure Go'],
                ['cgroups',        'v1 + v2',           'v1 + v2',          'v2 only'],
                ['OCI compliant',  'Yes',               'Yes',              'Yes'],
                ['Binary size',    '~100MB (daemon)',   '~50MB',            '<8MB'],
                ['Cold start',     '~500ms',            '~200ms',           '<50ms'],
              ].map(([label, docker, podman, veil], i) => (
                <div key={i} className="grid grid-cols-4 gap-x-6 py-2.5 border-t border-gray-100">
                  <span className="text-xs font-bold tracking-wide uppercase text-gray-400">{label}</span>
                  <span className="text-xs text-gray-600">{docker}</span>
                  <span className="text-xs text-gray-600">{podman}</span>
                  <span className="text-xs text-[#2d2d2d] font-bold">{veil}</span>
                </div>
              ))}
            </div>

            {/* Dash list */}
            <ul className="space-y-4">
              {[
                'veil has no daemon — no dockerd, no containerd, nothing in background.',
                'Pure Go binary means single file, no shared libraries, runs on any Linux.',
                'cgroups v2 only — modern kernels, cleaner API, unified hierarchy.',
                'OCI compliant — your veil containers work with docker pull, podman pull.',
                'Built to understand, not to wrap — every syscall is intentional.',
              ].map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="text-red-600 font-black mt-0.5">—</span>
                  <span className="text-[#2d2d2d] text-base max-w-sm">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}
