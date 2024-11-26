<template>
    <v-container fluid>
      <h1 class="course-title">Sample Course 202</h1>
      <v-row>
        <!-- Course Description Section with Background Box -->
        <v-col cols="12" md="6">
          <div class="description-box">
            <p class="course-description">This is a detailed description of Sample Course 202. Here, you can add any relevant information.</p>
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
        modules: ["Module 1", "Module 2", "Module 3"],
        moduleContent: [
          "Module 1 content: This is the first module of the course. Add module content here.",
          "Module 2 content: This is the second module of the course. Add module content here.",
          "Module 3 content: This is the third module of the course. Add module content here.",
        ],
      };
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
  