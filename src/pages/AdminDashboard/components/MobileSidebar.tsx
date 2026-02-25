import { X, LogOut } from "lucide-react";
import { sidebarItems } from "../constants";

interface MobileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export default function MobileSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  onClose,
}: MobileSidebarProps) {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />
      <aside className="absolute left-0 top-0 bottom-0 w-60 gradient-hero text-primary-foreground animate-slide-in-left flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-primary-foreground/10">
          <span className="font-display font-bold">Admin</span>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                onClose();
              }}
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
        <div className="p-3 border-t border-primary-foreground/10">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-destructive/20 hover:text-primary-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}
