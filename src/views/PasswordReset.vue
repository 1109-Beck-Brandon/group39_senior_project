<template>
    <v-container class="d-flex align-center justify-center" style="height: 100vh; margin-top: -20vh;">
      <v-card class="pa-5" max-width="500">
        <v-card-title>Password Reset</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Email"
              type="email"
              placeholder="Enter your email"
              v-model="email"
              outlined
              dense
            />
            <v-text-field
              label="New Password"
              type="password"
              placeholder="Enter new password"
              v-model="newPassword"
              outlined
              dense
            />
            <v-text-field
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              v-model="confirmPassword"
              outlined
              dense
            />
            <v-btn
              color="primary"
              block
              @click="handleReset"
            >
              Reset Password
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
</template>
  
<script>
import { resetPassword } from '@/api.js';

export default {
  data() {
    return {
      email: '',
      message: "",
      error: "",
    };
  },
  methods: {
    async handleReset() {
      try {
        const response = await resetPassword(this.email);
        this.message = response.data.message;
      } catch (error) {
        this.error = error.response?.data?.error || 'Password reset failed';
      }
    }
  }
};
</script>
  
  <style scoped>
  .v-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>  