// src/components/admin/VideoAccessManager.tsx

import { useState, useEffect } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Video,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  UserPlus,
  Filter,
  Play,
  Clock,
  Calendar,
  BookOpen,
  ShieldCheck,
  ShieldOff,
  Loader2,
} from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";

// Types
interface Video {
  id: number;
  title: string;
  category: string;
  year: number;
  month: string;
  week: string;
  duration: number;
  video_url: string;
  created_at: string;
}

interface Student {
  id: number;
  name: string;
  email: string;
  mobile: string;
  district: string;
  year: number;
}

interface AccessRecord {
  id: number;
  user_id: number;
  video_id: number;
  granted_by_admin: number;
  is_active: number;
  created_at: string;
  student_name?: string;
  student_email?: string;
  video_title?: string;
  video_category?: string;
  week?: string;
}

export default function VideoAccessManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [accessRecords, setAccessRecords] = useState<AccessRecord[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [loading, setLoading] = useState({
    videos: false,
    students: false,
    access: false,
    grant: false,
  });
  const [filters, setFilters] = useState({
    week: "all",
    category: "all",
  });

  // Load videos on mount
  useEffect(() => {
    fetchVideos();
    fetchStudents();
    fetchAllAccessRecords();
  }, []);

  const fetchVideos = async () => {
    setLoading((prev) => ({ ...prev, videos: true }));
    try {
      const response = await fetch(API_ENDPOINTS.VIDEOS);
      const data = await response.json();
      // Ensure data is an array
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to load videos");
      setVideos([]);
    } finally {
      setLoading((prev) => ({ ...prev, videos: false }));
    }
  };

  const fetchStudents = async () => {
    setLoading((prev) => ({ ...prev, students: true }));
    try {
      const response = await fetch(API_ENDPOINTS.STUDENTS);
      const data = await response.json();
      // Ensure data is an array
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
      setStudents([]);
    } finally {
      setLoading((prev) => ({ ...prev, students: false }));
    }
  };

  const fetchAllAccessRecords = async () => {
    setLoading((prev) => ({ ...prev, access: true }));
    try {
      const response = await fetch(API_ENDPOINTS.VIDEO_ACCESS);
      const data = await response.json();
      // Ensure data is an array
      setAccessRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching access records:", error);
      toast.error("Failed to load access records");
      setAccessRecords([]);
    } finally {
      setLoading((prev) => ({ ...prev, access: false }));
    }
  };

  const fetchVideoAccess = async (videoId: number) => {
    setLoading((prev) => ({ ...prev, access: true }));
    try {
      const response = await fetch(
        API_ENDPOINTS.VIDEO_ACCESS_BY_VIDEO(videoId),
      );
      const data = await response.json();
      // Ensure data is an array
      setAccessRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching video access:", error);
      toast.error("Failed to load access records");
      setAccessRecords([]);
    } finally {
      setLoading((prev) => ({ ...prev, access: false }));
    }
  };

  const grantAccess = async (userId: number) => {
    if (!selectedVideo) return;

    try {
      const response = await fetch(API_ENDPOINTS.VIDEO_ACCESS_GRANT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          video_id: selectedVideo.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Access granted successfully");
        fetchVideoAccess(selectedVideo.id);
      } else {
        toast.error(data.error || "Failed to grant access");
      }
    } catch (error) {
      console.error("Error granting access:", error);
      toast.error("Network error");
    }
  };

  const revokeAccess = async (accessId: number) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.VIDEO_ACCESS_REVOKE(accessId),
        {
          method: "PATCH",
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Access revoked");
        if (selectedVideo) {
          fetchVideoAccess(selectedVideo.id);
        } else {
          fetchAllAccessRecords();
        }
      } else {
        toast.error(data.error || "Failed to revoke access");
      }
    } catch (error) {
      console.error("Error revoking access:", error);
      toast.error("Network error");
    }
  };

  const bulkGrantAccess = async () => {
    if (!selectedVideo || selectedStudents.length === 0) return;

    setLoading((prev) => ({ ...prev, grant: true }));
    try {
      const response = await fetch(API_ENDPOINTS.VIDEO_ACCESS_BULK_GRANT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_ids: selectedStudents,
          video_id: selectedVideo.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Access granted to ${selectedStudents.length} students`);
        setSelectedStudents([]);
        fetchVideoAccess(selectedVideo.id);
      } else {
        toast.error(data.error || "Failed to grant access");
      }
    } catch (error) {
      console.error("Error bulk granting access:", error);
      toast.error("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, grant: false }));
    }
  };

  // Check if a student has access to selected video
  const hasAccess = (studentId: number): boolean => {
    if (!selectedVideo) return false;
    return accessRecords.some(
      (record) =>
        record.user_id === studentId &&
        record.video_id === selectedVideo.id &&
        record.is_active === 1,
    );
  };

  // Get access record ID for a student
  const getAccessId = (studentId: number): number | null => {
    if (!selectedVideo) return null;
    const record = accessRecords.find(
      (record) =>
        record.user_id === studentId && record.video_id === selectedVideo.id,
    );
    return record?.id || null;
  };

  // Filter videos
  const filteredVideos = videos.filter((video) => {
    if (filters.week !== "all" && video.week !== filters.week) return false;
    if (filters.category !== "all" && video.category !== filters.category)
      return false;
    return true;
  });

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.district?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get unique weeks and categories for filters
  const weeks = [...new Set(videos.map((v) => v.week))].filter(Boolean).sort();
  const categories = [...new Set(videos.map((v) => v.category))]
    .filter(Boolean)
    .sort();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Video Access Management
          </h1>
          <p className="text-muted-foreground">
            Control which students can access each video
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Users className="h-4 w-4 mr-2" />
          {students.length} Students
        </Badge>
      </div>

      <Tabs defaultValue="manage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Manage Access
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        {/* Manage Access Tab */}
        <TabsContent value="manage" className="space-y-4">
          <div className="grid grid-cols-12 gap-6">
            {/* Video List - Left Column */}
            <div className="col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Videos
                  </CardTitle>
                  <CardDescription>
                    Select a video to manage access
                  </CardDescription>
                  <div className="space-y-2 pt-4">
                    <Select
                      value={filters.week}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, week: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Weeks</SelectItem>
                        {weeks.map((week) => (
                          <SelectItem key={week} value={week}>
                            Week {week}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={filters.category}
                      onValueChange={(value) =>
                        setFilters((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  {loading.videos ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : filteredVideos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No videos found
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredVideos.map((video) => (
                        <div
                          key={video.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedVideo?.id === video.id
                              ? "bg-primary/10 border-primary"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => {
                            setSelectedVideo(video);
                            fetchVideoAccess(video.id);
                            setSelectedStudents([]);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <Play className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {video.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Badge variant="secondary" className="text-xs">
                                  {video.category}
                                </Badge>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />W{video.week}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {video.duration}m
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Student Management - Right Column */}
            <div className="col-span-8">
              {selectedVideo ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedVideo.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span>Week {selectedVideo.week}</span>
                          <span>•</span>
                          <span>{selectedVideo.category}</span>
                          <span>•</span>
                          <span>{selectedVideo.duration} minutes</span>
                        </CardDescription>
                      </div>
                      {selectedStudents.length > 0 && (
                        <Button
                          onClick={bulkGrantAccess}
                          disabled={loading.grant}
                        >
                          {loading.grant ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <UserPlus className="h-4 w-4 mr-2" />
                          )}
                          Grant to {selectedStudents.length} Selected
                        </Button>
                      )}
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-4 pt-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search students by name, email, or district..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {loading.access ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox
                                  checked={
                                    filteredStudents.length > 0 &&
                                    filteredStudents.every(
                                      (s) =>
                                        hasAccess(s.id) ||
                                        selectedStudents.includes(s.id),
                                    )
                                  }
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      const noAccessIds = filteredStudents
                                        .filter((s) => !hasAccess(s.id))
                                        .map((s) => s.id);
                                      setSelectedStudents(noAccessIds);
                                    } else {
                                      setSelectedStudents([]);
                                    }
                                  }}
                                />
                              </TableHead>
                              <TableHead>Student</TableHead>
                              <TableHead>District</TableHead>
                              <TableHead>Year</TableHead>
                              <TableHead className="text-right">
                                Access
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredStudents.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={5}
                                  className="text-center py-8 text-muted-foreground"
                                >
                                  No students found
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredStudents.map((student) => {
                                const access = hasAccess(student.id);
                                const accessId = getAccessId(student.id);

                                return (
                                  <TableRow key={student.id}>
                                    <TableCell>
                                      {!access && (
                                        <Checkbox
                                          checked={selectedStudents.includes(
                                            student.id,
                                          )}
                                          onCheckedChange={(checked) => {
                                            if (checked) {
                                              setSelectedStudents([
                                                ...selectedStudents,
                                                student.id,
                                              ]);
                                            } else {
                                              setSelectedStudents(
                                                selectedStudents.filter(
                                                  (id) => id !== student.id,
                                                ),
                                              );
                                            }
                                          }}
                                        />
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <div>
                                        <p className="font-medium">
                                          {student.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {student.email}
                                        </p>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {student.district || "—"}
                                    </TableCell>
                                    <TableCell>{student.year || "—"}</TableCell>
                                    <TableCell className="text-right">
                                      {access ? (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            accessId && revokeAccess(accessId)
                                          }
                                          className="text-red-600 hover:text-red-700"
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Revoke
                                        </Button>
                                      ) : (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            grantAccess(student.id)
                                          }
                                          className="text-green-600 hover:text-green-700"
                                        >
                                          <CheckCircle2 className="h-4 w-4 mr-2" />
                                          Grant
                                        </Button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>Total: {students.length}</span>
                        <span>•</span>
                        <span>
                          With Access:{" "}
                          {students.filter((s) => hasAccess(s.id)).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">Select a video</p>
                    <p className="text-sm text-muted-foreground">
                      Choose a video from the left to manage student access
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Access Overview</CardTitle>
              <CardDescription>View all video access records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Video</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Week</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Granted On</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading.access ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ) : accessRecords.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-muted-foreground"
                        >
                          No access records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      accessRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {record.student_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {record.student_email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{record.video_title}</TableCell>
                          <TableCell>
                            {record.video_category && (
                              <Badge variant="secondary">
                                {record.video_category}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>Week {record.week}</TableCell>
                          <TableCell>
                            {record.is_active ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="destructive">Revoked</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {record.created_at
                              ? new Date(record.created_at).toLocaleDateString()
                              : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            {record.is_active && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => revokeAccess(record.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Revoke
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
