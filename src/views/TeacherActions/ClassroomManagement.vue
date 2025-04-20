<template>
  <v-container fluid class="management-page-container">
    <v-row align="center" justify="center" class="page-title-row"> 
      <h2 class="classroom-name-title"><v-icon block left class="classroom-icon">mdi-book-open-page-variant</v-icon> {{ classroomName }} </h2>           
    </v-row>


    <v-row>
      <!-- this column is done, displays the class id and return button -->
      <v-col cols="3">
        <v-card class="first-column-card">
          <h3>Class ID: <strong>{{ classId }}</strong></h3>
          <h4 class="invite-message-text">Share your class ID with students!</h4>
            <v-btn class="back-button" @click="goBack">
              <v-icon left>mdi-arrow-left</v-icon>
              return
            </v-btn>
        </v-card>
      </v-col>

      <!-- this is the main column with the tabs component -->
      <v-col cols="9">
        <v-card class="tabs-card">
          <!-- 1) Tabs (labels, header thingy)-->
          <v-tabs
            v-model="tab"
            class="tab-labels-text"
            slider-color="light-blue-darken-4"
            color="light-blue-darken-4"
          >
            <v-tab value="students">Students</v-tab>
            <v-tab value="chat">Chats</v-tab>
            <v-tab value="reports">Reports</v-tab>
          </v-tabs>

          <!-- 2) Tab Contents inside -->
            <v-tabs-window class="tab-window" v-model="tab">
              <!-- Students Tab -->
              <v-tabs-window-item value="students">
                <v-row class="num-of-students-row">
                  <h3 class="tab-card-headers">Current Students: {{ students.length }}</h3> 
                  <v-divider color="transparent"></v-divider>
                  <h3 class="tab-card-subtitles">This week <v-icon right>mdi-chevron-down</v-icon></h3>                    
                </v-row>

                <v-card class="students-list-card"> 
                  <v-row class="students-list-header-row">
                    <h3 class="students-list-header1">Name</h3> <h3 class="students-list-header2">Progress</h3> <h3 class="students-list-header2">Latest Assignment</h3>                         
                  </v-row>
                  <div v-if="students.length">
                      <v-list class="list-class">
                        <v-list-item
                          v-for="(student, idx) in students"
                          :key="idx"
                        >
                          <v-row class="students-details-row">
                            <v-list-item-icon class="student-icon">
                              <v-icon>mdi-account  </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ student.firstName }} {{ student.lastName }}
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-row>
                        </v-list-item>
                      </v-list>
                    </div>

                    <div v-else class="text-center pa-6">
                        <v-icon size="48" color="grey">mdi-emoticon-sad-outline</v-icon>
                        <p>No students in this classroom yet.</p>
                    </div>
                </v-card>
                <div v-if="students.length">
                </div>
                <div v-else class="text-center pa-6">
                  <v-icon size="48" color="grey">mdi-emoticon-sad-outline</v-icon>
                  <p>No students in this classroom yet.</p>
                </div>
              </v-tabs-window-item>

              <!-- Chat Tab -->
              <v-tabs-window-item value="chat">
                <p class="text-center pa-6">
                  [Chat UI placeholder]
                </p>
              </v-tabs-window-item>

              <!-- Reports Tab -->
              <v-tabs-window-item value="reports">
                <h4>Current Class Assignments</h4>
                <p>[Assignments placeholder]</p>
                <h4>Performance</h4>
                <p>[Performance placeholder]</p>
              </v-tabs-window-item>
            </v-tabs-window>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "ClassroomManagement",
  data() {
    return {
      tab: "students",
      email: null,
      classId: null,
      classroomName: "Unknown Classroom",
      students: []
    };
  },
  created() {
    this.email = this.$route.query.email;
    this.classId = this.$route.query.id;

    const teacherData = JSON.parse(localStorage.getItem(this.email)) || {};
    const room = (teacherData.classroomNames || []).find(c => c.id === this.classId);
    if (room) this.classroomName = room.name;

    this.students = (teacherData.allStudents || {})[this.classId] || [];
  },
  methods: {
    goBack() {
      this.$router.push({
        path: "/new-teacher-view",
        query: { email: this.email }
      });
    }
  }
};
</script>

