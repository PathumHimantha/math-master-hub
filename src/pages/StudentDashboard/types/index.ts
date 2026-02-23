export type DashboardView =
  | { step: "years" }
  | { step: "categories"; year: number }
  | { step: "months"; year: number; category: string }
  | { step: "weeks"; year: number; category: string; month: string };

export interface YearMeta {
  alDate: string;
  status: string;
  color: string;
}

export interface Category {
  key: string;
  label: string;
  icon: any;
  description: string;
  gradient: string;
}
