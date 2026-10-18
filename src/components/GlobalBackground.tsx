export function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-midnight select-none"
      aria-hidden="true"
    >
      {/* Ambient gradient illumination 1 — Violet */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-25 animate-float-ambient"
        style={{
          background: 'radial-gradient(circle, #8B6CFF 0%, rgba(23, 20, 58, 0.4) 60%, transparent 80%)',
        }}
      />

      {/* Ambient gradient illumination 2 — Cyan */}
      <div
        className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20 animate-float-ambient"
        style={{
          background: 'radial-gradient(circle, #39D9F5 0%, rgba(16, 24, 45, 0.5) 60%, transparent 80%)',
          animationDelay: '-12s',
        }}
      />

      {/* Ambient gradient illumination 3 — Deep Indigo Center */}
      <div
        className="absolute -bottom-[10%] left-[25%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20 animate-float-ambient"
        style={{
          background: 'radial-gradient(circle, #17143A 0%, rgba(11, 16, 32, 0.8) 70%, transparent 90%)',
          animationDelay: '-6s',
        }}
      />

      {/* Faint Origami Geometric Facet Outlines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Origami crease diagonals */}
        <line x1="0" y1="0" x2="1440" y2="900" stroke="#8B6CFF" strokeWidth="1" />
        <line x1="1440" y1="0" x2="0" y2="900" stroke="#39D9F5" strokeWidth="1" />
        <line x1="720" y1="0" x2="720" y2="900" stroke="#C7B8FF" strokeWidth="0.8" strokeDasharray="6 6" />
        <line x1="0" y1="450" x2="1440" y2="450" stroke="#8B6CFF" strokeWidth="0.8" strokeDasharray="6 6" />

        {/* Origami polygon silhouettes */}
        <polygon points="120,60 380,20 440,260 220,380 40,240" stroke="#39D9F5" strokeWidth="1" fill="none" />
        <polygon points="1320,120 1420,340 1200,480 1080,260" stroke="#8B6CFF" strokeWidth="1" fill="none" />
        <polygon points="200,720 480,640 400,880 140,840" stroke="#8B6CFF" strokeWidth="1" fill="none" />
        <polygon points="1040,680 1340,600 1400,860 1120,880" stroke="#39D9F5" strokeWidth="1" fill="none" />

        {/* Angular diamond nodes */}
        <polygon points="720,200 750,230 720,260 690,230" stroke="#39D9F5" strokeWidth="1.2" fill="none" />
        <polygon points="720,670 750,700 720,730 690,700" stroke="#8B6CFF" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Floating origami diamond particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { top: '14%', left: '8%', size: 14, color: 'border-cyan-vivid/30', delay: '0s', duration: '9s' },
          { top: '28%', right: '10%', size: 18, color: 'border-violet-electric/35', delay: '-3s', duration: '12s' },
          { top: '48%', left: '12%', size: 12, color: 'border-cyan-vivid/25', delay: '-6s', duration: '11s' },
          { top: '65%', right: '7%', size: 16, color: 'border-violet-soft/30', delay: '-2s', duration: '14s' },
          { top: '82%', left: '9%', size: 20, color: 'border-cyan-vivid/20', delay: '-8s', duration: '13s' },
          { top: '90%', right: '20%', size: 14, color: 'border-violet-electric/25', delay: '-5s', duration: '10s' },
        ].map((particle, i) => (
          <div
            key={i}
            className={`absolute rotate-45 border ${particle.color} rounded-[2px] opacity-50`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration} ease-in-out infinite alternate`,
              animationDelay: particle.delay,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-violet-electric/10 to-cyan-vivid/10" />
          </div>
        ))}
      </div>

      {/* Fine technical grid pattern overlay */}
      <div className="absolute inset-0 bg-origami-grid opacity-60" />
    </div>
  );
}
