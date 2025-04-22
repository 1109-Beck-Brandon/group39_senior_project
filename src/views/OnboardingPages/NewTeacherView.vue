<template>

  <v-container fluid class="teacher-view-page-container">
    <v-row class="page-title-row"> 
          <h2 class="cybersecurity-title">Cybersecurity </h2><h2 class="for-schools-header-title">for schools</h2>     
    </v-row>

    <v-row>
      <!-- Left Section- classrooms-->
      <v-col cols="3"> 
        <v-card class="classroom-card"> 
          <h3>CLASSROOMS</h3>
          <!--class buttons loop-->
          <v-row class="classrooms-row">
            <v-btn v-for="classroom in classroomNames"
            :key="classroom.id"
            class="classroom-button"
            block

            @click="selectClassroom(classroom)"
            >
            <!-- <v-icon block left class="class-button-icon">mdi-book-open-page-variant</v-icon> -->
              {{ classroom.name }}
            </v-btn>
          </v-row>
          <v-btn rounded class="make-class-button" @click="openNewClassModal">
            <v-icon block left class="class-icon"> mdi-plus</v-icon>
              New Class
          </v-btn>                
        </v-card>
      </v-col>

      <!-- Middle Section-->
      <v-col cols="6"> 
        <v-card class = "roadmap-card"> 

          <h1 class="dashboard-welcome-title">Welcome, {{ firstName }}!</h1>     
          <v-divider class="divider-color"> </v-divider>
          
          <!-- Roadmap guide for new teacher users -->
           <!-- step 1: create a class-->
          <!-- <v-row class="roadmap-row"> 
            <v-col cols="12">
              <h4 class="roadmap-tasks-header-text">
                <v-icon left class ="class-icon" color="teal-darken-3">mdi-check-circle</v-icon>
                Create a Classroom
              </h4> 
              <h4 class="roadmap-tasks-subtitle-text">Select your classroom to view class settings</h4>
            </v-col>
          </v-row>
          <v-divider class="divider-color" > </v-divider> -->

          <!-- step 2: add students or invite-->
          <!-- <v-row class="roadmap-row"> 
            <v-col cols="12"> 
              <h4 class="roadmap-tasks-header-text">
                Invite or Add Students
              </h4>
              <h4 class="roadmap-tasks-subtitle-text">Invite students to begin their learning journey</h4>
            </v-col>      

              <v-row> 
                <v-col cols="12"> 
                <v-btn class="roadmap-task-button" @click="manuallyAddStudents"> 
                  Add Students!
                </v-btn>                    
                </v-col>
              </v-row>
          </v-row>
          <v-divider class="divider-color" > </v-divider> -->


          <!-- step 3: assign courses-->
          <!-- <v-row class="roadmap-row"> 
            <v-col cols="12"> 
              <h4 class="roadmap-tasks-header-text">
                <v-icon left class ="class-icon" color="teal-darken-3">mdi-head-dots-horizontal-outline</v-icon>
                Assign Courses
              </h4>
              <h4 class="roadmap-tasks-subtitle-text">Explore courses and assign modules to classrooms </h4>
            </v-col>
            <v-row>
                <v-col cols="12"> 
                <v-btn class="roadmap-task-button" @click="redirectToCourses"> 
                  Explore Courses!
                </v-btn>                    
                </v-col>
            </v-row>   
          </v-row> -->
        
        </v-card>


        <v-card class="roadmap-tasks-card">
          <!-- create a class section-->
          <v-row class="roadmap-row"> 
            <v-col cols="12">
              <h4 class="roadmap-tasks-header-text">
                <v-icon left class ="class-icon" color="teal-darken-3">mdi-check-circle</v-icon>
                Create a Classroom
              </h4> 
              <h4 class="roadmap-tasks-subtitle-text">Select your classroom to view class settings</h4>
            </v-col>
          </v-row>

          <!-- invite or add students section-->
          <v-row class="roadmap-row"> 
            <v-col cols="12"> 
              <h4 class="roadmap-tasks-header-text">
                Invite or Add Students
              </h4>
              <h4 class="roadmap-tasks-subtitle-text">Invite students to begin their learning journey</h4>
            </v-col>      

              <v-row> 
                <v-col cols="12"> 
                <v-btn class="roadmap-task-button" @click="manuallyAddStudents"> 
                  Add Students!
                </v-btn>                    
                </v-col>
              </v-row>
          </v-row>

          <!-- Assign Courses section-->
          <v-divider class="divider-color" > </v-divider> 
          <v-row class="roadmap-row"> 
            <v-col cols="12"> 
              <h4 class="roadmap-tasks-header-text">
                <v-icon left class ="class-icon" color="teal-darken-3">mdi-head-dots-horizontal-outline</v-icon>
                Assign Courses
              </h4>
              <h4 class="roadmap-tasks-subtitle-text">Explore courses and assign modules to classrooms </h4>
            </v-col>
            <v-row>
                <v-col cols="12"> 
                <v-btn class="roadmap-task-button" @click="redirectToCourses"> 
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
            <v-icon left color="#093f6c">mdi-arrow-down-drop-circle</v-icon>
            <v-divider class="divider-color"> </v-divider>
            <v-btn rounded class="actions-button" > <v-icon class="class-icon" left>mdi-email</v-icon>Inbox</v-btn>             
            <v-divider class="divider-color"></v-divider>
            <!-- <v-btn rounded class="actions-button" >Gradebook</v-btn> -->
        </v-card>
      </v-col>
    </v-row>

    <!--Modal Dialogs-->
    <!-- Add Students Modal -->
    <v-dialog transition="dialog-bottom-transition" class="add-students-dialog" v-model="showAddStudentsModal" max-width="600px">
      <v-card>
        <v-card-title class="headline" >Add a New Student</v-card-title>
        <v-divider class="divider-color" ></v-divider>

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
            <v-divider class="divider-color"></v-divider>
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
        <v-divider class="divider-color" > </v-divider>
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
        <v-divider class="divider-color" ></v-divider>
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
            <v-divider class="divider-color" ></v-divider>
            <v-col cols="12">
              <h5>Paste your student list (More than 1 student)</h5>              
            </v-col>
            <v-col cols="12">
              <h4 class="center-h4">
                Copy and paste from excel sheet only!
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
        <v-divider class="divider-color"></v-divider>
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
          <v-divider class="divider-color"></v-divider>
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
        <p>First Name: {{ firstName }}</p>
        <p>Last Name: {{ lastName }}</p>
        <p>Email: {{ email }}</p>
        <p>Role: {{ role }}</p>
        <p>Classrooms: {{ classroomNames }}</p>
        <p>Students: {{ allStudents }}</p>
        <p>School Name: {{ schoolName }}</p>
      </v-col>
    </v-row> -->

    <!-- v-snackbar ui components (the little alert messages)-->
    <v-snackbar text rounded transition="dialog-top-transition" v-model="snackbar" :timeout="1200" top right>
      {{ snackbarMessage }}
      <v-btn text color="blue" @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
