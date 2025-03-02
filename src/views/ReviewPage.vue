<template>
  <div class="reviewPage">
    <h1>Review Page</h1>

    <div v-if="!selectedCourseId" class="course-selection">
      <h2>Select a Course to Review</h2>
      <select v-model="selectedCourseId" @change="onCourseSelected">
        <option disabled value="">Choose a course</option>
        <option v-for="course in courses" :key="course.id" :value="course.id">
          {{ course.title }}
        </option>
      </select>
    </div>

    <!-- Review Form (Add new review directly) -->
    <form @submit.prevent="submitReview">
      <textarea v-model="newReview" placeholder="Write a review..." rows="5"></textarea>
      <select v-model="newRating">
        <option disabled value="">Select a rating</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars</option>
      </select>
      <button type="submit">Submit Review</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- List of Reviews -->
    <div class="reviews">
      <h2>Reviews:</h2>
      <div v-if="reviews.length === 0">
        <p>No reviews yet. Be the first to review this course!</p>
      </div>
      <div v-for="(review, index) in reviews" :key="index" class="review-item">
        <img :src="review.userImage || imageSrc" alt="Review User" class="review-thumbnail" />
        <div>
          <p><strong>{{ review.userName }}</strong> - {{ review.rating }} Stars</p>
          <p>{{ review.comment }}</p>
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
      selectedCourseId: this.courseId || null,
      courses: [],
      reviews: [],        
      newReview: '',      
      newRating: null,    
      imageSrc: squirrelImage,
      error: '',          
    };
  },
  async created() {
    if (!this.selectedCourseId) {
      try {
        const response = await getCourses();
        this.courses = response.data.courses;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    } else {
      await this.fetchReviews();
    }
  },
  methods: {
    async fetchReviews() {
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
        this.error = 'Error fetching reviews';
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
      try {
        await postReview(this.selectedCourseId, {
          comment: this.newReview.trim(),
          rating: this.newRating,
          user_id: user.user_id,
        });
        await this.fetchReviews();
        this.newReview = '';
        this.newRating = null;
      } catch (error) {
        console.error('Error submitting review:', error);
        this.error = 'Error submitting review';
      }
    },
    onCourseSelected() {
      if (this.selectedCourseId) {
        this.fetchReviews();
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

select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
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

.error {
  color: red;
}
</style>
