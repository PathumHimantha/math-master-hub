import {
  ChevronRight,
  TrendingUp,
  Trophy,
  Bell,
  Calendar,
  Clock,
  Award,
  Target,
  BookOpen,
  Users,
  Flame,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { DashboardView } from "../types";
import YearsView from "./YearsView";
import CategoriesView from "./CategoriesView";
import MonthsView from "./MonthsView";
import WeeksView from "./WeeksView";
import StudentMatrix from "./StudentMatrix"; // Add this import

interface DashboardContentProps {
  user: any;
  view: DashboardView;
  setView: (v: DashboardView) => void;
}

export default function DashboardContent({
  user,
  view,
  setView,
}: DashboardContentProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section - unchanged */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Welcome back, {user.name} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          A/L {user.alYear} {user.district ? `· ${user.district}` : ""}
        </p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {user.badges && user.badges.length > 0 ? (
            user.badges.map((b: string) => (
              <Badge key={b} variant="secondary" className="text-xs gap-1">
                <Star className="h-3 w-3 text-warning" />
                {b}
              </Badge>
            ))
          ) : (
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1 text-primary" /> New Student
            </Badge>
          )}
        </div>
      </div>
      {/* Breadcrumb navigation */}
      {view.step !== "years" && (
        <div className="flex items-center gap-2 text-sm animate-fade-in-up">
          <button
            onClick={() => setView({ step: "years" })}
            className="text-primary hover:underline font-medium"
          >
            Years
          </button>
          {"year" in view && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <button
                onClick={() => setView({ step: "categories", year: view.year })}
                className={
                  view.step === "categories"
                    ? "text-foreground font-semibold"
                    : "text-primary hover:underline font-medium"
                }
              >
                {view.year} A/L
              </button>
            </>
          )}
          {(view.step === "months" || view.step === "weeks") &&
            "category" in view && (
              <>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                <button
                  onClick={() =>
                    setView({
                      step: "months",
                      year: view.year,
                      category: view.category,
                    })
                  }
                  className={
                    view.step === "months"
                      ? "text-foreground font-semibold"
                      : "text-primary hover:underline font-medium"
                  }
                >
                  {view.category.charAt(0).toUpperCase() +
                    view.category.slice(1)}
                </button>
              </>
            )}
          {view.step === "weeks" && "month" in view && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-foreground font-semibold">
                {view.month}
              </span>
            </>
          )}
        </div>
      )}

      {view.step === "years" && (
        <YearsView onSelect={(year) => setView({ step: "categories", year })} />
      )}
      {view.step === "categories" && (
        <CategoriesView
          year={view.year}
          onSelect={(cat) => {
            if (view.year === 2028) return;
            setView({ step: "months", year: view.year, category: cat });
          }}
          onBack={() => setView({ step: "years" })}
        />
      )}
      {view.step === "months" && (
        <MonthsView
          year={view.year}
          category={view.category}
          onSelect={(month) =>
            setView({
              step: "weeks",
              year: view.year,
              category: view.category,
              month,
            })
          }
          onBack={() => setView({ step: "categories", year: view.year })}
        />
      )}
      {view.step === "weeks" && (
        <WeeksView
          year={view.year}
          category={view.category}
          month={view.month}
          onBack={() =>
            setView({
              step: "months",
              year: view.year,
              category: view.category,
            })
          }
        />
      )}

      {/* Show StudentMatrix only when on years view */}
      {view.step === "years" && <StudentMatrix />}
      {/* Show StudentMatrix only when on categories view */}
      {view.step === "categories" && <StudentMatrix />}
    </div>
  );
}
