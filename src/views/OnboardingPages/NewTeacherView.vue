<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
  <h2 class="dashboard-header">Teacher Dashboard</h2>

  <v-container fluid>
    <v-row>

      <!-- Left Section- classrooms-->
      <v-col cols="3"> 
        <!-- <v-card class="classroom-card">
          <h3> Profile Picture</h3>
          <v-btn rounded class="classroom-button">
            <v-icon left class ="class-icon">mdi-pencil</v-icon>
            Edit Profile Picture
          </v-btn>
        </v-card> -->

        <v-card class="classroom-card"> 
          <h3>Classrooms</h3>
          <!--class buttons loop-->
          <v-row class="classrooms-row">
          <v-btn v-for="classroom in classroomNames"
          :key="classroom.id"
          class="classroom-button"
          block

          @click="selectClassroom(classroom)"
          >
            {{ classroom.name }}
          </v-btn>
          </v-row>
          <v-btn rounded class = "classroom-button">
            <v-icon block left class="class-icon"> mdi-plus</v-icon>
              New Class
          </v-btn>                
        </v-card>
      </v-col>

      <!-- Middle Section-->
      <v-col cols="6"> 
        <v-card class = "dashboard-card"> 

          <h1>Welcome, {{ firstName }}!</h1>     
          <v-divider> </v-divider>
          
          <!-- Roadmap guide for new teacher users -->
           <!-- step 1: create a class-->
          <v-row class="roadmap-row">
            <v-col cols="12">
              <h4>
                <v-icon left class ="class-icon" color="green-lighten-2">mdi-check-circle</v-icon>
                Create a Classroom
              </h4>
              <small>Select your classroom to view class settings</small>
            </v-col>
          </v-row>
          <v-divider> </v-divider>

          <!-- step 2: add students or invite-->
          <v-row class="roadmap-row"> 
            <v-col cols="12"> 
              <h4>
                <v-icon left class ="class-icon" color="grey-lighten-2">mdi-check-circle</v-icon>
                Invite or Add Students
              </h4>
              <small>Invite students to begin their learning journey</small>
            </v-col>      

              <v-row> 
                <v-col cols="12"> 
                <v-btn class="add-students-button" @click="manuallyAddStudents"> 
                  Add Students!
                </v-btn>                    
                </v-col>
              </v-row>
          </v-row>
          <v-divider> </v-divider>


          <!-- step 3: assign courses-->
          <v-row class="roadmap-row"> 
            <v-col cols="12"> 
              <h4>
                <v-icon left class ="class-icon" color="grey-lighten-2">mdi-check-circle</v-icon>
                Assign courses
              </h4>
              <small>Explore courses and assign modules to classrooms </small>
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

      <!-- Right section, inbox, gradebook-->
      <v-col cols="3"> 
        <v-card class="actions-card"> 
          <h3>Actions</h3>
          <v-row class="roadmap-row">         
            <v-btn block class="classroom-button" > <v-icon class="class-icon" left>mdi-email</v-icon>Inbox</v-btn> 
          </v-row>
          <v-row class="roadmap-row">
            <v-btn block class="classroom-button" >Gradebook</v-btn>
          </v-row>

        </v-card>
      </v-col>
    </v-row>

    <!--Modal Dialogs-->
    <!-- Add Students Modal -->
    <v-dialog transition="dialog-bottom-transition" class="add-students-dialog" v-model="showAddStudentsModal" max-width="600px">
      <v-card>
        <v-card-title class="headline" >Add a New Student</v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="12"> 
              <h5>Select the classroom</h5>              
            </v-col>
            <v-col cols="12">
              <v-select
                class="dialog-list"
                variant="outlined"
                color="cyan-darken-4"
                v-model="selectedClassroom"
                :items="classroomNames"
                item-title="name"
                item-value="id"
                label="Classroom: "
                required
              ></v-select>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <h5>Add students by full name and email</h5>
              <!-- <p><strong>Classroom ID:</strong> {{ getClassroomId(selectedClassroom) }}</p> -->
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStudent.firstName"
                label="First Name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="newStudent.lastName"
                label="Last Name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newStudent.email"
                label="Email"
                type="email"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider> </v-divider>
        <v-card-actions>
        <v-col cols="12"> 
          <v-spacer></v-spacer>
          <v-btn class="students-list-button" text> Or, copy and paste your students list </v-btn>
          <v-btn color="blue darken-1" text @click="closeAddStudentsModal">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addStudent">Add</v-btn>
        </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Display for debugging, temporary -->
    <!-- <v-row>
      <v-spacer> </v-spacer>
      <v-col cols="12" class="text-center">
        <p>For debugging, i'll delete this later</p>
        <p>Username: {{ username }}!</p>
        <p>First Name: {{ firstName }}</p>
        <p>Email: {{ email }}</p>
        <p>Role: {{ role }}</p>
        <p>Classrooms: {{ classroomNames }}</p>
        <p>Students: {{ allStudents }}</p> -->
        <!-- <p>Grade Level: {{ gradeLevel }}</p> -->
        <!-- <p>Phone Number: {{ phoneNumber }}</p>
        <p>School Name: {{ schoolName }}</p>
        <p>Preferred Contact Method: {{ preferredContactMethod }}</p>
      </v-col>
    </v-row> -->

    <!-- v-snackbar ui components (the little alert messages)-->
    <v-snackbar text v-model="snackbar" :timeout="3000" top right>
      {{ snackbarMessage }}
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>

