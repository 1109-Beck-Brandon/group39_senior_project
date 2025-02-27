<template>
  <v-container class="d-flex align-center justify-center" style="height: 100vh; margin-top: -20vh;">
    <v-card class="pa-5" max-width="500">
      <v-card-title>Password Reset</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleReset">
          <v-text-field
            label="Email"
            type="email"
            placeholder="Enter your email"
            v-model="email"
            outlined
            dense
            required
          />
          <v-text-field
            label="New Password"
            type="password"
            placeholder="Enter new password"
            v-model="newPassword"
            outlined
            dense
            required
          />
          <v-text-field
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            v-model="confirmPassword"
            outlined
            dense
            required
          />
          <v-btn
            color="primary"
            block
            type="submit"
          >
            Reset Password
          </v-btn>
        </v-form>
        <p v-if="message" class="success-message">{{ message }}</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { resetPassword } from '@/services/api';

export default {
data() {
  return {
    email: '',
    newPassword: '',
    confirmPassword: '',
    message: '',
    error: '',
  };
},
methods: {
  async handleReset() {
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    try {
      const response = await resetPassword({
        email: this.email,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      });
      this.message = response.data.message;
      this.error = '';
    } catch (error) {
      this.error = error.response?.data?.error || 'Password reset failed';
      this.message = '';
    }
  }
}
};
</script>

<style scoped>
.v-card {
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.success-message {
color: green;
margin-top: 10px;
}
.error-message {
color: red;
margin-top: 10px;
}
</style>