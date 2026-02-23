import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Navigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DashboardMathBg from "./components/DashboardMathBg";
import SidebarContent from "./components/SidebarContent";
import ProfileTab from "./components/ProfileTab";
import DashboardContent from "./components/DashboardContent";
import { DashboardView } from "./types";

export default function StudentDashboard() {
  const { user } = useAuth();
  console.log("Logged in user:", user);
  const [sidebarTab, setSidebarTab] = useState<"dashboard" | "profile">(
    "dashboard",
  );
  const [sideOpen, setSideOpen] = useState(false);
  const [view, setView] = useState<DashboardView>({ step: "years" });

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardMathBg />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 gradient-hero text-primary-foreground min-h-screen relative z-10">
        <SidebarContent
          user={user}
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
          setSideOpen={setSideOpen}
          setView={setView}
        />
      </aside>

      {/* Mobile Sidebar */}
      {sideOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setSideOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-60 gradient-hero text-primary-foreground animate-slide-in-left flex flex-col">
            <div className="absolute top-3 right-3">
              <button onClick={() => setSideOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent
              user={user}
              sidebarTab={sidebarTab}
              setSidebarTab={setSidebarTab}
              setSideOpen={setSideOpen}
              setView={setView}
            />
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
