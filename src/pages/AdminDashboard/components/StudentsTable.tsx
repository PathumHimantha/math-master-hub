import { Badge } from "@/components/ui/badge";

interface Student {
  id: string;
  name: string;
  email: string;
  mobile: string;
  district: string;
}

interface StudentsTableProps {
  students: Student[];
}

export default function StudentsTable({ students }: StudentsTableProps) {
  if (students.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <p className="text-muted-foreground">No students found</p>
      </div>
    );
  }

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
                Email
              </th>
              <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">
                Mobile
              </th>
              <th className="text-left p-3 font-semibold text-foreground">
                District
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="p-3">
                  <div className="font-medium text-foreground">
                    {student.name}
                  </div>
                </td>
                <td className="p-3 hidden sm:table-cell text-muted-foreground">
                  {student.email}
                </td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">
                  {student.mobile}
                </td>
                <td className="p-3">
                  <Badge variant="secondary">{student.district}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
