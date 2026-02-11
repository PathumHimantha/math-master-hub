import React, { createContext, useContext, useState, ReactNode } from "react";
import { students, Student } from "./mockData";

interface AuthContextType {
  user: Student | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  adminLogin: (email: string, password: string) => boolean;
  register: (data: Omit<Student, "id" | "badges" | "videoAccess">) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Student | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (email: string, password: string) => {
    const found = students.find(
      (s) => (s.email === email || s.mobile === email) && s.password === password
    );
    if (found) {
      setUser(found);
      setIsAdmin(false);
      return true;
    }
    return false;
  };

  const adminLogin = (email: string, password: string) => {
    if (email === "admin@mathsmaster.lk" && password === "admin123") {
      setIsAdmin(true);
      setUser(null);
      return true;
    }
    return false;
  };

  const register = (data: Omit<Student, "id" | "badges" | "videoAccess">) => {
    const newStudent: Student = {
      ...data,
      id: String(students.length + 1),
      badges: [],
      videoAccess: {},
    };
    students.push(newStudent);
    setUser(newStudent);
    setIsAdmin(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, adminLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
