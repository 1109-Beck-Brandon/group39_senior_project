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
import apiClient from '@/services/api';
import squirrelImage from '@/assets/cartoon-squirrel-drawing-v0-z8txear3x4hb1.jpg';

export default {
  props: {
    courseId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviews: [],        // Array to hold fetched reviews
      newReview: '',      // For user comment input
      newRating: null,    // For user rating input
      imageSrc: squirrelImage,
      error: '',          // For error messages
    };
  },
  created() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const url = `/courses/${this.courseId}/reviews`;
        const response = await apiClient.get(url);
        // The API returns an object with a 'reviews' key
        this.reviews = response.data.reviews;
      } catch (error) {
        console.error('Error fetching reviews:', error);
        this.error = 'Error fetching reviews';
      }
    },
    async submitReview() {
      if (!this.newReview.trim() || this.newRating === null) {
        this.error = 'Please provide both a rating and a comment';
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
          comment: this.newReview.trim(),
          rating: this.newRating,
          user_id: user.user_id
        };
        const url = `/courses/${this.courseId}/reviews`;
        await apiClient.post(url, payload);
        // Re-fetch all reviews to show the newly submitted one
        await this.fetchReviews();
        // Reset input fields
        this.newReview = '';
        this.newRating = null;
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
