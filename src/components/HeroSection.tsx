import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-engineer.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden gradient-hero text-primary-foreground">
      {/* Hero image on the right */}
      <div className="absolute inset-0 flex justify-end">
        <div className="hidden md:block w-1/2 h-full relative">
          <img src={heroImg} alt="Engineering student studying mathematics" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(224,76%,28%)] to-transparent" />
        </div>
      </div>

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
          අනාගත ඉංජිනේරුවන් තැනීම උදෙසා වූ නූතන අරගලය
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base px-8">
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 bg-primary-foreground/10">
                Student Login
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "500+", label: "Students" },
              { value: "95%", label: "Pass Rate" },
              { value: "5+", label: "Years Exp" },
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
