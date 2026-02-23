import { useState } from "react";
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

interface WeekCardProps {
  week: any;
}

export default function WeekCard({ week }: WeekCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Paper */}
        <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Past Paper
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {week.paper.title}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
              <Eye className="h-3 w-3 mr-1" /> View
            </Button>
            <Button size="sm" variant="outline" className="text-xs h-7 flex-1">
              <Download className="h-3 w-3 mr-1" /> Get
            </Button>
          </div>
        </div>

        {/* Tute */}
        <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-foreground">
              Tutorial
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {week.tute.title}
          </p>
          <Button size="sm" variant="outline" className="text-xs h-7 w-full">
            <Download className="h-3 w-3 mr-1" /> Download PDF
          </Button>
        </div>

        {/* Video */}
        <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/80 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Video className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold text-foreground">
              Video Lesson
            </span>
          </div>
          {week.video.accessGranted ? (
            <>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {week.video.title}
              </p>
              {showVideo ? (
                <div className="rounded-lg overflow-hidden border border-border aspect-video bg-foreground/5">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title={week.video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Button
                  size="sm"
                  className="text-xs h-7 w-full bg-accent hover:bg-accent/90"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="h-3 w-3 mr-1" /> Play Video
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-3 bg-foreground/[0.03] rounded-lg">
              <Lock className="h-6 w-6 mx-auto text-muted-foreground mb-1 animate-pulse-soft" />
              <p className="text-xs text-muted-foreground">Access Locked</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
