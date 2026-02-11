import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Navigate } from "react-router-dom";
import { students, years } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard, Users, Calendar, BookOpen, FileText, Video,
  Upload, Shield, GraduationCap, Menu, X, ChevronRight,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Students" },
  { icon: Calendar, label: "Years" },
  { icon: BookOpen, label: "Content" },
  { icon: FileText, label: "Papers" },
  { icon: Video, label: "Videos" },
  { icon: Shield, label: "Access" },
];

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [sideOpen, setSideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [yearFilter, setYearFilter] = useState("all");

  if (!isAdmin) return <Navigate to="/login" />;

  const filteredStudents = yearFilter === "all"
    ? students
    : students.filter((s) => s.alYear === Number(yearFilter));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-60 gradient-hero text-primary-foreground min-h-screen">
        <div className="p-4 flex items-center gap-2 font-display font-bold text-lg border-b border-primary-foreground/10">
          <GraduationCap className="h-6 w-6" />
          Admin Panel
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.label
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {sideOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSideOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 gradient-hero text-primary-foreground animate-slide-in-left">
            <div className="p-4 flex items-center justify-between border-b border-primary-foreground/10">
              <span className="font-display font-bold">Admin</span>
              <button onClick={() => setSideOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="p-3 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { setActiveTab(item.label); setSideOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.label
                      ? "bg-primary-foreground/20"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3">
          <button className="md:hidden" onClick={() => setSideOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display font-semibold text-foreground">{activeTab}</h1>
        </header>

        <main className="p-4 md:p-6">
          {activeTab === "Dashboard" && <AdminOverview />}
          {activeTab === "Students" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-3 font-semibold text-foreground">Name</th>
                        <th className="text-left p-3 font-semibold text-foreground hidden sm:table-cell">District</th>
                        <th className="text-left p-3 font-semibold text-foreground">Year</th>
                        <th className="text-left p-3 font-semibold text-foreground">Video</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="border-b border-border last:border-0">
                          <td className="p-3">
                            <div className="font-medium text-foreground">{s.name}</div>
                            <div className="text-xs text-muted-foreground">{s.email}</div>
                          </td>
                          <td className="p-3 hidden sm:table-cell text-muted-foreground">{s.district}</td>
                          <td className="p-3">
                            <Badge variant="secondary">{s.alYear}</Badge>
                          </td>
                          <td className="p-3">
                            <Switch defaultChecked={Object.keys(s.videoAccess).length > 0} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Content" && (
            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">Upload Weekly Content</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Year</label>
                    <Select><SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                      <SelectContent>{years.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Month</label>
                    <Input placeholder="e.g., January" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Week</label>
                    <Input placeholder="e.g., 1" type="number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Video Link</label>
                    <Input placeholder="https://..." />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Upload Paper</Button>
                  <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Upload Tute</Button>
                  <Button className="gap-2"><ChevronRight className="h-4 w-4" /> Save Content</Button>
                </div>
              </div>
            </div>
          )}
          {(activeTab === "Years" || activeTab === "Papers" || activeTab === "Videos" || activeTab === "Access") && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="font-display text-lg">Manage {activeTab}</p>
              <p className="text-sm mt-2">This section will be expanded with full CRUD functionality.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function AdminOverview() {
  const stats = [
    { label: "Total Students", value: students.length, color: "text-primary" },
    { label: "Active Year", value: "2027", color: "text-accent" },
    { label: "Papers Uploaded", value: 42, color: "text-warning" },
    { label: "Videos Available", value: 36, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card rounded-xl border border-border p-5 hover-lift">
          <div className={`text-3xl font-display font-bold ${s.color} animate-count-up`}>{s.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
