import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import MathBackground from "@/components/MathBackground";

const districts = ["Colombo", "Kandy", "Galle", "Kurunegala", "Matara", "Jaffna", "Anuradhapura", "Ratnapura", "Badulla", "Trincomalee"];

export default function Register() {
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", district: "", alYear: "", password: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      district: form.district,
      alYear: Number(form.alYear),
      password: form.password,
    });
    toast.success("Registration successful!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative math-grid-bg-dark p-4">
      <MathBackground />
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-lg p-8 relative z-10 animate-fade-in-up">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xl text-primary mb-2">
            <GraduationCap className="h-7 w-7" />
            MathsMaster
          </Link>
          <p className="text-sm text-muted-foreground">Create your student account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Full Name</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label>Mobile Number</Label>
            <Input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="07XXXXXXXX" required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label>District</Label>
            <Select value={form.district} onValueChange={(v) => setForm({ ...form, district: v })}>
              <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
              <SelectContent>
                {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>A/L Year</Label>
            <Select value={form.alYear} onValueChange={(v) => setForm({ ...form, alYear: v })}>
              <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <Button type="submit" className="w-full mt-2">Register</Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
