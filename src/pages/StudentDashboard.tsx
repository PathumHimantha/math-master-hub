import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { years, generateYearContent } from "@/lib/mockData";
import { Download, Eye, Play, Lock, FileText, BookOpen, Video, Trophy, Bell, Star } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState(String(years[0]));

  if (!user) return <Navigate to="/login" />;

  const yearContent = generateYearContent(Number(selectedYear));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-sm text-muted-foreground">A/L {user.alYear} · {user.district}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {user.badges.map((b) => (
              <Badge key={b} variant="secondary" className="text-xs gap-1">
                <Star className="h-3 w-3 text-warning" />
                {b}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Trophy, label: "Progress", value: "72%", color: "text-accent" },
            { icon: FileText, label: "Papers Done", value: "18", color: "text-primary" },
            { icon: Bell, label: "Notifications", value: "3", color: "text-warning" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center hover-lift">
              <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
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
              ].map((c) => (
                <div key={c.label} className={`${c.color} rounded-xl p-4 text-center text-primary-foreground hover-lift cursor-pointer`}>
                  <c.icon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-xs font-semibold">{c.label}</span>
                </div>
              ))}
            </div>

            {/* Month Accordion */}
            <Accordion type="single" collapsible className="space-y-2">
              {yearContent.months.map((month) => (
                <AccordionItem key={month.month} value={month.month} className="bg-card rounded-xl border border-border overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <span className="font-display font-semibold text-foreground">{month.month}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {month.weeks.map((week) => (
                        <div key={week.week} className="border border-border rounded-lg p-4">
                          <h4 className="font-display font-semibold text-sm text-primary mb-3">Week {week.week}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Paper */}
                            <div className="bg-muted/50 rounded-lg p-3">
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
                            <div className="bg-muted/50 rounded-lg p-3">
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
                            <div className="bg-muted/50 rounded-lg p-3 relative">
                              <div className="flex items-center gap-2 mb-2">
                                <Video className="h-4 w-4 text-warning" />
                                <span className="text-xs font-semibold text-foreground">Video Lesson</span>
                              </div>
                              {week.video.accessGranted ? (
                                <>
                                  <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{week.video.title}</p>
                                  <Button size="sm" className="text-xs h-7 w-full bg-accent hover:bg-accent/90">
                                    <Play className="h-3 w-3 mr-1" /> Play
                                  </Button>
                                </>
                              ) : (
                                <div className="text-center py-2">
                                  <Lock className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
                                  <p className="text-xs text-muted-foreground">Access Locked</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
