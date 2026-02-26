import { GraduationCap, LogOut } from "lucide-react";
import { sidebarItems } from "../constants";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: SidebarProps) {
  return (
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
      <div className="p-3 border-t border-primary-foreground/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-destructive/20 hover:text-primary-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
