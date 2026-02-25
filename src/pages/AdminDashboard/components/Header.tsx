import { Menu } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  onMenuClick: () => void;
}

export default function Header({ activeTab, onMenuClick }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3">
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="font-display font-semibold text-foreground">
        {activeTab}
      </h1>
    </header>
  );
}
