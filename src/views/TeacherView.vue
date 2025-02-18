<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>
  <v-container fluid>
    <v-row>
      <!-- Classroom List on the left of page -->
      <v-col cols="3">
        <v-card class="pa-3">
          <h3>Classroom</h3>
          <v-btn block class="mb-2" @click="openClassroomModal">
            {{ classroom.name }}
          </v-btn>

          <!-- Modal dialog pop up for Classroom Details, shows students in a class -->
          <v-dialog v-model="showClassroomModal" max-width="600px">
            <v-card>
              <v-card-title class="headline"> {{ classroom.name }}</v-card-title>
              <v-card-text>
                <p><strong>Current Number of Students:</strong> {{ classroomStudents.length }}</p>
                <p><strong>Classroom Join ID:</strong> {{ classroom.id }}</p>
                <h4>Students:</h4>
                <v-row>
                  <v-col
                    v-for="(student, index) in classroomStudents"
                    :key="index"
                    cols="6"
                    class="d-flex align-center student-item"
                    @click="openStudentProfileDialog(student)"
                  >
                    <v-icon left>mdi-account-circle</v-icon>
                    <span class="student-name">{{ student.firstName }} {{ student.lastName }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn color="secondary" text @click="showClassroomModal = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>

      <!-- Middle Section of the Page -->
      <v-col cols="6">
        <h1>Teacher View</h1>
        <h2>Welcome, {{ teacher.firstName }}! </h2>
        
        <!-- Roadmap guide for new teacher users -->
        <v-card class="pa-4 text-center">
          <v-row class="mb-6">
            <v-col cols="12">
              <v-icon color="green">mdi-check-circle</v-icon>
              <span>Create a Classroom</span>
            </v-col>
          </v-row>

          <!-- Step 2: Add Students, inspired by Duolingo's teacher roadmap hehe -->
          <v-row class="mb-6">
            <v-col cols="12">
              <v-divider></v-divider>
              <p>Invite or Add Students</p>
              <small>Invite students to start their learning journey</small>
                <v-btn block class="mb-2" @click="addStudents">
                  Add Students!
                </v-btn>
            </v-col>
          </v-row>

          <!-- Step 3:-->
          <v-row>
            <v-col cols="12">
              <v-divider></v-divider>
              <p>Assign Courses to Students</p>
              <small>Explore courses that teach cybersecurity skills</small>
                <v-btn block class="mb-2" @click="navigateToCourses">
                  Explore Courses!
                </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- pops up if user clicks 'Add Students' button -->
      <v-dialog v-model="showAddStudentsModal" max-width="600px">
        <v-card>
          <v-card-title class="headline">Share Your Class Code with Students!</v-card-title>
          <v-card-text>
            <p><strong>Classroom Name:</strong> {{ classroom.name }}</p>
            <div class="classroom-id-box">
              <p><strong>Classroom Join ID:</strong> <span class="join-id">{{ classroom.id }}</span></p>
            </div>
            <p class="text-center">Share this ID with your students so they can join your classroom.</p>

            <!-- if they add them manually -->
            <v-divider class="mt-4 mb-4"></v-divider>
            <h4>Add Students Manually</h4>
            <v-text-field
              v-model="newStudent.firstName"
              label="First Name"
              class="mb-2"
              outlined
            />
            <v-text-field
              v-model="newStudent.lastName"
              label="Last Name"
              class="mb-2"
              outlined
            />
            <v-btn color="primary" @click="addStudentManually">Add Student</v-btn>
            <v-divider class="mt-4 mb-4"></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="showAddStudentsModal = false">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

        <!-- Teacher Actions Section -->
        <v-col cols="3">
          <v-card class="pa-3">
            <h3>Actions</h3>
            <v-btn block class="mb-2" @click="openInboxDialog">
              <v-icon left>mdi-email</v-icon> Inbox
            </v-btn>
            <v-btn block class="mb-2" @click="navigateToGradeBook">Gradebook</v-btn>
          </v-card>
        </v-col>
        <!-- Modal dialog popup for Inbox -->
        <v-dialog v-model="showInboxDialog" max-width="600px">
          <v-card>
            <v-card-title class="headline">Inbox</v-card-title>
            <v-card-text>
              <!-- Display messages or empty state -->
              <div v-if="messages.length === 0" class="empty-inbox">
                <v-icon large color="primary" class="empty-icon">mdi-email-outline</v-icon>
                <p>No new messages!</p>
              </div>
              <v-list v-else>
                <v-list-item v-for="(message, index) in messages" :key="index" class="message-item">
                  <v-list-item-content>
                    <v-list-item-title>
                      From: {{ message.from }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ message.content }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon @click="deleteMessage(index)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" text @click="closeInboxDialog">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-row>
  </v-container>

  <!-- modal dialog for more student details if you click on the student's name -->
  <v-dialog v-model="showStudentProfileModal" max-width="600px">
    <v-card>
      <v-card-title class="headline">Student Profile</v-card-title>
      <v-card-text>
        <v-row>
          <!-- Profile Picture -->
          <v-col cols="4">
            <v-img
              :src="selectedStudentProfilePicture"
              class="rounded-circle mx-auto"
              contain
              height="150"
              width="150"
            />
          </v-col>
          <v-col cols="8">
            <p><strong>First Name:</strong> {{ selectedStudent.firstName }}</p>
            <p><strong>Last Name:</strong> {{ selectedStudent.lastName }}</p>
            <p v-if="selectedStudent.enrolledCourses && selectedStudent.enrolledCourses.length > 0">
              <strong>Enrolled Courses:</strong> {{ selectedStudent.enrolledCourses.join(', ') }}
            </p>
            <p v-else>No enrolled courses available</p>
            <p v-if="selectedStudent.completedCourses && selectedStudent.completedCourses.length > 0">
              <strong>Completed Courses:</strong> {{ selectedStudent.completedCourses.join(', ') }}
            </p>
            <p v-else>No completed courses available</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" text @click="returnToClassroomModal">Return</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  name: "TeacherView",
  data() {
    return {
      teacher: {
        firstName: "",
        lastName: "",
      },
      classroom: {
        name: "",
        id: "",
      },
      newStudent: {
        firstName: "",
        lastName: "",
      },
      students: [],
      showClassroomModal: false,
      showStudentProfileModal: false,
      selectedStudentProfilePicture: "",
      selectedStudentProgress: [],
      showAddStudentsModal: false,
      showInboxDialog: false,
      messages: [],
      selectedClassroomStudents: [],
      selectedStudent: null,
    };
  },
  created() {
    this.fetchTeacherData();
  },
  computed: {
    classroomStudents() {
      return this.students.filter(
        (student) => student.classroomId === this.classroom.id
      );
    },
  },
  methods: {
    async fetchTeacherData() {
      try {
        // Fetch teacher and classroom information
        const teacherResponse = await axios.get("/api/teacher");
        const teacherData = teacherResponse.data;
        this.teacher.firstName = teacherData.firstName;
        this.teacher.lastName = teacherData.lastName;
        this.classroom.name = teacherData.classroomName;
        this.classroom.id = teacherData.classroomId;

        // Fetch classroom students
        const studentsResponse = await axios.get(
          `/api/classrooms/${this.classroom.id}/students`
        );
        this.students = studentsResponse.data;

        // Fetch teacher inbox messages
        const messagesResponse = await axios.get("/api/messages");
        this.messages = messagesResponse.data;
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    },
    selectClassroom(classroom) {
      this.selectedClassroomStudents = this.students.filter(
        (student) => student.classroom === classroom.name
      );
    },
    openClassroomModal() {
      this.showClassroomModal = true;
    },
    openStudentProfileDialog(student) {
      this.selectedStudent = student;
      // Use a real image URL if available from student data
      this.selectedStudentProfilePicture =
        student.profilePicture || "https://robohash.org/example24?set=set1";
      this.selectedStudentProgress = student.progress || [];
      this.showStudentProfileModal = true;
    },
    returnToClassroomModal() {
      this.showStudentProfileModal = false;
      this.showClassroomModal = true;
    },
    addStudents() {
      this.showAddStudentsModal = true;
    },
    async addStudentManually() {
      if (this.newStudent.firstName && this.newStudent.lastName) {
        // Create student object
        const student = {
          firstName: this.newStudent.firstName,
          lastName: this.newStudent.lastName,
          classroomId: this.classroom.id,
        };

        try {
          // Optionally post the new student to the backend
          const response = await axios.post("/api/students", student);
          // Add returned student data to the students array
          this.students.push(response.data);
        } catch (error) {
          console.error("Error adding student:", error);
        }
        this.newStudent.firstName = "";
        this.newStudent.lastName = "";
        this.showAddStudentsModal = false;
      } else {
        alert("Please fill in both the first and last name.");
      }
    },
    navigateToCourses() {
      this.$router.push({ path: "/courseSelect" });
    },
    navigateToGradeBook() {
      this.$router.push({ path: "/gradebook" });
    },
    openInboxDialog() {
      this.showInboxDialog = true;
    },
    closeInboxDialog() {
      this.showInboxDialog = false;
    },
    async deleteMessage(index) {
      const message = this.messages[index];
      try {
        // Assuming your backend supports DELETE /api/messages/:id 
        await axios.delete(`/api/messages/${message.id}`);
        // Remove the message from the local array on success
        this.messages.splice(index, 1);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    },
  },
};
</script>

<style scoped>
.pa-3 {
  padding: 16px;
  min-height: 250px;
}
.v-icon {
  margin-right: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}
.v-icon:hover {
  transform: scale(1.2);
}
.student-item {
  cursor: pointer;
  padding: 12px; 
  transition: transform 0.2s ease, background-color 0.3s ease;
  border-radius: 4px; /* this gives rounded edges */
}

.student-item:hover {
  transform: scale(1.05);
  background-color: rgba(0, 0, 255, 0.1);
}

.student-name {
  padding: 5px 20px;
  margin-left: 8px;
}

.v-card-title {
  text-align: center; 
}

h4 {
  margin-bottom: 16px;
  text-align: left;
}

.v-card-title {
  text-align: center; 
}
.classroom-id-box {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.join-id {
  font-size: 1.2em;
  color: #1976D2; 
}

.v-btn {
  text-transform: none;
}

.v-card-text {
  text-align: center;
}
.v-divider {
  margin-top: 20px;
  margin-bottom: 20px;
}
.empty-inbox {
  text-align: center;
  opacity: 0.5;
  margin-top: 20px;
}
.empty-icon {
  font-size: 48px;
}
.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