//commenting out temporarily
//import { getTeacherDashboard, addStudentToClassroom } from '@/services/api'; 

export default {
  name: 'NewTeacherView',
  data() {
    return {
      //rules
      requiredRule: v=> !!v || 'This field is required',
      emailFormatRule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address',

      //teacher stuff
      username: '',
      email: '',
      role: '',
      firstName: '',
      lastName: '',
      gradeLevel: '',
      phoneNumber: '',
      schoolName: '',
      preferredContactMethod: '',

      //class stuff
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
      excelData: '', 

      //For the Add New Class modal
      newClassName: '', 
      newGradeLevel: '',  
      newClassId: this.generateClassId(),  
      grades: ['9th grade', '10th grade', '11th grade', '12th grade'], 
      showNewClassModal: false, 

      //For the snackbar ui alerts
      snackbar: false,
      snackbarMessage: '',
    };
  },
  created() {
    // Check if the user is logged in, if not redirect to login page
    if (!localStorage.getItem('user')) {
      this.$router.push('/login');
      return;
    }
    
    // retrieving teacher's email
    const email = this.$route.query.email;
    console.log('Teacher email on dashboard:', email);
    this.getTeacherDashboardLocalStorage(email);

    // im commenting this part for now 
    //  Instead of reading from localStorage, fetch teacher data from the backend.
    // getTeacherDashboard()
    //   .then(response => {
    //     const teacherData = response.data;
    //     this.email = teacherData.email || 'No email provided';
    //     this.username = teacherData.username || 'No username provided';
    //     this.firstName = teacherData.firstName || '';
    //     this.role = teacherData.role || '';
    //     this.gradeLevel = teacherData.gradeLevel || '';
    //     this.phoneNumber = teacherData.phoneNumber || '';
    //     this.schoolName = teacherData.schoolName || '';
    //     this.preferredContactMethod = teacherData.preferredContactMethod || '';
    //     this.classroomNames = teacherData.classroomNames || [];
    //     this.allStudents = teacherData.allStudents || {};
    //   })
    //   .catch(error => {
    //     console.error("Error fetching teacher dashboard data from backend:", error);
    //   });
    },
  methods: {
    getTeacherDashboardLocalStorage(email) {
      const storedData = JSON.parse(localStorage.getItem(email)) || {};
      
      this.email = storedData.email || 'No email provided';
      this.firstName = storedData.first_name || 'No first name provided';
      this.lastName = storedData.last_name || 'No last name provided';
      this.role = storedData.role || 'No role provided';
      this.phoneNumber = storedData.phoneNumber || 'No phone number';
      this.schoolName = storedData.schoolName || 'No school name';
      this.preferredContactMethod = storedData.preferredContactMethod || 'No contact method';
      this.gradeLevel = storedData.gradeLevel || 'No grade level';
      this.classroomNames = storedData.classroomNames || [];
      this.allStudents = storedData.allStudents || {};
      
      console.log('Loaded teacher data from localStorage:', storedData);
    },
    selectClassroom(classroom) {
      this.$router.push({ 
        path: '/classroom-management', 
        query: { 
          id: classroom.id,
          email: this.email  // Pass the teacher's email as well.
        }
      });
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

      const teacherData = JSON.parse(localStorage.getItem(this.email)) || {};
      teacherData.allStudents = teacherData.allStudents || {};
      // using the selected classroom ID as the key.
      if (!teacherData.allStudents[this.selectedClassroom]) {
        teacherData.allStudents[this.selectedClassroom] = [];
      }
      // adding to array
      teacherData.allStudents[this.selectedClassroom].push(this.newStudent);
      
      // updating
      this.allStudents = teacherData.allStudents;     
      localStorage.setItem(this.email, JSON.stringify(teacherData));
      this.snackbarMessage = 'Student added successfully!';
      this.snackbar = true;
      this.closeAddStudentsModal();
      
      // // // commenting this part out for now - Call the backend API to add the student.
      // addStudentToClassroom(this.selectedClassroom, this.newStudent)
      //   .then(() => {
      //     // Refresh the teacher dashboard data
      //     return getTeacherDashboard();
      //   })
      //   .then(response => {
      //     const teacherData = response.data;
      //     this.allStudents = teacherData.allStudents || {};
      //     this.classroomNames = teacherData.classroomNames || [];
      //     this.closeAddStudentsModal();
      //     this.snackbarMessage = 'Student added successfully!';
      //     this.snackbar = true;
      //   })
      //   .catch(error => {
      //     console.error("Error adding student:", error);
      //   });
    },
    manuallyAddStudents() {
      this.openAddStudentsModal();
    },
    redirectToCourses() {
      this.$router.push('/courseSelect');
    },
    openExcelModal(){
      this.showExcelModal = true;
    },
    processExcelData() {
      const students = this.excelData.split('\n').map((line) => {
        const [firstName, lastName, email] = line.split('\t');
        return { firstName, lastName, email };
      });

      // checks if a classroom is selected and that there are students
      if (this.selectedClassroom && students.length > 1) {
        const teacherData = JSON.parse(localStorage.getItem(this.email)) || {};
        teacherData.allStudents = teacherData.allStudents || {};

        //making an array for the selected classroom if none
        if (!teacherData.allStudents[this.selectedClassroom]) {
          teacherData.allStudents[this.selectedClassroom] = [];
        }

        // adding
        students.forEach(student => {
          teacherData.allStudents[this.selectedClassroom].push(student);
        });

        // updating
        this.allStudents = teacherData.allStudents;
        localStorage.setItem(this.email, JSON.stringify(teacherData));

        this.snackbarMessage = 'Students added successfully!';
        this.snackbar = true;
        this.closeExcelModal();
        this.closeAddStudentsModal();
      } else {
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
        // new class object
        const newClass = {
          name: this.newClassName,
          gradeLevel: this.newGradeLevel,
          id: this.newClassId,
        };

        // using the teacher’s email, and saving 
        const teacherData = JSON.parse(localStorage.getItem(this.email)) || {};
        teacherData.classroomNames = teacherData.classroomNames || [];
        teacherData.classroomNames.push(newClass);
        localStorage.setItem(this.email, JSON.stringify(teacherData));
        
        // updating 
        this.classroomNames.push(newClass);
        this.closeNewClassModal();
        this.snackbarMessage = 'Class created successfully!';
        this.snackbar = true;
      } else {
        this.snackbarMessage = 'Please fill in all fields.';
        this.snackbar = true;
      }
    },

  }
};
</script>

