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
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

interface PaperUploadProps {
  year: string;
  month: string;
  week: string;
}

const subjects = [
  "Pure Mathematics",
  "Applied Mathematics",
  "Combined Mathematics",
];
const classTypes = ["Theory", "Paper Class", "Revision"]; // Add your class types here

export default function PaperUpload({ year, month, week }: PaperUploadProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [classType, setClassType] = useState(""); // New state for class_type
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
    if (!file || !title || !subject || !classType) {
      toast.error("Please fill all fields");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("month", month);
    formData.append("week", week);
    formData.append("subject", subject);
    formData.append("class_type", classType); // Add class_type
    formData.append("file", file);

    try {
      const response = await fetch(API_ENDPOINTS.PAPERS, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Paper uploaded successfully");
        setTitle("");
        setSubject("");
        setClassType("");
        setFile(null);
      } else {
        const error = await response.json();
        toast.error(error.sqlMessage || "Upload failed");
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
        <Label>Paper Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 2020 Pure Mathematics Paper"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Class Type</Label>
          <Select value={classType} onValueChange={setClassType} required>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {classTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Subject</Label>
          <Select value={subject} onValueChange={setSubject} required>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Display selected year/month/week as read-only info */}
      <div className="bg-muted/50 rounded-lg p-3 text-sm">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <span className="text-xs text-muted-foreground">Year</span>
            <p className="font-medium">{year || "Not selected"}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Month</span>
            <p className="font-medium">{month || "Not selected"}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Week</span>
            <p className="font-medium">{week || "Not selected"}</p>
          </div>
        </div>
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
                id="paper-file"
                required
              />
              <label
                htmlFor="paper-file"
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
                <FileText className="h-4 w-4 text-primary" />
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
        {uploading ? "Uploading..." : "Upload Paper"}
      </Button>
    </form>
  );
}
