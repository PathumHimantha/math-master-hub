import { useState, useEffect } from "react";
import { students } from "@/lib/mockData";
import { API_ENDPOINTS } from "@/config/api";
import {
  Users,
  FileText,
  Video,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  PlayCircle,
} from "lucide-react";

interface ClassMatrix {
  total_students: number;
  total_papers: number;
  total_videos: number;
}

export default function AdminOverview() {
  const [matrixData, setMatrixData] = useState<ClassMatrix | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchClassMatrix = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.MATRIX}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMatrixData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchClassMatrix();
  }, []);

  // Stats configuration with icons and gradients
  const stats = [
    {
      label: "Total Students",
      value: matrixData?.total_students || 0,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Current Year",
      value: currentYear,
      icon: Calendar,
      gradient: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-50",
      iconColor: "text-purple-600",
      subtext: "Academic Session",
    },
    {
      label: "Papers Uploaded",
      value: matrixData?.total_papers || 0,
      icon: FileText,
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "+5",
      trendUp: true,
    },
    {
      label: "Videos Available",
      value: matrixData?.total_videos || 0,
      icon: Video,
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: matrixData?.total_videos ? "+3" : "0",
      trendUp: matrixData?.total_videos ? true : false,
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="mt-4">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <p className="text-red-600">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening with your academy.
          </p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
          <Award size={20} />
          <span className="font-semibold">Academic Year {currentYear}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isTrendPositive = stat.trendUp;

          return (
            <div
              key={stat.label}
              className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon with Gradient Background */}
              <div className="flex items-center justify-between">
                <div
                  className={`${stat.bgLight} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>

                {/* Trend Indicator */}
                {stat.trend && (
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${isTrendPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 ${!isTrendPositive && "rotate-180"}`}
                    />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>

              {/* Value and Label */}
              <div className="mt-4">
                <div className="text-3xl font-bold text-gray-800">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  {stat.label}
                  {stat.subtext && (
                    <span className="text-xs text-gray-400 ml-1">
                      • {stat.subtext}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar for Students/Papers (optional visual enhancement) */}
              {(stat.label === "Total Students" ||
                stat.label === "Papers Uploaded") && (
                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    style={{
                      width: `${Math.min((stat.value / 50) * 100, 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
