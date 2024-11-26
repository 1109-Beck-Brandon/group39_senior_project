import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  // Example API methods
  getUsers() {
    return apiClient.get('/users');
  },
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },
  createProfile(profileData) {
    return apiClient.post('/auth/createProfile', profileData);
  },
  getCourses() {
    return apiClient.get('/courses');
  },
  getCourse(courseId) {
    return apiClient.get(`/course/${courseId}`);
  },
  getCourseModules(courseId) {
    return apiClient.get(`/course/${courseId}/modules`);
  },
  getUserProfile(userId) {
    return apiClient.get(`/user/${userId}`);
  },
  getClassrooms() {
    return apiClient.get('/classrooms');
  },
  getClassroomStudents(classroomId) {
    return apiClient.get(`/classrooms/${classroomId}/students`);
  },
  getResources() {
    return apiClient.get('/resources');
  },
  getReviews() {
    return apiClient.get('/reviews');
  },
  addReview(reviewData) {
    return apiClient.post('/reviews', reviewData);
  }
};