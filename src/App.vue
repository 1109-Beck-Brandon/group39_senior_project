<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/login">Login</router-link>
    </nav>
    <h1>{{ message }}</h1>
    <button @click="fetchData">Fetch Data</button>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 70px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
