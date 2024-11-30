<template>
    <v-container fluid>
      <!-- Back Button -->
      <v-btn
        class="ma-2"
        color="blue"
        @click="navigateToTeacherView"
      >
        <v-icon start>mdi-arrow-left</v-icon>
        Back
      </v-btn>
  
      <v-row>
        <!-- Left Section: Students List -->
        <v-col cols="12" md="6">
          <v-card class="pa-4 student-card" elevation="5">
            <v-card-title>
              <h3 class="title-text">Students</h3>
            </v-card-title>
            <v-divider></v-divider>
          <!-- Label Row (Header for Data) -->
          <v-row class="label-row">
            <v-col cols="4" class="label-column"><strong>Name</strong></v-col>
            <v-col cols="4" class="label-column"><strong>Grade</strong></v-col>
          </v-row>

            <v-list>
              <v-list-item-group v-if="students.length" color="primary">
                <v-list-item
                  v-for="(student, index) in students"
                  :key="index"
                  class="student-item"
                  @click="openStudentDetails(student)"
                >
                  <v-list-item-content>
                    <v-list-item-title class="student-title">
                      <v-icon start>mdi-account-circle</v-icon>
                      {{ student.firstName }} {{ student.lastName }} 
                      <span class="student-info">
                        : {{ student.grade }}%
                      </span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-alert v-else type="info" :value="true" dismissible>
                No students enrolled yet.
              </v-alert>
            </v-list>
          </v-card>
        </v-col>
  
        <!-- Right Section: Class Performance -->
        <v-col cols="12" md="6">
          <v-card class="pa-4 assignments-card" elevation="5">
            <v-card-title>
              <h3 class="title-text">Overall Performance</h3>
            </v-card-title>
            <v-divider></v-divider>
  
            <!-- Class Grade Display -->
            <v-row class="d-flex justify-center">
              <v-col cols="auto">
                <div class="class-grade">
                  <!-- Placeholder for class grade (percentage) -->
                  <span>{{ classGrade }}%</span>
                </div>
              </v-col>
            </v-row>
  
            <!-- Assignments List -->
            <v-divider></v-divider>
            <h3 class="title-text">Current Assignments:</h3>
            <v-list>
              <v-list-item v-for="(assignment, index) in assignments" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="assignment-title">{{ assignment.title }}</v-list-item-title>
                  <v-list-item-subtitle class="assignment-desc">{{ assignment.description }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Student Details Modal -->
      <v-dialog v-model="showStudentDetailsModal" max-width="600px">
        <v-card>
          <v-card-title class="headline">Student Details</v-card-title>
          <v-card-text>
            <p><strong>Name:</strong> {{ selectedStudent.firstName }} {{ selectedStudent.lastName }}</p>
            <p><strong>Classroom:</strong> {{ selectedStudent.classroomId }}</p>
            <p><strong>Assignments:</strong></p>
            <v-list>
              <v-list-item
                v-for="(assignment, index) in studentAssignments"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ assignment.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" text @click="showStudentDetailsModal = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>
  
  
<script>
export default {
  name: 'GradeBook',
  data() {
    return {
      students: [
        {
          firstName: 'John',
          lastName: 'Doe',
          classroomId: 'Cybersecurity 101',
          grade: 85, // Placeholder for student grade
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          classroomId: 'Intro to Cybersecurity',
          grade: 92, // Placeholder for student grade
        },
      ],
      selectedStudent: null,
      showStudentDetailsModal: false,
      assignments: [
        { title: 'Intro to Cybersecurity', description: 'First assignment in Cybersecurity basics' },
      ],
      studentAssignments: [],
      classGrade: 75, // Placeholder class grade
    };
  },
  created() {
    // Retrieve students from localStorage
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    this.students = savedStudents;
  },
  methods: {
    openStudentDetails(student) {
      this.selectedStudent = student;
      this.studentAssignments = this.assignments; // Link the assignments to the selected student
      this.showStudentDetailsModal = true;
    },
    navigateToTeacherView() {
      this.$router.push({ path: "/teacherView" });
    },
  },
};
</script>


<style scoped>
.student-item {
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.student-item:hover {
  background-color: #e3f2fd;
}

.student-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.student-info {
  font-size: 14px;
  color: #757575;
}

.v-btn {
  text-transform: none;
  font-weight: bold;
}

.v-card-title {
  font-weight: bold;
}

.v-divider {
  margin-top: 16px;
}

.v-alert {
  margin-top: 16px;
}

.title-text {
  color: #1976d2; /* Blue text for titles */
}

.assignments-card {
  background-color: #fafafa; /* Light background for assignment cards */
  border-radius: 8px;
}

.student-card {
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); /* Light shadow effect */
  border-radius: 8px;
}

.assignment-title {
  font-weight: bold;
  color: #333;
}

.assignment-desc {
  color: #757575;
}

.class-grade {
  font-size: 48px; /* Large text for grade */
  font-weight: bold;
  color: #388e3c; /* Green color for class grade */
  text-align: center;
}
</style>
