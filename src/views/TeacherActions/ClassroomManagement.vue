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
            <v-tab value="chat">Chat</v-tab>
            <v-tab value="reports">Reports</v-tab>
          </v-tabs>

          <!-- Tab Contents inside -->
            <v-tabs-window class="tab-window" v-model="tab">

              <!-- Students Tab, it displays number of students and then the students -->
              <v-tabs-window-item value="students">
                <v-row class="num-of-students-row">
                  <h3 class="tab-card-headers">Current Students: {{ students.length }}</h3> 
                  <v-divider color="transparent"></v-divider>
                  <h3 class="tab-card-subtitles">This week <v-icon right>mdi-chevron-down</v-icon></h3>                    
                </v-row>
                <!-- houses all the students rows, beginnign with the first row as the header row -->
                <v-card class="students-list-card"> 
                  <!-- the headers -->
                  <v-row  class="students-list-header-row"> 
                    <v-col cols="4">
                      <h3 class="students-list-header3"> name</h3>
                    </v-col>
                    <v-col cols="2">
                      <h3 class="students-list-header3">progress</h3>
                    </v-col>
                    <v-col cols="4">
                      <h3 class="students-list-header3"> lastest assignment</h3>
                    </v-col>  
                    <v-col cols="2">
                      <h3 class="students-list-header3"></h3>
                    </v-col>  
                  </v-row>
                
                  <div v-if="students.length">
                      <v-list class="list-class">
                        <v-list-item
                          v-for="(student, idx) in students"
                          :key="idx"
                        >
                        <v-row class="students-list-header-row ">
                          <v-col cols="5"> 
                            <h3 class="student-item-text">
                              <v-icon class="student-icon">mdi-account</v-icon>
                              {{ student.firstName }} {{ student.lastName }}</h3>
                          </v-col>
                          <v-col cols="2">
                            <h3 class="student-item-text"> 0%</h3>
                          </v-col>
                          <v-col cols="3">
                            <h3 class="student-item-text"><v-icon class="minus-icon">mdi-minus</v-icon> </h3>
                          </v-col>
                          <v-col cols="2">
                            <h3 class="student-item-text">
                              <v-btn @click="editNewStudent(student, idx)" class="edit-button">
                                <v-icon block left>mdi-pencil</v-icon>
                              </v-btn>
                            </h3>
                          </v-col>

                        </v-row>
                        </v-list-item>
                      </v-list>
                    </div>

                    <div v-else class="text-center pa-6">
                        <v-icon size="48" color="grey">mdi-emoticon-sad-outline</v-icon>
                        <p>No students in this classroom yet.</p>
                    </div>
                </v-card>
              </v-tabs-window-item>

              <!-- Chat Tab, displays the classroom's chat box -->
              <v-tabs-window-item value="chat">
                <v-card class="chat-card">
                  <v-row class="chat-header-row">
                    <v-col cols="6">
                      <h3 class="chat-card-header1">Class Chat: {{ classroomName }}</h3>                      
                    </v-col>
                    <v-col cols="6">
                      <h3 class="chat-card-header2"><v-icon>mdi-dots-horizontal</v-icon></h3>                      
                    </v-col>
                  </v-row>

                  <v-divider class="chat-divider"></v-divider>
                   <v-row class="circle-row">
                    <v-img :src="CyberPicture" alt="Cybersecurity Image" max-width="100" class="cyber-image" />
                      <!-- <v-icon class="circle-icon">mdi-circle</v-icon>                     -->
                   </v-row>

                  <h4> Welcome to the classroom chat</h4>
                  <h4 class="unboldened"> This group is limited to classroom students and the teacher.</h4>
                  <v-icon class="squiggle-icon">mdi-gesture</v-icon>
                  <h4 class="unboldened-blue">{{ todayDate }}</h4>
                  <h4 class="unboldened-gray">You joined the chat.</h4>

                  <!-- chat history, messages will appear here in a list-->
                   <v-row> 
                    <v-col cols="8">
                       <!-- the blank area -->
                    </v-col>
                    <v-col cols="4" class="chat-messages-column">
                        <div
                          v-for="(msg, i) in chatMessages"
                          :key="i"
                        >
                          <h4 class="message-bubble"> 
                            {{ msg }}
                          </h4>
                          <h4 class="timestamp-text"> 
                            Sent 12:57 AM
                          </h4>
                          <v-row class="trash-button-row">
                            <v-btn class="trash-button">
                              <v-icon>mdi-trash-can</v-icon>
                            </v-btn>                            
                          </v-row>

                          <v-divider class="transparent-divider"></v-divider>
                        </div>                      
                    </v-col>                    
                   </v-row>

                   <!-- ignore this part, it acts like a spacer lol -->
                   <v-col> 
                      <div>
                      </div>
                   </v-col>

                  <!-- Actions Area: the send button and type field -->
                  <v-divider class="chat-divider"></v-divider>
                  <v-row class="chat-actions-row"> 
                    <v-text-field
                      v-model="chatMessage"
                      placeholder="Message..."
                      variant="outlined"
                      color="blue-darken-3"
                      class="chat-text-field"
                      @keyup.enter="sendChat"
                    ></v-text-field>
                    <v-btn
                      class="send-button"
                      :disabled="!chatMessage.trim()"
                      @click="sendChat"
                    >
                      Send
                    </v-btn>
                  </v-row>
                </v-card>
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

    <!-- Edit Student Dialog -->
    <v-dialog v-model="showEditDialog" max-width="500px" min-height="500px">
      <v-card class="edit-student-card">
        <v-card-title class="edit-student-title">Edit Student</v-card-title>
        <v-divider class="long-divider"></v-divider>
        <v-card-text>
          <v-row class="edit-name-row">
            <h4 class="edit-card-header">
              General Student Details
            </h4>
          </v-row>
          <v-row class="edit-name-row">
            <v-text-field
                v-model="editFirstName"
                label="First Name"
                rounded
                variant="outlined"
                color="blue-darken-3"
                class="name-text-field"
            ></v-text-field>
            <v-text-field
                v-model="editLastName"
                label="Last Name"
                rounded
                variant="outlined"
                color="blue-darken-3"
                class="name-text-field"
            ></v-text-field>            
          </v-row>
          <v-row class="edit-name-row">
            <h4 class="edit-card-header">
              In Classroom: 
            </h4>
          </v-row>
          <v-row class="edit-name-row">
            <h4 class="in-classroom-text">
              {{ classroomName }}
            </h4>
          </v-row>
        </v-card-text>
        <v-divider class="long-divider"></v-divider>
        <v-card-actions class="card-actions-container">
          <v-btn class="remove-student-button" @click="removeStudent"> Remove student from class</v-btn>
          <v-btn class="cancel-button" text @click="cancelEdit">Cancel</v-btn>
          <v-btn class="save-button" text @click="saveEditStudent">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>

