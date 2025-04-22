<template>
  
  <v-container fluid>
    <h1 class="course-title">NIST Cybersecurity Framework</h1>
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
            Welcome to the NIST Cybersecurity Framework lesson!

            <br><br>
            The National Institute of Standards and Technology (NIST) Cybersecurity 
            Framework is a policy framework of computer security guidance for how 
            private sector organizations in the United States can assess and improve 
            their ability to prevent, detect, and respond to cyber attacks. The 
            framework consists of standards, guidelines, and best practices to manage 
            cybersecurity-related risk.
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
        "Module 2", 
        "Module 3", 
        "Module 4", 
        "Module 5", 
        "Module 6", 
        "Module 7", 
        "Module 8 (Final)"
      ],
      moduleContent: [
        "Introduction to Framework",
        "Govern",
        "Identify",
        "Protect",
        "Detect",
        "Respond",
        "Recover",
        "Final Course Quiz"
      ],
      moduleDetails: [
        "An brief introduction to NIST and to the core cybersecurity framework.",
        "Explore the Govern function of the framework.",
        "Explore the Identify function of the framework.",
        "Explore the Protect function of the framework.",
        "Explore the Detect function of the framework.",
        "Explore the Respond function of the framework.",
        "Explore the Recover function of the framework.",
        "A comprehensive final quiz that combines all module quiz questions from this course. This WILL count toward your final grade for this course."
      ],
      moduleRoutes: [
        "/course/nist-framework/introModule", 
        "/course/nist-framework/governModule", 
        "/course/nist-framework/identifyModule", 
        "/course/nist-framework/protectModule", 
        "/course/nist-framework/detectModule", 
        "/course/nist-framework/respondModule", 
        "/course/nist-framework/recoverModule", 
        "/course/nist-framework/finalModule"
      ],
      isEnrolled: false,
      isEnrolling: false,
      courseId: 2,
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
        
        // Add to user's courses_enrolled in localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.courses_enrolled = user.courses_enrolled || [];
        if (!user.courses_enrolled.some(c => c.course_id === this.courseId)) {
          user.courses_enrolled.push({ course_id: this.courseId, title: this.courseName || 'NIST Cybersecurity Framework' });
          localStorage.setItem('user', JSON.stringify(user));
        }

        // Save course locally after successful API call
        this.saveCourseLocally(this.courseId, this.courseName || 'NIST Cybersecurity Framework');
        this.$emit('show-snackbar', 'Successfully enrolled in the course');
        
        // Refresh the user profile page if we're coming back to it
        if (window.refreshUserProfile) {
          window.refreshUserProfile();
        }
      } catch (error) {
        console.error('Error enrolling in course:', error);
        this.$emit('show-snackbar', 'Failed to enroll in course: ' + (error.response?.data?.error || 'Unknown error'));
      } finally {
        this.isEnrolling = false;
      }
    },
    
    // Save course to local storage
    saveCourseLocally(courseId, courseName) {
      try {
        const userId = this.userId;
        if (!userId) {
          console.error("User not logged in. Cannot save course locally.");
          return;
        }
        
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
        
        // Initialize user's courses array if it doesn't exist
        if (!enrolledCourses[userId]) {
          enrolledCourses[userId] = [];
        }
        
        // Check if course is already enrolled
        const existingCourse = enrolledCourses[userId].find(course => course.id === courseId);
        if (!existingCourse) {
          // Add course to user's enrolled courses
          enrolledCourses[userId].push({
            id: courseId,
            name: courseName,
            progress: this.calculateCourseProgress(courseId)
          });
          
          localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
          console.log(`Course ${courseName} saved locally`);
        }
      } catch (error) {
        console.error("Error saving course locally:", error);
      }
    },
    
    // Calculate course progress based on completed modules
    calculateCourseProgress(courseId) {
      try {
        // Get local progress data
        const localProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
        const userId = this.userId;
        
        if (!localProgress[userId]) return 0;
        
        // Get modules for this course
        const courseModules = ['11', '12', '13', '14', '15', '16']; // NIST Framework modules
        
        // Count completed modules
        let completedCount = 0;
        courseModules.forEach(moduleId => {
          if (localProgress[userId][moduleId]) {
            completedCount++;
          }
        });
        
        return courseModules.length ? Math.round((completedCount / courseModules.length) * 100) : 0;
      } catch (error) {
        console.error('Error calculating course progress:', error);
        return 0;
      }
    },
    
    async checkEnrollmentStatus() {
      if (!this.userId) return;
      
      try {
        // Try to get enrollment status from API first
        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL || 'https://cybersecurity-learning-platform.onrender.com/api'}/users/${this.userId}/courses`, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            const enrolledCourses = data.courses || [];
            this.isEnrolled = enrolledCourses.some(course => course.id === this.courseId);
            return;
          }
        } catch (apiError) {
          console.warn('API enrollment check failed, falling back to local storage', apiError);
        }
        
        // Fallback to local storage if API fails
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses") || "{}");
        const userCourses = enrolledCourses[this.userId] || [];
        
        // Check if this course is in the enrolled courses
        this.isEnrolled = userCourses.some(course => course.id === this.courseId);
      } catch (error) {
        console.error('Error checking enrollment status:', error);
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