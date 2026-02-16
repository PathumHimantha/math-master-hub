export interface Student {
  id: string;
  name: string;
  email: string;
  mobile: string;
  district: string;
  alYear: number;
  password: string;
  badges: string[];
  videoAccess: Record<string, boolean>;
}

export interface WeekContent {
  week: number;
  paper: { title: string; url: string };
  tute: { title: string; url: string };
  video: { title: string; url: string; thumbnail: string; accessGranted: boolean };
}

export interface MonthContent {
  month: string;
  weeks: WeekContent[];
}

export interface YearContent {
  year: number;
  months: MonthContent[];
}

export const students: Student[] = [
  {
    id: "1",
    name: "Nimesh Perera",
    email: "nimesh@example.com",
    mobile: "0771234567",
    district: "Colombo",
    alYear: 2026,
    password: "pass123",
    badges: ["Top Performer", "Consistent Student"],
    videoAccess: { "2026-January-1": true, "2026-January-2": true, "2026-February-1": false },
  },
  {
    id: "2",
    name: "Kavindi Fernando",
    email: "kavindi@example.com",
    mobile: "0779876543",
    district: "Kandy",
    alYear: 2027,
    password: "pass123",
    badges: ["Paper Expert"],
    videoAccess: { "2027-January-1": true },
  },
  {
    id: "3",
    name: "Tharindu Silva",
    email: "tharindu@example.com",
    mobile: "0775554433",
    district: "Galle",
    alYear: 2025,
    password: "pass123",
    badges: ["Consistent Student"],
    videoAccess: {},
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function generateWeeks(year: number, month: string): WeekContent[] {
  return [1, 2, 3, 4].map((w) => ({
    week: w,
    paper: {
      title: `${year} ${month} Week ${w} - Past Paper`,
      url: "#",
    },
    tute: {
      title: `${year} ${month} Week ${w} - Tutorial Sheet`,
      url: "#",
    },
    video: {
      title: `${year} ${month} Week ${w} - Video Lesson`,
      url: "#",
      thumbnail: "",
      accessGranted: Math.random() > 0.4,
    },
  }));
}

export function generateYearContent(year: number): YearContent {
  return {
    year,
    months: MONTHS.map((m) => ({
      month: m,
      weeks: generateWeeks(year, m),
    })),
  };
}

export const years = [2028, 2027, 2026];

export const courseHighlights = [
  { title: "Pure Mathematics", description: "Algebra, Calculus, Trigonometry and more", icon: "function-square" },
  { title: "Applied Mathematics", description: "Real-world problem solving techniques", icon: "cog" },
  { title: "Mechanics", description: "Forces, motion and energy concepts", icon: "move" },
  { title: "Statistics", description: "Data analysis and probability theory", icon: "bar-chart" },
  { title: "Past Paper Discussions", description: "Detailed walkthroughs of A/L papers", icon: "file-text" },
  { title: "Revision Classes", description: "Intensive revision before examinations", icon: "refresh-cw" },
];

export const universities = [
  {
    name: "University of Moratuwa",
    faculty: "Engineering Faculty",
    location: "Moratuwa, Colombo",
    description: "Sri Lanka's premier engineering university, renowned for producing top engineers and IT professionals.",
    badge: "Top Ranked",
  },
  {
    name: "University of Peradeniya",
    faculty: "Engineering Faculty",
    location: "Peradeniya, Kandy",
    description: "One of the oldest and most prestigious universities with a world-class engineering program.",
    badge: "Established 1942",
  },
  {
    name: "University of Ruhuna",
    faculty: "Engineering Faculty",
    location: "Hapugala, Galle",
    description: "Growing engineering faculty with modern facilities and strong industry partnerships.",
    badge: "Southern Hub",
  },
  {
    name: "University of Sri Jayewardenepura",
    faculty: "Applied Sciences",
    location: "Nugegoda, Colombo",
    description: "Leading applied sciences programs preparing students for technology careers.",
    badge: "Innovation Leader",
  },
  {
    name: "Open University of Sri Lanka",
    faculty: "Engineering Programs",
    location: "Nawala, Colombo",
    description: "Flexible engineering programs for distance learners across the island.",
    badge: "Flexible Learning",
  },
  {
    name: "University of Jaffna",
    faculty: "Engineering Faculty",
    location: "Thirunelvely, Jaffna",
    description: "Northern region's premier university with a growing engineering faculty and research programs.",
    badge: "Northern Pride",
  },
];

export const features = [
  "Structured Year-wise Learning",
  "Weekly Theory & Paper Classes",
  "Downloadable Tutes",
  "Past Paper Analysis",
  "Video Lesson Access",
  "Progress Tracking",
  "Direct Tutor Support",
];
