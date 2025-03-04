<template>
  <div class="reviewPage">
<!-- daemon -->
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
<!-- ======= -->
    <h1>Course Reviews</h1>
    
    <!-- Debug information - always visible -->
    <div class="debug-panel">
      <p>Debug Info:</p>
      <ul>
        <li>Loading: {{ loading }}</li>
        <li>Selected Course ID: {{ selectedCourseId }}</li>
        <li>Courses Count: {{ courses.length }}</li>
        <li>Reviews Count: {{ reviews.length }}</li>
        <li>User logged in: {{ isUserLoggedIn }}</li>
      </ul>
      <button @click="forceRefresh" class="primary-button">Reload Courses</button>
    </div>

    <!-- Course Selection -->
    <div v-if="!selectedCourseId" class="course-selection">
      <h2>Select a Course to Review</h2>
      <div v-if="loading">Loading courses...</div>
      <div v-else-if="courses.length === 0" class="error">
        No courses available. Please try again later.
      </div>
      <select v-else v-model="selectedCourseId" @change="onCourseSelected">
        <option disabled value="">Choose a course</option>
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.title }}
        </option>
      </select>
    </div>

    <!-- Course Details when selected -->
    <div v-if="selectedCourseId" class="selected-course">
      <h2>{{ selectedCourseName }}</h2>
      <button @click="clearSelection" class="secondary-button">Change Course</button>
    </div>

    <!-- Review Form - Only show if logged in -->
    <div v-if="selectedCourseId" class="review-form">
      <h3>Write a Review</h3>
      <div v-if="!isUserLoggedIn" class="login-prompt">
        <p>Please <router-link to="/login">log in</router-link> to submit a review.</p>
      </div>
      <form v-else @submit.prevent="submitReview">
        <textarea v-model="newReview" placeholder="Write your review..." rows="5"></textarea>
        <div class="rating-selection">
          <label>Rating:</label>
          <select v-model="newRating">
            <option disabled value="">Select a rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
          </select>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- Reviews List -->
    <div v-if="selectedCourseId" class="reviews">
      <h3>Reviews</h3>
      <div v-if="loading">Loading reviews...</div>
      <div v-else-if="reviews.length === 0" class="no-reviews">
        <p>No reviews yet. Be the first to review this course!</p>
<!-- BrandonV2 -->
      </div>
      <div v-else>
        <div v-for="(review, index) in reviews" :key="index" class="review-item">
          <img :src="review.userImage || imageSrc" alt="User" class="review-thumbnail" />
          <div class="review-content">
            <p><strong>{{ review.userName }}</strong> - <span class="rating">{{ review.rating }} Stars</span></p>
            <p class="comment">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getReviews, postReview, getCourses } from '@/services/api';
import squirrelImage from '@/assets/cartoon-squirrel-drawing-v0-z8txear3x4hb1.jpg';

export default {
  props: {
    courseId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
<!-- daemon -->
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
<!-- ===== -->
      selectedCourseId: this.courseId || null,
      selectedCourseName: '',
      courses: [],
      reviews: [],        
      newReview: '',      
      newRating: null,    
      imageSrc: squirrelImage,
      error: '',
      loading: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return !!localStorage.getItem('user');
    }
  },
  async created() {
    console.log('ReviewPage created with courseId:', this.courseId);
    if (!this.selectedCourseId) {
      this.fetchCourses();
    } else {
      await this.fetchReviews();
      this.updateSelectedCourseName();
    }
  },
  mounted() {
    console.log('ReviewPage mounted');
    this.initialize();
  },
  methods: {
    async initialize() {
      // Check for courseId in route params/query
      const routeId = this.$route.params.courseId || this.$route.query.courseId;
      if (routeId) {
        this.selectedCourseId = Number(routeId);
      }
      
      console.log('Selected course ID from route:', this.selectedCourseId);
      
      // Always fetch courses for the dropdown regardless
      await this.fetchCourses();
      
      if (this.selectedCourseId) {
        await this.fetchReviews();
        this.updateSelectedCourseName();
      }
    },
    async fetchCourses() {
      this.loading = true;
      try {
        const response = await getCourses();
        console.log('Courses raw response:', response); // Log the raw response
        
        // Handle different possible API response structures
        if (response && response.data) {
          if (Array.isArray(response.data)) {
            // If API returns array directly
            this.courses = response.data;
          } else if (response.data.courses && Array.isArray(response.data.courses)) {
            // If API returns {courses: [...]}
            this.courses = response.data.courses;
          } else {
            // Convert object to array if needed
            this.courses = Object.values(response.data).filter(item => item.id);
          }
        } else {
          this.courses = [];
        }
        
        console.log('Processed courses:', this.courses);
        
        if (this.courses.length === 0) {
          // Add a sample course for testing if none are returned
          this.courses = [{ 
            id: 1, 
            title: 'Test Course (No courses found in API)',
            description: 'This is a test course for UI debugging'
          }];
          this.error = 'No courses available from API - using test data';
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        this.error = 'Failed to load courses. Please try again later.';
        
        // Add test data for UI debugging
        this.courses = [{ 
          id: 1, 
          title: 'Test Course (API Error)',
          description: 'This is a test course for UI debugging'
        }];
      } finally {
        this.loading = false;
      }
    },
    async fetchReviews() {
      this.loading = true;
      this.error = '';
      try {
        const response = await getReviews(this.selectedCourseId);
        this.reviews = response.data.reviews.map(review => ({
          userName: `User ${review.user_id}`,
          rating: review.rating,
          comment: review.comment,
          userImage: review.userImage || this.imageSrc,
        }));
      } catch (error) {
        console.error('Error fetching reviews:', error);
        this.error = 'Error loading reviews';
      } finally {
        this.loading = false;
      }
    },
    async submitReview() {
      if (!this.newReview.trim() || this.newRating === null) {
        this.error = 'Please provide both a rating and a comment';
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
        await postReview(this.selectedCourseId, {
          comment: this.newReview.trim(),
          rating: this.newRating,
          user_id: user.user_id,
        });
        this.error = '';
        this.newReview = '';
        this.newRating = null;
        await this.fetchReviews();
      } catch (error) {
        console.error('Error submitting review:', error);
        this.error = 'Error submitting review';
      } finally {
        this.loading = false;
<!-- BrandonV2 -->
      }

      // Add the validated review to the list
      console.log("Review submitted successfully:", review);
      this.reviews.push(review);
      this.newReview = ''; // Clear the input field
    },
<!-- daemon --> 

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
<!-- ===== -->
    onCourseSelected() {
      if (this.selectedCourseId) {
        this.fetchReviews();
        this.updateSelectedCourseName();
      }
    },
    updateSelectedCourseName() {
      const selectedCourse = this.courses.find(c => c.id === this.selectedCourseId);
      this.selectedCourseName = selectedCourse ? selectedCourse.title : 'Selected Course';
    },
    clearSelection() {
      this.selectedCourseId = null;
      this.reviews = [];
      this.error = '';
    },
    navigateToReviewPage(courseIdValue) {
      this.$router.push({ 
        name: 'ReviewPage',
        query: { courseId: courseIdValue }  // If you have a course ID
      });
    },
    forceRefresh() {
      this.loading = false;
      this.error = '';
      this.fetchCourses();
    },
<!-- BrandonV2 -->
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

.rating-selection {
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
