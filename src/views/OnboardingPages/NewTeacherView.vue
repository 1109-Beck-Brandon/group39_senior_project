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
          <v-btn rounded class = "classroom-button" @click="openNewClassModal">
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
                label="Classrooms"
                :rules="[requiredRule]"
              ></v-select>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <h5>Manually add students </h5>
              <!-- <p><strong>Classroom ID:</strong> {{ getClassroomId(selectedClassroom) }}</p> -->
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newStudent.firstName"
                label="Enter first name"
                placeholder="Becka"
                rounded
                variant="outlined"
                color="cyan-darken-4"
                :rules="[requiredRule]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newStudent.lastName"
                label="Enter last name"
                placeholder="Smith"
                rounded
                variant="outlined"
                color="cyan-darken-4"
                :rules="[requiredRule]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newStudent.email"
                label="Enter email"
                type="email"
                rounded
                variant="outlined"
                color="cyan-darken-4"
                :rules="[requiredRule, emailFormatRule]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider> </v-divider>
        <v-card-actions>
        <v-col cols="12"> 
          <v-spacer></v-spacer>
          <v-btn class="students-list-button" text @click="openExcelModal"> Or, copy and paste your students list </v-btn>
          <v-btn text @click="closeAddStudentsModal">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addStudent">Add</v-btn>
        </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Dialog for Pasting Students List -->
    <v-dialog transition="dialog-bottom-transition" class="paste-excel-dialog" v-model="showExcelModal" max-width="600px">
      <v-card>
        <v-card-title class="headline">Paste From Excel</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row class="excel-dialog-row">
            <v-col cols="12">
              <h5>Choose your class </h5> 
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
                label="classrooms"
                :rules="[requiredRule]"
              ></v-select>
            </v-col> 
            <v-divider></v-divider>
            <v-col cols="12">
              <h5>Paste your student list</h5>              
            </v-col>
            <v-col cols="12">
              <h4 class="center-h4">
                Copy from your excel sheet and paste here!
              </h4>
            </v-col>
            <v-col cols="12">
              <v-textarea class="excel-text-area"
                v-model="excelData"
                label="FirstName............ LastName............... Email.................."
                rounded
                color="cyan-darken-5"
                rows="10"
              ></v-textarea>              
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="closeExcelModal">Go Back</v-btn>
          <v-btn color="blue darken-1" text @click="processExcelData">Add Students</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <!-- Modal Dialog for Creating a New Class -->
      <v-dialog transition="dialog-bottom-transition" v-model="showNewClassModal" max-width="600px">
        <v-card>
          <v-icon block size="large" class="apple-icon"> mdi-white-balance-sunny</v-icon>
          <v-icon block size="large" class="desk-icon"> mdi-book-open-page-variant</v-icon>
          <v-card-title class="create-class-headline">Create New Class</v-card-title>
          <v-card-text>
            <v-row class="create-class-row">
              <v-col cols="12">
                <h5 class="create-class-headings">Class name</h5>
                <v-text-field rounded class="new-class-fields" v-model="newClassName" label="Enter classroom name" required outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <h5 class="create-class-headings">Grade</h5>
                <v-select rounded class="new-class-fields" v-model="newGradeLevel" :items="grades" label="Choose grade level" required outlined></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field rounded class="new-class-fields" :value="newClassId" label="This is your new Classroom ID" readonly outlined></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text @click="closeNewClassModal">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveNewClass">Create Class</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- Display for debugging, temporary -->
   <!-- <v-row>
      <v-spacer> </v-spacer>
      <v-col cols="12" class="text-center">

        <p>For debugging, i'll delete this later</p>

        <v-btn @click="testAddStudent">Test addStudent</v-btn>        
        <p>Username: {{ username }}</p>
        <p>First Name: {{ firstName }}</p>
        <p>Last Name: {{ lastName }}</p>
        <p>Email: {{ email }}</p>
        <p>Role: {{ role }}</p>
        <p>Classrooms: {{ classroomNames }}</p>
        <p>Students: {{ allStudents }}</p>
         <p>Grade Level: {{ gradeLevel }}</p>
        <p>Phone Number: {{ phoneNumber }}</p>
        <p>School Name: {{ schoolName }}</p>
        <p>Preferred Contact Method: {{ preferredContactMethod }}</p>
      </v-col>
    </v-row> -->

    <!-- v-snackbar ui components (the little alert messages)-->
    <v-snackbar text rounded transition="dialog-top-transition" v-model="snackbar" :timeout="1500" top right>
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
      //rules
      requiredRule: v=> !!v || 'This field is required',
      emailFormatRule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address',

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

      //For the Show Excel and Paste Modal
      showExcelModal: false,
      excelData: '', //Data from user pasting from excel sheet

      //For the Add New Class modal
      newClassName: '', 
      newGradeLevel: '',  
      newClassId: this.generateClassId(),  // new classroom ID (randomly generated)
      grades: ['9th grade', '10th grade', '11th grade', '12th grade'],  // available grade levels
      showNewClassModal: false, 

      //For the snackbar ui alerts
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
    getTeacherDashboardLocalStorage() {
      const userData = JSON.parse(localStorage.getItem('newUser')) || {};
      this.email = userData.email || 'No email provided';

      // fetch the teacher's data using the email from 'teachersData' in localStorage
      const teachersData = JSON.parse(localStorage.getItem('teachersData')) || {};
      const teacherData = teachersData[this.email] || {};

      // populate from teacherData if available
      this.username = teacherData.username || 'No username provided';
      this.firstName = teacherData.firstName || 'No first name provided';
      this.lastName = teacherData.lastName || 'No first name provided';
      this.role = teacherData.role || 'No role provided';

      this.gradeLevel = teacherData.gradeLevel || 'No grade level';
      this.phoneNumber = teacherData.phoneNumber || 'No phone number';
      this.schoolName = teacherData.schoolName || 'No school name';
      this.preferredContactMethod = teacherData.preferredContactMethod || 'No contact method';
      //
      this.classroomNames = teacherData.classroomNames || [];
      this.allStudents = teacherData.allStudents || {};
      console.log('Classroom Names Array:', this.classroomNames);
    },
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
      alert('redirecting');
    },
    openExcelModal(){
      this.showExcelModal = true;
    },
    processExcelData() {
      // Taking pasted info from user
      const students = this.excelData.split('\n').map((line) => {
        const [firstName, lastName, email] = line.split('\t');
        return { firstName, lastName, email };
      });

      // Check if a classroom is selected and that there are students
      if (this.selectedClassroom && students.length > 1) {
        // Add students to the selected classroom
        if (!this.allStudents[this.selectedClassroom]) {
          this.allStudents[this.selectedClassroom] = []; // Create an array for this classroom if it doesn't exist
        }

        // Add each student to the classroom
        students.forEach((student) => {
          this.allStudents[this.selectedClassroom].push(student);
        });

        // Persist the updated allStudents object to localStorage
        const teachersData = JSON.parse(localStorage.getItem('teachersData')) || {};
        if (teachersData[this.email]) {
          teachersData[this.email].allStudents = this.allStudents;
          localStorage.setItem('teachersData', JSON.stringify(teachersData));
        }

        // Provide feedback to the user
        this.snackbarMessage = 'Students added successfully!';
        this.snackbar = true;
        this.closeExcelModal();
        this.closeAddStudentsModal();
      } else {
        // Show an error message if no classroom is selected or if no students were pasted
        this.snackbarMessage = 'Please select a classroom and paste valid data.';
        this.snackbar = true;
      }
    },
    closeExcelModal(){
      this.showExcelModal = false;
      this.excelData = '';
    },
    generateClassId() {
      return 'CLS' + Math.random().toString(36).substring(2, 8).toUpperCase();
    },
    openNewClassModal() {
      this.showNewClassModal = true;
    },
    closeNewClassModal() {
      this.showNewClassModal = false;
      this.newClassName = '';
      this.newGradeLevel = '';
      this.newClassId = this.generateClassId();
    },
    saveNewClass() {
      if (this.newClassName && this.newGradeLevel) {
        // Create new class object
        const newClass = {
          name: this.newClassName,
          gradeLevel: this.newGradeLevel,
          id: this.newClassId,
        };

        // Add the new class to the list of classrooms in localStorage
        const teachersData = JSON.parse(localStorage.getItem('teachersData')) || {};
        const teacherData = teachersData[this.email] || {};
        teacherData.classroomNames.push(newClass);

        // Save updated data in localStorage
        teachersData[this.email] = teacherData;
        localStorage.setItem('teachersData', JSON.stringify(teachersData));

        // Update the classroom names in the current session
        this.classroomNames.push(newClass);

        // Close the modal and reset fields
        this.closeNewClassModal();

        // Show feedback message
        this.snackbarMessage = 'Class created successfully!';
        this.snackbar = true;
      } else {
        this.snackbarMessage = 'Please fill in all fields.';
        this.snackbar = true;
      }
    },

    testAddStudent() {   
      //checking for classrooms 
      if (this.classroomNames.length === 0) {
        const testClass = { id: 'TEST123', name: 'Test Classroom' };
        this.classroomNames.push(testClass);
        this.selectedClassroom = testClass.id;
      } else {
        
        this.selectedClassroom = this.classroomNames[0].id;
      }
      //test student info
      this.newStudent.firstName = 'Test';
      this.newStudent.lastName = 'Student';
      this.newStudent.email = 'test@student.com';
      
      this.addStudent();

      console.log('After addStudent, allStudents:', this.allStudents);
      this.snackbarMessage = 'Student added successfully!';
    },

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
  color:rgb(50, 79, 96)
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
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgba(118, 131, 118, 0.756);
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
  align-items: center;
  /* background-color: rgba(87, 186, 214, 0.111); */
}

.dialog-list {
  color: rgb(18, 51, 75);
}

.students-list-button {
  margin-right: 50px;
  text-transform: capitalize;
  color: rgb(37, 78, 107)
  
}

.paste-excel-dialog {
  align-items: center;
  background-color: rgba(124, 160, 181, 0.749);
}

.center-h4 {
  font-weight:bolder;
  font-size: small;
  color: rgb(81, 91, 96);
}

.excel-dialog-row {
  align-content: center;
  text-align: left;
  padding:5px;
}

.excel-text-area {
  color:rgb(18, 59, 79);
}

.create-class-headline {
  text-align: center;
}

.create-class-row {
  align-content: center;
  text-align: center;
}

.desk-icon {
  align-self: center;
  color: rgb(107, 84, 42);
}

.apple-icon {
  align-self: center;
  color: rgb(179, 169, 66);
  margin-top: 20px;
}

.new-class-fields {
  padding: 10px;
  align-self: center;
  color: rgb(3, 22, 56);
}

.create-class-headings {
  margin-left: 20px;
  text-align: left;
}
</style>
