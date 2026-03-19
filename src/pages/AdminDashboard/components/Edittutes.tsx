import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Pencil,
  Trash2,
  Filter,
  FileText,
  Upload,
  X,
  CheckCircle2,
  Search,
} from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tute {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  month: string;
  week: string;
  file_location: string;
  created_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const YEARS = ["2025", "2026", "2027", "2028"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];
const CATEGORIES = ["Theory", "Revision", "Exercises"];

const CATEGORY_COLORS: Record<string, string> = {
  Theory: "bg-blue-100 text-blue-700 border-blue-200",
  Revision: "bg-amber-100 text-amber-700 border-amber-200",
  Exercises: "bg-green-100 text-green-700 border-green-200",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function EditTutes() {
  // Filter state
  const [filterYear, setFilterYear] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterWeek, setFilterWeek] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Data state
  const [tutes, setTutes] = useState<Tute[]>([]);
  const [loading, setLoading] = useState(false);

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editTute, setEditTute] = useState<Tute | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editMonth, setEditMonth] = useState("");
  const [editWeek, setEditWeek] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTute, setDeleteTute] = useState<Tute | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const fetchTutes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterYear !== "all") params.append("year", filterYear);
      if (filterMonth !== "all") params.append("month", filterMonth);
      if (filterWeek !== "all") params.append("week", filterWeek);
      if (filterCategory !== "all") params.append("category", filterCategory);

      const url = `${API_ENDPOINTS.GETTUTES}?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Tute[] = await res.json();
      setTutes(data);
    } catch {
      toast.error("Failed to load tutes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterYear, filterMonth, filterWeek, filterCategory]);

  // ─── Edit handlers ───────────────────────────────────────────────────────────
  const openEdit = (tute: Tute) => {
    setEditTute(tute);
    setEditTitle(tute.title);
    setEditCategory(tute.category);
    setEditDescription(tute.description);
    setEditYear(tute.year);
    setEditMonth(tute.month);
    setEditWeek(tute.week);
    setEditFile(null);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!editTute) return;
    if (
      !editTitle ||
      !editCategory ||
      !editDescription ||
      !editYear ||
      !editMonth ||
      !editWeek
    ) {
      toast.error("Please fill all fields");
      return;
    }
    const token = localStorage.getItem("token");
    setSaving(true);
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("category", editCategory);
    formData.append("description", editDescription);
    formData.append("year", editYear);
    formData.append("month", editMonth);
    formData.append("week", editWeek);
    if (editFile) {
      formData.append("file", editFile);
    } else {
      formData.append("file_location", editTute.file_location);
    }

    try {
      const res = await fetch(`${API_ENDPOINTS.TUTES}/${editTute.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // 👈 add this
        },
        body: formData,
      });

      if (!res.ok) throw new Error();
      toast.success("Tute updated successfully");
      setEditOpen(false);
      fetchTutes();
    } catch {
      toast.error("Failed to update tute");
    } finally {
      setSaving(false);
    }
  };

  // ─── Delete handlers ─────────────────────────────────────────────────────────
  const openDelete = (tute: Tute) => {
    setDeleteTute(tute);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!deleteTute) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.TUTES}/${deleteTute.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 👈 add this
        },
      });
      if (!res.ok) throw new Error();
      toast.success("Tute deleted");
      setDeleteOpen(false);
      fetchTutes();
    } catch {
      toast.error("Failed to delete tute");
    } finally {
      setDeleting(false);
    }
  };

  // ─── Filtered list (client-side search) ──────────────────────────────────────
  const displayed = tutes.filter((t) =>
    search
      ? t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
      : true,
  );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Tutes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            View, filter, edit and delete tutorial files
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1">
          {displayed.length} tute{displayed.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
          <Filter className="h-4 w-4" />
          Filters
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {MONTHS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterWeek} onValueChange={setFilterWeek}>
            <SelectTrigger>
              <SelectValue placeholder="Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Weeks</SelectItem>
              {WEEKS.map((w) => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Tutes List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          Loading tutes...
        </div>
      ) : displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
          <BookOpen className="h-10 w-10 opacity-30" />
          <p>No tutes found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((tute) => (
            <div
              key={tute.id}
              className="rounded-xl border bg-card p-4 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="mt-0.5 rounded-lg bg-accent/10 p-2 shrink-0">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm truncate">
                      {tute.title}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        CATEGORY_COLORS[tute.category] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tute.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {tute.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                    <span>{tute.year}</span>
                    <span>·</span>
                    <span>{tute.month}</span>
                    <span>·</span>
                    <span>{tute.week}</span>
                    {tute.file_location && (
                      <>
                        <span>·</span>
                        <a
                          href={`http://localhost:5000/${tute.file_location.replace(/\\/g, "/")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline flex items-center gap-1"
                        >
                          <BookOpen className="h-3 w-3" />
                          View PDF
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(tute)}
                >
                  <Pencil className="h-3.5 w-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => openDelete(tute)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Edit Dialog ─────────────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Tute</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Tute title"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={editYear} onValueChange={setEditYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Month</Label>
                <Select value={editMonth} onValueChange={setEditMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Week</Label>
                <Select value={editWeek} onValueChange={setEditWeek}>
                  <SelectTrigger>
                    <SelectValue placeholder="Week" />
                  </SelectTrigger>
                  <SelectContent>
                    {WEEKS.map((w) => (
                      <SelectItem key={w} value={w}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                placeholder="Brief description"
              />
            </div>

            {/* File upload — optional replacement */}
            <div className="space-y-2">
              <Label>Replace PDF (optional)</Label>
              <div className="border-2 border-dashed rounded-lg p-3">
                {!editFile ? (
                  <div className="text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      id="edit-tute-file"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f && f.type === "application/pdf") setEditFile(f);
                        else toast.error("Please select a PDF file");
                      }}
                    />
                    <label
                      htmlFor="edit-tute-file"
                      className="cursor-pointer flex flex-col items-center gap-1"
                    >
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Click to replace PDF
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-accent" />
                      <span className="text-xs truncate">{editFile.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {!editFile && editTute?.file_location && (
                <p className="text-xs text-muted-foreground">
                  Current:{" "}
                  <a
                    href={`http://localhost:5000/${editTute.file_location.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    View existing PDF
                  </a>
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ────────────────────────────────────────────── */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tute</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteTute?.title}
              </span>
              ? This will also remove the PDF file. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
