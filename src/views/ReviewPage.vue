<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
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
import squirrelImage from '@/assets/cartoon-squirrel-drawing-v0-z8txear3x4hb1.jpg'; // Path to your image

export default {
  data() {
    return {
      reviews: [
        "Yooooooooo I finaly can hacck thanks guys."
      ], // Store reviews here
      newReview: '', // Store new review input here
      imageSrc: squirrelImage, // Image source for the page
    };
  },
  methods: {
    submitReview() {
      if (this.newReview.trim()) {
        this.reviews.push(this.newReview.trim()); // Add the new review to the list
        this.newReview = ''; // Clear the input field
      }
    },
  },
};
</script>

<style scoped>

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: black;
}
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
