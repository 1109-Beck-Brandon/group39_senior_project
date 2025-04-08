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