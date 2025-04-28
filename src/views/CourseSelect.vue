<template>
  <v-container fluid>
    <h2 class="page-title">Select a Course</h2>
    <div class="course-scroll">
      <v-row class="course-row" no-gutters>
        <v-col
          v-for="course in courses"
          :key="course.name"
          class="course-square"
          cols="auto"
        >
          <div class="course-content">
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>
            <div class="progress-container">
              <v-btn color="primary" @click="goToCoursePage(course.name)" :disabled="course.name === 'Digital Forensics Fundamentals'">
                Go to Course
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        { name: "Introduction to Cybersecurity", description: "This is the introduction course to cybersecurity. Learn more about the field and learn the basic essential concepts.", progress: 0 },
        { name: "NIST Cybersecurity Framework", description: "Learn about the National Institute for Science and Technology's Cybersecurity Framework.", progress: 0 },
        { name: "Digital Forensics Fundamentals", description: "Coming Soon!", progress: 0 },
        // Add more courses as needed
      ],
    };
  },
  methods: {
    goToCoursePage(courseName) {
      const courseRoutes = {
        "Introduction to Cybersecurity": "/course/intro-to-cybersecurity",
        "NIST Cybersecurity Framework": "/course/nist-framework",
        "Digital Forensics Fundamentals": "/course/digital-forensics-fund",
        // More course routings
      };

      const route = courseRoutes[courseName];
      if (route) {
        this.$router.push(route);
      } else {
        console.error("No route defined for this course:", courseName);
      }
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2em;
  margin-top: 70px;
  margin-bottom: 10px;
}

.course-scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 10px;
  position: absolute;
  bottom: 10vh;
  left: 0;
  right: 0;
}

.course-row {
  display: flex;
  flex-wrap: nowrap;
}

.course-square {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 60vh;
  background-color: #f5f5f5;
  margin: 0 10px;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}

.course-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
}

.course-square h3 {
  font-size: 1.2em;
  margin: 0;
  flex-shrink: 0;
}

.course-square p {
  font-size: 0.9em;
  color: #666;
  margin: 5px 0;
  white-space: normal;
  overflow: hidden;
  flex-grow: 1;
  text-align: left;
}
</style>
