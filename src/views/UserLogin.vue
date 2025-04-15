<template>
  <v-container fluid class="profile-page-container">
    <v-row justify="center" align="center">

      <!-- Form column here-->
      <v-col cols="12" md="6">
        <v-card elevation="3" class="profile-card pa-6">
          <h2 class="section-title text-center">Login to Your Account</h2>
          <v-form @submit.prevent="submitLogin" class="profile-form">
            <v-text-field
              label="Email Address"
              v-model="email"
              type="email"
              outlined
              color="cyan-darken-2"
              required
            ></v-text-field>
  
            <v-text-field
              label="Password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              color="cyan-darken-2"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility" 
              required
            ></v-text-field>
  
            <v-btn color="primary" type="submit" elevation="2" class="submit-button">
              <v-icon left>mdi-login</v-icon>
              Login
            </v-btn>
          </v-form>
  
          <p v-if="error" class="message">{{ error }}</p>
  
          <div class="links">
            <v-btn text class="link-btn" @click="$router.push('/createProfile')">
              New user? Create a profile
            </v-btn>

          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="3">
        <v-img :src="LockPicture" alt="Login Image" max-width="300" class="onboarding-image" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { updateLoginState } from '@/eventBus';
import { login } from '@/services/api';
import LockPicture from './OnboardingPages/LockPicture.png';


export default {
  data() {
    return {
      LockPicture,
      email: '',
      password: '',
      error: '',
      showPassword: false
    };
  },
  methods: {
    submitLogin() {
      this.error = '';
      login({ email: this.email, password: this.password })
        .then(response => {
          const userData = response.data;
          if (userData && userData.user && userData.user.id) {
            const user = { 
              ...userData.user, 
              user_id: userData.user.id 
            };
            
            // Split name into first_name and last_name if only name is provided
            if (user.name && (!user.first_name || !user.last_name)) {
              const nameParts = user.name.split(' ');
              user.first_name = nameParts[0] || '';
              user.last_name = nameParts.slice(1).join(' ') || '';
            }
            
            localStorage.setItem('user', JSON.stringify(user));
            updateLoginState();
            this.$router.push('/dashboard');
          } else {
            this.error = 'Login failed: Invalid credentials.';
          }
        })
        .catch(err => {
          this.error = err.response?.data?.error || 'Login failed. Please check your credentials.';
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
/* Use the same background as your ProfileCreate page */
.profile-page-container {
  position: relative;
  background-color: #0a192f;
  background-image:
    radial-gradient(rgba(73, 216, 230, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
  background-size: 50px 50px, 70px 70px;
  background-position: 0 0, 25px 25px;
  min-height: 100vh;
  padding-top: 40px;
  padding-bottom: 100px;
  color: #e6f1ff;
}
  
.profile-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
  padding: 30px;
}
  
.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #64ffda;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
}
  
.profile-form {
  margin-top: 20px;
  color: #98ffe7;
}
  
.submit-button {
  background-color: #64ffda !important;
  color: #172a46 !important;
  font-weight: bold;
  margin-top: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
  
.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
  
.message {
  margin-top: 15px;
  color: #ff6b6b;
  text-align: center;
  font-weight: bold;
}
  
.links {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
  
.link-btn {
  color: #64ffda !important;
  font-weight: bold;
  text-transform: none;
  background-color: #258ca870;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
  
.link-btn:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}

.onboarding-image {
  margin-left: 40px;
}

</style>
