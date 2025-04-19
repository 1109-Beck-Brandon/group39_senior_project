<template>
  <v-container>
    <h1>Test Pages for NIST Course</h1>
    <v-row>
      <v-col cols="12" md="6" v-for="module in modules" :key="module.name">
        <v-card class="pa-4 mb-4">
          <h3>{{ module.name }}</h3>
          <p>{{ module.description }}</p>
          <v-btn color="primary" @click="goToModule(module.route)">Go to {{ module.name }}</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      modules: [
        { name: "Introduction to Framework", description: "Introduction to the NIST Cybersecurity Framework.", route: "/course/nist-framework/introModule" },
        { name: "Govern", description: "Explore the Govern function of the framework.", route: "/course/nist-framework/governModule" },
        { name: "Identify", description: "Explore the Identify function of the framework.", route: "/course/nist-framework/identifyModule" },
        { name: "Protect", description: "Explore the Protect function of the framework.", route: "/course/nist-framework/protectModule" },
        { name: "Detect", description: "Explore the Detect function of the framework.", route: "/course/nist-framework/detectModule" },
        { name: "Respond", description: "Explore the Respond function of the framework.", route: "/course/nist-framework/respondModule" },
        { name: "Recover", description: "Explore the Recover function of the framework.", route: "/course/nist-framework/recoverModule" },
        { name: "Final Module", description: "Take the final quiz for the NIST course.", route: "/course/nist-framework/finalModule" },
      
        // First Course Modules (Introduction to Cybersecurity)
        { name: "CIA Triad", description: "Learn about the CIA Triad and its importance in cybersecurity.", route: "/course/intro-to-cybersecurity/moduleOne" },
        { name: "Attacks and Defenses", description: "Explore common cyberattacks and their defenses.", route: "/course/intro-to-cybersecurity/AttacksDefensemodule" },
        { name: "Social Engineering", description: "Understand social engineering attacks and how to prevent them.", route: "/course/intro-to-cybersecurity/SEmodule" },
        { name: "OSI Model", description: "Learn about the OSI model and its relevance to network security.", route: "/course/intro-to-cybersecurity/OSImodule" },
        { name: "Basic Unix Commands Lab", description: "Practice basic Unix commands in a virtual lab environment.", route: "/course/intro-to-cybersecurity/labModule" },
        { name: "Advanced Unix Commands Lab", description: "Continue learning Unix commands with more advanced exercises.", route: "/course/intro-to-cybersecurity/labModule2" },
        { name: "Jobs in Cybersecurity", description: "Discover different career paths in cybersecurity.", route: "/course/intro-to-cybersecurity/Jobsmodule" },
        { name: "Final Quiz", description: "Take the final quiz for the Introduction to Cybersecurity course.", route: "/course/intro-to-cybersecurity/FinalQuiz" },
      ],
    };
  },
  methods: {
    goToModule(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}

.v-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.v-btn {
  margin-top: 10px;
}
</style>