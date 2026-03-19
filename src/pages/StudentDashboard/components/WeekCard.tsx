import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  Play,
  Lock,
  FileText,
  BookOpen,
  Video,
} from "lucide-react";
import { API_ENDPOINTS, API_BASE_URL } from "@/config/api";
import { toast } from "sonner";

interface WeekCardProps {
  week: {
    id: string;
    name: string;
    year: string;
    month: string;
    week: string;
    category: string;
  };
  userId: string;
}

interface Paper {
  id: number;
  title: string;
  file_location: string; // ✅ correct field name
  year: string;
  month: string;
  week: string;
  category: string;
}

interface Tute {
  id: number;
  title: string;
  file_location: string; // ✅ correct field name
  year: string;
  month: string;
  week: string;
  category: string;
}

interface VideoItem {
  id: number;
  title: string;
  video_url: string;
  year: string;
  month: string;
  week: string;
  category: string;
  duration: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Convert any YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string | null => {
  try {
    const u = new URL(url);
    let videoId: string | null = null;

    if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v");
    } else if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1);
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : null;
  } catch {
    return null;
  }
};

// Build full URL for a server-stored file
const getFileUrl = (filePath: string): string => {
  if (!filePath) return "";
  // Normalize Windows backslashes to forward slashes
  const normalized = filePath.replace(/\\/g, "/");
  return `${API_BASE_URL}/${normalized}`;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function WeekCard({ week, userId }: WeekCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [tute, setTute] = useState<Tute | null>(null);
  const [video, setVideo] = useState<VideoItem | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState({
    paper: true,
    tute: true,
    video: true,
  });

  useEffect(() => {
    fetchPaper();
    fetchTute();
    fetchVideo();
  }, [week]);

  // ─── Fetchers ───────────────────────────────────────────────────────────────
  const fetchPaper = async () => {
    try {
      const params = new URLSearchParams({
        year: week.year,
        month: week.month,
        week: week.week,
        category: week.category,
      });
      const res = await fetch(`${API_ENDPOINTS.GETPAPERS}?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPaper(data[0] || null);
      }
    } catch {
      console.error("Error fetching paper");
    } finally {
      setLoading((prev) => ({ ...prev, paper: false }));
    }
  };

  const fetchTute = async () => {
    try {
      const params = new URLSearchParams({
        year: week.year,
        month: week.month,
        week: week.week,
        category: week.category,
      });
      const res = await fetch(`${API_ENDPOINTS.GETTUTES}?${params}`);
      if (res.ok) {
        const data = await res.json();
        setTute(data[0] || null);
      }
    } catch {
      console.error("Error fetching tute");
    } finally {
      setLoading((prev) => ({ ...prev, tute: false }));
    }
  };

  const fetchVideo = async () => {
    try {
      const params = new URLSearchParams({
        year: week.year,
        month: week.month,
        week: week.week,
        category: week.category,
      });
      const res = await fetch(`${API_ENDPOINTS.GETVIDEOS}?${params}`);
      if (res.ok) {
        const data = await res.json();
        const videoData: VideoItem | null = data[0] || null;
        setVideo(videoData);
        if (videoData && userId) {
          checkAccess(videoData.id);
        } else {
          setLoading((prev) => ({ ...prev, video: false }));
        }
      }
    } catch {
      console.error("Error fetching video");
      setLoading((prev) => ({ ...prev, video: false }));
    }
  };

  const checkAccess = async (videoId: number) => {
    try {
      const res = await fetch(
        `${API_ENDPOINTS.VIDEOS}/${videoId}/access?userId=${userId}`,
      );
      if (res.ok) {
        const data = await res.json();
        setHasAccess(data.accessGranted);
      }
    } catch {
      console.error("Error checking access");
    } finally {
      setLoading((prev) => ({ ...prev, video: false }));
    }
  };

  // ─── PDF handlers ────────────────────────────────────────────────────────────
  const handleViewPaper = () => {
    if (!paper?.file_location) return;
    window.open(getFileUrl(paper.file_location), "_blank");
  };

  const handleDownloadPaper = async () => {
    if (!paper?.file_location) return;
    const url = getFileUrl(paper.file_location);
    const filename = paper.file_location.split(/[\\/]/).pop() || "paper.pdf";
    triggerDownload(url, filename);
  };

  const handleViewTute = () => {
    if (!tute?.file_location) return;
    window.open(getFileUrl(tute.file_location), "_blank");
  };

  const handleDownloadTute = async () => {
    if (!tute?.file_location) return;
    const url = getFileUrl(tute.file_location);
    const filename = tute.file_location.split(/[\\/]/).pop() || "tutorial.pdf";
    triggerDownload(url, filename);
  };

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ─── Video handler ───────────────────────────────────────────────────────────
  const handlePlayVideo = () => {
    if (hasAccess) {
      setShowVideo(true);
    } else {
      toast.error("You don't have access to this video");
    }
  };

  // ─── Loading state ───────────────────────────────────────────────────────────
  if (loading.paper && loading.tute && loading.video) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-muted/50 rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="h-3 bg-muted rounded w-1/2 mb-2" />
            <div className="h-7 bg-muted rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* ── Past Paper ──────────────────────────────────────────────────────── */}
      <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold">Past Paper</span>
        </div>

        {paper ? (
          <>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
              {paper.title}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 flex-1"
                onClick={handleViewPaper}
              >
                <Eye className="h-3 w-3 mr-1" /> View
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 flex-1"
                onClick={handleDownloadPaper}
              >
                <Download className="h-3 w-3 mr-1" /> Get
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-3 bg-foreground/[0.03] rounded-lg">
            <p className="text-xs text-muted-foreground">No paper available</p>
          </div>
        )}
      </div>

      {/* ── Tutorial ────────────────────────────────────────────────────────── */}
      <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold">Tutorial</span>
        </div>

        {tute ? (
          <>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
              {tute.title}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 flex-1"
                onClick={handleViewTute}
              >
                <Eye className="h-3 w-3 mr-1" /> View
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 flex-1"
                onClick={handleDownloadTute}
              >
                <Download className="h-3 w-3 mr-1" /> Get
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-3 bg-foreground/[0.03] rounded-lg">
            <p className="text-xs text-muted-foreground">
              No tutorial available
            </p>
          </div>
        )}
      </div>

      {/* ── Video Lesson ────────────────────────────────────────────────────── */}
      <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Video className="h-4 w-4 text-warning" />
          <span className="text-xs font-semibold">Video Lesson</span>
        </div>

        {video ? (
          hasAccess ? (
            <>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {video.title}
              </p>
              {showVideo ? (
                <div className="rounded-lg overflow-hidden border border-border aspect-video bg-black">
                  {/* ✅ Convert YouTube watch URL → embed URL */}
                  {getYouTubeEmbedUrl(video.video_url) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(video.video_url)!}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // Direct video file fallback
                    <video
                      src={video.video_url}
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  )}
                </div>
              ) : (
                <Button
                  size="sm"
                  className="text-xs h-7 w-full bg-accent hover:bg-accent/90"
                  onClick={handlePlayVideo}
                >
                  <Play className="h-3 w-3 mr-1" /> Play Video
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-3 bg-foreground/[0.03] rounded-lg">
              <Lock className="h-6 w-6 mx-auto text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Access Locked</p>
            </div>
          )
        ) : (
          <div className="text-center py-3 bg-foreground/[0.03] rounded-lg">
            <p className="text-xs text-muted-foreground">No video available</p>
          </div>
        )}
      </div>
    </div>
  );
}
