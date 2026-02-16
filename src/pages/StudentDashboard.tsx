import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { years, generateYearContent } from "@/lib/mockData";
import {
  Download, Eye, Play, Lock, FileText, BookOpen, Video, Trophy, Bell, Star,
  LayoutDashboard, User, LogOut, Menu, X, GraduationCap, ArrowLeft, Calendar,
  Clock, ChevronRight, Sparkles, TrendingUp,
} from "lucide-react";

const mathSymbols = ["∫", "Σ", "π", "√", "∞", "Δ", "θ", "λ"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function DashboardMathBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {mathSymbols.map((s, i) => (
        <span
          key={i}
          className="absolute text-primary/[0.03] font-display select-none animate-float-slow"
          style={{
            fontSize: `${24 + i * 6}px`,
            left: `${(i * 12 + 5) % 95}%`,
            top: `${(i * 17 + 10) % 90}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          {s}
        </span>
      ))}
      <svg className="absolute top-[8%] right-[5%] w-16 h-16 text-accent/[0.04] animate-float" viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg className="absolute bottom-[12%] left-[8%] w-20 h-20 text-primary/[0.03] animate-float-slow" style={{ animationDelay: '2s' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

type DashboardView =
  | { step: "years" }
  | { step: "categories"; year: number }
  | { step: "months"; year: number; category: string }
  | { step: "weeks"; year: number; category: string; month: string };

const yearMeta: Record<number, { alDate: string; status: string; color: string }> = {
  2026: { alDate: "August 2026", status: "Active", color: "gradient-primary" },
  2027: { alDate: "August 2027", status: "Active", color: "gradient-accent" },
  2028: { alDate: "August 2028", status: "Coming Soon", color: "bg-warning" },
};

const categories = [
  { key: "theory", label: "Theory Classes", icon: BookOpen, description: "Structured theory lessons covering Pure & Applied Mathematics", gradient: "gradient-primary" },
  { key: "paper", label: "Paper Classes", icon: FileText, description: "Past paper discussions and exam technique practice", gradient: "gradient-accent" },
  { key: "revision", label: "Revision Classes", icon: Video, description: "Intensive revision sessions before examinations", gradient: "bg-warning" },
];

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarTab, setSidebarTab] = useState<"dashboard" | "profile">("dashboard");
  const [sideOpen, setSideOpen] = useState(false);
  const [view, setView] = useState<DashboardView>({ step: "years" });

  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" as const },
    { icon: User, label: "My Profile", key: "profile" as const },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-4 flex items-center gap-2 font-display font-bold text-lg border-b border-primary-foreground/10">
        <GraduationCap className="h-6 w-6" />
        <span>MathsMaster</span>
      </div>
      <div className="p-4 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-primary-foreground/60">A/L {user.alYear}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => { setSidebarTab(item.key); setSideOpen(false); setView({ step: "years" }); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              sidebarTab === item.key
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "text-primary-foreground/70 hover:bg-primary-foreground/10"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-primary-foreground/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-destructive/20 hover:text-primary-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardMathBg />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 gradient-hero text-primary-foreground min-h-screen relative z-10">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sideOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSideOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 gradient-hero text-primary-foreground animate-slide-in-left flex flex-col">
            <div className="absolute top-3 right-3">
              <button onClick={() => setSideOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 min-h-screen relative z-10">
        <header className="h-14 border-b border-border bg-card/90 backdrop-blur-sm flex items-center px-4 gap-3 sticky top-0 z-20">
          <button className="md:hidden" onClick={() => setSideOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display font-semibold text-foreground">
            {sidebarTab === "dashboard" ? "Dashboard" : "My Profile"}
          </h1>
        </header>

        <main className="p-4 md:p-6">
          {sidebarTab === "profile" ? (
            <ProfileTab user={user} />
          ) : (
            <DashboardContent user={user} view={view} setView={setView} />
          )}
        </main>
      </div>
    </div>
  );
}

function ProfileTab({ user }: { user: any }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="gradient-hero p-8 text-center relative">
          <svg className="absolute top-2 left-4 w-12 h-12 text-primary-foreground/[0.08] animate-float-slow" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="w-20 h-20 rounded-full bg-accent mx-auto flex items-center justify-center text-accent-foreground font-display font-bold text-2xl shadow-lg">
            {user.name.split(" ").map((n: string) => n[0]).join("")}
          </div>
          <h2 className="font-display font-bold text-xl text-primary-foreground mt-3">{user.name}</h2>
          <p className="text-primary-foreground/70 text-sm">{user.email}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Mobile</p>
              <p className="text-sm font-medium text-foreground">{user.mobile}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">District</p>
              <p className="text-sm font-medium text-foreground">{user.district}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">A/L Year</p>
              <p className="text-sm font-medium text-foreground">{user.alYear}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <Badge className="bg-accent text-accent-foreground">Active</Badge>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Badges</p>
            <div className="flex gap-2 flex-wrap">
              {user.badges.length > 0 ? user.badges.map((b: string) => (
                <Badge key={b} variant="secondary" className="gap-1">
                  <Star className="h-3 w-3 text-warning" />
                  {b}
                </Badge>
              )) : (
                <span className="text-sm text-muted-foreground">No badges yet — keep studying!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent({ user, view, setView }: { user: any; view: DashboardView; setView: (v: DashboardView) => void }) {
  return (
    <div className="space-y-6">
      {/* Welcome - always visible */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-sm text-muted-foreground">A/L {user.alYear} · {user.district}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {user.badges.map((b: string) => (
            <Badge key={b} variant="secondary" className="text-xs gap-1">
              <Star className="h-3 w-3 text-warning" />
              {b}
            </Badge>
          ))}
        </div>
      </div>

      {/* Breadcrumb navigation */}
      {view.step !== "years" && (
        <div className="flex items-center gap-2 text-sm animate-fade-in-up">
          <button onClick={() => setView({ step: "years" })} className="text-primary hover:underline font-medium">Years</button>
          {"year" in view && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <button
                onClick={() => setView({ step: "categories", year: view.year })}
                className={view.step === "categories" ? "text-foreground font-semibold" : "text-primary hover:underline font-medium"}
              >
                {view.year} A/L
              </button>
            </>
          )}
          {(view.step === "months" || view.step === "weeks") && "category" in view && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <button
                onClick={() => setView({ step: "months", year: view.year, category: view.category })}
                className={view.step === "months" ? "text-foreground font-semibold" : "text-primary hover:underline font-medium"}
              >
                {view.category.charAt(0).toUpperCase() + view.category.slice(1)}
              </button>
            </>
          )}
          {view.step === "weeks" && "month" in view && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
              <span className="text-foreground font-semibold">{view.month}</span>
            </>
          )}
        </div>
      )}

      {view.step === "years" && <YearsView onSelect={(year) => setView({ step: "categories", year })} />}
      {view.step === "categories" && <CategoriesView year={view.year} onSelect={(cat) => {
        if (view.year === 2028) return; // coming soon
        setView({ step: "months", year: view.year, category: cat });
      }} onBack={() => setView({ step: "years" })} />}
      {view.step === "months" && <MonthsView year={view.year} category={view.category} onSelect={(month) => setView({ step: "weeks", year: view.year, category: view.category, month })} onBack={() => setView({ step: "categories", year: view.year })} />}
      {view.step === "weeks" && <WeeksView year={view.year} category={view.category} month={view.month} onBack={() => setView({ step: "months", year: view.year, category: view.category })} />}
    </div>
  );
}

function YearsView({ onSelect }: { onSelect: (year: number) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {years.map((year, i) => {
        const meta = yearMeta[year] || { alDate: `August ${year}`, status: "Active", color: "gradient-primary" };
        const isComingSoon = meta.status === "Coming Soon";
        return (
          <div
            key={year}
            onClick={() => onSelect(year)}
            className={`${meta.color} rounded-2xl p-6 text-primary-foreground cursor-pointer hover-lift animate-fade-in-up group relative overflow-hidden`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Decorative shapes */}
            <svg className="absolute top-3 right-3 w-16 h-16 text-primary-foreground/[0.08] animate-float-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="absolute bottom-2 right-4 text-primary-foreground/[0.06] font-display text-xs" aria-hidden="true">∫ Σ π</span>

            <div className="relative z-10">
              <GraduationCap className="h-10 w-10 mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-2xl font-display font-bold mb-1">{year} A/L</h3>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80 mb-3">
                <Calendar className="h-4 w-4" />
                <span>{meta.alDate}</span>
              </div>
              {isComingSoon ? (
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                  <Sparkles className="h-3 w-3 mr-1" /> Coming Soon
                </Badge>
              ) : (
                <Badge className="bg-primary-foreground/20 text-primary-foreground border-0">
                  <TrendingUp className="h-3 w-3 mr-1" /> {meta.status}
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CategoriesView({ year, onSelect, onBack }: { year: number; onSelect: (cat: string) => void; onBack: () => void }) {
  const isComingSoon = year === 2028;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:underline font-medium">
        <ArrowLeft className="h-4 w-4" /> Back to Years
      </button>

      {isComingSoon && (
        <div className="bg-warning/10 border border-warning/30 rounded-2xl p-8 text-center animate-fade-in-up">
          <Sparkles className="h-12 w-12 text-warning mx-auto mb-3 animate-pulse-soft" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Coming Soon!</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Content for {year} A/L is currently being prepared. Stay tuned for structured theory, paper classes, and revision materials. We'll notify you when it's available!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-warning font-medium">
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
            className={`${cat.gradient} rounded-2xl p-6 text-primary-foreground hover-lift animate-fade-in-up group relative overflow-hidden ${isComingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <svg className="absolute bottom-2 right-2 w-12 h-12 text-primary-foreground/[0.06]" viewBox="0 0 100 100">
              <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <cat.icon className="h-10 w-10 mb-3 transition-transform duration-300 group-hover:scale-110" />
            <h3 className="text-lg font-display font-bold mb-1">{cat.label}</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">{cat.description}</p>
            {isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 rounded-2xl">
                <Lock className="h-8 w-8 text-primary-foreground/60" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MonthsView({ year, category, onSelect, onBack }: { year: number; category: string; onSelect: (month: string) => void; onBack: () => void }) {
  const currentMonth = new Date().getMonth(); // 0-indexed
  // Sort months: current month first, then upcoming, then past
  const sortedMonths = [...MONTHS].sort((a, b) => {
    const ai = MONTHS.indexOf(a);
    const bi = MONTHS.indexOf(b);
    const da = (ai - currentMonth + 12) % 12;
    const db = (bi - currentMonth + 12) % 12;
    return da - db;
  });

  // Mock progress per month
  const getProgress = (month: string) => {
    const idx = MONTHS.indexOf(month);
    if (idx < currentMonth) return Math.floor(70 + Math.random() * 30);
    if (idx === currentMonth) return Math.floor(30 + Math.random() * 40);
    return 0;
  };

  const catLabel = categories.find(c => c.key === category)?.label || category;

  return (
    <div className="space-y-5 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:underline font-medium">
        <ArrowLeft className="h-4 w-4" /> Back to {year} A/L
      </button>

      <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">{catLabel}</h2>
          <p className="text-sm text-muted-foreground">{year} A/L · Select a month</p>
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
                isCurrent ? "border-primary shadow-md ring-2 ring-primary/20" : "border-border"
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {month}
                </h3>
                {isCurrent && (
                  <Badge className="bg-primary text-primary-foreground text-xs">Current</Badge>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{progress}%</span>
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

function WeeksView({ year, category, month, onBack }: { year: number; category: string; month: string; onBack: () => void }) {
  const yearContent = generateYearContent(year);
  const monthData = yearContent.months.find(m => m.month === month);

  if (!monthData) return null;

  return (
    <div className="space-y-5 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-primary hover:underline font-medium">
        <ArrowLeft className="h-4 w-4" /> Back to Months
      </button>

      <div className="bg-card rounded-xl border border-border p-4">
        <h2 className="font-display font-bold text-lg text-foreground">{month} — {year} A/L</h2>
        <p className="text-sm text-muted-foreground capitalize">{category} Classes</p>
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
              <WeekCard week={week} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function WeekCard({ week }: { week: any }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Paper */}
        <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">Past Paper</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{week.paper.title}</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
              <Eye className="h-3 w-3 mr-1" /> View
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
              <Download className="h-3 w-3 mr-1" /> Get
            </Button>
          </div>
        </div>

        {/* Tute */}
        <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-foreground">Tutorial</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{week.tute.title}</p>
          <Button size="sm" variant="outline" className="text-xs h-7 w-full">
            <Download className="h-3 w-3 mr-1" /> Download PDF
          </Button>
        </div>

        {/* Video */}
        <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Video className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold text-foreground">Video Lesson</span>
          </div>
          {week.video.accessGranted ? (
            <>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{week.video.title}</p>
              {showVideo ? (
                <div className="rounded-lg overflow-hidden border border-border aspect-video bg-foreground/5">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title={week.video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Button
                  size="sm"
                  className="text-xs h-7 w-full bg-accent hover:bg-accent/90"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="h-3 w-3 mr-1" /> Play Video
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-3 bg-foreground/[0.03] rounded-lg">
              <Lock className="h-6 w-6 mx-auto text-muted-foreground mb-1 animate-pulse-soft" />
              <p className="text-xs text-muted-foreground">Access Locked</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
