export default function GeometricShapes({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Triangle */}
      <svg className="absolute top-[10%] left-[5%] w-16 h-16 text-primary/[0.06] animate-float-slow" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {/* Circle */}
      <svg className="absolute top-[30%] right-[8%] w-20 h-20 text-accent/[0.08] animate-float" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {/* Square rotated */}
      <svg className="absolute bottom-[20%] left-[12%] w-14 h-14 text-warning/[0.08] animate-float-slow" style={{ animationDelay: '2s' }} viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
      </svg>
      {/* Vector arrow */}
      <svg className="absolute top-[60%] right-[15%] w-24 h-12 text-primary/[0.05] animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 120 50">
        <line x1="10" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="2" />
        <polygon points="100,25 85,15 85,35" fill="currentColor" />
      </svg>
      {/* Sine wave */}
      <svg className="absolute bottom-[35%] right-[25%] w-32 h-16 text-accent/[0.06] animate-float-slow" style={{ animationDelay: '3s' }} viewBox="0 0 200 60">
        <path d="M 0,30 Q 25,0 50,30 Q 75,60 100,30 Q 125,0 150,30 Q 175,60 200,30" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {/* Equations */}
      <span className="absolute top-[15%] right-[30%] text-primary/[0.05] font-display text-sm animate-float" style={{ animationDelay: '1.5s' }}>
        E = mc²
      </span>
      <span className="absolute bottom-[15%] right-[10%] text-accent/[0.06] font-display text-xs animate-float-slow" style={{ animationDelay: '2.5s' }}>
        dy/dx = 2x + 1
      </span>
      <span className="absolute top-[45%] left-[3%] text-warning/[0.07] font-display text-xs animate-float" style={{ animationDelay: '0.5s' }}>
        ∫₀¹ x² dx = ⅓
      </span>
      {/* Coordinate axes */}
      <svg className="absolute bottom-[10%] left-[40%] w-20 h-20 text-primary/[0.04] animate-float-slow" style={{ animationDelay: '4s' }} viewBox="0 0 100 100">
        <line x1="10" y1="90" x2="10" y2="10" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="2" />
        <polygon points="10,10 5,20 15,20" fill="currentColor" />
        <polygon points="90,90 80,85 80,95" fill="currentColor" />
      </svg>
    </div>
  );
}
