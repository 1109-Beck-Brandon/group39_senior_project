<template>
  <v-container fluid>
    <h1 class="course-title">Introduction to Cybersecurity</h1>
    <v-row>
      <!-- Course Description Section with Background Box -->
      <v-col cols="12" md="6">
        <div class="description-box">
          <p class="course-description">
            This is a detailed description of Introduction to Cybersecurity. Here, you can add any relevant information.
          </p>
        </div>
      </v-col>

      <!-- Module Tabs and Content Section -->
      <v-col cols="12" md="6">
        <v-tabs v-model="activeTab" background-color="primary" dark>
          <v-tab v-for="(module, index) in modules" :key="index">
            {{ module }}
          </v-tab>
        </v-tabs>

        <v-card class="module-content-box" v-if="activeTab !== null">
          <v-card-text>
            <h3>{{ modules[activeTab] }}</h3>
            <p>{{ moduleContent[activeTab] }}</p>
            <!-- Button to navigate to the specific module page -->
            <v-btn
              color="primary"
              @click="goToModulePage(moduleRoutes[activeTab])"
            >
              Go to {{ modules[activeTab] }} Page
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
</template>
  
<script>
export default {
  props: ["courseName"],
  data() {
    return {
      activeTab: 0,
      modules: ["Module 1", "Module 2", "Module 3", "Module 4"],
      moduleContent: [
        "Module 1: The CIA Triad",
        "Module 2: Intro to Social Engineering",
        "Module 3: Basic Unix Commands Lab",
        "Module 4: Unix Commands Lab Continued",
      ],
      moduleRoutes: ["/course/intro-to-cybersecurity/moduleOne", "/course/intro-to-cybersecurity/SEmodule", "/course/intro-to-cybersecurity/labModule", "/course/intro-to-cybersecurity/labModule2"],
    };
  },
  methods: {
    goToModulePage(route) {
      this.$router.push(route);
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