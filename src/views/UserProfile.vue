<template>
  <v-container fluid>
    <v-row>
      <!-- Left Panel: Profile Info -->
      <v-col cols="3">
        <!-- user profile Picture stuff -->
        <v-card class="pa-3 mb-4 text-center">
          <v-img
            :src="user.profilePicture || defaultProfilePicture"
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
          <h3>Name: {{ user.fullName || "Full Name" }}</h3>
          <p><strong>Username:</strong> {{ user.username }}</p>
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

        <!-- Enrolled courses panel, also clickable and redirects to the Courses page based on the course title -->
        <v-card class="pa-3 mb-4">
          <h3>Currently Enrolled Courses</h3>
          <v-row>
            <v-col 
              v-for="(course, index) in courses" 
              :key="index" 
              cols="4"
            >
              <v-card 
                class="pa-3 course-panel" 
                outlined 
                @click="navigateToCourse(course.name)"
              >
                <p><strong>Course Name:</strong> {{ course.name }}</p>
                <p><strong>Progress:</strong> {{ course.progress }}%</p>
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
Chart.register(...registerables);

export default {
  name: "UserProfileView",
  data() {
    const user = JSON.parse(localStorage.getItem("newUser")) || {};
    return {
      user: {
        username: user.username || "N/A",
        email: user.email || "N/A",
        role: user.role || "N/A",
        profilePicture: user.profilePicture || null, // idk if this should be null or user.profilePicture, Default profile picture logic
        membershipDuration: "Just Joined", // Placeholder for now
        fullName: `${user.firstName || "First"} ${user.lastName || "Last"}`,
        gradeLevel: user.gradeLevel || null,
        schoolName: user.schoolName || null,
      },
      editProfileData: {
        gradeLevel: user.gradeLevel || "",
        schoolName: user.schoolName || "",
      },
      grades: ["9th grade", "10th grade", "11th grade", "12th grade"],
      coursesList: ["Intro to Cybersecurity"], //updated later
      courses: [],
      achievements: [],
      showEditPictureDialog: false, //these are visibility flags 
      showEditProfileDialog: false,
      showJoinClassroomModal: false,
      newClassroomId: "", //for the user to input their classroom id if they haven't done so from onboarding
      fetchedPictures: [],  
      defaultProfilePicture: "https://robohash.org/example4?set=set1", // Default avatar placeholder, changeable
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
    this.updateCoursesProgress();
    this.createChart();
  },
  methods: {
    updateCoursesProgress() {
      const userProgress = [0]; // Example progress, later replace with backend data
      this.courses = this.coursesList.map((course, index) => ({
        name: course,
        progress: userProgress[index] || 0,
      }));

    },
    createChart() {
      const ctx = document.getElementById("progressChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.courses.map((course) => course.name),
          datasets: [
            {
              label: "Progress (%)",
              data: this.courses.map((course) => course.progress),
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
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
      const userData = JSON.parse(localStorage.getItem("newUser")) || {};
      if (userData.classroomId) {
        this.$router.push("/studentClassroom");
      } else {
          this.showJoinClassroomModal = true; //prompts user to put a classroom id, in order to access the /studentClassroom page
      }
    },
    submitClassroomId() {
      if (this.newClassroomId.trim() === "") {
        return;
      }
      const userData = JSON.parse(localStorage.getItem("newUser")) || {};
      userData.classroomId = this.newClassroomId.trim();
      localStorage.setItem("newUser", JSON.stringify(userData)); // Save to local storage
      this.showJoinClassroomModal = false; // Close the modal
      this.$router.push("/studentClassroom"); // Redirect to classroom
    },
    fetchProfilePictures() {
      this.loadingPictures = true;
      this.showEditPictureDialog = true;

      // for generating 6 random profile pictures from the robohash api
      const baseUrl = "https://robohash.org";
      const theme = "set1"; // set5 represents humans, set1 represents robots
      const fetchedImages = [];

      for (let i = 0; i < 6; i++) {
        const randomString = `${Math.random().toString(36).substring(2)}`;
        fetchedImages.push(`${baseUrl}/${randomString}?set=${theme}&size=200x200`);
      }

      // for the loading indicator
      setTimeout(() => {
        this.fetchedPictures = fetchedImages;
        this.loadingPictures = false; // stop loading indicator
      }, 500); // timeout, adjustable

    },
    selectProfilePicture(picture) {
      this.user.profilePicture = picture; // update the user's profile picture
      this.showEditPictureDialog = false; 
      localStorage.setItem("newUser", JSON.stringify(this.user)); // Save to localStorage so it stays there
    },
    closeEditPictureDialog() {
      this.showEditPictureDialog = false; 
    },
    saveProfileInfo() {
      this.user.gradeLevel = this.editProfileData.gradeLevel || "N/A";
      this.user.schoolName = this.editProfileData.schoolName || "N/A";
      localStorage.setItem("newUser", JSON.stringify(this.user));
      this.showEditProfileDialog = false;
    },
    navigateToCourses() {
    this.$router.push({ path: "/courseSelect" });
     },
     navigateToCourse(courseName) {
      // IMPORTANT this will break if the course's page name doesn't follow the format /intro-to-cyber-.... so I will probably replace this with something else
      const courseRoute = courseName.toLowerCase().replace(/\s+/g, '-');
      this.$router.push(`/course/${courseRoute}`);
    },
  },
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
}

.course-panel:hover {
  transform: scale(1.1); 
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); 
}
</style>