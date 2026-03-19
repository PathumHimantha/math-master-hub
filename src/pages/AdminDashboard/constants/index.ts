import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  FileText,
  Video,
  Shield,
} from "lucide-react";
import { SidebarItem } from "../types";

export const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Students" },
  { icon: Calendar, label: "Years" },
  { icon: BookOpen, label: "Content" },
  { icon: FileText, label: "Papers" },
  { icon: Video, label: "Videos" },
  { icon: Shield, label: "Tutes" },
  { icon: Shield, label: "Access" },
];

export const years = [2026, 2027, 2028];
