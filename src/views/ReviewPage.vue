<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
  <div class="reviewPage">
    <h1>Review Page</h1>

    <!-- Review Form -->
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
      this.newReview = ''; // Clear the input field
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
/* CSS styling remains the same */
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