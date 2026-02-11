import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { years, generateYearContent } from "@/lib/mockData";
import {
  Download, Eye, Play, Lock, FileText, BookOpen, Video, Trophy, Bell, Star,
  LayoutDashboard, User, LogOut, Menu, X, GraduationCap,
} from "lucide-react";

const mathSymbols = ["∫", "Σ", "π", "√", "∞", "Δ", "θ", "λ"];

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

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(String(years[0]));
  const [sidebarTab, setSidebarTab] = useState<"dashboard" | "profile">("dashboard");
  const [sideOpen, setSideOpen] = useState(false);

  if (!user) return <Navigate to="/login" />;

  const yearContent = generateYearContent(Number(selectedYear));

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
            onClick={() => { setSidebarTab(item.key); setSideOpen(false); }}
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
            <DashboardTab
              user={user}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              yearContent={yearContent}
            />
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

function DashboardTab({ user, selectedYear, setSelectedYear, yearContent }: any) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-display font-bold text-foreground">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-sm text-muted-foreground">A/L {user.alYear} · {user.district}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {user.badges.map((b: string) => (
            <Badge key={b} variant="secondary" className="text-xs gap-1">
              <Star className="h-3 w-3 text-warning" />
              {b}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {[
          { icon: Trophy, label: "Progress", value: "72%", color: "text-accent" },
          { icon: FileText, label: "Papers Done", value: "18", color: "text-primary" },
          { icon: Bell, label: "Notifications", value: "3", color: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center hover-lift group">
            <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color} transition-transform duration-300 group-hover:scale-125`} />
            <div className="text-lg font-display font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Year Tabs */}
      <Tabs value={selectedYear} onValueChange={setSelectedYear}>
        <TabsList className="w-full mb-6">
          {years.map((y) => (
            <TabsTrigger key={y} value={String(y)} className="flex-1 font-display">
              {y} A/L
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedYear}>
          {/* Category Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: BookOpen, label: "Theory Classes", color: "gradient-primary" },
              { icon: FileText, label: "Paper Classes", color: "gradient-accent" },
              { icon: Video, label: "Revision Classes", color: "bg-warning" },
            ].map((c, i) => (
              <div
                key={c.label}
                className={`${c.color} rounded-xl p-4 text-center text-primary-foreground hover-lift cursor-pointer animate-fade-in-up group`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <c.icon className="h-6 w-6 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs font-semibold">{c.label}</span>
              </div>
            ))}
          </div>

          {/* Month Accordion */}
          <Accordion type="single" collapsible className="space-y-2">
            {yearContent.months.map((month: any, mi: number) => (
              <AccordionItem
                key={month.month}
                value={month.month}
                className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${mi * 0.05}s` }}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <span className="font-display font-semibold text-foreground">{month.month}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    {month.weeks.map((week: any) => (
                      <WeekCard key={week.week} week={week} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function WeekCard({ week }: { week: any }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
      <h4 className="font-display font-semibold text-sm text-primary mb-3 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
          {week.week}
        </span>
        Week {week.week}
      </h4>
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
