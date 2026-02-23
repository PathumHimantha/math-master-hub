import React, { createContext, useContext, useState, ReactNode } from "react";
import { Student } from "./mockData";
import { API_ENDPOINTS } from "@/config/api";

interface AuthContextType {
  user: Student | null;
  isAdmin: boolean;
  login: (emailOrMobile: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (
    data: Omit<Student, "id" | "badges" | "videoAccess">,
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (emailOrMobile: string, password: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrMobile,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Map the API response to your Student interface
        // Adjust this mapping based on your actual API response structure
        const userData: Student = {
          id: data.id || data.userId || String(Date.now()),
          name: data.name || "",
          email: data.email || emailOrMobile,
          mobile: data.mobile || "",
          district: data.district || "",
          alYear: data.alYear || 0,
          badges: data.badges || [],
          videoAccess: data.videoAccess || {},
        };

        setUser(userData);
        setIsAdmin(false);

        // Optional: Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const adminLogin = async (email: string, password: string) => {
    // This would be replaced with actual admin API call
    if (email === "admin@mathsmaster.lk" && password === "admin123") {
      setIsAdmin(true);
      setUser(null);
      localStorage.setItem("isAdmin", "true");
      localStorage.removeItem("user");
      return true;
    }
    return false;
  };

  const register = async (
    data: Omit<Student, "id" | "badges" | "videoAccess">,
  ) => {
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          district: data.district,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Map the API response to your Student interface
        const userData: Student = {
          id: responseData.id || responseData.userId || String(Date.now()),
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          district: data.district,
          alYear: data.alYear,
          badges: responseData.badges || [],
          videoAccess: responseData.videoAccess || {},
        };

        setUser(userData);
        setIsAdmin(false);

        // Optional: Store in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
  };

  // Optional: Load user from localStorage on initial render
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIsAdmin = localStorage.getItem("isAdmin");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    } else if (savedIsAdmin === "true") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, login, adminLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
