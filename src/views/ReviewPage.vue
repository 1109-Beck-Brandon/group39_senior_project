<template>
  <v-container fluid class="review-page-container">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        
        <h1 class="header-title text-center">Community Reviews</h1>

        <!-- Review Form Card -->
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Share Your Experience</h2>
          <p class="section-description">
            Let us know what you think about our cybersecurity learning platform. Your feedback helps us improve!
          </p>
          
          <v-form @submit.prevent="submitReview" class="review-form">
            <v-textarea
              v-model="newReview"
              outlined
              label="Write your review..."
              rows="3"
              counter="200"
              :rules="[
                v => !!v || 'Review cannot be blank',
                v => v.length > 3 || 'Review must be longer than 3 characters',
                v => v.length <= 200 || 'Review must be less than 200 characters',
                v => /^[a-zA-Z0-9!?.,\s]+$/.test(v) || 'Review contains invalid characters'
              ]"
            ></v-textarea>
            
            <v-rating
              v-model="rating"
              background-color="gray"
              color="#64ffda"
              hover
              length="5"
              size="36"
              class="my-4"
            ></v-rating>
            
            <v-btn 
              type="submit" 
              color="primary" 
              elevation="2" 
              :disabled="!isValidReview" 
              class="submit-button"
            >
              <v-icon left>mdi-send</v-icon>
              Submit Review
            </v-btn>
          </v-form>
        </v-card>

        <!-- Reviews List Card -->
        <v-card elevation="3" class="skills-card pa-4 mb-6">
          <h2 class="section-title">Community Feedback</h2>
          
          <div v-if="reviews.length === 0" class="text-center pa-4">
            <v-icon size="64" color="grey">mdi-emoticon-sad-outline</v-icon>
            <p class="empty-reviews-text">No reviews yet. Be the first to share your thoughts!</p>
          </div>
          
          <v-list v-else class="reviews-list">
            <v-list-item v-for="(review, index) in reviews" :key="index" class="review-item mb-3">
              <v-card class="review-card pa-3" outlined width="100%">
                <div class="d-flex align-center">
                  <v-avatar class="mr-3" size="50">
                    <v-img :src="userAvatars[index % userAvatars.length]" alt="Anonymous User"></v-img>
                  </v-avatar>
                  
                  <div class="review-content">
                    <div class="d-flex align-center">
                      <span class="font-weight-bold text-white">Anonymous User</span>
                      <v-rating
                        :value="review.rating || 5"
                        readonly
                        dense
                        size="16"
                        color="#64ffda"
                        class="ml-2"
                      ></v-rating>
                      <v-spacer></v-spacer>
                      <span class="text-caption">{{ review.date || "Just now" }}</span>
                    </div>
                    
                    <p class="review-text mt-2">{{ review.text }}</p>
                    
                    <!-- Like Button and Count -->
                    <div class="d-flex align-center mt-2">
                      <v-btn 
                        icon 
                        x-small 
                        @click="toggleLike(index)" 
                        :color="review.liked ? '#64ffda' : 'white'"
                        class="mr-1"
                      >
                        <v-icon>{{ review.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}</v-icon>
                      </v-btn>
                      <span class="text-caption mr-4">{{ review.likes }} likes</span>
                      
                      <!-- Reply Button (can be implemented later) -->
                      <v-btn icon x-small class="white--text">
                        <v-icon>mdi-reply-outline</v-icon>
                      </v-btn>
                      <span class="text-caption">Reply</span>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import avatar1 from "@/assets/anon.png";

export default {
  name: "ReviewPage",
  
  data() {
    return {
      reviews: [
        { 
          text: "Yooooooooo I finally can hack thanks guys.", 
          rating: 5, 
          date: "Mar 10, 2025",
          likes: 12,
          liked: false
        },
        { 
          text: "Great content on penetration testing. Very helpful for beginners.", 
          rating: 4, 
          date: "Mar 8, 2025",
          likes: 8,
          liked: false
        },
        { 
          text: "The security analyst module was excellent! Looking forward to more content.", 
          rating: 5, 
          date: "Mar 5, 2025",
          likes: 15,
          liked: false
        }
      ],
      newReview: '',
      rating: 5,
      userAvatars: [avatar1],
      errorMessage: '',
    };
  },
  
  computed: {
    isValidReview() {
      const review = this.newReview.trim();
      return review.length > 3 && 
             review.length <= 200 && 
             /^[a-zA-Z0-9!?.,\s]+$/.test(review);
    }
  },
  
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    
    submitReview() {
      const review = this.newReview.trim();
      
      if (!this.isValidReview) {
        return;
      }
      
      // Add the validated review to the list
      this.reviews.unshift({
        text: review,
        rating: this.rating,
        date: "Just now",
        likes: 0,
        liked: false
      });
      
      // Reset form
      this.newReview = '';
      this.rating = 5;
      
      // Success message
      this.$nextTick(() => {
        // Here you would normally trigger a snackbar or toast message
        console.log("Review submitted successfully");
      });
    },
    
    // Toggle like status for a review
    toggleLike(index) {
      if (this.reviews[index].liked) {
        this.reviews[index].likes--;
      } else {
        this.reviews[index].likes++;
      }
      this.reviews[index].liked = !this.reviews[index].liked;
    },
    
    // Unit test
    validateReview(review) {
      if (!review) {
        return "Review cannot be blank";
      }
      if (review.length <= 3) {
        return "Review must be longer than 3 characters";
      }
      if (!/^[a-zA-Z0-9!?.,\s]+$/.test(review)) {
        return "Review contains invalid characters";
      }
      if (review.length > 200) {
        return "Review must be less than 200 characters";
      }
      return null;
    }
  },
};
</script>

<style scoped>

.text-caption {
  color: white !important;
}

.review-page-container {
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

.review-form {
  margin-top: 20px;
}

.submit-button {
  background-color: #64ffda !important;
  color: #172a46 !important;
  font-weight: bold;
}

.reviews-list {
  background-color: transparent;
}

.review-card {
  background-color: #233554;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(100, 255, 218, 0.3);
}

.review-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.review-content {
  flex-grow: 1;
}

.review-text {
  color: #ffffff;
  line-height: 1.5;
}

.empty-reviews-text {
  color: #a8b2d1;
  font-size: 1.2rem;
  margin-top: 15px;
}

.text-white {
  color: #ffffff !important;
}

/* Override Vuetify textarea styles for dark theme */
.v-textarea >>> .v-input__slot {
  background-color: #233554 !important; 
}

.v-textarea >>> .v-label {
  color: #a8b2d1 !important;
}

.v-textarea >>> textarea {
  color: #ffffff !important;
}
</style>