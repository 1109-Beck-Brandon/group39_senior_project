<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
  <h2 class="dashboard-header">Teacher Dashboard</h2>

  <v-container fluid>
    <v-row>
      <!-- Left Section - Classrooms -->
      <v-col cols="3"> 
        <v-card class="classroom-card"> 
          <h3>Classroom: {{ classroomName }}</h3>
        </v-card>
      </v-col>

      <!-- Middle Section - Students List -->
      <v-col cols="6"> 
        <v-card class="dashboard-card"> 

          <v-row> 
            <v-btn class="return-button" @click="redirectToTeacherView" >Return</v-btn>            
          </v-row>

          <v-row class="join-id-row"> 
            <h1>Students </h1>            
          </v-row>

          <v-row class="join-id-row"> 
           <h5>Join ID: {{ classroomId }}</h5>
          </v-row>

          <v-row>
          <v-list class="students-list">
            <v-list-item class="student-item" rounded v-for="(student, index) in students" :key="index">
              <v-list-item-content >
                  <v-list-item-title><v-icon left color="cyan-darken-3"> mdi-account</v-icon> {{ student.firstName }} {{ student.lastName }}</v-list-item-title>
                  <!-- <v-list-item-subtitle>{{ student.email }}</v-list-item-subtitle>                   -->
              </v-list-item-content>
            </v-list-item>

            <!-- Message When No Students Are Found -->
            <v-list-item v-if="students.length === 0">
              <v-list-item-content>
                <v-list-item-title>No students found for this classroom.</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-row>

          <v-divider> </v-divider>
          <!-- Assign Courses Section -->
          <v-row class="roadmap-row"> 
            <v-col cols="12">  
              <h4>
                <v-icon left class="class-icon" color="grey-lighten-1">mdi-book</v-icon>
                Assign Courses to your class!
              </h4>
              <small>Explore courses and assign modules to classrooms</small>
            </v-col>
            <v-row> 
              <v-col cols="12"> 
                <v-btn class="add-students-button" @click="redirectToCourses"> 
                  Explore Courses!
                </v-btn>                    
              </v-col>
            </v-row>           
          </v-row>
        
        </v-card>
      </v-col>

      <!-- Right Section - Actions -->
      <v-col cols="3"> 
        <v-card class="actions-card"> 
          <h3>Actions</h3>
          <v-row class="roadmap-row">         
            <v-btn block class="classroom-button">
              <v-icon class="class-icon" left>mdi-email</v-icon>
              Inbox
            </v-btn> 
          </v-row>
          <v-row class="roadmap-row">
            <v-btn block class="classroom-button">Gradebook</v-btn>
          </v-row>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
//commenting for now
//import { getTeacherDashboard } from '@/services/api';

