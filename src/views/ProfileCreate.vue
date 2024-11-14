<template>
    <v-container class="pa-5">
        
        <h2>Create a Profile</h2>
        
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

import api from '@/services/api';

export default {
    data() {
        return {
            formData: {
                username: '',
                email: '',
                password: '',
                role: '',
            },
            roles: ['Student', 'Teacher', 'Individual'],
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await api.createProfile(this.formData);
                this.message = response.data.message;
                console.log('Profile Created:', response.data);
                this.$router.push('/login');
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    console.error('Username or Email already exists:', error);
                } else {
                    console.error('Error creating profile:', error);
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
</style>