import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
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
    return apiClient.post('/login', credentials);
  },
  // Add this method
  createProfile(profileData) {
    return apiClient.post('/auth/createProfile', profileData);
  }
};