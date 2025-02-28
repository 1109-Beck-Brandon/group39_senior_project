import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // ensure cookies are sent with requests
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await apiClient.post('/refresh-token');
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError.response?.data || { message: 'API Request Failed' });
      }
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
