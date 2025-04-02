<template>
  <div id="app">

    <AppNavBar />
    <!-- Spacer so that AppNavBar does not cover page content -->
    <br><br><br>
    <router-view/>

    <!-- Add snackbar for notifications -->
    <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
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
      // Snackbar data
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: 'success',
    };
  },
  mounted() {
    this.fetchData();
    // Listen for show-snackbar events from children
    this.$root.$on('show-snackbar', this.showSnackbar);
  },
  beforeUnmount() {
    // Clean up event listener
    this.$root.$off('show-snackbar', this.showSnackbar);
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
    // Method to show snackbar
    showSnackbar(message, color = 'success') {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
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
