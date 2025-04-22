<template>
  
  <v-container fluid>
    <h1 class="course-title">Introduction to Cybersecurity</h1>

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
            Welcome to our website's Introduction to Cybersecurity Course!

            <br><br>
            This course will introduce concepts that are good to know for general awareness of the digital world today,
            as well as setup indivudals for the other courses they will be able to take on this website. This will also
            provide users the opportunity to get use to the general structure of how courses will be taught on this website.
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
import { enrollCourse, saveModuleProgress, apiClient } from '@/services/api';
//import axios from 'axios';

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
        "The CIA Triad",
        "Intro to Attacks and Defenses",
        "Intro to Social Engineering",
        "Intro to the OSI Model",
        "Basic Unix Commands Lab",
        "Unix Commands Lab Continued",
        "Jobs in Cybersecurity",
        "Final Course Quiz"
      ],
      moduleDetails: [
        "This module explores the CIA triad and its fundamental importance in cybersecurity.",
        "Learn about various types of attacks that affect computer systems and defenses that can be used to counter them.",
        "In this module, you will learn about the people-side of security and how they can be exploited to create security risks and incidents.",
        "In this module, you will be introduced to the OSI model and how it applies to network security.",
        "In this lab exercise, you will learn basic Unix commands in a virtual Linux environment.",
        "This lab continues where the previous lab left off and covers more intermediate-level Unix commands.",
        "Discover different career paths in cybersecurity and what skills you will use in each role.",
        "A comprehensive final quiz that combines all module quiz questions from this course. This WILL count toward your final grade for this course."
      ],
      moduleRoutes: [
        "/course/intro-to-cybersecurity/moduleOne", 
        "/course/intro-to-cybersecurity/AttacksDefensemodule", 
        "/course/intro-to-cybersecurity/SEmodule", 
        "/course/intro-to-cybersecurity/OSImodule", 
        "/course/intro-to-cybersecurity/labModule", 
        "/course/intro-to-cybersecurity/labModule2", 
        "/course/intro-to-cybersecurity/Jobsmodule", 
        "/course/intro-to-cybersecurity/FinalQuiz"
      ],
      isEnrolled: false,
      isEnrolling: false,
      courseId: 1,
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
        
        // Try API enrollment
        try {
          await enrollCourse(this.userId, this.courseId);
          console.log('Course enrollment successful via API');
        } catch (apiError) {
          console.warn('API enrollment failed, saving locally only', apiError);
        }
        
        // Always save course locally for offline support
        this.saveCourseLocally();
        
        // Update UI state
        this.isEnrolled = true;
        this.$emit('show-snackbar', 'Successfully enrolled in the course');
        
        if (typeof window.refreshUserProfile === 'function') {
          window.refreshUserProfile();
        }
      } catch (error) {
        console.error('Error enrolling in course:', error);
        this.$emit('show-snackbar', 'Failed to enroll in course: ' + (error.response?.data?.error || 'Unknown error'));
      } finally {
        this.isEnrolling = false;
      }
    },
    
    // Save course enrollment to localStorage
    saveCourseLocally() {
      try {
        // Get existing enrolled courses
        const localCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '{}');
        
        // Initialize user's courses if needed
        if (!localCourses[this.userId]) {
          localCourses[this.userId] = [];
        }
        
        // Check if already enrolled
        const existingCourse = localCourses[this.userId].find(c => c.id === this.courseId.toString());
        if (!existingCourse) {
          // Add course to enrolled list
          localCourses[this.userId].push({
            id: this.courseId.toString(),
            name: 'Introduction to Cybersecurity',
            progress: 0
          });
          
          // Save back to localStorage
          localStorage.setItem('enrolledCourses', JSON.stringify(localCourses));
          console.log('Course enrollment saved locally');
          
          // Also save to user.courses_enrolled for backward compatibility
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.courses_enrolled = user.courses_enrolled || [];
          if (!user.courses_enrolled.some(c => c.course_id === this.courseId)) {
            user.courses_enrolled.push({
              course_id: this.courseId,
              title: 'Introduction to Cybersecurity'
            });
            localStorage.setItem('user', JSON.stringify(user));
          }
        }
      } catch (error) {
        console.error('Error saving course enrollment locally:', error);
      }
    },

    // Check if user is already enrolled
    async checkEnrollmentStatus() {
      if (!this.userId) return;
      
      try {
        // Try to get enrollment status from API
        const response = await apiClient.get(`/users/${this.userId}/courses`);
        const enrolledCourses = response.data.courses || [];
        this.isEnrolled = enrolledCourses.some(course => course.id === this.courseId);
      } catch (error) {
        console.error('Error checking enrollment status:', error);
        
        // Check localStorage for enrollment information
        try {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const enrolledCourses = user.courses_enrolled || [];
          this.isEnrolled = enrolledCourses.some(course => course.course_id === this.courseId);
          
          // If no enrollment info found, set to false but don't show error
          if (!user.courses_enrolled) {
            this.isEnrolled = false;
          }
        } catch (localStorageError) {
          console.error('Error reading from localStorage:', localStorageError);
          this.isEnrolled = false;
        }
      }
    },

    async handleQuizCompleted({ score }) {
      if (!this.userId) {
        console.error('User not logged in. Cannot save progress.');
        return;
      }

      try {
        const moduleId = this.modules[this.activeModule]; // Assuming module ID corresponds to the active module index
        await saveModuleProgress(this.userId, moduleId, score);
        this.$emit('show-snackbar', 'Quiz progress saved successfully!');
      } catch (error) {
        console.error('Error saving quiz progress:', error);
        this.$emit('show-snackbar', 'Failed to save quiz progress.');
      }
    },
  },
  
  created() {
    // Check enrollment status when component is created
    this.checkEnrollmentStatus();
  }

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

.enroll-button {
  min-width: 200px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
}

</style>