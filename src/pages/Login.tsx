import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import MathBackground from "@/components/MathBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isAdminMode) {
        if (await adminLogin(email, password)) {
          toast.success("Welcome, Admin!");
          navigate("/admin");
        } else {
          toast.error("Invalid admin credentials");
        }
      } else {
        if (await login(email, password)) {
          toast.success("Welcome back!");
          navigate("/dashboard");
        } else {
          toast.error("Invalid email/mobile or password");
        }
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative math-grid-bg-dark p-4">
      <MathBackground />
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-lg p-8 relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display font-bold text-xl text-primary mb-2"
          >
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
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            disabled={isLoading}
          >
            {isAdminMode ? "← Back to Student Login" : "Admin Login →"}
          </button>
          {!isAdminMode && (
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          )}
        </div>

        {!isAdminMode && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <strong>Demo:</strong> ituser1@gmail.com / 123456
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
