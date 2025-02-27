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
import { getTeacherData, getClassroomStudents, getMessages, deleteMessage } from '@/services/api';

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
        const teacherResponse = await getTeacherData();
        this.teacher = teacherResponse.data;
        this.classroom = this.teacher.classroom;
        const studentsResponse = await getClassroomStudents(this.classroom.id);
        this.students = studentsResponse.data;
        const messagesResponse = await getMessages();
        this.messages = messagesResponse.data;
      } catch (error) {
        console.error("Error fetching teacher data:", error);
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
