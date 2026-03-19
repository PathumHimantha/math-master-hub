import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

interface VideoUploadProps {
  year: string;
  month: string;
  week: string;
}

const categories = ["Theory", "Paper Discussion", "Revision"];

export default function VideoUpload({ year, month, week }: VideoUploadProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration || !category || !videoUrl) {
      toast.error("Please fill all fields");
      return;
    }

    setUploading(true);
    try {
      const response = await fetch(API_ENDPOINTS.VIDEOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          duration: parseInt(duration),
          category,
          video_url: videoUrl,
          year,
          month,
          week,
        }),
      });

      if (response.ok) {
        toast.success("Video added successfully");
        setTitle("");
        setDuration("");
        setCategory("");
        setVideoUrl("");
      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to add video");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Video Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Integration by Parts"
        />
      </div>

      <div className="space-y-2">
        <Label>Video URL</Label>
        <Input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=... or direct URL"
          type="url"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="45"
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
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
      </div>

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? "Adding..." : "Add Video"}
      </Button>
    </form>
  );
}
