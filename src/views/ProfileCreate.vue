<template>
    <v-container class="pa-5">
        <h2 class="gradient-text">Create a Profile</h2>

        <!-- Temporary Form Submission Until Database is Ready -->
        <v-form ref="form" @submit.prevent="handleSubmit">
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

            <!-- Submit Button -->
            <v-btn color="primary" @click="triggerSubmit">Submit</v-btn>
        </v-form>
    </v-container>

    <!-- Video Fullscreen Page -->
    <v-dialog v-model="videoPlaying" persistent max-width="100%" hide-overlay>
        <v-card>
            <v-responsive>
                <video
                    ref="videoPlayer"
                    controls
                    @canplay="playVideo"
                    @ended="onVideoEnd"
                    style="width: 100%; height: 100%; object-fit: cover;"
                    v-if="videoPlaying"
                >
                    <source v-if="videoSrc" :src="videoSrc" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <!-- Start Video Button -->
                <v-btn color="primary" v-if="!videoPlaying" @click="playVideo">Start Video</v-btn>
            </v-responsive>
        </v-card>
    </v-dialog>
</template>

<script>
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
            videoPlaying: false,
            videoSrc: '/hacker.mp4',
        };
    },
    methods: {
        async handleSubmit() {
        this.videoPlaying = true; // Trigger the dialog
        this.$nextTick(() => {
        this.playVideo(); // Ensure video plays after dialog opens
        });/*
            try {
                const response = await api.createProfile(this.formData);
                this.message = response.data.message;
                console.log('Profile Created:', response.data);
            } catch (error) {
                console.error('Error creating profile:', error);
                if (error.response && error.response.status === 409) {
                    console.error('Username or Email already exists:', error);
                }
            }
            */
        },
        triggerSubmit() {
            console.log('Submit button clicked');
            this.handleSubmit();
        },

        playVideo() {
            const video = this.$refs.videoPlayer;
            if (video) {
                video.load(); // Load the video
                video.play().catch((error) => {
                    console.error('Error attempting to play video:', error);
                });
            } else {
                console.error('Video element not found!');
            }
        },

        onVideoEnd() {
            console.log('Video ended');
            this.videoPlaying = false; // Hide the video dialog after the video ends
            console.log('Navigating to /login');
            this.$router.push('/login'); // Redirects to login after video ends
        }
    },
};
</script>

<style scoped>
.pa-5 {
    padding: 40px;
}

.gradient-text {
    background: linear-gradient(90deg, rgb(255, 18, 148) 0%, rgba(0, 204, 255, 1) 100%);
    -webkit-background-clip: text;
    color: transparent;
}

.v-dialog {
    max-width: 100% !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
}

video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>