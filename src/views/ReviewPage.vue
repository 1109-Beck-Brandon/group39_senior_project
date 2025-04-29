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
            
            <div class="d-flex align-center">
              <span class="mr-2">Your Rating:</span>
              <v-rating
                v-model="userRating"
                background-color="gray"
                color="#64ffda"
                hover
                length="5"
                size="36"
                class="my-4"
              ></v-rating>
            </div>
            
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
                <div class="d-flex flex-column">
                  <div class="d-flex align-center">
                    <v-avatar class="mr-3" size="50">
                      <v-img :src="userAvatars[index % userAvatars.length]" alt="Anonymous User"></v-img>
                    </v-avatar>
                    
                    <div class="review-header flex-grow-1 d-flex justify-space-between">
                      <span class="font-weight-bold text-white">Anonymous User</span>
                      <span class="text-caption">{{ review.date }}</span>
                    </div>
                  </div>
                  
                  <!-- Star rating below username -->
                  <div class="ml-12 mt-1">
                    <div class="d-flex">
                      <v-icon
                        v-for="n in 5"
                        :key="n"
                        :color="n <= review.rating ? '#64ffda' : 'gray'"
                        size="16"
                      >
                        mdi-star
                      </v-icon>
                    </div>
                  </div>
                  
                  <p class="review-text mt-2 ml-12">{{ review.text }}</p>
                  
                  <!-- Action buttons aligned to the right -->
                  <div class="d-flex justify-end mt-2">
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
                    
                    <v-btn icon x-small class="white--text mr-1" @click="toggleReplyForm(index)">
                      <v-icon>mdi-reply-outline</v-icon>
                    </v-btn>
                    <span class="text-caption">Reply</span>
                  </div>
                  
                  <!-- Reply form (conditionally shown) -->
                  <div v-if="review.showReplyForm" class="reply-form ml-12 mt-3">
                    <v-textarea
                      v-model="review.newReply"
                      outlined
                      dense
                      hide-details
                      placeholder="Write your reply..."
                      rows="2"
                      class="mb-2"
                    ></v-textarea>
                    <div class="d-flex justify-end">
                      <v-btn 
                        small 
                        text 
                        @click="toggleReplyForm(index)"
                        class="mr-2"
                      >
                        Cancel
                      </v-btn>
                      <v-btn 
                        small 
                        color="primary" 
                        @click="submitReply(index)"
                        :disabled="!review.newReply || review.newReply.trim() === ''"
                      >
                        Reply
                      </v-btn>
                    </div>
                  </div>
                  
                  <!-- Replies section -->
                  <div v-if="review.replies && review.replies.length > 0" class="replies-section ml-12 mt-3">
                    <div v-for="(reply, replyIndex) in review.replies" :key="`reply-${index}-${replyIndex}`" class="reply-item pa-2 mb-2">
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-avatar size="30" class="mr-2">
                            <v-img :src="userAvatars[(index + replyIndex + 1) % userAvatars.length]" alt="Reply User"></v-img>
                          </v-avatar>
                          <span class="font-weight-medium text-white">Anonymous User</span>
                        </div>
                        <span class="text-caption">{{ reply.date }}</span>
                      </div>
                      <p class="ml-9 my-1 reply-text">{{ reply.text }}</p>
                      
                      <!-- Reply action buttons -->
                      <div class="d-flex justify-end ml-9">
                        <v-btn 
                          icon 
                          x-small 
                          @click="toggleReplyLike(index, replyIndex)" 
                          :color="reply.liked ? '#64ffda' : 'white'"
                          class="mr-1"
                        >
                          <v-icon small>{{ reply.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}</v-icon>
                        </v-btn>
                        <span class="text-caption mr-4">{{ reply.likes }} likes</span>
                        
                        <v-btn icon x-small class="white--text mr-1" @click="toggleNestedReplyForm(index, replyIndex)">
                          <v-icon small>mdi-reply-outline</v-icon>
                        </v-btn>
                        <span class="text-caption">Reply</span>
                      </div>
                      
                      <!-- Nested reply form -->
                      <div v-if="reply.showNestedReplyForm" class="nested-reply-form ml-9 mt-2">
                        <v-textarea
                          v-model="reply.newNestedReply"
                          outlined
                          dense
                          hide-details
                          placeholder="Write your reply..."
                          rows="2"
                          class="mb-2"
                        ></v-textarea>
                        <div class="d-flex justify-end">
                          <v-btn 
                            small 
                            text 
                            @click="toggleNestedReplyForm(index, replyIndex)"
                            class="mr-2"
                          >
                            Cancel
                          </v-btn>
                          <v-btn 
                            small 
                            color="primary" 
                            @click="submitNestedReply(index, replyIndex)"
                            :disabled="!reply.newNestedReply || reply.newNestedReply.trim() === ''"
                          >
                            Reply
                          </v-btn>
                        </div>
                      </div>
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
          rating: 3, 
          date: "Mar 10, 2025",
          likes: 12,
          liked: false,
          showReplyForm: false,
          newReply: '',
          replies: [
            {
              text: "Glad you're enjoying the platform! What modules helped you the most?",
              date: "Mar 11, 2025",
              likes: 3,
              liked: false,
              showNestedReplyForm: false,
              newNestedReply: ''
            },
            {
              text: "Remember to use these skills ethically! The platform is for educational purposes.",
              date: "Mar 12, 2025",
              likes: 8,
              liked: false,
              showNestedReplyForm: false,
              newNestedReply: ''
            }
          ]
        },
        { 
          text: "Great content on penetration testing. Very helpful for beginners.", 
          rating: 4, 
          date: "Mar 8, 2025",
          likes: 8,
          liked: false,
          showReplyForm: false,
          newReply: '',
          replies: [
            {
              text: "I agree! The step-by-step approach really helped me understand the concepts.",
              date: "Mar 9, 2025",
              likes: 2,
              liked: false,
              showNestedReplyForm: false,
              newNestedReply: ''
            }
          ]
        },
        { 
          text: "The security analyst module was excellent! Looking forward to more content.", 
          rating: 2, 
          date: "Mar 5, 2025",
          likes: 15,
          liked: false,
          showReplyForm: false,
          newReply: '',
          replies: []
        }
      ],
      newReview: '',
      userRating: 3,
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
    // Format star rating as text (1 star, 2 stars, etc.)
    formatStarRating(rating) {
      const numRating = Number(rating);
      return numRating === 1 ? "1 star" : numRating + " stars";
    },
    
    goBack() {
      this.$router.go(-1);
    },
    
    submitReview() {
      const review = this.newReview.trim();
      
      if (!this.isValidReview) {
        return;
      }
      
      // Get the current date
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      // Create a new review object with the user's rating
      const newReviewObj = {
        text: review,
        rating: Number(this.userRating), // Ensure it's a number
        date: formattedDate,
        likes: 0,
        liked: false,
        showReplyForm: false,
        newReply: '',
        replies: []
      };
      
      // Add the new review to the beginning of the list
      this.reviews.unshift(newReviewObj);
      
      // Reset form fields
      this.newReview = '';
      this.userRating = 3; // Reset to default rating
      
      // Success message
      this.$nextTick(() => {
        // Here you would normally trigger a snackbar or toast message
        console.log("Review submitted successfully");
        console.log("New review with rating:", newReviewObj.rating);
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

    // Toggle like status for a reply
    toggleReplyLike(reviewIndex, replyIndex) {
      const reply = this.reviews[reviewIndex].replies[replyIndex];
      if (reply.liked) {
        reply.likes--;
      } else {
        reply.likes++;
      }
      reply.liked = !reply.liked;
    },
    
    // Toggle reply form visibility
    toggleReplyForm(index) {
      this.reviews[index].showReplyForm = !this.reviews[index].showReplyForm;
      if (!this.reviews[index].showReplyForm) {
        this.reviews[index].newReply = '';
      }
    },
    
    // Toggle nested reply form visibility
    toggleNestedReplyForm(reviewIndex, replyIndex) {
      const reply = this.reviews[reviewIndex].replies[replyIndex];
      reply.showNestedReplyForm = !reply.showNestedReplyForm;
      if (!reply.showNestedReplyForm) {
        reply.newNestedReply = '';
      }
    },
    
    // Submit a reply to a review
    submitReply(index) {
      const replyText = this.reviews[index].newReply.trim();
      if (!replyText) return;
      
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      const newReply = {
        text: replyText,
        date: formattedDate,
        likes: 0,
        liked: false,
        showNestedReplyForm: false,
        newNestedReply: ''
      };
      
      if (!this.reviews[index].replies) {
        this.$set(this.reviews[index], 'replies', []);
      }
      
      this.reviews[index].replies.push(newReply);
      this.reviews[index].showReplyForm = false;
      this.reviews[index].newReply = '';
    },
    
    // Submit a nested reply
    submitNestedReply(reviewIndex, replyIndex) {
      const reply = this.reviews[reviewIndex].replies[replyIndex];
      const nestedReplyText = reply.newNestedReply.trim();
      
      if (!nestedReplyText) return;
      
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      const newNestedReply = {
        text: nestedReplyText,
        date: formattedDate,
        likes: 0,
        liked: false,
        showNestedReplyForm: false,
        newNestedReply: ''
      };
      
      this.reviews[reviewIndex].replies.splice(replyIndex + 1, 0, newNestedReply);
      reply.showNestedReplyForm = false;
      reply.newNestedReply = '';
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

.review-text {
  color: #ffffff;
  line-height: 1.5;
}

.reply-text {
  color: #e6f1ff;
  line-height: 1.4;
  font-size: 0.95rem;
}

.reply-item {
  background-color: #1c2e47;
  border-radius: 8px;
  border-left: 3px solid #64ffda;
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

/* Reply form styles */
.reply-form .v-input__slot,
.nested-reply-form .v-input__slot {
  background-color: #1c2e47 !important;
}
</style>