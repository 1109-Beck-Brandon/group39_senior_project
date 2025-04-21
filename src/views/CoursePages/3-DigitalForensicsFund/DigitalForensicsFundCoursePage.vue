<template>
  
  <v-container fluid>
    <h1 class="course-title">Digital Forensics Fundamentals</h1>
    <v-row justify="center" class="mb-4">
      <v-btn 
        color="success" 
        class="enroll-button" 
        @click="enrollInCourse"
        :loading="isEnrolling"
        :disabled="isEnrolled"
      >
        {{ enrollButtonText }}
      </v-btn>
    </v-row>
    <v-row>
      <!-- Course Description Section with Background Box -->
      <v-col cols="12" md="6">
        <div class="description-box">
          <p class="course-description">
            Welcome to the Digital Forensics Fundamentals lesson!

            <br><br>
            Insert Description here
          </p>
        </div>
      </v-col>

      <!-- Module List Section -->
      <v-col cols="12" md="6">
        <v-list two-line>
          <v-list-item class="module-title"
            v-for="(module, index) in modules" 
            :key="index" 
            @click="showPopup(index)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ module }}</v-list-item-title>
              <v-list-item-subtitle>{{ moduleContent[index] }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- Popup Dialog -->
        <v-dialog v-model="isPopupVisible" max-width="600">
          <v-card>
            <v-card-title>{{ modules[activeModule] }}</v-card-title>
            <v-card-text>
              <p>{{ moduleContent[activeModule] }}</p>
              <p class="detailed-description">{{ moduleDetails[activeModule] }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn 
                color="primary" 
                @click="goToModulePage(moduleRoutes[activeModule])"
              >
                Go to {{ modules[activeModule] }} Page
              </v-btn>
              <v-btn color="secondary" @click="closePopup">Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { enrollCourse } from '@/services/api';

export default {
  props: ["courseName"],
  data() {
    return {
      activeModule: null,
      isPopupVisible: false,
      modules: [
        "Module 1", 
      ],
      moduleContent: [
        "Placeholder",
      ],
      moduleDetails: [
        "Placeholder until more content can be added",
      ],
      moduleRoutes: [
        "",
      ],
      isEnrolled: false,
      isEnrolling: false,
      courseId: 3,
    };
  },
  computed: {
    enrollButtonText() {
      return this.isEnrolled ? 'Enrolled' : 'Enroll in Course';
    },
    userId() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.user_id;
    }
  },
  methods: {
    showPopup(index) {
      this.activeModule = index;
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    goToModulePage(route) {
      this.$router.push(route);
    },
    async enrollInCourse() {
      if (!this.userId) {
        this.$router.push('/login?redirect=' + encodeURIComponent(this.$route.fullPath));
        return;
      }
      try {
        this.isEnrolling = true;
        await enrollCourse(this.userId, this.courseId);
        this.isEnrolled = true;
        this.$emit('show-snackbar', 'Successfully enrolled in the course');
      } catch (error) {
        console.error('Error enrolling in course:', error);
        this.$emit('show-snackbar', 'Failed to enroll in course: ' + (error.response?.data?.error || 'Unknown error'));
      } finally {
        this.isEnrolling = false;
      }
    },
    async checkEnrollmentStatus() {
      if (!this.userId) return;
      try {
        // Try to get enrollment status from API
        // (API endpoint may need to be implemented for this course)
        this.isEnrolled = false; // Default to not enrolled
      } catch (error) {
        this.isEnrolled = false;
      }
    },
  },
  created() {
    this.checkEnrollmentStatus();
  },
  mounted() {
    this.checkEnrollmentStatus();
  },
};
</script>
  
<style scoped>

.module-title {
  text-align: left;
}

.course-title {
  text-align: center;
  font-size: 2.5em;
  margin: 20px 0;
}

.description-box {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  min-height: 500px;
}

.course-description {
  font-size: 1.2em;
  color: #333;
}

.detailed-description {
  margin-top: 10px;
  font-style: italic;
  color: #666;
}
</style>