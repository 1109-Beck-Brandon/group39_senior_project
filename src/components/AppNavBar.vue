<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar class="main-bar">
      <!-- Hamburger Menu -->
      <v-app-bar-nav-icon style="color: white;" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- Spacers to keep proper alignment -->
      <v-spacer></v-spacer>

      <!-- Title -->
      <v-toolbar-title class="title" @click="navigateToHome" style="cursor: pointer;">Cybersecurity Learning Platform</v-toolbar-title>

      <!-- Spacers to keep proper alignment -->
      <v-spacer></v-spacer>

      <!-- Login / Logout Buttons -->
      <template v-if="isLoggedIn">
        <span style="color: white; margin-right: 10px;">Welcome, {{ username }}</span>
        <v-btn color="white" class="logout-button" @click="showLogoutDialog = true"> Logout </v-btn>
      </template>
      <template v-else>
        <v-btn color="white" class="login-button" @click="goToLoginPage('/login')"> Login </v-btn>
      </template>
    </v-app-bar>

    <!-- Hamburger Menu Functionality -->
    <v-navigation-drawer v-model="drawer" app class="nav-list">
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" @click="navigate(link.route)" class="nav-list-item">
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Logout Functionality -->
    <v-dialog v-model="showLogoutDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Logout</v-card-title>
        <v-card-text>Are you sure you want to logout?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showLogoutDialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { logout as apiLogout } from '@/services/api.js';
import { loginState, updateLoginState } from '@/eventBus.js';

export default {
  data() {
    return {
      showLogoutDialog: false,
      drawer: false,
      links: [
        { text: 'Home', route: '/' },
        { text: 'About', route: '/about' },
        { text: 'Courses', route: '/courseSelect' },
        { text: 'Profile', route: '/profileView' },
        { text: 'Teacher View', route: '/teacherView' },
        { text: 'Reviews', route: '/reviewPage' },
      ],
    };
  },
  computed: {
    // Get login status from eventBus file
    isLoggedIn() {
      return loginState.isLoggedIn;
    },
    // Get username status from eventBus file
    username() {
      return loginState.username;
    },
  },
  mounted() {
    window.addEventListener('storage', this.updateLoginState);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.updateLoginState);
  },
  methods: {
    // Detect login state changes
    updateLoginState() {
      this.$forceUpdate();
    },
    goToLoginPage(route) {
      this.$router.push(route);
    },
    logout() {
      this.showLogoutDialog = false;
      
      try {
        // Always clear local storage first to ensure UI updates immediately
        localStorage.removeItem('user');
        updateLoginState();
        
        // Then try to perform API logout (but don't wait for it)
        apiLogout()
          .then(() => {
            console.log('Logged out successfully via API');
          })
          .catch(error => {
            // Just log the error but don't block the logout process
            console.log('API logout failed, but local logout successful:', error);
          })
          .finally(() => {
            this.$router.push('/'); // Redirect to home page instead of login page
          });
      } catch (error) {
        // Ensure we can still log out if something unexpected happens
        console.error('Error during logout:', error);
        localStorage.removeItem('user');
        updateLoginState();
        this.$router.push('/'); // Redirect to home page instead of login page
      }
    },
    navigate(route) {
      this.drawer = false;
      this.$router.push(route);
    },

    // Navigate to home page when website title is clicked
    navigateToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.main-bar {
  background-color: rgb(9, 32, 68);
  display: flex;
  align-items: center;
}

.title {
  color: white;
  text-align: center;
  font-weight: bold;
}

.nav-list {
  background-color: rgba(22, 22, 112, 0);
  padding-top: 10px;
}

.nav-list-item {
  color: white;
  border: 1px solid black;
  margin: 5px 0;
  border-radius: 4px;
  background-color: rgb(12, 44, 94);
}

.login-button {
  margin-right: 10px;
}

.logout-button {
  margin-right: 10px;
}
</style>