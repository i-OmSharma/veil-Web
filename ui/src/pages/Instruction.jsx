import Header from '../components/Header'

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
                {/* UPDATED: Download goBox → Download veil */}
                <h3 className="font-bold text-lg tracking-wide">Download veil</h3>
                <div className="text-gray-600 text-base mt-2 max-w-lg space-y-2">
                  {/* UPDATED: curl -Lo gobox https://releases.gobox.dev/... → veil + getveil.dev */}
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">curl -Lo veil https://releases.getveil.dev/latest/linux/veil</code>
                  {/* UPDATED: chmod +x gobox && sudo mv gobox → veil */}
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">chmod +x veil && sudo mv veil /usr/local/bin/</code>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">02</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Run your first container</h3>
                <div className="mt-2 max-w-lg">
                  {/* UPDATED: sudo gobox → sudo veil */}
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">sudo veil run ubuntu:22.04 /bin/bash</code>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">03</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Explore inside the container</h3>
                {/* UPDATED: gobox-XXXX → veil-XXXX */}
                <p className="text-gray-600 text-base mt-2 max-w-lg">Inside your container: <code className="bg-[#f4f4f4] px-2 py-0.5 text-sm font-mono">echo $$</code> shows PID 1, <code className="bg-[#f4f4f4] px-2 py-0.5 text-sm font-mono">hostname</code> shows veil-XXXX. Full namespace isolation — your processes cannot see the host.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">04</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Pull any OCI image</h3>
                <div className="mt-2 max-w-lg space-y-2">
                  {/* UPDATED: sudo gobox → sudo veil */}
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">sudo veil pull alpine:3.19</code>
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">sudo veil run alpine:3.19 /bin/sh</code>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">05</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">List running containers</h3>
                <div className="mt-2 max-w-lg">
                  {/* UPDATED: sudo gobox ps → sudo veil ps */}
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">sudo veil ps</code>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-red-600 font-black text-2xl leading-none mt-1 w-8 shrink-0">06</span>
              <div>
                <h3 className="font-bold text-lg tracking-wide">Stop a container</h3>
                <div className="mt-2 max-w-lg">
                  {/* UPDATED: sudo gobox stop → sudo veil stop */}
                  <code className="bg-[#f4f4f4] font-mono text-sm px-3 py-2 block">sudo veil stop &lt;container-id&gt;</code>
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
    </>
  )
}
