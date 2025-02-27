<template>
    <v-container fluid>
      <h1 class="course-title">{{ courseName }}</h1>
      <v-row>
        <!-- Course Description Section with Background Box -->
        <v-col cols="12" md="6">
          <div class="description-box">
            <p class="course-description">This is a detailed description of {{ courseName }}. Here, you can add any relevant information.</p>
          </div>
        </v-col>
  
        <!-- Module Tabs and Content Section -->
        <v-col cols="12" md="6">
          <v-tabs v-model="activeTab" background-color="primary" dark>
            <v-tab v-for="module in modules" :key="module">
              {{ module }}
            </v-tab>
          </v-tabs>
  
          <v-card class="module-content-box" v-if="activeTab !== null">
            <v-card-text>
              <h3>{{ modules[activeTab] }}</h3>
              <p>{{ moduleContent[activeTab] }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script>
import apiClient from '@/services/api';

export default {
  props: ["courseId"],
  data() {
    return {
      course: null,         // Holds fetched course data from the backend
      activeTab: 0,
      modules: [],
      moduleContent: [],
      error: ""
    };
  },
  created() {
    this.fetchCourse();
  },
  methods: {
    async fetchCourse() {
      try {
        const response = await apiClient.get(`/courses/${this.courseId}`);
        this.course = response.data;
        // Configure modules and content dynamically based on the course details.
        this.modules = ["Overview", "Curriculum", "Reviews"];
        this.moduleContent = [
          // Using the course description for the "Overview" tab
          this.course.description,
          // Placeholder for curriculum details – update as needed
          "Curriculum content: details about the course curriculum can be added here.",
          // Placeholder for reviews – you might want to integrate a reviews component here
          "Reviews: read what others have said about the course."
        ];
      } catch (error) {
        console.error("Error fetching course data:", error);
        this.error = "Error fetching course data.";
      }
    },
  },
};
</script>
  
<style scoped>
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
  
  .module-content-box {
    margin-top: 10px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    min-height: 400px;
  }
  
  h3 {
    margin-top: 0;
  }
  
  p {
    color: #555;
  }
</style>
  