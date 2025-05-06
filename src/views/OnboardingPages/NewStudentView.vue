<template>
    <v-container fluid class="student-view-page-container" min-height="1000px">
        <v-row class="page-title-row"> 
            <h2 class="cybersecurity-title">Cybersecurity </h2>  
        </v-row>

      <v-row>
        <!-- Academic Info Column -->
        <v-col cols="12" md="4">
          <v-card>
            Avatar picture here
            <v-divider></v-divider>
            <v-btn>
              Edit picture              
            </v-btn>
          </v-card>
          

          <v-card class="pa-4">
            <h3 class="section-title">Academic Info</h3>
            <v-divider class="my-2"/>
            <p><strong>Grade Level:</strong> {{ gradeLevel || 'N/A' }}</p>
            <p><strong>School Name:</strong> {{ schoolName || 'N/A' }}</p>
          </v-card>

          <v-card>
            <h3 class="section-title"> first name and Last Name</h3>
            Basic name and email information goes here
          </v-card>

          <v-card>
            <v-btn>
              GO TO CLASSROOM
            </v-btn>
          </v-card>

        </v-col>
  
        <!-- Courses Placeholder Column -->
        <v-col cols="12" md ="8">
          <v-card class="pa-4">
            <h3 class="section-title">Courses</h3>
            <v-divider class="my-2"/>
            <p>[Your enrolled courses will show here]</p>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NewStudentView',
    data() {
      return {
        email: '',
        gradeLevel: '',
        schoolName: ''
      };
    },
    created() {
      // grab email from query
      this.email = this.$route.query.email || '';
      // load the email‑keyed object
      const userInfo = JSON.parse(localStorage.getItem(this.email)) || {};
      this.gradeLevel  = userInfo.gradeLevel || '';
      this.schoolName  = userInfo.schoolName || '';

      console.log("getting data from object:", userInfo);
    }
  };
  </script>
  
  <style scoped>
  .student-view-page-container {
    position: relative;
    background-image: 
        radial-gradient(rgba(13, 235, 255, 0.1) 1px, transparent 1px),
        radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
    background-size: 50px 50px, 70px 70px;
    background-position: 0 0, 25px 25px;
    padding-top: 20px;
    color: #e6f1ff;
    background-color: #0a192f;
  }

  .cybersecurity-title {
    /* transparent for now */
  color: #2e538700;
  font-weight: bolder;
  justify-self: left;
  margin-bottom: -5px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.page-title-row {
  /* im using this because it gets rid of the white space on toplol */
  background-color: #0a192f;
  padding: 20px;
  margin-top: -70px;
  margin-bottom: -24px;
  margin-right: -20px;
  margin-left: -20px;
}
  
  .section-title {
    color: #64ffda;
    margin-bottom: 8px;
  }
  </style>
  