import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import MathBackground from "@/components/MathBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdminMode) {
      if (adminLogin(email, password)) {
        toast.success("Welcome, Admin!");
        navigate("/admin");
      } else {
        toast.error("Invalid admin credentials");
      }
    } else {
      if (login(email, password)) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email/mobile or password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative math-grid-bg-dark p-4">
      <MathBackground />
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-lg p-8 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xl text-primary mb-2">
            <GraduationCap className="h-7 w-7" />
            MathsMaster
          </Link>
          <p className="text-sm text-muted-foreground">
            {isAdminMode ? "Admin Login" : "Student Login"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email or Mobile</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {isAdminMode ? "← Back to Student Login" : "Admin Login →"}
          </button>
          {!isAdminMode && (
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
            </p>
          )}
        </div>

        {!isAdminMode && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <strong>Demo:</strong> nimesh@example.com / pass123
          </div>
        )}
        {isAdminMode && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <strong>Demo:</strong> admin@mathsmaster.lk / admin123
          </div>
        )}
      </div>
    </div>
  );
}
