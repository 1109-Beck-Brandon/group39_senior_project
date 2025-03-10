<template>
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">Community Reviews</h1>
        <img :src="headerImage" alt="Review Image" class="header-image" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Share Your Experience</h2>
          <p class="section-description">
            Your feedback helps improve our cybersecurity learning platform. Share your thoughts, experiences, 
            or suggestions with the community.
          </p>
          
          <!-- Review Form -->
          <form @submit.prevent="submitReview" class="mt-4">
            <v-textarea
              v-model="newReview"
              placeholder="Write a review..."
              rows="5"
              outlined
              class="review-textarea"
              color="primary"
              background-color="#233554"
              hide-details
            ></v-textarea>
            <v-btn 
              type="submit" 
              color="primary" 
              class="mt-4"
              :disabled="!isValidReview"
            >
              Submit Review
            </v-btn>
          </form>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="skills-card pa-4 mb-6">
          <h2 class="section-title">Community Feedback</h2>
          <div v-if="reviews.length === 0" class="text-center pa-4">
            <v-icon size="64" color="primary" class="mb-2">mdi-emoticon-sad-outline</v-icon>
            <p class="section-description">What a shame.... No one gives a damn about our website yet!</p>
          </div>
          
          <!-- Redesigned comment-style reviews -->
          <div v-else class="comments-container">
            <div 
              v-for="(review, index) in reviews" 
              :key="index" 
              class="comment-item"
            >
              <div class="comment-header">
                <div class="comment-avatar">
                  <v-avatar size="28">
                    <img :src="anonUser" alt="User Avatar">
                  </v-avatar>
                </div>
                <div class="comment-meta">
                  <span class="comment-username">Anonymous User</span>
                  <span class="comment-date">{{ getRandomDate() }}</span>
                </div>
              </div>
              <div class="comment-body">
                <p class="comment-text">{{ review }}</p>
              </div>
              <div class="comment-actions">
                <v-btn x-small text class="action-btn">
                  <v-icon small>mdi-thumb-up</v-icon>
                  <span class="ml-1">{{ Math.floor(Math.random() * 15) }}</span>
                </v-btn>
                <v-btn x-small text class="action-btn">
                  <v-icon small>mdi-reply</v-icon>
                  <span class="ml-1">Reply</span>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import anonUser from '@/assets/anon.png'; // Anonymous user image
import headerImage from '@/assets/header.webp'; // Header image

export default {
  data() {
    return {
      reviews: [
        "Yooooooooo I finaly can hacck thanks guys."
      ], // Store reviews here
      newReview: '', // Store new review input here
      anonUser, // Anonymous user avatar
      headerImage, // Header image
    };
  },
  computed: {
    isValidReview() {
      const review = this.newReview.trim();
      return review && 
             review.length > 3 && 
             review.length <= 20 && 
             /^[a-zA-Z0-9!?.,\s]+$/.test(review);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    
    submitReview() {
      const review = this.newReview.trim();
      
      // Validation and debugging messages
      if (!review) {
        console.log("Message cannot be blank!");
        return;
      }
      if (review.length <= 3) {
        console.log("Message is less than 3 characters long!");
        return;
      }
      if (!/^[a-zA-Z0-9!?.,\s]+$/.test(review)) {
        console.log("Message contains invalid special characters!");
        return;
      }
      if (review.length > 20) {
        console.log("Message exceeds the maximum length of 20 characters!");
        return;
      }

      // Add the validated review to the list
      console.log("Review submitted successfully:", review);
      this.reviews.push(review);
      this.newReview = ''; 
    },

    getRandomDate() {
      const days = ['today', 'yesterday', '2 days ago', 'last week'];
      return days[Math.floor(Math.random() * days.length)];
    },

    // Unit testing embedded in the code
    runTests() {
      const testCases = [
        { input: "", expected: "Message cannot be blank!" },
        { input: "Hi", expected: "Message is less than 3 characters long!" },
        { input: "@#$%", expected: "Message contains invalid special characters!" },
        { input: "This is a very long review message exceeding limits", expected: "Message exceeds the maximum length of 20 characters!" },
        { input: "Perfect Review!", expected: "Review submitted successfully: Perfect Review!" },
      ];

      testCases.forEach(({ input, expected }) => {
        this.newReview = input;
        console.log(`Test input: "${input}"`);
        this.submitReview();
        console.log(`Expected output: "${expected}"`);
        console.log("-----------");
      });
    }
  },
  mounted() {
    this.runTests(); // Run unit tests on component load
  },
};
</script>

<style scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.main-container {
  position: relative;
  background-color: #0a192f;
  background-image: 
    radial-gradient(rgba(73, 216, 230, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
  background-size: 50px 50px, 70px 70px;
  background-position: 0 0, 25px 25px;
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #e6f1ff;
}

.header-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #64ffda;
  text-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
}

.header-image {
  max-width: 300px;
  height: auto;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.section-title {
  font-size: 1.8rem;
  margin: 20px 0;
  color: #64ffda;
}

.intro-card, .skills-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.section-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.review-textarea {
  border-color: #64ffda !important;
}

.review-textarea >>> .v-input__slot {
  background-color: #233554 !important;
}

.review-textarea >>> .v-text-field__slot textarea {
  color: #ffffff !important;
}

/* New comment-style CSS */
.comments-container {
  margin-top: 16px;
}

.comment-item {
  background-color: #233554;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px;
  border-left: 3px solid #64ffda;
  transition: transform 0.2s ease;
}

.comment-item:hover {
  transform: translateX(3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-avatar {
  margin-right: 10px;
}

.comment-avatar img {
  border: 1px solid #64ffda;
  border-radius: 50%; /* Circular image */
  object-fit: cover; /* Image maintains its aspect ratio within circle */
  width: 100%;
  height: 100%;
}

.comment-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.comment-username {
  font-weight: bold;
  font-size: 0.9rem;
  color: #ffffff;
}

.comment-date {
  font-size: 0.75rem;
  color: #64ffda;
  opacity: 0.8;
}

.comment-body {
  margin-left: 38px;
  margin-bottom: 8px;
}

.comment-text {
  margin: 0;
  font-size: 1rem;
  color: #e6f1ff;
  line-height: 1.4;
}

.comment-actions {
  margin-left: 38px;
  display: flex;
  gap: 12px;
}

.action-btn {
  color: #8892b0 !important;
  font-size: 0.75rem;
}

.action-btn:hover {
  color: #64ffda !important;
}

.v-btn.primary {
  background-color: #64ffda !important;
  color: #0a192f !important;
}

.v-application .elevation-1 {
  box-shadow: none !important;
}
</style>