import { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Calendar,
  BookOpen,
  Filter,
  Search,
  ChevronDown,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_BASE_URL } from "@/config/api";
import { format } from "date-fns";
import { toast } from "sonner";

interface Paper {
  id: number;
  title: string;
  class_type: string;
  year: number;
  month: string;
  week: number;
  file_location: string;
  created_at: string;
}

interface PapersTableProps {
  papers: Paper[];
  onDelete?: (id: number) => void;
  loading?: boolean;
}

const classTypeColors: Record<string, string> = {
  Theory: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Practice:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Paper:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  Revision:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Model: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  Tute: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export default function PapersTable({
  papers,
  onDelete,
  loading = false,
}: PapersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Get unique years and types for filters
  const uniqueYears = [...new Set(papers.map((p) => p.year))].sort(
    (a, b) => b - a,
  );
  const uniqueTypes = [...new Set(papers.map((p) => p.class_type))];

  // Filter papers
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.class_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear =
      yearFilter === "all" || paper.year.toString() === yearFilter;
    const matchesType = typeFilter === "all" || paper.class_type === typeFilter;

    return matchesSearch && matchesYear && matchesType;
  });

  const handleDownload = (fileLocation: string, title: string) => {
    const url = `${API_BASE_URL}/${fileLocation.replace(/\\/g, "/")}`;
    const link = document.createElement("a");
    link.href = url;
    link.download = title.replace(/\s+/g, "_") + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started");
  };

  const handleView = (fileLocation: string) => {
    const url = `${API_BASE_URL}/${fileLocation.replace(/\\/g, "/")}`;
    window.open(url, "_blank");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this paper?")) return;

    setDeletingId(id);
    try {
      // You'll need to implement this API endpoint
      const response = await fetch(`${API_BASE_URL}/maths/api/papers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Paper deleted successfully");
        if (onDelete) onDelete(id);
      } else {
        toast.error("Failed to delete paper");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
        <p className="text-muted-foreground">Loading papers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search papers by title or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Year Filter */}
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} A/L
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <BookOpen className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(searchTerm || yearFilter !== "all" || typeFilter !== "all") && (
          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm("")}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            {yearFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Year: {yearFilter}
                <button onClick={() => setYearFilter("all")}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
            {typeFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Type: {typeFilter}
                <button onClick={() => setTypeFilter("all")}>
                  <X className="h-3 w-3 ml-1" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results count */}
        <div className="mt-3 text-sm text-muted-foreground">
          Found {filteredPapers.length} paper
          {filteredPapers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-display font-semibold text-foreground mb-2">
            No papers found
          </h3>
          <p className="text-muted-foreground">
            {papers.length === 0
              ? "No papers have been uploaded yet."
              : "Try adjusting your filters to see more results."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 group"
            >
              {/* Header with icon */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground line-clamp-1">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={
                            classTypeColors[paper.class_type] ||
                            "bg-muted text-muted-foreground"
                          }
                        >
                          {paper.class_type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Week {paper.week}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleView(paper.file_location)}
                      >
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleDownload(paper.file_location, paper.title)
                        }
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </DropdownMenuItem>
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => handleDelete(paper.id)}
                          className="text-destructive focus:text-destructive"
                          disabled={deletingId === paper.id}
                        >
                          {deletingId === paper.id ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                          )}
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Metadata */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{paper.year} A/L</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{paper.month || "N/A"}</span>
                  </div>
                </div>

                {/* Week indicator */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    Week {paper.week}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Added {formatDate(paper.created_at)}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleView(paper.file_location)}
                  >
                    <Eye className="h-4 w-4" /> View
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() =>
                      handleDownload(paper.file_location, paper.title)
                    }
                  >
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
