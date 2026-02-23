import {
  GraduationCap,
  Calendar,
  Sparkles,
  TrendingUp,
  Star,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { years } from "@/lib/mockData";
import { yearMeta } from "../constants";

interface YearsViewProps {
  onSelect: (year: number) => void;
  userAlYear?: number; // Add this prop to receive user's enrolled year
}

export default function YearsView({
  onSelect,
  userAlYear = 2027,
}: YearsViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {years.map((year, i) => {
        const meta = yearMeta[year] || {
          alDate: `August ${year}`,
          status: "Active",
          color: "bg-gradient-to-br from-slate-700 to-slate-900", // Default professional color
        };

        const isComingSoon = meta.status === "Coming Soon";
        const isEnrolledYear = year === userAlYear;

        // Professional color schemes for each year
        const getCardStyle = () => {
          if (isComingSoon) {
            return "bg-gradient-to-br from-slate-400 to-slate-600 opacity-80";
          }
          if (isEnrolledYear) {
            return "bg-gradient-to-br from-primary via-primary/90 to-accent ring-2 ring-primary ring-offset-2 ring-offset-background";
          }
          // Different professional gradients for different years
          switch (year) {
            case 2026:
              return "bg-gradient-to-br from-blue-700 to-blue-900";
            case 2027:
              return "bg-gradient-to-br from-emerald-700 to-emerald-900";
            case 2028:
              return "bg-gradient-to-br from-amber-700 to-amber-900";
            default:
              return "bg-gradient-to-br from-slate-700 to-slate-900";
          }
        };

        return (
          <div
            key={year}
            onClick={() => onSelect(year)}
            className={`${getCardStyle()} rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in-up group relative overflow-hidden shadow-lg`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.1)_0%,_transparent_60%)]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>

            {/* Math Symbols Background */}
            <span
              className="absolute bottom-2 right-4 text-white/10 font-display text-4xl transform rotate-12"
              aria-hidden="true"
            >
              ∫
            </span>
            <span
              className="absolute top-2 left-2 text-white/5 font-display text-2xl"
              aria-hidden="true"
            >
              Σ
            </span>

            {/* Enrolled Year Badge */}
            {isEnrolledYear && (
              <div className="absolute top-3 left-3 z-20">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm gap-1">
                  <CheckCircle className="h-3 w-3" /> Your Batch
                </Badge>
              </div>
            )}

            <div className="relative z-10">
              {/* Icon with glow effect */}
              <div
                className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                  isEnrolledYear ? "ring-2 ring-white/50" : ""
                }`}
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-2xl font-display font-bold mb-1 flex items-center gap-2">
                {year} A/L
                {isEnrolledYear && (
                  <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                )}
              </h3>

              <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
                <Calendar className="h-4 w-4" />
                <span>{meta.alDate}</span>
              </div>

              {/* Status Badge */}
              {isComingSoon ? (
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 mr-1" /> Coming Soon
                </Badge>
              ) : (
                <Badge
                  className={`${
                    isEnrolledYear
                      ? "bg-white/30 text-white border-0 backdrop-blur-sm"
                      : "bg-white/20 text-white border-0 backdrop-blur-sm"
                  }`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {isEnrolledYear ? "Active Enrollment" : meta.status}
                </Badge>
              )}
            </div>

            {/* Progress Indicator for Enrolled Year */}
            {isEnrolledYear && (
              <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-white/60 rounded-full"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
