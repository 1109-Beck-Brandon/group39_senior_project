<template>
  <div class="home">

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>

    <v-navigation-drawer width="300">
      <v-list>
        <h2>Resources</h2>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Resource Description</v-list-item-title>
            <v-list-item-subtitle class="wrap-text">
              This section will be for resources that users can click on to further reinforce their learning.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-layout>

    <!-- New Create an Account for Free button for creating a profile, later we can delete old the Create a Profile page-->
    <div class="join-button-container">
      <v-btn color="primary" class="join-button" @click="showModal = true">
        Create an Account for Free
      </v-btn>
    </div>  

    <!-- Modal dialog for profile creation, it's like a pop up instead of redirecting pages and then it redirects to different onboarding pages -->
    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title>Create Profile</v-card-title>
        <v-card-text>

          <form @submit.prevent="createProfile">
            <!-- user enters their Username -->
            <v-text-field
              v-model="newUser.username"
              label="Username"
              id="username"
              required
            ></v-text-field>
            <!-- user enters their Email -->
            <v-text-field
              v-model="newUser.email"
              label="Email"
              type="email"
              id="email"
              required
            ></v-text-field>
            <!-- user enters their Password -->
            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
              id="password"
              required
            ></v-text-field>
            <!-- user selects their Role -->
            <v-select
              v-model="newUser.role"
              :items="roles"
              label="Select Role"
              id="role"
              required
            ></v-select>

          <!-- user's Submit Button to submit their stuff -->
          <v-btn 
            outlined 
            color="primary" 
            class="submit-button" 
            type="submit"
          >
            Submit
          </v-btn>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

  //for the newUser object until we get backend working
  data() {
    return {
      showModal: false,
      newUser: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      roles: ['Student', 'Teacher', 'Individual'], // List of roles for the user to choose from
    };
  },
  methods: {
    createProfile() {
      // For testing
      const fakeUser = {
        username: this.newUser.username,
        email: this.newUser.email,
        password: this.newUser.password,
        role: this.newUser.role,
      };

      // Saves user data to localStorage
      localStorage.setItem("newUser", JSON.stringify(fakeUser));

      // Redirect to teacher onboarding if role is Teacher, else student/user
      if (fakeUser.role === "Teacher") {
        this.$router.push({ name: "TeacherOnboarding" });
      } else if (fakeUser.role === "Student") {
        this.$router.push({ name: "StudentOnboarding" }); //The student's profile page is cooler because they have more features right now
      } else {
        this.$router.push({ name: "UserOnboarding" });        
      }

    },
  },  
}
</script>

<style scoped>
/* Ensure the text wraps and prevents ellipsis */
.wrap-text {
  white-space: normal !important; /* Forces the text to wrap */
  overflow: visible !important;  /* Ensures no clipping */
  text-overflow: unset !important; /* Disables ellipsis */
  word-wrap: break-word; /* Handles long words */
  overflow-wrap: break-word; /* Ensures proper line breaking */
}

/* Positioning for "Create an Account for Free" button, probably changing it later - I just wanted to test the modal dialog */
.join-button-container {
  position: fixed; 
  top: 100px; /* Space from top */
  right: 5px; 
  z-index: 10; /* puts it above other elements */
}

/* join button font appearance */
.join-button {
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
}

</style>