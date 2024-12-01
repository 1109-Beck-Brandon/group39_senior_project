<template>
    <v-container fluid>
      <v-row>
        <!-- left side:  Classroom Info -->
        <v-col cols="3">
          <v-card class="pa-3 mb-4 classroom-info-card">
            <h3 class="card-title">Classroom Info</h3>
            <p><strong>Class Name:</strong> {{ classroom.name }}</p>
            <p><strong>Classroom ID:</strong> {{ classroom.id }}</p>
            <p><strong>Teacher:</strong> {{ teacher.firstName }} {{ teacher.lastName }}</p>
          </v-card>
  
          <!-- Assignments stuff -->
          <v-card class="pa-3 assignments-card">
            <h3 class="card-title">Assignments</h3>
            <v-list dense>
              <v-list-item
                v-for="(assignment, index) in assignments"
                :key="index"
                class="assignment-item"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-clipboard-text</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="assignment-title">{{ assignment.title }}</v-list-item-title>
                  <v-list-item-subtitle class="assignment-due">{{ assignment.dueDate }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
  
        <!-- Students in Classroom -->
        <v-col cols="9">
          <!-- Classmates info Panel -->
          <v-card class="pa-3 classmates-card">
            <h3 class="card-title">Classmates</h3>
            <v-row>
              <v-col
                v-for="(student, index) in students"
                :key="index"
                cols="4"
                class="text-center student-card"
              >
                <v-img
                  :src="student.profilePicture || defaultProfilePicture"
                  class="rounded-circle mx-auto mb-2 student-img"
                  contain
                  height="100"
                  width="100"
                />
                <p class="student-name">{{ student.firstName }} {{ student.lastName }}</p>
              </v-col>
            </v-row>
          </v-card>
  
          <!-- Announcements Panel -->
          <v-card class="pa-3 announcements-card">
            <h3 class="card-title">Classroom Announcements</h3>
  
            <!-- shows announcements -->
            <div v-if="announcements.length === 0" class="empty-announcements">
              <v-icon large color="primary" class="empty-icon">mdi-megaphone</v-icon>
              <p>No Announcements</p>
            </div>
            <v-list v-else>
            <v-list-item
                v-for="(announcement, index) in announcements"
                :key="index"
                class="announcement-item"
            >
                <v-list-item-content>
                <v-list-item-title>{{ announcement.text }}</v-list-item-title>
                    <v-list-item-subtitle>
                        Posted by {{ announcement.user }} on {{ announcement.timestamp }}
                    </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                <v-icon
                    color="error"
                    class="delete-icon"
                    @click="deleteAnnouncement(index)"
                >
                    mdi-delete
                </v-icon>
                </v-list-item-action>
            </v-list-item>
            </v-list>
            <!-- to add an announcement -->
            <div class="add-announcement mt-3">
              <v-text-field
                v-model="newAnnouncement"
                label="Add Announcement"
                outlined
              />
              <v-btn color="success" block @click="addAnnouncement">
                Submit
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "StudentClassroom",
    data() {
      return {
        classroom: {
          name: "Placeholder Class",
          id: "",
        },
        teacher: {
          firstName: "Placeholder",
          lastName: "Teacher",
        },
        students: [ //placeholder students
          { firstName: "Brad", lastName: "Pitt", profilePicture: "" },
          { firstName: "Jimmy", lastName: "P", profilePicture: "" },
        ],
        defaultProfilePicture: "https://robohash.org/examplered?set=set1",
        assignments: [ //placeholder assignments
          { title: "Introduction to Cybersecurity", dueDate: "2024-11-30" },
        ],
        announcements: [],
        newAnnouncement: "", 
        user: {},
      };
    },
    created() {
        //gets classroom and user details from local storage
        const userData = JSON.parse(localStorage.getItem("newUser")) || {};
        this.classroom.id = userData.classroomId || "No ID Available";

        //gets user info
        const userStudent = {
            firstName: userData.firstName || "Anonymous",
            lastName: userData.lastName || "",
            profilePicture: userData.profilePicture || this.defaultProfilePicture,
        };
        this.students.push(userStudent);

        const savedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
        this.announcements = savedAnnouncements;
    },
    methods: {
      addAnnouncement() {
        if (this.newAnnouncement.trim() === "") return; // 
        const timestamp = new Date().toLocaleString(); // returns data and time for timestamp
        const announcement = {
          text: this.newAnnouncement.trim(),
          timestamp,
          user: this.user.name,
        };
  
        this.announcements.push(announcement);
        this.newAnnouncement = ""; 
        localStorage.setItem("announcements", JSON.stringify(this.announcements)); 
      },
      deleteAnnouncement(index) {
        this.announcements.splice(index, 1); 
        localStorage.setItem("announcements", JSON.stringify(this.announcements)); // Updates local storage
      },
    },
  };
  </script>
  
  <style scoped>
  .pa-3 {
    padding: 16px;
  }
  .text-center p {
    margin-top: 8px;
    font-weight: bold;
  }
  .empty-announcements {
    text-align: center;
    opacity: 0.5;
    margin-top: 20px;
  }
  .empty-icon {
    font-size: 48px;
  }
  .add-announcement {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .announcement-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .delete-icon {
    margin-left: auto;
    cursor: pointer;
    font-size: 20px;
    transition: transform 0.2s;
  }
  .delete-icon:hover {
    transform: scale(1.2);
  }
  </style>
  