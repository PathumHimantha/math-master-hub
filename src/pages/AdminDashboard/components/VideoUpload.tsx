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
import { Upload, Video, X, CheckCircle2 } from "lucide-react";
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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    } else {
      toast.error("Please select a video file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !duration || !category) {
      toast.error("Please fill all fields");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", `${title} - ${month} ${week}`);
    formData.append("duration", duration);
    formData.append("category", category);
    formData.append("file", file);

    try {
      const response = await fetch(API_ENDPOINTS.VIDEOS, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Video uploaded successfully");
        setTitle("");
        setDuration("");
        setCategory("");
        setFile(null);
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
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

      <div className="space-y-2">
        <Label>Video File</Label>
        <div className="border-2 border-dashed rounded-lg p-4">
          {!file ? (
            <div className="text-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-file"
              />
              <label
                htmlFor="video-file"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload video
                </span>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-warning" />
                <span className="text-sm truncate">{file.name}</span>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" disabled={uploading} className="w-full">
        {uploading ? "Uploading..." : "Upload Video"}
      </Button>
    </form>
  );
}
