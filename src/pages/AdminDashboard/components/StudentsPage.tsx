import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import StudentsTable from "../components/StudentsTable";
import { years } from "../constants";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  email: string;
  mobile: string;
  district: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [searching, setSearching] = useState(false);

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (name?: string, email?: string) => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (email) params.append("email", email);

      const url = `${API_ENDPOINTS.STUDENTS}${params.toString() ? `?${params.toString()}` : ""}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } else {
        toast.error("Failed to fetch students");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearching(true);
    fetchStudents(searchName, searchEmail);
    setTimeout(() => setSearching(false), 500);
  };

  const handleClearSearch = () => {
    setSearchName("");
    setSearchEmail("");
    fetchStudents(); // Fetch all students
  };

  // Filter by year locally (since year might not be in the API response)
  useEffect(() => {
    if (yearFilter === "all") {
      setFilteredStudents(students);
    } else {
      // Note: Since the API doesn't return alYear, we'll show all students
      // You can modify this if your API returns year information
      setFilteredStudents(students);
    }
  }, [yearFilter, students]);

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Name Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="pl-9"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* Email Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="pl-9"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* Year Filter */}
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y} A/L
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              disabled={loading || searching}
              className="flex-1 gap-2"
            >
              {loading || searching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>

            {(searchName || searchEmail) && (
              <Button
                variant="outline"
                onClick={handleClearSearch}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-muted-foreground">
          Found {filteredStudents.length} student
          {filteredStudents.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
          <p className="text-muted-foreground">Loading students...</p>
        </div>
      ) : (
        <StudentsTable students={filteredStudents} />
      )}
    </div>
  );
}
