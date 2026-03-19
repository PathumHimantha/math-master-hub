import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Video,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
interface VideoItem {
  id: number;
  title: string;
  duration: number;
  category: string;
  video_url: string;
  year: string;
  month: string;
  week: string;
  created_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const categories = ["Theory", "Paper Discussion", "Revision"];
const months = [
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
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const years = ["2025", "2026", "2027", "2028"];

// ─── YouTube helpers ──────────────────────────────────────────────────────────
const getYouTubeId = (url: string): string | null => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
  } catch {}
  return null;
};

const getYouTubeThumbnail = (url: string): string | null => {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

const getEmbedUrl = (url: string): string => {
  const id = getYouTubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
  return url; // fallback for direct video URLs
};

const isYouTube = (url: string): boolean => !!getYouTubeId(url);

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Theory":
      return "bg-blue-100 text-blue-800";
    case "Paper Discussion":
      return "bg-green-100 text-green-800";
    case "Revision":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function VideosPage() {
  // List state
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: "all",
    month: "all",
    week: "all",
    category: "all",
    search: "",
  });

  // Preview dialog
  const [previewVideo, setPreviewVideo] = useState<VideoItem | null>(null);

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editVideo, setEditVideo] = useState<VideoItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editMonth, setEditMonth] = useState("");
  const [editWeek, setEditWeek] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteVideo, setDeleteVideo] = useState<VideoItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Fetch ─────────────────────────────────────────────────────────────────
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.year !== "all") params.append("year", filters.year);
      if (filters.month !== "all") params.append("month", filters.month);
      if (filters.week !== "all") params.append("week", filters.week);
      if (filters.category !== "all")
        params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);

      const res = await fetch(`${API_ENDPOINTS.VIDEOS}?${params}`);
      if (!res.ok) throw new Error();
      setVideos(await res.json());
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [filters]);

  // ─── Edit handlers ──────────────────────────────────────────────────────────
  const openEdit = (v: VideoItem) => {
    setEditVideo(v);
    setEditTitle(v.title);
    setEditCategory(v.category);
    setEditYear(v.year);
    setEditMonth(v.month);
    setEditWeek(v.week);
    setEditDuration(String(v.duration));
    setEditUrl(v.video_url);
    setEditOpen(true);
  };

  const handleSave = async () => {
    if (!editVideo) return;
    if (
      !editTitle ||
      !editCategory ||
      !editYear ||
      !editMonth ||
      !editWeek ||
      !editUrl
    ) {
      toast.error("Please fill all fields");
      return;
    }
    const token = localStorage.getItem("adminToken");
    setSaving(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.VIDEOS}/${editVideo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          year: editYear,
          month: editMonth,
          week: editWeek,
          duration: parseInt(editDuration) || 0,
          video_url: editUrl,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Video updated");
      setEditOpen(false);
      fetchVideos();
    } catch {
      toast.error("Failed to update video");
    } finally {
      setSaving(false);
    }
  };

  // ─── Delete handlers ────────────────────────────────────────────────────────
  const openDelete = (v: VideoItem) => {
    setDeleteVideo(v);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteVideo) return;
    const token = localStorage.getItem("adminToken");
    setDeleting(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.VIDEOS}/${deleteVideo.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      toast.success("Video deleted");
      setDeleteOpen(false);
      fetchVideos();
    } catch {
      toast.error("Failed to delete video");
    } finally {
      setDeleting(false);
    }
  };

  const resetFilters = () =>
    setFilters({
      year: "all",
      month: "all",
      week: "all",
      category: "all",
      search: "",
    });

  const hasActiveFilters =
    filters.year !== "all" ||
    filters.month !== "all" ||
    filters.week !== "all" ||
    filters.category !== "all" ||
    filters.search;

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Video Library</h1>
        <p className="text-muted-foreground">
          Manage and organize your educational videos
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-9"
              />
            </div>

            {[
              { key: "year", options: years, placeholder: "All Years" },
              { key: "month", options: months, placeholder: "All Months" },
              { key: "week", options: weeks, placeholder: "All Weeks" },
              {
                key: "category",
                options: categories,
                placeholder: "All Categories",
              },
            ].map(({ key, options, placeholder }) => (
              <Select
                key={key}
                value={filters[key as keyof typeof filters]}
                onValueChange={(v) => setFilters({ ...filters, [key]: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{placeholder}</SelectItem>
                  {options.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
          {hasActiveFilters && (
            <div className="flex justify-end mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="gap-2"
              >
                <X className="h-4 w-4" /> Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <Skeleton className="aspect-video w-full" />
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No videos found</p>
            <p className="text-sm text-muted-foreground">
              {hasActiveFilters
                ? "Try adjusting your filters"
                : "Add your first video to get started"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => {
            const thumb = getYouTubeThumbnail(video.video_url);
            return (
              <Card key={video.id} className="overflow-hidden">
                {/* Thumbnail */}
                <div
                  className="aspect-video bg-muted relative group cursor-pointer"
                  onClick={() => setPreviewVideo(video)}
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white rounded-full p-3">
                      <Eye className="h-5 w-5 text-black" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base line-clamp-1">
                      {video.title}
                    </CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 shrink-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => setPreviewVideo(video)}
                        >
                          <Eye className="h-4 w-4" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => openEdit(video)}
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          onClick={() => openDelete(video)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{video.duration} min</CardDescription>
                </CardHeader>

                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {video.month} · {video.week} · {video.year}
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Badge className={getCategoryColor(video.category)}>
                    {video.category}
                  </Badge>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* ── Preview Dialog ───────────────────────────────────────────────────── */}
      <Dialog
        open={!!previewVideo}
        onOpenChange={(o) => !o && setPreviewVideo(null)}
      >
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{previewVideo?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {previewVideo?.category} · {previewVideo?.duration} min ·{" "}
              {previewVideo?.month} {previewVideo?.week}, {previewVideo?.year}
            </p>
          </DialogHeader>
          <div className="aspect-video w-full">
            {previewVideo && isYouTube(previewVideo.video_url) ? (
              // YouTube embed
              <iframe
                src={getEmbedUrl(previewVideo.video_url)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : previewVideo ? (
              // Direct video file
              <video
                src={previewVideo.video_url}
                controls
                autoPlay
                className="w-full h-full bg-black"
              />
            ) : null}
          </div>
          <div className="p-4">
            <a
              href={previewVideo?.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-accent underline truncate block"
            >
              {previewVideo?.video_url}
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Video title"
              />
            </div>

            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                type="url"
              />
              {editUrl && getYouTubeThumbnail(editUrl) && (
                <img
                  src={getYouTubeThumbnail(editUrl)!}
                  alt="preview"
                  className="rounded-md h-24 object-cover mt-1"
                />
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={editYear} onValueChange={setEditYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
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
                    {months.map((m) => (
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
                    {weeks.map((w) => (
                      <SelectItem key={w} value={w}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={editCategory} onValueChange={setEditCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration (min)</Label>
                <Input
                  type="number"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  placeholder="45"
                />
              </div>
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

      {/* ── Delete Confirm ───────────────────────────────────────────────────── */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Video</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteVideo?.title}
              </span>
              ? This action cannot be undone.
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
