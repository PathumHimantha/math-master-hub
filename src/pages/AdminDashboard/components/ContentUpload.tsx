import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, ChevronRight } from "lucide-react";
import { years } from "../constants";

export default function ContentUpload() {
  const [formData, setFormData] = useState({
    year: "",
    month: "",
    week: "",
    videoLink: "",
  });

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">
        Upload Weekly Content
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">
            Year
          </label>
          <Select
            value={formData.year}
            onValueChange={(v) => setFormData({ ...formData, year: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">
            Month
          </label>
          <Input
            placeholder="e.g., January"
            value={formData.month}
            onChange={(e) =>
              setFormData({ ...formData, month: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">
            Week
          </label>
          <Input
            placeholder="e.g., 1"
            type="number"
            value={formData.week}
            onChange={(e) => setFormData({ ...formData, week: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">
            Video Link
          </label>
          <Input
            placeholder="https://..."
            value={formData.videoLink}
            onChange={(e) =>
              setFormData({ ...formData, videoLink: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" /> Upload Paper
        </Button>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" /> Upload Tute
        </Button>
        <Button className="gap-2">
          <ChevronRight className="h-4 w-4" /> Save Content
        </Button>
      </div>
    </div>
  );
}
