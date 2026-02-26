import { useState } from "react";
import { useAuth } from "@/lib/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Header from "./components/Header";
import AdminOverview from "./components/AdminOverview";
import StudentsPage from "./components/StudentsPage";
import ContentPage from "./components/ContentPage";
import PlaceholderPage from "./components/PlaceholderPage";

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [sideOpen, setSideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  if (!isAdmin) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <AdminOverview />;
      case "Students":
        return <StudentsPage />;
      case "Content":
        return <ContentPage />;
      case "Years":
      case "Papers":
      case "Videos":
      case "Access":
        return <PlaceholderPage title={activeTab} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {sideOpen && (
        <MobileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          onClose={() => setSideOpen(false)}
        />
      )}

      <div className="flex-1 min-h-screen">
        <Header activeTab={activeTab} onMenuClick={() => setSideOpen(true)} />

        <main className="p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
