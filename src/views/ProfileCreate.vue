<<<<<<< HEAD
<template>
    <v-container class="pa-5">
        <!--Gradient text-->
        <h2 class="neon-text">Create a Profile</h2>
        
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
    <v-layout class="rounded rounded-md">
        <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>

    </v-layout>
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

.neon-text{
    font-size: 2.5rem;
    font-weight: bold;
    text-transform: none;
    text-align: center;
    background: linear-gradient(45deg, #9b4dca, #ff6ac1, #2ad7ff);
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}   

@keyframes neon-animation{
    0%{
        background-position: 0%;
    }
    100%{
        background-position: 100%;
    }
}
=======
<template>
    <v-container class="pa-5 black background">
        
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
>>>>>>> main
</style>