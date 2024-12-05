<template>
  <div class="home">
    <v-layout class="rounded rounded-md">
      <v-app-bar color="surface-variant">
        <v-app-bar-title>Cybersecurity Learning Platform</v-app-bar-title>
      </v-app-bar>
      <!--
      <v-navigation-drawer width="300">
        <v-list>
          <h2 class="gradient-text">Resources</h2>
          <v-list-item>
            <v-list-item-content>
              <div class="list-item-container">
                <img src="path-to-your-image.jpg" alt="Learning resource icon">
                <v-list-item-title>Resource Description</v-list-item-title>
              </div>
              <v-list-item-subtitle class="wrap-text">
                This section will be for resources that users can click on to further reinforce their learning.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->
    </v-layout>



    <!-- Use the HelloWorld component -->
    <div class="hello-world-section">
      <HelloWorld msg="Welcome to Cybersecurity Learning Platform!" />
    </div>

    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title>Create Profile</v-card-title>
        <v-card-text>
          <form @submit.prevent="createProfile">
            <v-text-field
              v-model="newUser.username"
              label="Username"
              id="username-field"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.email"
              label="Email"
              type="email"
              id="email-field"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.password"
              label="Password"
              type="password"
              id="password-field"
              required
            ></v-text-field>
            <v-select
              v-model="newUser.role"
              :items="roles"
              label="Select Role"
              id="role-select"
              required
            ></v-select>
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
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'; // Import the HelloWorld component

export default {
  name: 'HomeView',
  components: {
    HelloWorld, // Register the HelloWorld component
  },
  data() {
    return {
      showModal: false,
      newUser: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
      roles: ['Student', 'Teacher', 'Individual'], 
    };
  },
  methods: {
    createProfile() {
      const fakeUser = {
        username: this.newUser.username,
        email: this.newUser.email,
        password: this.newUser.password,
        role: this.newUser.role,
      };

      localStorage.setItem("newUser", JSON.stringify(fakeUser));

      if (fakeUser.role === "Teacher") {
        this.$router.push({ name: "TeacherOnboarding" });
      } else if (fakeUser.role === "Student") {
        this.$router.push({ name: "StudentOnboarding" });
      } else {
        this.$router.push({ name: "UserOnboarding" });        
      }
    },
  },  
}
</script>

<style scoped>
.home {
  background-color: black;
}

.wrap-text {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.join-button-container {
  position: fixed; 
  top: 100px; 
  right: 5px; 
  z-index: 10; 
}

.join-button {
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
}

.gradient-text {
  background: linear-gradient(to right, rgb(225, 119, 5), #d514b2, purple);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.v-list-item {
  display: flex;
  align-items: center;
}

.list-item-container {
  display: flex;
  align-items: center;
}

.v-list-item-content img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  object-fit: contain;
}

.v-app-bar-title {
  font-size: 40px;
}

.hello-world-section p {
  font-size: 40px;
}

</style>