import CyberPicture from './CyberPicture.png';  // <-- dynamic image import

export default {
  name: "ClassroomManagement",
  data() {
    return {
      CyberPicture,
      tab: "students",
      email: null,
      classId: null,
      classroomName: "Unknown Classroom",
      students: [],

      showEditDialog: false,
      editingIndex: null,
      editFirstName: '',
      editLastName: '',

      chatMessage: '',
      chatMessages: [],
    };
  },
  computed: {
    todayDate() {
      const today = new Date()
      return today.toLocaleDateString('en-US', {
        month: 'long',
        day:   'numeric',
        year:  'numeric'
      })
    }
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
    },
    editNewStudent(student, idx) { // open dialog, load current values
      this.editingIndex   = idx;
      this.editFirstName  = student.firstName;
      this.editLastName   = student.lastName;
      this.showEditDialog = true;
    },
    saveEditStudent() {// save changes back to both local data and localStorage
      const s = this.students[this.editingIndex];
      s.firstName = this.editFirstName;
      s.lastName  = this.editLastName;

      // update localStorage
      const teacherData = JSON.parse(localStorage.getItem(this.email)) || {};
      const classStudents = (teacherData.allStudents || {})[this.classId] || [];
      if (classStudents[this.editingIndex]) {
        classStudents[this.editingIndex].firstName = this.editFirstName;
        classStudents[this.editingIndex].lastName  = this.editLastName;
      }
      teacherData.allStudents = {
        ...teacherData.allStudents,
        [this.classId]: classStudents
      };
      localStorage.setItem(this.email, JSON.stringify(teacherData));

      this.showEditDialog = false;
    },
    cancelEdit() {
      this.showEditDialog = false;
    },
    removeStudent() {
      // removing using splice
      this.students.splice(this.editingIndex, 1);

      // update
      const teacherData = JSON.parse(localStorage.getItem(this.email)) || {};
      const classStudents = (teacherData.allStudents || {})[this.classId] || [];
      classStudents.splice(this.editingIndex, 1);

      teacherData.allStudents = {
        ...teacherData.allStudents,
        [this.classId]: classStudents
      };
      localStorage.setItem(this.email, JSON.stringify(teacherData));

      this.showEditDialog = false;
    },
    sendChat() {
      const text = this.chatMessage.trim()
      if (!text) return
      this.chatMessages.push(text)
      this.chatMessage = ''
      this.$nextTick(() => {
        // scroll down or any other UX tweak
      })
    }
  },
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
  background-color: #9a9a9a0d;
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
}

