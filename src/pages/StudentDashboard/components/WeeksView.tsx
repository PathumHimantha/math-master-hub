import { ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateYearContent } from "@/lib/mockData";
import WeekCard from "./WeekCard";

interface WeeksViewProps {
  year: number;
  category: string;
  month: string;
  onBack: () => void;
  userId: string; // Add this
}

export default function WeeksView({
  year,
  category,
  month,
  onBack,
  userId, // Add this
}: WeeksViewProps) {
  const yearContent = generateYearContent(year);
  const monthData = yearContent.months.find((m) => m.month === month);

  if (!monthData) return null;

  return (
    <div className="space-y-5 animate-fade-in-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary hover:underline font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Months
      </button>

      <div className="bg-card rounded-xl border border-border p-4">
        <h2 className="font-display font-bold text-lg text-foreground">
          {month} — {year} A/L
        </h2>
        <p className="text-sm text-muted-foreground capitalize">
          {category} Classes
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {monthData.weeks.map((week, mi) => (
          <AccordionItem
            key={week.week}
            value={`week-${week.week}`}
            className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${mi * 0.05}s` }}
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-display font-semibold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {week.week}
                </span>
                Week {week.week}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <WeekCard
                week={{
                  id: week.week.toString(),
                  name: `Week ${week.week}`,
                  year: year.toString(),
                  month: month,
                  week: `Week ${week.week}`,
                  category: category,
                }}
                userId={userId}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
