// src/config/api.ts

export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/maths/auth/register`,
  LOGIN: `${API_BASE_URL}/maths/auth/login`,
  ADMIN_LOGIN: `${API_BASE_URL}/maths/auth/admin/login`,
  PAPERS: `${API_BASE_URL}/maths/api/papers`,
  TUTES: `${API_BASE_URL}/maths/api/tutes`,
  VIDEOS: `${API_BASE_URL}/maths/api/videos`,
  STUDENTS: `${API_BASE_URL}/maths/api/students`,
  MATRIX: `${API_BASE_URL}/maths/api/get_class_matrix`,
  VIDEO_ACCESS: `${API_BASE_URL}/maths/api/video-access`,
  VIDEO_ACCESS_BULK: `${API_BASE_URL}/maths/api/video-access/bulk`,
  VIDEO_ACCESS_BY_STUDENT: (userId: number | string) =>
    `${API_BASE_URL}/maths/api/video-access/student/${userId}`,
  VIDEO_ACCESS_BY_VIDEO: (videoId: number | string) =>
    `${API_BASE_URL}/maths/api/video-access/video/${videoId}`,
  VIDEO_ACCESS_TOGGLE: (id: number | string) =>
    `${API_BASE_URL}/maths/api/video-access/${id}/toggle`,
  VIDEO_ACCESS_STATUS: (id: number | string) =>
    `${API_BASE_URL}/maths/api/video-access/${id}/status`,
  VIDEO_ACCESS_DELETE: (id: number | string) =>
    `${API_BASE_URL}/maths/api/video-access/${id}`,
  VIDEO_ACCESS_REVOKE: `${API_BASE_URL}/maths/api/video-access/revoke`,
};
