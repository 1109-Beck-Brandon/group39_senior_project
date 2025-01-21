<template>
  <!-- Application Bar -->
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
  
  <v-container fluid>
    <h1 class="course-title">Introduction to Cybersecurity</h1>
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
            <p class="detailed-description">{{ moduleDetails[activeTab] }}</p>
            <br><br><br>
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
</template>
  
<script>
export default {
  props: ["courseName"],
  data() {
    return {
      activeTab: 0,
      modules: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6", "Module 7", "Module 8 (Final)"],
      moduleContent: [
        "Module 1: The CIA Triad",
        "Module 2: Intro to Attacks and Defenses",
        "Module 3: Intro to Social Engineering",
        "Moudle 4: Intro to the OSI Model",
        "Module 5: Basic Unix Commands Lab",
        "Module 6: Unix Commands Lab Continued",
        "Module 7: Jobs in Cybersecurity",
        "Module 8: Final Course Quiz"
      ],
      moduleDetails: [
        "This module explores the CIA triad and its fundamental importance in cybersecurity.",
        "Learn about various types of attacks that affect computer systems and defenses that can be used to counter them.",
        "In this module you will learn about the people-side of security and how they can be exploited to create security risks and incidents.",
        "In this module you will be introduced to the OSI model and how it applies to network security.",
        "In this lab exercise you will learn basic Unix commands in a virtual linux environment.",
        "This lab continues where the previous lab left off and covers more intermediate level unix commands.",
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

  .detailed-description {
  margin-top: 10px;
  font-style: italic;
  color: #666;
  }
</style>