<style scoped>
.management-page-container {
  position: relative;
  background-image: 
    radial-gradient(rgba(13, 235, 255, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
  background-size: 50px 50px, 70px 70px;
  background-position: 0 0, 25px 25px;
  padding-top: 20px;
  color: #e6f1ff;
  /* justify-items: center; */
}

.first-column {
  margin-bottom: -50px;
}

.classroom-name-title {
  color:#2f5fa2;
  font-weight: bolder; 
  margin-bottom: -7px; 
  margin-left: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-transform: capitalize;
}

.classroom-icon {
  color:#2766a9;
  text-shadow: 0 0 px rgb(255, 255, 255);
}

.page-title-row {
  background-color: #e7e7e7;
  padding: 20px;
  margin-top: -30px;
  margin-bottom: -24px;
  border-bottom: 3px solid rgba(19, 55, 118, 0.715);
  /* justify-self: center; */
}

h3 {
  /* the header text 'number of students: */
  color: #053060e9;
  background-color: #ffffff8d;
  border-radius: 15px;
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;

} 

.invite-message-text {
  /* the header text 'number of students: */
  color: #6b6b6be7;
  border-radius: 15px;
  text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  margin-bottom: 20px;
  margin-right: 10px;
  margin-left: 10px;
}

.first-column-card {
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

.back-button {
  color: #656565;
  text-transform: lowercase;
  font-weight: bolder;
  font-size: large;
  background-color: #ececec;
  margin-bottom:20px;
  box-shadow: none;
  border-bottom: 3px solid rgb(150, 150, 150);
  border-radius: 20px;
}

.back-button:hover {
  color: #868686;
  background-color: #f6f6f6;
  transform: translateY(-2px); 
}

.tabs-card {
  /* background-color: #172a46; */
  box-shadow: none;
  padding: 10px;
}

.tab-labels-text {
  color: rgb(158, 158, 158);
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}

.tab-window {
  padding: 10px;
  margin-top: -10px;
}

.tab-card-headers {
  color: rgb(84, 84, 84);
  text-transform: capitalize;
  font-size: larger;
  font-weight: bolder;
}

.tab-card-subtitles {
  color: rgb(186, 186, 186);
  text-transform:uppercase;
  font-weight: bolder;
  font-size:medium;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-top: -20px;
}

.num-of-students-row {
  margin-top: 20px;
  color: red;
}

.students-list-card {
  border: 2px solid rgb(214, 214, 214);
  padding: 20px;
  border-radius: 20px;
  box-shadow: none;
}

.students-list-header-row {
  border-bottom: 2px solid rgb(214, 214, 214);
  margin-right: -19px;
  margin-left: -19px;
  margin-top: 2px;
  border-radius: 0px;
}

.students-list-header1 {
  color: rgb(176, 176, 176);
  text-transform:uppercase;
  font-weight: bolder;
  font-size:medium;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #65656500;
}

.students-list-header2 {
  color: rgb(176, 176, 176);
  text-transform:uppercase;
  font-weight: bolder;
  font-size:medium;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #65656500;
  margin-left: 140px;
}

.list-class {
  margin-left: -20px;
  margin-right: -20px;
  margin-top: 18px;
}

.students-details-row {
  padding: 20px;
}

.student-icon {
  background-color: #2f5fa2cf;
  color:#ffffff;
  border-radius: 20px;
}


.v-list-item {
  margin-bottom: 8px;
  border-radius: 8px;
  margin-left: -10px;
}

.v-list-item-title {
  /* the student names */
  margin-left: 10px;
  color: rgb(122, 122, 122);
  text-transform: capitalize;
  font-size:medium;

}

</style>

