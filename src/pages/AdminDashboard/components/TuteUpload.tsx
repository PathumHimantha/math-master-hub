import { useState } from "react";
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
import { Upload, BookOpen, X, CheckCircle2 } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

interface TuteUploadProps {
  year: string;
  month: string;
  week: string;
}

const categories = ["Theory", "Revision", "Exercises"];

export default function TuteUpload({ year, month, week }: TuteUploadProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please select a PDF file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !category || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", title); // Remove the month/week concat here
    formData.append("category", category);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("year", year); // ✅ Add these three
    formData.append("month", month); // ✅
    formData.append("week", week); // ✅

    try {
      const response = await fetch(API_ENDPOINTS.TUTES, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Tute uploaded successfully");
        setTitle("");
        setCategory("");
        setDescription("");
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
        <Label>Tute Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Integration Techniques"
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

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the tute"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>PDF File</Label>
        <div className="border-2 border-dashed rounded-lg p-4">
          {!file ? (
            <div className="text-center">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="tute-file"
              />
              <label
                htmlFor="tute-file"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload PDF
                </span>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
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
        {uploading ? "Uploading..." : "Upload Tute"}
      </Button>
    </form>
  );
}
