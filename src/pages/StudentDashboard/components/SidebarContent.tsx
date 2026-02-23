import { GraduationCap, LogOut, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { useNavigate } from "react-router-dom";

interface SidebarContentProps {
  user: any;
  sidebarTab: "dashboard" | "profile";
  setSidebarTab: (tab: "dashboard" | "profile") => void;
  setSideOpen: (open: boolean) => void;
  setView: (view: any) => void;
}

export default function SidebarContent({
  user,
  sidebarTab,
  setSidebarTab,
  setSideOpen,
  setView,
}: SidebarContentProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" as const },
    { icon: User, label: "My Profile", key: "profile" as const },
  ];

  return (
    <>
      <div className="p-4 flex items-center gap-2 font-display font-bold text-lg border-b border-primary-foreground/10">
        <GraduationCap className="h-6 w-6" />
        <span>MathsMaster</span>
      </div>
      <div className="p-4 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-primary-foreground/60">
              A/L {user.alYear}
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setSidebarTab(item.key);
              setSideOpen(false);
              setView({ step: "years" });
            }}
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
}
