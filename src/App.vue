<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/login">Login</router-link> | 
      <router-link to="/createProfile">Create Profile</router-link> |
      <router-link to="/courseSelect">Select Course</router-link> |
      <router-link to="/profileView">View Profile</router-link> |
      <router-link to="/teacherView">Teacher View</router-link> |
      <router-link to="/reviewPage">Reviews</router-link> |
      <router-link to="/passwordReset">Reset Password</router-link>
      <router-link to="/moduleQuiz">Jobs</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import api from './services/api';

export default {
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async fetchData() {
      try {
        const response = await api.getData();
        this.message = response.data.message;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<style>
#app {
  background-color: black;
  font-family: 'Port Lligat Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(233, 223, 223);
}

nav {
  padding: 70px 0 10px 0;
}

nav a {
  font-weight: bold;
  color: white;
  text-transform: capitalize; 
  text-decoration: none;
  background: linear-gradient(45deg, #9b4dca, #ff6ac1); 
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  transition: color 0.3s, text-shadow 0.3s;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-shadow: 0 0 8px #42b983, 0 0 15px #42b983, 0 0 20px #42b983;
}

nav a:hover {
  text-shadow: 0 0 8px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
}

h1, h2, h3, h4, h5, h6, h7, h8, h9 {
  font-family: 'Port Lligat Sans', sans-serif;
  background: linear-gradient(45deg, #9b4dca, #ff6ac1);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  text-transform: capitalize; 
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4), 0px 0px 15px rgba(255, 105, 180, 0.7);
}

h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover {
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5), 0px 0px 20px rgba(255, 105, 180, 1);
}
</style>