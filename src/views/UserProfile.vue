<template>
  <v-container fluid>
    <v-row>
      <!-- Left Panel: Profile Info -->
      <v-col cols="3">
        <!-- user profile Picture stuff -->
        <v-card class="pa-3 mb-4 text-center">
          <v-img
            :src="user.profile_picture || defaultProfilePicture"
            class="rounded-circle mx-auto"
            contain
            height="150"
            width="150"
          />
          <v-btn color="primary" small class="mt-3" @click="fetchProfilePictures">
            Edit Picture
          </v-btn>
        </v-card>

        <!-- the pop up when user clicks the 'Edit Picture' button -->
        <v-dialog v-model="showEditPictureDialog" persistent max-width="600px">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              <span>Select a Profile Picture</span>

              <v-btn
                icon
                @click="fetchProfilePictures"
                :disabled="loadingPictures"
              >
                <v-icon>mdi-reload</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <div style="height: 250px; display: flex; flex-direction: column; justify-content: center;">
                <!-- for the Loading Indicator -->
                <v-progress-linear
                  v-if="loadingPictures"
                  indeterminate
                  color="primary"
                  height="4"
                ></v-progress-linear>

                <!-- Shows grid of profile pictures to choose from -->
                <v-row v-else>
                  <v-col cols="4" v-for="(picture, index) in fetchedPictures" :key="index">
                    <v-img
                      :src="picture"
                      class="rounded-circle mx-auto"
                      contain
                      height="100"
                      width="100"
                      @click="selectProfilePicture(picture)"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" text @click="closeEditPictureDialog">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <!-- Academic Info Panel (ONLY FOR STUDENT ROLE USERS, doesn't appear for individual users) -->
        <v-card v-if="user.role === 'Student'" class="pa-3 mb-4">
          <h3>Academic Info</h3>
          <p class="academic-info-text"><strong>Grade Level:</strong> {{ user.gradeLevel || "N/A" }}</p>
          <p class="academic-info-text"><strong>School Name:</strong> {{ user.schoolName || "N/A" }}</p>
          <v-btn color="secondary" block small @click="showEditProfileDialog = true">
            Edit Academic Info
          </v-btn>
        </v-card>

        <!-- the pop up after user clicks the 'edit academic info' button-->
        <v-dialog v-model="showEditProfileDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>Edit Academic Info</v-card-title>
            <v-card-text>
              <v-form ref="editProfileForm">
                <!-- grade buttons instead of text boxes -->
                <div class="grade-selection">
                  <h4>Select Grade Level:</h4>
                  <v-row>
                    <v-col cols="3" v-for="grade in grades" :key="grade">
                      <v-btn
                        :color="editProfileData.gradeLevel === grade ? 'primary' : 'secondary'"
                        block
                        @click="editProfileData.gradeLevel = grade"
                      >
                        {{ grade }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <v-text-field
                  v-model="editProfileData.schoolName"
                  label="School Name"
                  outlined
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" text @click="showEditProfileDialog = false">Cancel</v-btn>
              <v-btn color="primary" text @click="saveProfileInfo">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Normal User Information Panel (this appears for student and Individual-role users) -->
        <v-card class="pa-3 mb-4">
          <h3>Name: {{ user.fullName || "User" }}</h3>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Role:</strong> {{ user.role }}</p>
          <p><strong>Member Since:</strong> {{ user.membershipDuration }}</p>
        </v-card>

        <!-- ONLY For student role users, a button for navigating to Classroom -->
        <v-card v-if="user.role === 'Student'" class="pa-3">
          <v-btn
            color="success"
            block
            @click="redirectToClassroom"
          >
            Go to Classroom
          </v-btn>
        </v-card>
      </v-col>
        <!-- pop up for student to enter classroom ID, if they haven't from onboarding, (to navigate to Classroom) -->
        <v-dialog v-model="showJoinClassroomModal" persistent max-width="400px">
          <v-card>
            <v-card-title class="headline">Join Classroom</v-card-title>
            <v-card-text>
              <p>Join your classroom by entering the classroom ID below:</p>
              <v-text-field
                v-model="newClassroomId"
                label="Classroom ID"
                outlined
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" text @click="showJoinClassroomModal = false">Cancel</v-btn>
              <v-btn color="primary" @click="submitClassroomId">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      <!-- Right Panel: Main Content -->
      <v-col cols="9">
        <div class="dashboard-header">
          <h1>Dashboard</h1>
          <!-- navigate to Courses Button, to /courseSelect -->
          <v-btn
            color="success"
            class="courses-button"
            @click="navigateToCourses"
          >
            <v-icon left>mdi-book-open</v-icon> Go to Courses
          </v-btn>
        </div>

        <!-- stats Panel thing -->
        <v-card class="pa-3 mb-4">
          <h3>Quick Stats</h3>
          <v-row>
            <v-col cols="4" class="text-center">
              <h4>{{ courses.length }}</h4>
              <p>Enrolled Courses</p>
            </v-col>
            <v-col cols="4" class="text-center">
              <h4>{{ averageProgress }}%</h4>
              <p>Average Progress</p>
            </v-col>
            <v-col cols="4" class="text-center">      
              <h4>{{ achievements.length }}</h4>
              <p>Achievements</p>
            </v-col>
          </v-row>
        </v-card>

        <!-- Enrolled courses panel with responsive layout -->
        <v-card class="pa-3 mb-4">
          <h3>Currently Enrolled Courses</h3>
          <div v-if="courses.length === 0" class="text-center pa-3">
            <p>You are not enrolled in any courses yet.</p>
            <v-btn color="primary" @click="navigateToCourses" class="mt-2">Browse Courses</v-btn>
          </div>
          <v-row v-else>
            <v-col 
              v-for="(course, index) in courses" 
              :key="index" 
              cols="12" sm="6" md="4"
            >
              <v-card 
                class="pa-3 course-panel" 
                outlined 
                height="100%"
                @click="navigateToCourse(course.name)"
              >
                <p><strong>Course Name:</strong> {{ course.name }}</p>
                <p><strong>Progress:</strong> {{ course.progress }}%</p>
                <v-progress-linear
                  v-model="course.progress"
                  color="success"
                  height="10"
                  rounded
                ></v-progress-linear>
              </v-card>
            </v-col>
          </v-row>
        </v-card>

        <!-- Progress Chart -->
        <v-card class="pa-3">
          <h3>Course Progress Chart</h3>
          <canvas id="progressChart"></canvas>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { logout, getUserProfile, updateUserProfile, enrollCourse, apiClient } from '@/services/api';
Chart.register(...registerables);

export default {
  name: "UserProfileView",
  data() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const firstName = user.first_name || "";
    const lastName = user.last_name || "";
    
    return {
      user: {
        user_id: user.user_id || null,
        username: user.username || "N/A",
        email: user.email || "N/A",
        role: user.role || "N/A",
        profile_picture: user.profile_picture || null,
        membershipDuration: "Just Joined",
        fullName: firstName && lastName ? `${firstName} ${lastName}` : (user.name || "User"),
        first_name: firstName,
        last_name: lastName,
        grade_level: user.grade_level || null,
        school_name: user.school_name || null,
        classroom_id: user.classroom_id || null,
      },
      editProfileData: {
        gradeLevel: user.gradeLevel || "",
        schoolName: user.schoolName || "",
      },
      grades: ["9th grade", "10th grade", "11th grade", "12th grade"],
      coursesList: ["Intro to Cybersecurity"], // updated later
      courses: [],
      achievements: [],
      showEditPictureDialog: false,
      showEditProfileDialog: false,
      showJoinClassroomModal: false,
      newClassroomId: "",
      fetchedPictures: [],
      defaultProfilePicture: "https://robohash.org/example4?set=set1",
      loadingPictures: false,
    };
  },

  computed: {
    averageProgress() {
      const totalProgress = this.courses.reduce((sum, course) => sum + course.progress, 0);
      return this.courses.length ? Math.round(totalProgress / this.courses.length) : 0;
    },
  },

  mounted() {
    this.fetchUserData();
    this.updateCoursesProgress();
    this.createChart();
  },

  methods: {
    async fetchUserData() {
      try {
        const response = await getUserProfile(this.user.user_id);
        if (response.data) {
          // Extract first and last name, checking multiple possible field formats
          const firstName = response.data.first_name || response.data.firstName || this.user.first_name;
          const lastName = response.data.last_name || response.data.lastName || this.user.last_name;
          
          this.user = { 
            ...this.user, 
            ...response.data,
            first_name: firstName,
            last_name: lastName,
            fullName: firstName && lastName ? `${firstName} ${lastName}` : (response.data.name || this.user.fullName)
          };
          
          // Update localStorage with the latest user data
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    async logout() {
      try {
        await logout();
        localStorage.removeItem('user');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },

    async updateCoursesProgress() {
      try {
        const response = await getUserProfile(this.user.user_id);
        if (response.data && response.data.courses_enrolled && Array.isArray(response.data.courses_enrolled)) {
          this.courses = response.data.courses_enrolled.map(course => ({
            id: course.course_id,
            name: course.title,
            progress: course.progress || 0,
          }));
        } else {
          // Handle case where courses_enrolled doesn't exist or isn't an array
          this.courses = [];
          console.log('No courses enrolled data available');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        this.courses = []; // Initialize with empty array
      }
    },

    async enrollCourse(courseId) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.user_id) {
          console.error("User not logged in.");
          return;
        }
        await enrollCourse(user.user_id, courseId);
        console.log('Enrolled successfully');
      } catch (error) {
        console.error('Error enrolling in course:', error);
      }
    },

    createChart() {
      const ctx = document.getElementById("progressChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.courses.map(course => course.name),
          datasets: [{
            label: "Progress (%)",
            data: this.courses.map(course => course.progress),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    },

    redirectToClassroom() {
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      if (userData.classroomId) {
        this.$router.push("/studentClassroom");
      } else {
        this.showJoinClassroomModal = true;
      }
    },

    async submitClassroomId() {
      try {
        await enrollCourse(this.user.user_id, this.newClassroomId);
        const userData = JSON.parse(localStorage.getItem('user'));
        userData.classroom_id = this.newClassroomId;
        localStorage.setItem('user', JSON.stringify(userData));
        this.showJoinClassroomModal = false;
        this.$router.push('/studentClassroom');
      } catch (error) {
        console.error('Error joining classroom:', error);
      }
    },

    fetchProfilePictures() {
      this.loadingPictures = true;
      this.showEditPictureDialog = true;
      const baseUrl = "https://robohash.org";
      const theme = "set1"; // Robots
      const fetchedImages = [];
      for (let i = 0; i < 6; i++) {
        const randomString = Math.random().toString(36).substring(2);
        fetchedImages.push(`${baseUrl}/${randomString}?set=${theme}&size=200x200`);
      }
      setTimeout(() => {
        this.fetchedPictures = fetchedImages;
        this.loadingPictures = false;
      }, 500);
    },

    async selectProfilePicture(picture) {
      try {
        await apiClient.put(`/users/${this.user.user_id}`, {
          profile_picture: picture,
        });
        this.user.profile_picture = picture;
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
      this.showEditPictureDialog = false;
    },

    closeEditPictureDialog() {
      this.showEditPictureDialog = false;
    },

    async saveProfileInfo() {
      try {
        await updateUserProfile(this.user.user_id, {
          grade_level: this.editProfileData.gradeLevel,
          school_name: this.editProfileData.schoolName,
        });
        // Update local user data after saving
        this.user.grade_level = this.editProfileData.gradeLevel;
        this.user.school_name = this.editProfileData.schoolName;
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Error saving profile info:', error);
      }
      this.showEditProfileDialog = false;
    },
    navigateToCourses() {
      this.$router.push({ path: "/courseSelect" });
    },
    navigateToCourse(courseName) {
      const courseRoute = courseName.toLowerCase().replace(/\s+/g, '-');
      this.$router.push(`/course/${courseRoute}`);
    },
    // Add this method
    async refreshProgress() {
      await this.updateCoursesProgress();
      this.createChart();
    }
  },
  // Listen for route changes
  created() {
    this.$router.beforeEach((to, from, next) => {
      // If returning to profile from a course module
      if (from.path.includes('/course/') && to.path === '/dashboard') {
        this.refreshProgress();
      }
      next();
    });
  }
};
</script>

<style scoped>
.pa-3 {
  padding: 16px;
  background-color: #1e1e2f; 
  border-radius: 8px;
  color: #ffffff; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5); /* cool soft shadow */
}

.v-card {
  background-color: #28293d; 
  border-radius: 10px;
  color: #ffffff; 
}

/* for the button Styles */
.v-btn {
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.v-btn.primary {
  background-color: #007bff; 
  color: #ffffff;
}

.v-btn.primary:hover {
  background-color: #0056b3; 
}

.v-btn.success {
  background-color: #28a745; 
}

.v-btn.success:hover {
  background-color: #1e7e34; 
}

.v-btn.secondary {
  background-color: #6c757d; 
  color: #ffffff;
}

.v-btn.secondary:hover {
  background-color: #545b62; 
}

/* Profile Picture Panel */
.v-img {
  border: 2px solid #9f4c04; /* border color, i made it orange for now */
  transition: transform 0.2s ease, border-color 0.3s ease;
  cursor: pointer;
}

.v-dialog {
  background-color: #1e1e2f;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
}

.v-card-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
}

.v-card-text {
  color: #c9d1d9;
}

.academic-info-text {
  padding: 5px 30px; 
  font-size: 15px; 
  color: #c9d1d9; 
}

.v-card-actions {
  background-color: #28293d;
}

.grade-selection {
  margin-bottom: 20px;
}

.grade-selection h4 {
  margin-bottom: 10px;
  color: #f39c12;
  font-size: 18px;
}

.grade-selection .v-btn {
  margin: 5px 0;
  font-weight: bold;
}

.picture-grid img {
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 50%;
  transition: transform 0.2s ease, border-color 0.2s ease;
  border: 2px solid transparent;
}

.picture-grid img:hover {
  transform: scale(1.2); 
  border-color: #f39c12;
}

/* Progress Chart Panel */
canvas {
  background-color: #28293d;
  border-radius: 10px;
  padding: 10px;
  max-width: 100%;
  height: auto !important;
}

h1, h3 {
  color: #f39c12; 
  font-family: 'Roboto', sans-serif;
}

p {
  color: #c9d1d9; 
}

.v-card.v-btn {
  background-color: #55a0f0; 
}

.v-card.v-btn:hover {
  background-color: #0056b3; 
}

.text-center h4 {
  color: #28a745; 
}

.text-center p {
  color: #ffffff;
  font-size: 14px;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.courses-button {
  font-weight: bold;
  text-transform: uppercase;
  margin-left: auto;
}
.course-panel {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.course-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

.v-container.fluid {
  max-width: 100%;
  overflow-x: hidden;
  padding-bottom: 30px;
}

.course-panel {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.course-panel:hover {
  transform: scale(1.1); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
}
</style>