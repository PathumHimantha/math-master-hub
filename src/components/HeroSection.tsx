import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MathBackground from "@/components/MathBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 math-grid-bg opacity-20" />
      <MathBackground />
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
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
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
