import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface YearMonthWeekSelectorProps {
  year: string;
  month: string;
  week: string;
  onYearChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onWeekChange: (value: string) => void;
}

const years = ["2026", "2027", "2028", "2025", "2024"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];

export default function YearMonthWeekSelector({
  year,
  month,
  week,
  onYearChange,
  onMonthChange,
  onWeekChange,
}: YearMonthWeekSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Year</Label>
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Month</Label>
        <Select value={month} onValueChange={onMonthChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Week</Label>
        <Select value={week} onValueChange={onWeekChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            {weeks.map((w) => (
              <SelectItem key={w} value={w}>
                {w}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
