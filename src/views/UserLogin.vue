<template>
<div class="login">
    <h1>Test Login</h1>
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
  </div>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>

  </v-layout>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    handleLogin() {
      // Simulate a login process with a test case until we can get a database set up
      if (this.username === 'user' && this.password === 'pass') {
        this.error = null;
        // Redirect or perform further actions on successful login
        this.$router.push('/'); // Redirect to home
      } else {
        this.error = 'Invalid credentials. Please try again.';
      }
    },
  },
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
</style>