.chat-card {
  padding: 10px;
  border-radius: 20px;
  box-shadow: none;
  background-color: rgb(255, 255, 255);
  margin-top: 5px;
}

.chat-card-header1 {
  color: rgb(29, 29, 29);
  text-transform: capitalize;
  font-size: medium;
  font-weight: bolder;
  background-color: #d947e300;
  border-radius: 0px;
  justify-self: left;
  margin-top: 8px;
  margin-bottom: -1px;
}

.chat-card-header2 {
  color: rgba(127, 127, 127, 0.812);
  text-transform: capitalize;
  font-size: larger;
  font-weight: bolder;
  background-color: #ffffff00;
  border-radius: 0px;
  justify-self: right;
  margin-top: 8px;
  margin-bottom: -1px;
}

.chat-header-row {
  margin-right: -20px;
  margin-left: -20px;
}

.chat-divider {
  margin-left: -100px;
  margin-right: -100px;
  border-bottom: 1px solid black; 
}


.circle-row {
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 40px;
  justify-self: center;
}

.cyber-image {
    padding:20px;
    margin-top: 40px;
    border-radius: 12px;
    box-shadow: none;
    margin-bottom: 40px;
    transform: scale(4);
}

.unboldened {
  font-weight: lighter;
  margin-bottom: 10px;
}

.squiggle-icon {
  color: rgb(81, 156, 210);
  padding-top: 20px;
  padding-bottom: 20px;
  transform: scale(1.2);
  margin-bottom: 10px
}

.unboldened-blue {
  font-weight: lighter;
  color: rgba(32, 59, 109, 0.808);
  margin-bottom: 10px;
}

.unboldened-gray {
  font-weight: lighter;
  color: rgba(88, 124, 172, 0.808);
  margin-bottom: 40px; 
}

.chat-text-field {
  justify-self: left;
  padding-left: 20px;
  margin-top: 20px;
  border-radius: 5px;
  transform: scale(0.95);
  color:#0b3057;
}

.chat-text-field:hover {
  color: rgb(1, 30, 44);
}

