import { features } from "@/lib/mockData";
import { CheckCircle } from "lucide-react";
import GeometricShapes from "@/components/GeometricShapes";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <GeometricShapes />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Why Choose <span className="text-gradient-primary">MathsMaster?</span>
          </h2>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={f}
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover-lift animate-fade-in-up group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <span className="text-sm font-medium text-foreground">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
