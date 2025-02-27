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
  </div>
</template>

<script>
import { login } from '@/services/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    submitLogin() {
      this.error = '';
      login({ email: this.email, password: this.password })
        .then(response => {
          // Assuming the backend responds with a token property in response.data
          const token = response.data.token;
          if (token) {
            localStorage.setItem('jwt_token', token);
            // Redirect to home or dashboard
            this.$router.push('/');
          } else {
            this.error = 'Login failed: No token received.';
          }
        })
        .catch(err => {
          // You can also check err.status for more detailed error handling
          this.error = err.message || 'Login failed';
        });
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
