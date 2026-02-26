import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Student } from "../types";

interface StudentsTableProps {
  students: Student[];
}

export default function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-semibold text-foreground">
                Name
              </th>
              <th className="text-left p-3 font-semibold text-foreground hidden sm:table-cell">
                District
              </th>
              <th className="text-left p-3 font-semibold text-foreground">
                Year
              </th>
              <th className="text-left p-3 font-semibold text-foreground">
                Video
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <div className="font-medium text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.email}</div>
                </td>
                <td className="p-3 hidden sm:table-cell text-muted-foreground">
                  {s.district}
                </td>
                <td className="p-3">
                  <Badge variant="secondary">{s.alYear}</Badge>
                </td>
                <td className="p-3">
                  <Switch
                    defaultChecked={Object.keys(s.videoAccess).length > 0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
