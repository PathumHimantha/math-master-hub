import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import GeometricShapes from "@/components/GeometricShapes";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll contact you soon.");
    setForm({ name: "", mobile: "", message: "" });
  };

  return (
    <section className="py-20 bg-muted/50 relative overflow-hidden">
      <GeometricShapes />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Get In <span className="text-gradient-accent">Touch</span>
          </h2>
          <p className="text-muted-foreground">Have questions? Reach out to us anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              required
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              required
            />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Call Us</p>
                <p className="text-sm text-muted-foreground">+94 77 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">+94 77 123 4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning flex items-center justify-center">
                <MapPin className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Locations</p>
                <p className="text-sm text-muted-foreground">Colombo · Kandy · Galle · Kurunegala</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
