import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:10000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000 // Add timeout
});

/*
// Add request interceptor for auth headers
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Specific login error handling
    if (error.config.url.includes('/auth/login')) {
      return Promise.reject({
        message: error.response?.data?.message || 'Login failed. Check credentials'
      });
    }

    // Handle CORS-related errors
    if (error.response?.status === 0) {
      return Promise.reject({
        message: 'Network/CORS Error - Check API Availability'
      });
    }

    // Token refresh logic for 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Add token refresh logic here (if needed)
    }

    // General error handling
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || 'API Request Failed'
    });
  }
);
*/ 

export function login(credentials) {
  // credentials: { email, password }
  return apiClient.post('/login', credentials);
}

export function logout() {
  return apiClient.post('/logout');
}

export function register(userData) {
  // userData: { name, email, password, ... }
  return apiClient.post('/register', userData);
}

// User Profile APIs
export function getUserProfile(userId) {
  return apiClient.get(`/users/${userId}`);
}

export function updateUserProfile(userId, data) {
  return apiClient.put(`/users/${userId}`, data);
}

// Teacher View API
export function getTeacherData(teacherId) {
  return apiClient.get(`/teachers/${teacherId}`);
}

// GradeBook APIs
export function getGradebook(userId) {
  return apiClient.get(`/gradebook/${userId}`);
}

export function updateGradebook(userId, data) {
  return apiClient.put(`/gradebook/${userId}`, data);
}

// Courses APIs
export function getCourses() {
  return apiClient.get('/courses');
}

export function getCourse(courseId) {
  return apiClient.get(`/courses/${courseId}`);
}

// Reviews APIs
export function getReviews(courseId) {
  return apiClient.get(`/courses/${courseId}/reviews`);
}

export function postReview(courseId, reviewData) {
  // reviewData: { rating, comment, ... }
  return apiClient.post(`/courses/${courseId}/reviews`, reviewData);
}

export function resetPassword(payload) {
  return apiClient.post('/password-reset', payload);
}

// Course Selection API
export function selectCourse(userId, courseId) {
  // Enroll the user in the specified course
  return apiClient.post(`/users/${userId}/courses`, { courseId });
}

// Export all functions as the default export if preferred
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
  getReviews,
  postReview,
  resetPassword,
  selectCourse
};