import { courseHighlights } from "@/lib/mockData";
import { FunctionSquare, Cog, Move, BarChart, FileText, RefreshCw } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "function-square": FunctionSquare,
  cog: Cog,
  move: Move,
  "bar-chart": BarChart,
  "file-text": FileText,
  "refresh-cw": RefreshCw,
};

export default function CourseHighlights() {
  return (
    <section className="py-20 bg-background relative">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Course <span className="text-gradient-primary">Highlights</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Comprehensive coverage of the A/L Combined Mathematics syllabus
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseHighlights.map((c, i) => {
            const Icon = iconMap[c.icon] || FunctionSquare;
            return (
              <div
                key={c.title}
                className="glass-card rounded-xl p-6 hover-lift animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