<style scoped>

.teacher-view-page-container {
  position: relative;
  background-image: 
    radial-gradient(rgba(13, 235, 255, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
  background-size: 50px 50px, 70px 70px;
  background-position: 0 0, 25px 25px;
  padding-top: 20px;
  color: #e6f1ff;
}


.cybersecurity-title {
  color: #2e5387d9;
  font-weight: bolder;
  justify-self: left;
  margin-bottom: -5px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.for-schools-header-title {
  color:#2f5fa2;
  font-weight: lighter;
  justify-self: left;
  margin-bottom: -5px; 
  margin-left: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.dashboard-welcome-title {
  /* the "Welcome, teacher's name" */
  color: #64ffda;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
}

.page-title-row {
  background-color: #e7e7e7;
  padding: 20px;
  margin-top: -30px;
  margin-bottom: -24px;
  border-bottom: 3px solid rgba(19, 55, 118, 0.715);
}


.divider-color {
  color: #64ffda;
}

.class-icon { 
  /* the small icons next to text */
  padding-right: 15px; 
}


h4 {
  font-weight: lighter;
}

h5 {
  font-weight: bolder;
  font-size: medium;
  color:rgb(50, 79, 96);
}

.classroom-card {
  width: auto;
  background-color: #d9d9d9c4;
  border-left: 5px  solid #82ffe2a6;
  padding-top: 30px;
  padding-bottom: 35px;
  padding-left: 10px;
  padding-right: 10px;
  height: auto;
  box-shadow: 0px 5px rgba(0, 195, 255, 0.511);
  /* background-color: darkgrey; */
}

h3 {
  /* the header text 'Classrooms' and 'Actions' */
  color: #5b5b5be7;
  background-color: #ffffff8d;
  border-radius: 15px;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
} 

.roadmap-card {
  padding: 15px;
  margin-left: -10px;
  margin-right: -10px;
  background-color: #24426c;
  /* box-shadow: -10px 15px rgba(86, 176, 203, 0.675); */
}

.roadmap-tasks-card {
  margin-left: -10px;
  margin-right: -10px;
  background-color: #193358;
  border-top: 30px solid #193358;
  border-bottom: 30px solid #193358;
  border-right: 5px solid #193358;
  border-left: 5px solid #193358;
}

.roadmap-tasks-header-text { 
  /* the 'Invite or Add, Assign Courses... Text' */
  color: #11213a;
  background-color: #47585800;
  /* text-shadow: 1px 1px 5px #00e1ff; */
  border-radius: 15px;
  font-size: larger;
}

.roadmap-tasks-subtitle-text {
  color: #0c201b;
  border-radius: 15px;
  padding: 5px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: smaller;
}

.roadmap-task-button {
  color: #ffffff;
  background-color:rgb(33, 66, 120);
  border-radius: 6px;
  border-bottom: 4px solid rgb(16, 40, 77);
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: none;
}
.roadmap-row {
  margin-top: -5px;
  margin-bottom: 7px;
  padding: 10px;
  font-size: larger;
  border-left: 20px solid #49e4e1a5;
  border-right: 20px solid #49e4e1a5;
  background-color: rgb(255, 255, 255);
}
.roadmap-task-button:hover {
  background-color:rgb(39, 83, 153);
  transform: translateY(-2px); 

}

.actions-card {
  width: auto;
  background-color: #d9d9d9c4;
  border-right: 5px  solid #82ffe2a6;
  padding-top: 30px;
  padding-bottom: 35px;
  padding-left: 10px;
  padding-right: 10px;
  height: auto;
  box-shadow: 0px 5px rgba(0, 195, 255, 0.511);
}

.actions-row {
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 30px;
  margin-right: 20px;
}

.actions-button {
  color: #09406cdb;
  font-weight: bold;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-bottom: 2px solid #0b2a43;
  background-color: #05e2ff00;
  box-shadow: none;
}

.actions-button:hover {
  color: #1b6098;
  border-bottom: 2px solid #12b4d1;
}

.classroom-button {
  color: #656565;
  text-transform: capitalize;
  font-weight: bolder;
  font-size: large;
  background-color: #7979791e; 
  margin-bottom:20px;
  box-shadow: none;
}

.make-class-button {
  color: #e3ffff;
  background-color:rgba(36, 140, 193, 0.982);
  border-bottom: 4px solid rgba(17, 95, 134, 0.982);
  border-radius: 15px;
  margin-top: -5px;
  margin-bottom: -10px;
  box-shadow: none;
}


.classroom-button:hover {
  color:rgb(14, 69, 93);
  background-color: #0ce7ff3c; 
  transform: translateY(-2px);
}

.make-class-button:hover {
  background-color:rgba(38, 156, 215, 0.982);
  transform: translateY(-1px);
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
