<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username: </label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password: </label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Add the new user link -->
    <p class="new-user">
      <router-link to="/createProfile">New user?  Create a profile</router-link>
    </p>
    <!-- Add Forgot Password Link-->
    <p class="forgot-password">
      <router-link to="/passwordReset">Forgot Password? </router-link>
    </p>

    <v-layout class="rounded rounded-md">
      <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          username: this.username,
          password: this.password
        }, {
          withCredentials: true  // For cross-origin cookies
        });

        // Store JWT token
        localStorage.setItem('jwt_token', response.data.token);
        
        // Set default Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        this.$router.push('/dashboard');
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
}

.new-user {
  text-align: center;
  margin-top: 10px;
  font-style: italic;
}

.new-user a {
  color: #007bff;
  text-decoration: none;
}

.new-user a:hover {
  text-decoration: underline;
}

</style>