.send-button {
  border-radius: 20px;
  color: rgba(66, 86, 104, 0.596);
  background-color: rgb(231, 231, 231);
  margin-top: 30px;
  justify-self: right;
  text-transform: capitalize;
  font-size: larger;
  font-weight: bolder;
  box-shadow: none;
  transform: scale(0.9);
}

.send-button:hover {
  color: white;
  background-color: #577eb3;
}

.chat-actions-row {
  padding: 5px;
}

.transparent-divider {
  color:#2f5fa200;
}

.chat-messages-column {
  justify-self: right;
}

.message-bubble {
  color: white;
  font-weight: lighter;
  background-color: #395482;
  border-radius: 20px;
  justify-self: right;
  align-self: right;
  text-align: right;
  padding: 10px;
  margin-bottom: 10px;
}

.timestamp-text {
  justify-self: right;
  align-self: right;
  text-align: right;
  color: rgb(22, 45, 92);
  font-weight: lighter;
  margin-bottom: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.trash-button {
  margin-bottom: 10px;
  box-shadow: none;
  color:rgb(1, 30, 44);
}

.trash-button-row {
  justify-self: right;
  align-self: right;
  text-align: right;
  margin-bottom: 10px;
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

.students-list-header3 {
  color: rgb(176, 176, 176);
  justify-self: left;
  text-transform:uppercase;
  font-weight: bolder;
  font-size:medium;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 0px;
}

.student-item-text {
  color: rgb(122, 122, 122);
  text-transform: capitalize;
  font-size:medium;
  justify-self: left;
  border-radius: 0px;
  font-weight: lighter;
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
  margin-right:5px;
  margin-top:-2px;
}

.minus-icon {
  margin-left:20px;
  color:rgba(150, 150, 150, 0.816);
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


.edit-button {
  color: rgb(120, 120, 120);
  box-shadow: none;
  border-radius: 20px;
  border: 2px solid rgba(49, 57, 98, 0.234);
  border-bottom: 4px solid rgba(32, 39, 75, 0.441);
}

.edit-student-card {
  padding: 100px;
}

.edit-student-title {
   /* the v-card-title */
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-left:-100px;
  margin-top: -100px;
}

.long-divider {
  margin-left: -100px;
  margin-right: -100px;
  border-bottom: 1px solid black;
}

.edit-name-row {
  margin-top: 15px;
  margin-left: -110px;
  margin-right: -110px;
}


.name-text-field {
  color: rgb(0, 16, 19);
  justify-self: left;
  padding-right: 20px;
  margin-bottom: 15px;
}

.edit-card-header {
  color: rgb(71, 71, 71);
  justify-self: left;
  padding-right: 20px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-transform: capitalize;
  font-size: large;
  font-weight: lighter;
  margin-top: -20px;
  margin-bottom: 20px;
}

.in-classroom-text {
  color: rgb(86, 86, 86);
  background-color: rgb(233, 233, 233);
  border-radius: 20px;
  padding: 10px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-transform: capitalize;
  font-size: medium;
  font-weight: lighter;
  margin-top: -15px;
}

.card-actions-container {
  padding: 20px;
  margin-left: -110px;
  margin-right: -110px;
  margin-bottom: -75px;
  margin-top: 5px;
}

.remove-student-button {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-transform: capitalize;
  font-weight: bolder;
  font-size: small;
  background-color: rgb(211, 0, 0);
  border-radius: 20px;
  color: white;
  margin-right: 100px;
  padding-top: 10px;
  padding-bottom: 30px;
}

.remove-student-button:hover {
  background-color: rgb(227, 74, 74);
}

.cancel-button {
  color:#2f5fa2;
  font-size: large;
  text-transform: capitalize;
  border-radius: 20px;
}

.cancel-button:hover {
  background-color: #aecef1;
}

.save-button {
  border-radius: 20px;
  color: white;
  background-color:#2f5fa2;
  font-size: large;
  text-transform: capitalize;
}

.save-button:hover {
  background-color:#6691ce;
}

</style>


