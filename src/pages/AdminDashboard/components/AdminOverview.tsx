import { students } from "@/lib/mockData";

export default function AdminOverview() {
  const stats = [
    { label: "Total Students", value: students.length, color: "text-primary" },
    { label: "Active Year", value: "2026", color: "text-accent" },
    { label: "Papers Uploaded", value: 42, color: "text-warning" },
    { label: "Videos Available", value: 36, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-card rounded-xl border border-border p-5 hover-lift"
        >
          <div
            className={`text-3xl font-display font-bold ${s.color} animate-count-up`}
          >
            {s.value}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
