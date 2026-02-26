import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, RefreshCw } from "lucide-react";
import PapersTable from "../components/PapersTable";
import PaperUpload from "../components/PaperUpload";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

interface Paper {
  id: number;
  title: string;
  class_type: string;
  year: number;
  month: string;
  week: number;
  file_location: string;
  created_at: string;
}

export default function PapersPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("view");

  const fetchPapers = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.PAPERS);
      if (response.ok) {
        const data = await response.json();
        setPapers(data);
      } else {
        toast.error("Failed to fetch papers");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPapers();
  };

  const handleDelete = (id: number) => {
    setPapers(papers.filter((paper) => paper.id !== id));
  };

  const handleUploadSuccess = () => {
    setActiveTab("view");
    fetchPapers();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Past Papers
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and organize past papers for all years
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => setActiveTab("upload")}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload New
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="view" className="gap-2">
            <FileText className="h-4 w-4" />
            All Papers
          </TabsTrigger>
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-4">
          <PapersTable
            papers={papers}
            onDelete={handleDelete}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="upload">
          <div className="bg-card rounded-xl border border-border p-6">
            <PaperUpload
              onSuccess={handleUploadSuccess}
              onCancel={() => setActiveTab("view")}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
