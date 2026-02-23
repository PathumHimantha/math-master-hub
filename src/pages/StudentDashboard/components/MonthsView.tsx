import { ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MONTHS, categories } from "../constants";

interface MonthsViewProps {
  year: number;
  category: string;
  onSelect: (month: string) => void;
  onBack: () => void;
}

export default function MonthsView({
  year,
  category,
  onSelect,
  onBack,
}: MonthsViewProps) {
  const currentMonth = new Date().getMonth();
  const sortedMonths = [...MONTHS].sort((a, b) => {
    const ai = MONTHS.indexOf(a);
    const bi = MONTHS.indexOf(b);
    const da = (ai - currentMonth + 12) % 12;
    const db = (bi - currentMonth + 12) % 12;
    return da - db;
  });

  const getProgress = (month: string) => {
    const idx = MONTHS.indexOf(month);
    if (idx < currentMonth) return Math.floor(70 + Math.random() * 30);
    if (idx === currentMonth) return Math.floor(30 + Math.random() * 40);
    return 0;
  };

  const catLabel =
    categories.find((c) => c.key === category)?.label || category;

  return (
    <div className="space-y-5 animate-fade-in-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {year} A/L
      </button>

      <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">
            {catLabel}
          </h2>
          <p className="text-sm text-muted-foreground">
            {year} A/L · Select a month
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Overall Progress</p>
          <p className="text-lg font-display font-bold text-primary">64%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMonths.map((month, i) => {
          const isCurrent = MONTHS.indexOf(month) === currentMonth;
          const progress = getProgress(month);
          return (
            <div
              key={month}
              onClick={() => onSelect(month)}
              className={`bg-card rounded-xl border p-4 cursor-pointer hover-lift animate-fade-in-up transition-all group ${
                isCurrent
                  ? "border-primary shadow-md ring-2 ring-primary/20"
                  : "border-border"
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {month}
                </h3>
                {isCurrent && (
                  <Badge className="bg-primary text-primary-foreground text-xs">
                    Current
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>4 weeks</span>
                <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
