// src/config/api.ts

export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/it/auth/register`,
  LOGIN: `${API_BASE_URL}/it/auth/login`,
  ADMIN_LOGIN: `${API_BASE_URL}/it/auth/admin/login`, // Adjust if needed
  // Add other endpoints as needed
};
