import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }
    
    return Promise.reject(error.response?.data || { message: 'API Request Failed' });
  }
);

export function login(credentials) {
  return apiClient.post('/login', credentials);
}

export function logout() {
  return apiClient.post('/logout');
}

export function register(userData) {
  return apiClient.post("/register", {
    name: `${userData.first_name} ${userData.last_name}`,
    email: userData.email,
    password: userData.password,
    role: userData.role || "student",
  });
}

export function getUserProfile(userId) {
  return apiClient.get(`/users/${userId}`);
}

export function updateUserProfile(userId, data) {
  return apiClient.put(`/users/${userId}`, data);
}

export function getTeacherData(teacherId) {
  return apiClient.get(`/teachers/${teacherId}`);
}

export function getGradebook(userId) {
  return apiClient.get(`/gradebook/${userId}`);
}

export function updateGradebook(userId, data) {
  return apiClient.put(`/gradebook/${userId}`, { grades: data });
}

export function getCourses() {
  return apiClient.get('/courses');
}

export function getCourse(courseId) {
  return apiClient.get(`/courses/${courseId}`);
}

export function enrollCourse(userId, courseId) {
  return apiClient.post(`/users/${userId}/courses`, { course_id: courseId });
}

export function getReviews(courseId) {
  return apiClient.get(`/courses/${courseId}/reviews`);
}

export function postReview(courseId, reviewData) {
  return apiClient.post(`/courses/${courseId}/reviews`, reviewData);
}

export function resetPassword(payload) {
  return apiClient.post('/password-reset', payload);
}

export default {
  login,
  logout,
  register,
  getUserProfile,
  updateUserProfile,
  getTeacherData,
  getGradebook,
  updateGradebook,
  getCourses,
  getCourse,
  enrollCourse,
  getReviews,
  postReview,
  resetPassword,
};