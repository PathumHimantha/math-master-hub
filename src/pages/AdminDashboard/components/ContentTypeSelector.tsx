import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Video } from "lucide-react";

interface ContentTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export default function ContentTypeSelector({
  selectedType,
  onSelectType,
}: ContentTypeSelectorProps) {
  const types = [
    {
      id: "papers",
      label: "Past Papers",
      icon: FileText,
      color: "text-primary",
    },
    { id: "tutes", label: "Tutes", icon: BookOpen, color: "text-accent" },
    { id: "videos", label: "Videos", icon: Video, color: "text-warning" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {types.map((type) => (
        <Button
          key={type.id}
          type="button"
          variant={selectedType === type.id ? "default" : "outline"}
          onClick={() => onSelectType(type.id)}
          className="flex flex-col items-center gap-2 py-4 h-auto"
        >
          <type.icon
            className={`h-5 w-5 ${selectedType === type.id ? "text-white" : type.color}`}
          />
          <span className="text-xs">{type.label}</span>
        </Button>
      ))}
    </div>
  );
}
