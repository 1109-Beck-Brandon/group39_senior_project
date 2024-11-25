<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
    </v-layout>
    <v-container fluid>
      <v-row>
        <!-- Classroom List on the left of page -->
        <v-col cols="3">
          <v-card class="pa-3">
            <h3>Classrooms</h3>
            <v-btn
              v-for="(classroom, index) in classrooms"
              :key="index"
              block
              class="mb-2"
              @click="selectClassroom(classroom)"
            >
              {{ classroom.name }}
            </v-btn>
          </v-card>
        </v-col>
  
        <!-- Middle Section of the Page -->
        <v-col cols="6">

          <h1>Teacher View</h1>

          <!-- Student List -->
          <v-card class="pa-3 mb-4">
            <h3>Students</h3>
            <v-row>
              <v-btn
                v-for="(student, index) in selectedClassroomStudents"
                :key="index"
                class="mx-2"
                @click="selectStudent(student)"
              >
                {{ student.firstName }} {{ student.lastName }}
              </v-btn>
            </v-row>
          </v-card>
  
          <!-- Student Information -->
          <v-card class="pa-3">
            <h3>Student Information</h3>
            <div v-if="selectedStudent">
              <p><strong>First Name:</strong> {{ selectedStudent.firstName }}</p>
              <p><strong>Last Name:</strong> {{ selectedStudent.lastName }}</p>
              <p><strong>Enrolled Courses:</strong> {{ selectedStudent.enrolledCourses.join(', ') }}</p>
              <p><strong>Completed Courses:</strong> {{ selectedStudent.completedCourses.join(', ') }}</p>
              <p><strong>Average Grades:</strong> {{ selectedStudent.averageGrades }}</p>
            </div>
            <div v-else>
              <p>Select a student to view their information</p>
            </div>
          </v-card>
        </v-col>
  
        <!-- Teacher Actions Section -->
        <v-col cols="3">
          <v-card class="pa-3">
            <h3>Actions</h3>
            <v-btn block class="mb-2">Edit Grades</v-btn>
            <v-btn block class="mb-2">Message Student</v-btn>
            <v-btn block>View Progress</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'TeacherView',
    data() {
      return {
        classrooms: [
          { name: 'Classroom 1' },
          { name: 'Classroom 2' },
          { name: 'Classroom 3' },
        ],
        students: [
          {
            firstName: 'John',
            lastName: 'Doe',
            classroom: 'Classroom 1', // Added classroom field
            enrolledCourses: ['Introduction to Cybersecurity', 'Sample Course 2'],
            completedCourses: ['None'],
            averageGrades: 'A',
          },
          {
            firstName: 'Jane',
            lastName: 'Smith',
            classroom: 'Classroom 2', // Added classroom field
            enrolledCourses: ['Introduction to Cybersecurity', 'Sample Course 4'],
            completedCourses: ['Sample Course 3'],
            averageGrades: 'B+',
          },
        ],
        selectedClassroomStudents: [],
        selectedStudent: null,
      };
    },
    methods: {
      selectClassroom(classroom) {
        // Filter students based on the selected classroom
        this.selectedClassroomStudents = this.students.filter(student =>
          student.classroom === classroom.name
        );
        this.selectedStudent = null;
      },
      selectStudent(student) {
        this.selectedStudent = student;
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