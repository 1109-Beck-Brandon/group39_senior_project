<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform" style="text-indent: 110px;">
        <v-btn color="white" class="login-button" @click="goToLoginPage('/login')"> Login </v-btn>
        <v-btn color="white" class="logout-button" @click="showLogoutDialog = true"> Logout </v-btn>
    </v-app-bar>

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
  export default {
    data() {
      return {
        showLogoutDialog: false,
      };
    },
    methods: {
      goToLoginPage(route) {
        this.$router.push(route);
      },
      logout() {
        this.showLogoutDialog = false;
        //Add logic for logging out a user here
        //For now, just redirect to the login page
        this.$router.push('/login');
      },
    },
  };
</script>