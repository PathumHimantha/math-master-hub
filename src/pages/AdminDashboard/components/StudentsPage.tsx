import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentsTable from "../components/StudentsTable";
import { students } from "@/lib/mockData";
import { years } from "../constants";

export default function StudentsPage() {
  const [yearFilter, setYearFilter] = useState("all");

  const filteredStudents =
    yearFilter === "all"
      ? students
      : students.filter((s) => s.alYear === Number(yearFilter));

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <StudentsTable students={filteredStudents} />
    </div>
  );
}
