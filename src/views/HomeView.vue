<template>
  <div class="home">
    <v-layout class="rounded rounded-md"></v-layout>

    <div class="join-button-container">
      <v-btn color="primary" class="join-button" @click="showModal = true">
        Create an Account for Free
      </v-btn>
    </div>  

    <div class="hello-world-section">
      <HelloWorld msg="Welcome to Cybersecurity Learning Platform!" />
    </div>

    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title>Create Profile</v-card-title>
        <v-card-text>
          <form @submit.prevent="createProfile">
            <v-text-field v-model="newUser.first_name" label="First Name" required></v-text-field>
            <v-text-field v-model="newUser.last_name" label="Last Name" required></v-text-field>
            <v-text-field v-model="newUser.email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="newUser.password" label="Password" type="password" required></v-text-field>
            <v-select v-model="newUser.role" :items="roles" label="Select Role" required></v-select>
            <v-btn outlined color="primary" class="submit-button" type="submit">Submit</v-btn>
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
import HelloWorld from '@/components/HelloWorld.vue';
import { register } from '@/services/api';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  data() {
    return {
      showModal: false,
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
      },
      roles: ['Student', 'Teacher', 'Individual'], 
    };
  },
  methods: {
    async createProfile() {
      const userPayload = {
        name: `${this.newUser.first_name} ${this.newUser.last_name}`.trim(),
        email: this.newUser.email,
        password: this.newUser.password,
        role: this.newUser.role,
      };
      try {
        await register(userPayload);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error creating profile:', error.response?.data?.error || error);
      }
    },
  },
};
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
  background-clip: text;
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