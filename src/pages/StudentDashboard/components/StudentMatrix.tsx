import {
  ChevronRight,
  Trophy,
  Calendar,
  Award,
  Target,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function StudentMatrix() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fade-in-up">
      {/* Left Column - 2/3 width */}
      <div className="lg:col-span-2 space-y-5">
        {/* Continue Learning Section */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Continue Learning
            </h2>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Current Course Item */}
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center">
                <span className="font-display font-bold text-primary">
                  Wk 8
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Calculus - Integration Techniques
                </p>
                <p className="text-xs text-muted-foreground">
                  Theory · 75% complete
                </p>
                <Progress value={75} className="h-1.5 mt-2" />
              </div>
              <Button size="sm" className="shrink-0">
                Continue
              </Button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent/20 flex items-center justify-center">
                <span className="font-display font-bold text-accent">2019</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  2019 A/L Paper - Part B
                </p>
                <p className="text-xs text-muted-foreground">
                  Paper Class · 3/8 questions done
                </p>
                <Progress value={37} className="h-1.5 mt-2" />
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                Resume
              </Button>
            </div>
          </div>
        </div>

        {/* Upcoming Classes / Schedule */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Upcoming Classes
            </h2>
            <Badge variant="outline" className="text-xs">
              This Week
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">MON</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Pure Mathematics - Differentiation
                </p>
                <p className="text-xs text-muted-foreground">
                  7:00 PM - 9:00 PM
                </p>
              </div>
              <Badge>Live</Badge>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xs font-bold text-accent">WED</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Applied Mathematics - Mechanics
                </p>
                <p className="text-xs text-muted-foreground">
                  5:30 PM - 7:30 PM
                </p>
              </div>
              <Badge variant="secondary">Recorded</Badge>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                <span className="text-xs font-bold text-warning">FRI</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  2018 Paper Discussion
                </p>
                <p className="text-xs text-muted-foreground">
                  6:00 PM - 9:00 PM
                </p>
              </div>
              <Badge variant="outline">Paper</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - 1/3 width */}
      <div className="space-y-5">
        {/* Recent Achievements */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-warning" />
            Recent Achievements
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center">
                <Award className="h-4 w-4 text-warning" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Quick Learner
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed 5 lessons in a week
                </p>
              </div>
              <span className="text-xs text-muted-foreground">2d ago</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Perfect Score
                </p>
                <p className="text-xs text-muted-foreground">
                  100% on Integration Quiz
                </p>
              </div>
              <span className="text-xs text-muted-foreground">1w ago</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Top 10%</p>
                <p className="text-xs text-muted-foreground">
                  Among your batch
                </p>
              </div>
              <span className="text-xs text-muted-foreground">2w ago</span>
            </div>
          </div>

          <Button variant="link" className="w-full mt-2 text-xs">
            View All Badges
          </Button>
        </div>

        {/* Recommended For You */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-warning/5 rounded-xl border border-border p-5">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
            <Zap className="h-5 w-5 text-primary" />
            Recommended
          </h2>

          <div className="space-y-3">
            <div className="bg-card/80 rounded-lg p-3">
              <p className="text-sm font-medium text-foreground">
                Complex Numbers
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on your progress in Algebra
              </p>
              <Button
                size="sm"
                variant="link"
                className="text-xs px-0 h-auto mt-2"
              >
                Start Learning →
              </Button>
            </div>

            <div className="bg-card/80 rounded-lg p-3">
              <p className="text-sm font-medium text-foreground">
                2020 Paper - Q10
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Commonly attempted question
              </p>
              <Button
                size="sm"
                variant="link"
                className="text-xs px-0 h-auto mt-2"
              >
                Practice Now →
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">!</span>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Study Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                "Practice past papers daily. Aim for at least 2 problems from
                each topic per week."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
