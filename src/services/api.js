import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'https://cybersecurity-learning-platform.onrender.com/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000 // Add timeout
});

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

export default {
  // Auth endpoints
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },
  createProfile(profileData) {
    return apiClient.post('/auth/createProfile', profileData);
  },
  getData() {
    return apiClient.get('/');
  },

  // User endpoints
  getUsers() {
    return apiClient.get('/users');
  },
  getUserProfile(userId) {
    return apiClient.get(`/users/${userId}`);
  },

  // Course endpoints
  getCourses() {
    return apiClient.get('/courses');
  },
  getCourse(courseId) {
    return apiClient.get(`/courses/${courseId}`);
  },
  getCourseModules(courseId) {
    return apiClient.get(`/courses/${courseId}/modules`);
  },

  // Classroom endpoints
  getClassrooms() {
    return apiClient.get('/classrooms');
  },
  getClassroomStudents(classroomId) {
    return apiClient.get(`/classrooms/${classroomId}/students`);
  },

  // Resource endpoints
  getResources() {
    return apiClient.get('/resources');
  },

  // Review endpoints
  getReviews() {
    return apiClient.get('/reviews');
  },
  addReview(reviewData) {
    return apiClient.post('/reviews', reviewData);
  },

  // Error helper
  handleError(error) {
    console.error('API Error:', error);
    return {
      error: true,
      message: error.message || 'Unknown API Error'
    };
  }
};