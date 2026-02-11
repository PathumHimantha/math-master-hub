import { universities } from "@/lib/mockData";
import { MapPin, Award } from "lucide-react";
import GeometricShapes from "@/components/GeometricShapes";
import uniMoratuwa from "@/assets/uni-moratuwa.jpg";
import uniPeradeniya from "@/assets/uni-peradeniya.jpg";
import uniRuhuna from "@/assets/uni-ruhuna.jpg";
import uniSjp from "@/assets/uni-sjp.jpg";
import uniOpen from "@/assets/uni-open.jpg";

const uniImages: Record<string, string> = {
  "University of Moratuwa": uniMoratuwa,
  "University of Peradeniya": uniPeradeniya,
  "University of Ruhuna": uniRuhuna,
  "University of Sri Jayewardenepura": uniSjp,
  "Open University of Sri Lanka": uniOpen,
};

export default function UniversitiesSection() {
  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      <GeometricShapes />
      <div className="container relative z-10">
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
              className="bg-card rounded-xl border border-border overflow-hidden hover-lift animate-fade-in-up group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={uniImages[u.name]}
                  alt={u.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-accent text-accent-foreground shadow-lg">
                  <Award className="h-3 w-3" />
                  {u.badge}
                </span>
                <h3 className="absolute bottom-3 left-4 right-4 font-display font-semibold text-primary-foreground text-lg leading-tight drop-shadow-lg">
                  {u.name}
                </h3>
              </div>
              <div className="p-5">
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
