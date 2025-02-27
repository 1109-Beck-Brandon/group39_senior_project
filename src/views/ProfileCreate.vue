<template>
  <v-container class="pa-5">
      <h2>Create Your Profile</h2>
      <v-form @submit.prevent="handleSubmit">
          <v-text-field
              label="First Name"
              v-model="formData.first_name"
              required
          ></v-text-field>

          <v-text-field
              label="Last Name"
              v-model="formData.last_name"
              required
          ></v-text-field>

          <v-text-field
              label="Email Address"
              v-model="formData.email"
              type="email"
              required
          ></v-text-field>

          <v-text-field
              label="Password"
              v-model="formData.password"
              type="password"
              required
          ></v-text-field>

          <v-select
              label="Role"
              :items="roles"
              v-model="formData.role"
              required
          ></v-select>

          <v-btn color="primary" type="submit">Submit</v-btn>
      </v-form>
      <p v-if="message" class="message">{{ message }}</p>
  </v-container>
</template>

<script>
import { register } from '@/services/api';

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
      console.log('formData:', this.formData);
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
          this.message = 'Email already exists';
        } else {
          this.message = error.response?.data?.error || 'Error creating profile';
        }
        console.error('Error creating profile:', error);
      }
    },
  },
};
</script>

<style scoped>
.pa-5 {
  padding:40px;
}
.message {
  margin-top: 10px;
  color: red;
}
</style>
