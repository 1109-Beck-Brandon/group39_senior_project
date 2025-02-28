import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:10000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Optional: Implement token refresh logic here
    }
    
    return Promise.reject(error.response?.data || { message: 'API Request Failed' });
  }
);

// Authentication APIs
export function login(credentials) {
  return apiClient.post('/login', credentials);
}

export function logout() {
  return apiClient.post('/logout');
}

export function register(userData) {
  return apiClient.post("/register", {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    password: userData.password,
    role: userData.role || "student",
  });
}

// User Profile APIs
export function getUserProfile(userId) {
  return apiClient.get(`/users/${userId}`);
}

export function updateUserProfile(userId, data) {
  return apiClient.put(`/users/${userId}`, data);
}

// Teacher APIs
export function getTeacherData(teacherId) {
  return apiClient.get(`/teachers/${teacherId}`);
}

export function getClassrooms() {
  return apiClient.get('/classrooms');
}

export function getStudentsByClassroom(classroomId) {
  return apiClient.get(`/classrooms/${classroomId}/students`);
}

export function getAssignments() {
  return apiClient.get('/assignments');
}

export function getMessages() {
  return apiClient.get('/messages');
}

export function deleteMessage(messageId) {
  return apiClient.delete(`/messages/${messageId}`);
}

// GradeBook APIs
export function getGradebook(userId) {
  return apiClient.get(`/gradebook/${userId}`);
}

export function updateGradebook(userId, data) {
  return apiClient.put(`/gradebook/${userId}`, { grades: data });
}

// Courses APIs
export function getCourses() {
  return apiClient.get('/courses');
}

export function getCourse(courseId) {
  return apiClient.get(`/courses/${courseId}`);
}

// Enrollment APIs
export function enrollCourse(userId, courseId) {
  return apiClient.post(`/users/${userId}/courses`, { course_id: courseId });
}

// Reviews APIs
export function getReviews(courseId) {
  return apiClient.get(`/courses/${courseId}/reviews`);
}

export function postReview(courseId, reviewData) {
  return apiClient.post(`/courses/${courseId}/reviews`, reviewData);
}

// Password Reset APIs
export function resetPassword(payload) {
  return apiClient.post('/password-reset', payload);
}

export { apiClient };

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
  getClassrooms,
  getStudentsByClassroom,
  getAssignments,
  getMessages,
  deleteMessage
};