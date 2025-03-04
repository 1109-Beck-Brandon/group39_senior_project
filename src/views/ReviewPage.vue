<template>
  <div class="reviewPage">
    <h1>Community Feedback</h1>
    
    <!-- Debug information - always visible -->
    <div class="debug-panel">
      <p>Debug Info:</p>
      <ul>
        <li>Loading: {{ loading }}</li>
        <li>Reviews Count: {{ reviews.length }}</li>
        <li>User logged in: {{ isUserLoggedIn }}</li>
      </ul>
      <button @click="refreshReviews" class="primary-button">Refresh Reviews</button>
    </div>

    <!-- Review Form - Only show if logged in -->
    <div class="review-form">
      <h3>Share Your Thoughts</h3>
      <div v-if="!isUserLoggedIn" class="login-prompt">
        <p>Please <router-link to="/login">log in</router-link> to submit feedback.</p>
      </div>
      <form v-else @submit.prevent="submitReview">
        <textarea v-model="newReview" placeholder="Write your feedback here..." rows="5"></textarea>
        <!-- Rating is optional -->
        <div class="rating-selection">
          <label>Rating (Optional):</label>
          <select v-model="newRating">
            <option value="">No Rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
          </select>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- Reviews List -->
    <div class="reviews">
      <h3>All Feedback</h3>
      <div v-if="loading">Loading feedback...</div>
      <div v-else-if="reviews.length === 0" class="no-reviews">
        <p>No feedback yet. Be the first to share your thoughts!</p>
      </div>
      <div v-else>
        <div v-for="(review, index) in reviews" :key="index" class="review-item">
          <img :src="review.userImage || imageSrc" alt="User" class="review-thumbnail" />
          <div class="review-content">
            <p>
              <strong>{{ review.userName }}</strong>
              <span v-if="review.rating" class="rating"> - {{ review.rating }} Stars</span>
            </p>
            <p class="comment">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getReviews, postReview } from '@/services/api';
import squirrelImage from '@/assets/cartoon-squirrel-drawing-v0-z8txear3x4hb1.jpg';

export default {
  data() {
    return {
      reviews: [],        
      newReview: '',      
      newRating: null,    
      imageSrc: squirrelImage,
      error: '',
      loading: false,
      defaultCourseId: 1 // We'll use this for API calls that require a course ID
    };
  },
  computed: {
    isUserLoggedIn() {
      return !!localStorage.getItem('user');
    }
  },
  mounted() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      this.loading = true;
      this.error = '';
      try {
        // Get all reviews for the default course ID
        const response = await getReviews(this.defaultCourseId);
        this.reviews = response.data.reviews.map(review => ({
          userName: `User ${review.user_id}`,
          rating: review.rating || null, // Handle optional rating
          comment: review.comment,
          userImage: review.userImage || this.imageSrc,
        }));
      } catch (error) {
        console.error('Error fetching reviews:', error);
        this.error = 'Error loading feedback';
        
        // Add sample reviews for UI testing if API fails
        this.reviews = [
          { userName: 'User 1', rating: 5, comment: 'This is a great platform!', userImage: this.imageSrc },
          { userName: 'User 2', comment: 'I learned a lot from this course.', userImage: this.imageSrc }
        ];
      } finally {
        this.loading = false;
      }
    },
    
    async submitReview() {
      if (!this.newReview.trim()) {
        this.error = 'Please provide feedback';
        return;
      }
      
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.user_id) {
        this.error = 'User not logged in';
        this.$router.push('/login');
        return;
      }
      
      this.loading = true;
      try {
        await postReview(this.defaultCourseId, {
          comment: this.newReview.trim(),
          rating: this.newRating || 0, // Use 0 for no rating
          user_id: user.user_id,
        });
        this.error = '';
        this.newReview = '';
        this.newRating = null;
        await this.fetchReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
        this.error = 'Error submitting feedback';
      } finally {
        this.loading = false;
      }
    },
    
    refreshReviews() {
      this.fetchReviews();
    }
  }
};
</script>

<style scoped>
.reviewPage {
  padding: 20px;
  max-width: 800px;
  min-height: 50vh;
  margin: 20px auto;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0,0,0,0.4);
}

.debug-panel {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.debug-panel ul {
  margin: 5px 0;
  padding-left: 20px;
}

.debug-panel li {
  margin-bottom: 5px;
}

h1, h2, h3 {
  color: #333;
  margin-bottom: 1rem;
}

.course-selection {
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

rating-selection {
  margin: 10px 0;
}

button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

.secondary-button {
  background-color: #f0f0f0;
  color: #333;
  margin-right: 10px;
}

.secondary-button:hover {
  background-color: #e0e0e0;
}

.reviews {
  margin-top: 30px;
}

.review-item {
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
}

.review-thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.review-content {
  flex-grow: 1;
}

.rating {
  color: #f39c12;
  font-weight: bold;
}

.comment {
  margin-top: 5px;
  color: #555;
  line-height: 1.4;
}

.error {
  color: #e74c3c;
  padding: 10px;
  background-color: #fde8e8;
  border-radius: 4px;
  margin: 10px 0;
}

.login-prompt {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 15px;
}

.login-prompt a {
  color: #3498db;
  text-decoration: underline;
}

.selected-course {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading {
  color: #777;
  margin: 10px 0;
}

.no-reviews {
  color: #777;
  font-style: italic;
  margin: 10px 0;
}
</style>
