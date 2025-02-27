<template>
  <v-container fluid>
    <h1 class="course-title">{{ course.title }}</h1>
    <v-row>
      <v-col cols="12" md="6">
        <div class="description-box">
          <p class="course-description">{{ course.description }}</p>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-tabs v-model="activeTab" background-color="primary" dark>
          <v-tab v-for="(module, index) in modules" :key="index">
            {{ module.title }}
          </v-tab>
        </v-tabs>
        <v-card class="module-content-box" v-if="modules.length">
          <v-card-text>
            <h3>{{ modules[activeTab]?.title }}</h3>
            <p>{{ modules[activeTab]?.content }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCourse } from '@/services/api';

export default {
props: ["courseId"],
data() {
  return {
    course: {},
    activeTab: 0,
    modules: [],
    error: ""
  };
},
async created() {
  await this.fetchCourse();
},
methods: {
  async fetchCourse() {
    try {
      const response = await getCourse(this.courseId);
      this.course = response.data;
      this.modules = response.data.modules || [];
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
