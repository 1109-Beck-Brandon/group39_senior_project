<template>
  <div class="reviewPage">
    <h1>Review Page</h1>

    <!-- Review Form (Add new review directly) -->
    <form @submit.prevent="submitReview">
      <textarea v-model="newReview" placeholder="Write a review..." rows="5"></textarea>
      <button type="submit">Submit Review</button>
    </form>

    <!-- List of Reviews -->
    <div class="reviews">
      <h2>Reviews:</h2>
      <div v-if="reviews.length === 0">
        <p>What a shame.... No one gives a damn about our website (crying emoji)</p>
      </div>
      <div v-for="(review, index) in reviews" :key="index" class="review-item">
        <!-- Display image alongside the review -->
        <img :src="imageSrc" alt="Review User" class="review-thumbnail" />
        <p>{{ review }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import squirrelImage from '@/assets/cartoon-squirrel-drawing-v0-z8txear3x4hb1.jpg';

export default {
  data() {
    return {
      reviews: [],         // Will be populated from the API
      newReview: '',       // For user input
      imageSrc: squirrelImage,
      error: '',           // For error messages
    };
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await axios.get('/api/reviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          }
        });
        this.reviews = response.data;
      } catch (error) {
        console.error('Error fetching reviews:', error);
        this.error = 'Error fetching reviews';
      }
    },
    async submitReview() {
      if (!this.newReview.trim()) {
        return;
      }
      // Retrieve the logged-in user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.user_id) {
        this.error = 'User not logged in';
        return;
      }
      try {
        const payload = {
          content: this.newReview.trim(),
          user_id: user.user_id
        };
        const response = await axios.post('/api/reviews', payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          }
        });
        // Option 1: Re-fetch all reviews
        // await this.fetchReviews();

        // Option 2: Prepend the new review to the reviews array for immediate feedback
        this.reviews.unshift({
          review_id: response.data.review_id,
          content: payload.content,
          author: {
            user_id: user.user_id,
            username: user.username
          },
          timestamp: new Date().toISOString()
        });
        this.newReview = '';
      } catch (error) {
        console.error('Error submitting review:', error);
        this.error = 'Error submitting review';
      }
    },
  },
};
</script>

<style scoped>
.reviewPage {
  padding: 20px;
}

form {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.reviews {
  margin-top: 20px;
}

.review-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.review-thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
