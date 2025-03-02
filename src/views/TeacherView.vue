<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card class="pa-3">
          <h3>Classroom</h3>
          <v-btn block class="mb-2" @click="openClassroomModal">
            {{ classroom.name }}
          </v-btn>

          <v-dialog v-model="showClassroomModal" max-width="600px">
            <v-card>
              <v-card-title class="headline"> {{ classroom.name }}</v-card-title>
              <v-card-text>
                <p><strong>Current Number of Students:</strong> {{ classroomStudents.length }}</p>
                <p><strong>Classroom Join ID:</strong> {{ classroom.id }}</p>
                <h4>Students:</h4>
                <v-row>
                  <v-col v-for="(student, index) in classroomStudents" :key="index" cols="6" class="d-flex align-center student-item" @click="openStudentProfileDialog(student)">
                    <v-icon left>mdi-account-circle</v-icon>
                    <span class="student-name">{{ student.name }}</span>
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
      <v-col cols="6">
        <h1>Teacher View</h1>
        <h2>Welcome, {{ teacher.name }}! </h2>
        <v-card class="pa-4 text-center">
          <v-row class="mb-6">
            <v-col cols="12">
              <v-icon color="green">mdi-check-circle</v-icon>
              <span>Create a Classroom</span>
            </v-col>
          </v-row>
          <v-row class="mb-6">
            <v-col cols="12">
              <v-divider></v-divider>
              <p>Invite or Add Students</p>
              <small>Invite students to start their learning journey</small>
              <v-btn block class="mb-2" @click="addStudents">Add Students!</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-divider></v-divider>
              <p>Assign Courses to Students</p>
              <small>Explore courses that teach cybersecurity skills</small>
              <v-btn block class="mb-2" @click="navigateToCourses">Explore Courses!</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="pa-3">
          <h3>Actions</h3>
          <v-btn block class="mb-2" @click="openInboxDialog">
            <v-icon left>mdi-email</v-icon> Inbox
          </v-btn>
          <v-btn block class="mb-2" @click="navigateToGradeBook">Gradebook</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getUserProfile, getStudentsByClassroom, getMessages, deleteMessage } from '@/services/api';

export default {
  name: "TeacherView",
  data() {
    return {
      teacher: {},
      classroom: {},
      students: [],
      showClassroomModal: false,
      showAddStudentsModal: false,
      showInboxDialog: false,
      messages: [],
      selectedStudent: null,
    };
  },
  async created() {
    await this.fetchTeacherData();
  },
  computed: {
    classroomStudents() {
      return this.students.filter(student => student.classroomId === this.classroom.id);
    },
  },
  methods: {
    async fetchTeacherData() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.user_id) {
          this.$router.push('/login');
          return;
        }
        
        // Use getUserProfile instead of getTeacherData
        const userResponse = await getUserProfile(user.user_id);
        this.teacher = {
          name: userResponse.data.first_name + ' ' + userResponse.data.last_name,
          ...userResponse.data
        };
        
        // Check if classroom data exists or create default values
        this.classroom = this.teacher.classroom || {
          name: "Your Classroom",
          id: "No ID available" 
        };
        
        // Try to get students if classroom exists
        if (this.classroom.id && this.classroom.id !== "No ID available") {
          try {
            const studentsResponse = await getStudentsByClassroom(this.classroom.id);
            this.students = studentsResponse.data;
          } catch (err) {
            console.log("No students found or classroom doesn't exist yet");
            this.students = [];
          }
        }
        
        // Get messages if available
        try {
          const messagesResponse = await getMessages();
          this.messages = messagesResponse.data;
        } catch (err) {
          console.log("No messages available");
          this.messages = [];
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        // Set default values when API fails
        this.teacher = { name: "Teacher" };
        this.classroom = { name: "Your Classroom", id: "Create a classroom" };
        this.students = [];
        this.messages = [];
      }
    },
    openClassroomModal() {
      this.showClassroomModal = true;
    },
    openInboxDialog() {
      this.showInboxDialog = true;
    },
    async deleteMessage(index) {
      const message = this.messages[index];
      try {
        await deleteMessage(message.id);
        this.messages.splice(index, 1);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    },
    navigateToCourses() {
      this.$router.push({ path: "/courseSelect" });
    },
    navigateToGradeBook() {
      this.$router.push({ path: "/gradebook" });
    },
  },
};
</script>

<style scoped>
.pa-3 {
  padding: 16px;
  min-height: 250px;
}
</style>
