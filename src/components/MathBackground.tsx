const symbols = ["∫", "Σ", "π", "√", "∞", "Δ", "θ", "λ", "∂", "α", "β", "∇"];

export default function MathBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {symbols.map((s, i) => (
        <span
          key={i}
          className="absolute text-primary/[0.06] font-display select-none"
          style={{
            fontSize: `${20 + Math.random() * 40}px`,
            left: `${(i * 8.3) % 100}%`,
            top: `${(i * 13.7 + 5) % 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${6 + i * 0.7}s`,
          }}
        >
          <span className="animate-float-slow inline-block">{s}</span>
        </span>
      ))}
    </div>
  );
}
