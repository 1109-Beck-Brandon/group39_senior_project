<template>
  <div id="app">

    <AppNavBar />
    <!-- Spacer so that AppNavBar does not cover page content -->
    <br><br><br>
    <router-view/>
  </div>
</template>

<script>
import { getData } from '@/services/api';
import AppNavBar from '@/components/AppNavBar.vue';

export default {
  name: 'App',
  components: {
    AppNavBar,
  },
  data() {
    return {
      message: '',
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await getData();
        this.message = response.data.message;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
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
  padding: 70px 0 10px 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
