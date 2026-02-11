import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MathBackground from "@/components/MathBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 math-grid-bg opacity-20" />
      <MathBackground />
      
      {/* Geometric decorations */}
      <svg className="absolute top-[10%] right-[5%] w-32 h-32 text-primary-foreground/[0.06] animate-float" viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-[15%] right-[20%] w-24 h-24 text-primary-foreground/[0.05] animate-float-slow" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <svg className="absolute top-[55%] left-[60%] w-20 h-20 text-primary-foreground/[0.04] animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 100 100" aria-hidden="true">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Floating equations */}
      <span className="absolute top-[20%] right-[12%] text-primary-foreground/[0.08] font-display text-lg animate-float-slow hidden md:block" aria-hidden="true">
        ∫₀^∞ e^(-x²) dx = √π/2
      </span>
      <span className="absolute bottom-[25%] left-[55%] text-primary-foreground/[0.06] font-display text-sm animate-float hidden md:block" style={{ animationDelay: '1s' }} aria-hidden="true">
        F = ma
      </span>
      <span className="absolute top-[40%] right-[25%] text-primary-foreground/[0.07] font-display text-base animate-float-slow hidden lg:block" style={{ animationDelay: '3s' }} aria-hidden="true">
        sin²θ + cos²θ = 1
      </span>
      <span className="absolute bottom-[40%] right-[8%] text-primary-foreground/[0.05] font-display text-sm animate-float hidden lg:block" style={{ animationDelay: '2s' }} aria-hidden="true">
        Σ n² = n(n+1)(2n+1)/6
      </span>

      <div className="container relative z-10 py-20">
        <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold rounded-full bg-accent text-accent-foreground animate-fade-in-up">
            🎓 A/L Combined Mathematics – Sri Lanka
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Master A/L Combined Maths{" "}
            <span className="text-warning">With Confidence</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Prepare for your university engineering dreams with structured theory, past papers, and guided practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8">
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg"  className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 bg-primary-foreground/10">
                Student Login
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "500+", label: "Students" },
              { value: "95%", label: "Pass Rate" },
              { value: "10+", label: "Years Exp" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-warning">{s.value}</div>
                <div className="text-sm text-primary-foreground/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
