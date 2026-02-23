import React, { createContext, useContext, useState, ReactNode } from "react";
import { Student } from "./mockData";
import { API_ENDPOINTS } from "@/config/api";

interface AuthContextType {
  user: Student | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
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

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAdmin(false);
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
          // alYear is not in the API, but we can add it if needed
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Assuming the API returns user data
        setUser(
          responseData.user || {
            ...data,
            id: responseData.id || String(Date.now()),
            badges: [],
            videoAccess: {},
          },
        );
        setIsAdmin(false);
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
  };

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