export default {
  name: 'ClassroomStudents',
  data() {
    return {
      classroomId: '',
      classroomName: '',
      students: [],
      classroomNames: [],
      allStudents: {},   
    };
  },
  created() {
    const classroomId = this.$route.query.id || '';
    const teacherEmail = this.$route.query.email || '';
    this.classroomId = classroomId;
    
    if (teacherEmail) {
      const teacherData = JSON.parse(localStorage.getItem(teacherEmail)) || {};
      this.email = teacherData.email || teacherEmail;
      this.firstName = teacherData.first_name || 'No first name provided';
      this.lastName = teacherData.last_name || 'No last name provided';
      this.role = teacherData.role || 'No role provided';
      this.gradeLevel = teacherData.gradeLevel || 'No grade level';
      this.phoneNumber = teacherData.phoneNumber || 'No phone number';
      this.schoolName = teacherData.schoolName || 'No school name';
      this.preferredContactMethod = teacherData.preferredContactMethod || 'No contact method';
      this.classroomNames = teacherData.classroomNames || [];
      this.allStudents = teacherData.allStudents || {};
      
      // gets CURRENT classroom selected
      const classroom = this.classroomNames.find(c => c.id === classroomId);
      this.classroomName = classroom ? classroom.name : 'Unknown Classroom';
      
      // load students in that current classroom selected
      this.students = this.allStudents[classroomId] || [];
      console.log('Loaded classroom students:', this.students);
    } else {
      this.classroomName = 'No Classroom Selected';
    }
    // commenting for now
  // // Instead of reading from localStorage, call the API
  // getTeacherDashboard()
  //   .then(response => {
  //     const teacherData = response.data;
  //     // Update your component data
  //     this.classroomNames = teacherData.classroomNames || [];
  //     this.allStudents = teacherData.allStudents || {};
  //     // Retrieve the Classroom ID from query parameters
  //     this.classroomId = this.$route.query.id || '';
  //     if (this.classroomId) {
  //       const classroom = this.classroomNames.find(c => c.id === this.classroomId);
  //       this.classroomName = classroom ? classroom.name : 'Unknown Classroom';
  //       this.students = this.allStudents[this.classroomId] || [];
  //       console.log('Fetched Students:', this.students);
  //     } else {
  //       this.classroomName = 'No Classroom Selected';
  //     }
  //   })
  //   .catch(error => {
  //     console.error("Error fetching teacher dashboard data:", error);
  //   });
  },
  methods: {
    // /**
    //  * @param {Object} classroom 
    //  */
    // selectClassroom(classroom) {
    //   // Ensure there's an array for the selected class ID
    //   if (!this.allStudents[classroom.id]) {
    //     this.allStudents[classroom.id] = [];
    //   }
    //   const userData = JSON.parse(localStorage.getItem('newUser')) || {};
    //   const email = userData.email || 'No email provided';

    //   const teachersData = JSON.parse(localStorage.getItem('teachersData')) || {};
    //   if (teachersData[email]) {
    //     teachersData[email].allStudents = this.allStudents;
    //     localStorage.setItem('teachersData', JSON.stringify(teachersData));
    //   }

    //   // Navigate to /classroom-students with the class ID as a query parameter
    //   this.$router.push({ path: '/classroom-students', query: { id: classroom.id } });
    // },

    redirectToCourses() {
      this.$router.push('/courseSelect');
    },

    redirectToTeacherView() {
      this.$router.push({ path: '/new-teacher-view', query: { email: this.email } });
    }
  }
};
</script>

<style scoped>
.dashboard-header {
  font-weight: bolder;
  color:rgb(73, 114, 137);
  justify-self: left;
  margin-left: 20px;
  margin-bottom: -10px;
}

h1 {
  color: rgb(94, 94, 94);
  font-weight: lighter;
}

h2 {
  margin-bottom: 10px;
  font-weight: lighter;
}

h3 {
  margin-bottom: 10px;
}

.class-icon {
  padding-right: 15px;
}

h4 {
  font-weight: lighter;
}

h5 {
  font-weight: bolder;
  font-size: medium;
  color:rgb(99, 135, 156)
}

h6 {
  height: 45px;
  padding: 15px;
  font-size: large;
  justify-items: left;
  justify-content: left;
  text-transform:uppercase;
}

.class-name-row {
  background-color: rgba(175, 175, 228, 0.121);
}

.join-id-row {
  justify-content: center;

}

.return-button {
  text-transform: capitalize;

}

.classroom-card {
  width: auto;
  padding: 35px;
  color: rgb(88, 88, 88);
  height: auto;
  align-content: center;
  align-items: center;
  align-self: center;
  /* background-color: darkgrey; */
}

.dashboard-card {
  padding: 20px;
}

.actions-card {
  padding: 40px;
  width: auto;
  height: auto;
}

.classroom-button {
  color: rgb(61, 61, 61);
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(118, 131, 118);
  margin-bottom:20px;
  text-transform: capitalize;

}

.add-students-button {
  color: rgb(12, 93, 35);
  /* outline-style: dashed; */
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(118, 131, 118);
  margin-top: 0px;
  text-transform: capitalize;
}

.classroom-button:hover {
  color:rgb(93, 134, 92);
}

.roadmap-row {
  margin-top: 10px;
  margin-bottom: 10px;
}

.classrooms-row {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  
}

.add-students-dialog {
  
  background-color: rgba(87, 186, 214, 0.111);
}

.dialog-list {
  color: rgb(37, 78, 107);
}

.students-list-button {
  margin-right: 50px;
  text-transform: capitalize;
  color: rgb(37, 78, 107)
  
}

.students-list {
  justify-content: left;
  justify-items: left;
  padding: 10px;
  margin-bottom: 10px;
}

.student-item {
  margin-bottom: 10px;
  outline-style:groove;
  outline-width: 2px;
  outline-color: rgba(50, 160, 184, 0.096);
}

</style>

