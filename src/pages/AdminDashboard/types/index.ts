export interface Student {
  id: string;
  name: string;
  email: string;
  mobile: string;
  district: string;
  alYear: number;
  badges: string[];
  videoAccess: Record<string, any>;
}

export interface SidebarItem {
  icon: any;
  label: string;
}