</template>

<script>
import { getTeacherDashboard, addStudentToClassroom } from '@/services/api';

export default {
  name: 'NewTeacherView',
  data() {
    return {
      username: '',
      email: '',
      role: '',
      firstName: '',
      lastName: '',
      gradeLevel: '',
      phoneNumber: '',
      schoolName: '',
      preferredContactMethod: '',
      classroomNames: [],
      allStudents: {},

      // For the Add Students Modal
      showAddStudentsModal: false,
      selectedClassroom: null, // ID of selected class
      newStudent: {
        firstName: '',
        lastName: '',
        email: '',
      },

      // For the snackbar alerts
      snackbar: false,
      snackbarMessage: '',
    };
  },
  created() {
    // Instead of reading from localStorage, fetch teacher data from the backend.
    getTeacherDashboard()
      .then(response => {
        const teacherData = response.data;
        this.email = teacherData.email || 'No email provided';
        this.username = teacherData.username || 'No username provided';
        this.firstName = teacherData.firstName || '';
        this.role = teacherData.role || '';
        this.gradeLevel = teacherData.gradeLevel || '';
        this.phoneNumber = teacherData.phoneNumber || '';
        this.schoolName = teacherData.schoolName || '';
        this.preferredContactMethod = teacherData.preferredContactMethod || '';
        this.classroomNames = teacherData.classroomNames || [];
        this.allStudents = teacherData.allStudents || {};
      })
      .catch(error => {
        console.error("Error fetching teacher dashboard data:", error);
      });
  },
  methods: {
    selectClassroom(classroom) {
      // Optionally, update local data if needed
      this.$router.push({ path: '/classroom-students', query: { id: classroom.id } });
    },
    openAddStudentsModal() {
      this.showAddStudentsModal = true;
    },
    closeAddStudentsModal() {
      this.showAddStudentsModal = false;
      this.selectedClassroom = null;
      this.newStudent = {
        firstName: '',
        lastName: '',
        email: '',
      };
    },
    addStudent() {
      if (!this.selectedClassroom) {
        alert('Please select a classroom.');
        return;
      }
      if (!this.newStudent.firstName || !this.newStudent.lastName || !this.newStudent.email) {
        alert('Please fill in all student details.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.newStudent.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      // Call the backend API to add the student.
      addStudentToClassroom(this.selectedClassroom, this.newStudent)
        .then(() => {
          // Refresh the teacher dashboard data
          return getTeacherDashboard();
        })
        .then(response => {
          const teacherData = response.data;
          this.allStudents = teacherData.allStudents || {};
          this.classroomNames = teacherData.classroomNames || [];
          this.closeAddStudentsModal();
          this.snackbarMessage = 'Student added successfully!';
          this.snackbar = true;
        })
        .catch(error => {
          console.error("Error adding student:", error);
        });
    },
    manuallyAddStudents() {
      this.openAddStudentsModal();
    },
    redirectToCourses() {
      // Implement redirection to courses page as needed.
      this.$router.push('/courseSelect');
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

.classroom-card {
  width: auto;
  padding: 35px;
  color: rgb(88, 88, 88);
  height: auto;
  margin-bottom: 5px;
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
  /* outline-style: dashed; */
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(118, 131, 118);
  margin-top: 0px;
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

</style>
