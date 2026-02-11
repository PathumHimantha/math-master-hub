import { universities } from "@/lib/mockData";
import { MapPin, Award } from "lucide-react";

export default function UniversitiesSection() {
  return (
    <section className="py-20 bg-muted/50 relative">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Top Engineering <span className="text-gradient-accent">Universities</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your dream engineering faculty awaits — aim high with the right preparation
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((u, i) => (
            <div
              key={u.name}
              className="bg-card rounded-xl border border-border overflow-hidden hover-lift animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="gradient-primary h-3" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-semibold text-foreground">{u.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent whitespace-nowrap">
                    <Award className="h-3 w-3" />
                    {u.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-primary mb-2">{u.faculty}</p>
                <p className="text-sm text-muted-foreground mb-3">{u.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {u.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
