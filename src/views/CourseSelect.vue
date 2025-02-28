<template>
  <v-container fluid>
    <h2 class="page-title">Select a Course</h2>
    <div class="course-scroll">
      <v-row class="course-row" no-gutters>
        <v-col
          v-for="course in courses"
          :key="course.id"
          class="course-square"
          cols="auto"
        >
          <div class="course-content">
            <h3>{{ course.title }}</h3>
            <p>{{ course.description }}</p>
            <div class="progress-container">
              <p class="progress-text">Progress: {{ course.progress || 0 }}%</p>
              <v-progress-linear
                :value="course.progress || 0"
                color="blue"
                height="20"
              ></v-progress-linear>
              <v-btn color="primary" @click="goToCoursePage(course.id)">
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
import { getCourses } from '@/services/api';

export default {
  name: 'CourseSelect',
  data() {
    return {
      courses: [],
    };
  },
  async created() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.$router.push('/login');
      return;
    }
    try {
      const response = await getCourses();
      this.courses = response.data.courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },
  methods: {
    goToCoursePage(courseId) {
      if (courseId) {
        this.$router.push(`/course/${courseId}`);
      } else {
        console.error("No valid course ID provided");
      }
    },
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
  font-size: 2em;
  margin-top: -30px;
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

.progress-container {
display: flex;
flex-direction: column;
align-items: center;
margin-top: auto;
}

.progress-text {
margin-top: 10px;
font-size: 1em;
color: #000;
}

.v-progress-linear {
width: 80%;
margin-top: 5px;
}

</style>
