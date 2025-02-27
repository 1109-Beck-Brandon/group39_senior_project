<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="email">Email: </label>
        <input type="email" id="email" v-model="email" required />
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
      <router-link to="/createProfile">New user? Create a profile</router-link>
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
          const userData = response.data;
          if (userData && userData.user && userData.user.id) {
            localStorage.setItem('jwt_token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData.user));
            this.$router.push('/dashboard');
          } else {
            this.error = 'Login failed: Invalid credentials.';
          }
        })
        .catch(err => {
          this.error = err.response?.data?.error || 'Login failed. Please check your credentials.';
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
