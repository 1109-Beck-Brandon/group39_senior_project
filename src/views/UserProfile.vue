<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
    <v-container fluid>
      <v-row>

        <!-- User Info Box -->
        <v-col cols="3">
          <v-card class="pa-3 mb-4">
            <v-row>
              <v-col cols="6">
                <v-img
                  :src="user.profilePicture"
                  class="rounded-circle"
                  contain
                  height="100"
                />
              </v-col>
              <v-col cols="6" class="user-info-text">
                <p><strong>Username:</strong> {{ user.username }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Full Name:</strong> {{ user.fullName }}</p>
                <p><strong>Member Since:</strong> {{ user.membershipDuration }}</p>
              </v-col>
            </v-row>
          </v-card>
  
          <!-- User Role Box -->
          <v-card class="pa-3">
            <h3>Role</h3>
            <p><strong>Role:</strong> {{ user.role }}</p>
            <p v-if="user.role === 'Student'">
              <strong>Class:</strong> {{ user.class }}
            </p>
          </v-card>
        </v-col>
  
        <!-- Courses Section -->
        <v-col cols="9">
          <h1>User Profile</h1>
  
          <!-- Course Progress -->
          <v-card class="pa-3 mb-4">
            <h3>Currently Enrolled Courses</h3>
            <v-row>
              <v-col
                v-for="(course, index) in courses"
                :key="index"
                cols="4"
              >
                <v-card class="pa-3">
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
      return {
        user: {
          profilePicture: "https://via.placeholder.com/100",
          username: "exampleUser",
          email: "user@example.com",
          fullName: "John Doe",
          membershipDuration: "2 years",
          role: "Student", // Change to "Individual" or "Teacher" as needed
          class: "Classroom 1", // Only relevant for students
        },
        courses: [
          { name: "Introduction to Cybersecurity", progress: 90 },
          { name: "Sample Course 2", progress: 75 },
          { name: "Sample Course 3", progress: 30 },
        ],
      };
    },
    mounted() {
      this.createChart();
    },
    methods: {
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
    },
  };
</script>
  
  
<style scoped>
  .pa-3 {
    padding: 16px;
  }
  .rounded-circle {
    border-radius: 50%;
  }
  .user-info-text {
    padding-left: 1px;
  }
</style>