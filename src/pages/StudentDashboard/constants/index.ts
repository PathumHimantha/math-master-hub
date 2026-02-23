import { BookOpen, FileText, Video } from "lucide-react";
import { YearMeta, Category } from "../types";

export const mathSymbols = ["∫", "Σ", "π", "√", "∞", "Δ", "θ", "λ"];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const yearMeta: Record<number, YearMeta> = {
  2026: { alDate: "August 2026", status: "Active", color: "gradient-primary" },
  2027: { alDate: "August 2027", status: "Active", color: "gradient-accent" },
  2028: { alDate: "August 2028", status: "Coming Soon", color: "bg-warning" },
};

export const categories: Category[] = [
  {
    key: "theory",
    label: "Theory Classes",
    icon: BookOpen,
    description:
      "Structured theory lessons covering Pure & Applied Mathematics",
    gradient: "gradient-primary",
  },
  {
    key: "paper",
    label: "Paper Classes",
    icon: FileText,
    description: "Past paper discussions and exam technique practice",
    gradient: "gradient-accent",
  },
  {
    key: "revision",
    label: "Revision Classes",
    icon: Video,
    description: "Intensive revision sessions before examinations",
    gradient: "bg-warning",
  },
];
