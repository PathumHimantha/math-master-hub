import { mathSymbols } from "../constants";

export default function DashboardMathBg() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {mathSymbols.map((s, i) => (
        <span
          key={i}
          className="absolute text-primary/[0.03] font-display select-none animate-float-slow"
          style={{
            fontSize: `${24 + i * 6}px`,
            left: `${(i * 12 + 5) % 95}%`,
            top: `${(i * 17 + 10) % 90}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          {s}
        </span>
      ))}
      <svg
        className="absolute top-[8%] right-[5%] w-16 h-16 text-accent/[0.04] animate-float"
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,10 90,90 10,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute bottom-[12%] left-[8%] w-20 h-20 text-primary/[0.03] animate-float-slow"
        style={{ animationDelay: "2s" }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
