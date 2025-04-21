<template>
  <v-container fluid class="profile-page-container">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-card elevation="3" class="profile-card pa-6">
          <h2 class="section-title text-center">Create Your Account</h2>

          <v-form @submit.prevent="handleSubmit" class="profile-form">
            <v-text-field
              label="First Name"
              v-model="formData.first_name"
              outlined
              color="cyan-darken-2"
              :rules="[requiredRule]"
            ></v-text-field>

            <v-text-field
              label="Last Name"
              v-model="formData.last_name"
              outlined
              color="cyan-darken-2"
              :rules="[requiredRule]"
            ></v-text-field>

            <v-text-field
              label="Email Address"
              v-model="formData.email"
              type="email"
              outlined
              color="cyan-darken-2"
              :rules="[requiredRule, emailFormatRule]"
            ></v-text-field>

            <v-text-field
              label="Password"
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              color="cyan-darken-2"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="togglePasswordVisibility"
              :rules="[requiredRule]"
            ></v-text-field>

            <v-select
              label="Role"
              :items="roles"
              v-model="formData.role"
              outlined
              color="cyan-darken-2"
              :rules="[requiredRule]"
            ></v-select>

            <v-btn 
              color="primary" 
              type="submit" 
              elevation="2" 
              class="submit-button"
              :disabled="!formIsValid"
            >
              <v-icon left>mdi-account-plus</v-icon>
              Create Account
            </v-btn>
          </v-form>

          <p v-if="message" class="message">{{ message }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { register } from '@/services/api';
// import { updateLoginState } from '@/eventBus';

export default {
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
      },
      roles: ['Student', 'Teacher', 'Individual'],
      message: '',
      showPassword: false,
      requiredRule: v => !!v || 'This field is required',
      emailFormatRule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address',     
    };
  },
  computed: {
    formIsValid() {
      const emailValid = this.requiredRule(this.formData.email) === true && this.emailFormatRule(this.formData.email) === true;
      return (
        this.formData.first_name &&
        this.formData.last_name &&
        emailValid &&
        this.formData.password &&
        this.formData.role
      );
    },
  },
  methods: {
    async handleSubmit() {
      console.log('formData:', this.formData);
      const payload = {
        first_name: this.formData.first_name,
        last_name: this.formData.last_name,
        email: this.formData.email,
        password: this.formData.password,
        role: this.formData.role
      };
      try {
        const response = await register(payload);
        this.message = response.data.message;
        console.log('Profile Created:', response.data);

        //saving user stuff
        const userInfo = {
          email: this.formData.email,
          role: this.formData.role,
          first_name: this.formData.first_name,
          last_name: this.formData.last_name
        };
        localStorage.setItem(this.formData.email, JSON.stringify(userInfo));
        // localStorage.setItem('user', JSON.stringify(userInfo));

        //update login state commented out for now
        // updateLoginState();
        // Redirect based on role, pass the email as a query parameter
        if (this.formData.role === 'Teacher') {
          this.$router.push({ path: '/new-teacher-onboarding', query: { email: this.formData.email } });
        }
        else if (this.formData.role === 'Student') {
          this.$router.push({path: '/new-student-onboarding', query: { email: this.formData.email }});
        }
        else if (this.formData.role === 'Individual') {
          this.$router.push('/new-user-onboarding');
        }

        //this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          this.message = 'Email already exists';
        } else {
          this.message = error.response?.data?.error || 'Error creating profile';
        }
        console.error('Error creating profile:', error);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.profile-page-container {
  position: relative;
  background-color: #0a192f;
  background-image: 
    radial-gradient(rgba(73, 216, 230, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
  background-size: 50px 50px, 70px 70px;
  background-position: 0 0, 25px 25px;
  padding-top: 40px;
  padding-bottom: 100px;
  color: #e6f1ff;
}

.profile-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
  padding: 30px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  /* animation-delay: 0.5s; */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #64ffda;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
}

.profile-form {
  margin-top: 20px;
  color:#98ffe7;
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

::v-deep .v-messages__message {
  color: #ff9393 !important;
}
</style>

