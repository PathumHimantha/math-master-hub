import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <GraduationCap className="h-6 w-6" />
            MathsMaster Sri Lanka
          </div>
          <p className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} A/L Combined Maths Mastery Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
