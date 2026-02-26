// src/config/api.ts

export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/maths/auth/register`,
  LOGIN: `${API_BASE_URL}/maths/auth/login`,
  ADMIN_LOGIN: `${API_BASE_URL}/maths/auth/admin/login`,
  PAPERS: `${API_BASE_URL}/maths/api/papers`,
  TUTES: `${API_BASE_URL}/maths/api/tutes`,
  VIDEOS: `${API_BASE_URL}/maths/api/videos`,
};
