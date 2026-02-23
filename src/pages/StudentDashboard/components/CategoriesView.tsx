import {
  ArrowLeft,
  Sparkles,
  Clock,
  Lock,
  BookOpen,
  FileText,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categories } from "../constants";

interface CategoriesViewProps {
  year: number;
  onSelect: (cat: string) => void;
  onBack: () => void;
}

export default function CategoriesView({
  year,
  onSelect,
  onBack,
}: CategoriesViewProps) {
  const isComingSoon = year === 2028;

  // Professional color schemes for each category
  const getCategoryStyle = (categoryKey: string) => {
    switch (categoryKey) {
      case "theory":
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      case "paper":
        return "bg-gradient-to-br from-emerald-600 to-emerald-800";
      case "revision":
        return "bg-gradient-to-br from-amber-600 to-amber-800";
      default:
        return "bg-gradient-to-br from-slate-600 to-slate-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary hover:underline font-medium group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Years
      </button>

      {isComingSoon && (
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-8 text-center animate-fade-in-up shadow-lg">
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Coming Soon!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Content for {year} A/L is currently being prepared. Stay tuned for
            structured theory, paper classes, and revision materials. We'll
            notify you when it's available!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm font-medium text-amber-600 dark:text-amber-400">
            <Clock className="h-4 w-4" />
            Expected availability: Early {year - 1}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {categories.map((cat, i) => (
          <div
            key={cat.key}
            onClick={() => !isComingSoon && onSelect(cat.key)}
            className={`${getCategoryStyle(cat.key)} rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in-up group relative overflow-hidden shadow-lg ${isComingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15)_0%,_transparent_60%)]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

            {/* Math Symbols Background */}
            <span
              className="absolute bottom-2 right-4 text-white/10 font-display text-4xl transform rotate-12"
              aria-hidden="true"
            >
              {cat.key === "theory" ? "f(x)" : cat.key === "paper" ? "∑" : "∫"}
            </span>
            <span
              className="absolute top-2 left-2 text-white/5 font-display text-2xl"
              aria-hidden="true"
            >
              {cat.key === "theory" ? "dy/dx" : cat.key === "paper" ? "π" : "∞"}
            </span>

            {/* Icon with glow effect */}
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <cat.icon className="h-7 w-7 text-white" />
            </div>

            <h3 className="text-xl font-display font-bold mb-2 flex items-center gap-2">
              {cat.label}
              {!isComingSoon && (
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  Available
                </Badge>
              )}
            </h3>

            <p className="text-sm text-white/90 leading-relaxed mb-4">
              {cat.description}
            </p>

            {/* Bottom indicator */}
            <div className="flex items-center gap-1 text-xs text-white/70">
              <span>
                {cat.key === "theory"
                  ? "12 modules"
                  : cat.key === "paper"
                    ? "24 papers"
                    : "8 sessions"}
              </span>
            </div>

            {isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
                <div className="bg-black/60 rounded-full p-3">
                  <Lock className="h-8 w-8 text-white/80" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
