<template>
    <v-container class="pa-5">
        
        <h2>For the new Create a Profile, I replaced it with a button and floating UI on the homepage, Which
            takes you to the /onboarding
        </h2>
        
        <!-- Temporary Form Submission Until Database is Ready -->
        <v-form @submit.prevent="handleSubmit">
            
            <!-- Username Input -->
            <v-text-field
                label="Create Username"
                v-model="formData.username"
                required
            ></v-text-field>

            <!-- Email Address Input -->
            <v-text-field
                label="Email Address"
                v-model="formData.email"
                type="email"
                required
            ></v-text-field>

            <!-- Password Input -->
            <v-text-field
                label="Password"
                v-model="formData.password"
                type="password"
                required
            ></v-text-field>

            <!-- Profile Role Selection -->
            <v-select
                label="Role"
                :items="roles"
                v-model="formData.role"
                required
            ></v-select>

            <v-btn color="primary" type="submit">Submit</v-btn>

        </v-form>
    </v-container>
</template>

<script>
import { register } from '@/api.js';

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
      message: ''
    };
  },
  methods: {
    async handleSubmit() {
      // Combine first and last name into a single name field
      const payload = {
        name: `${this.formData.first_name} ${this.formData.last_name}`.trim(),
        email: this.formData.email,
        password: this.formData.password,
        role: this.formData.role
      };
      try {
        const response = await register(payload);
        this.message = response.data.message;
        console.log('Profile Created:', response.data);
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error('Email already exists:', error.response.data.error);
        } else {
          console.error('Error creating profile:', error);
        }
        this.message = error.response && error.response.data.error
          ? error.response.data.error
          : 'Error creating profile';
      }
    },
  },
};
</script>

<style scoped>
.pa-5 {
    padding:40px;
}
</style>