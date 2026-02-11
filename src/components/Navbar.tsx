import { Link } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-primary">
          <GraduationCap className="h-7 w-7" />
          <span className="hidden sm:inline">MathsMaster</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
          {user && (
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
          )}
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Admin</Link>
          )}
          {user || isAdmin ? (
            <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm">Register</Button></Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-card p-4 flex flex-col gap-3 animate-fade-in-up">
          <Link to="/" className="text-sm font-medium" onClick={() => setOpen(false)}>Home</Link>
          {user && <Link to="/dashboard" className="text-sm font-medium" onClick={() => setOpen(false)}>Dashboard</Link>}
          {isAdmin && <Link to="/admin" className="text-sm font-medium" onClick={() => setOpen(false)}>Admin</Link>}
          {user || isAdmin ? (
            <Button variant="outline" size="sm" onClick={() => { logout(); setOpen(false); }}>Logout</Button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" onClick={() => setOpen(false)}><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register" onClick={() => setOpen(false)}><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
