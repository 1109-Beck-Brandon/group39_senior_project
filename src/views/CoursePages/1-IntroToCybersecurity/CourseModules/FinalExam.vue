<template>

    <!-- Back Button -->
    <v-btn icon class="position-absolute" style="left: 16px; background-color: gray;" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container fluid>
      <!-- Top Section: Course Content -->
      <v-row>
        <v-col cols="12">
          <h1 class="page-title">{{ courseTitle }}</h1>
          <div class="content-section">
            <p>
                Congratulations on completing the content of this course!
                <br><br>
                You will now complete your final exam for this course, which will mark your completion of this course. 
                <br><br>
                Note: If you are taking this course as part of a classroom, this final quiz will be your final grade for this course.
            </p>
          </div>
        </v-col>
      </v-row>
  
      <!-- Quiz Section -->
      <v-row>
        <v-col cols="12">
          <h1>Module Final Exam</h1>
          <v-btn color="primary" @click="showQuizDialog = true">Take Exam</v-btn>
          <br><br><br><br><br>
        </v-col>
      </v-row>

      <!-- Add Quiz Component -->
      <QuizStructure :quizQuestions="quizQuestions" v-model:showQuizDialog="showQuizDialog" />

    </v-container>
</template>
  
<script>

import QuizStructure from '@/components/QuizStructure.vue';

  export default {
    name: "CourseWithQuizPage",

    components: {
      QuizStructure,
    },

    data() {
      return {
        courseTitle: "Intro to Cybersecurity Final Quiz",

        showQuizDialog: false,

        //Add quiz questions to this
        quizQuestions: [
          {
            text: "What are the three main components of the CIA Triad? (Check your spelling!)",
            type: "fill-in-the-blank-multiple",
            answers: ["Confidentiality", "Integrity", "Availability"],
          },
          {
            text: "Which part of the CIA Triad ensures that specific data can only be accessed by those who are allowed to?",
            type: "multiple-choice",
            options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
            answer: "Confidentiality",
          },
          {
            text: "Which part of the CIA Triad ensures that a specific data has not been tampered with and is what it says it is?",
            type: "multiple-choice",
            options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
            answer: "Integrity",
          },
          {
            text: "Which part of the CIA Triad ensures that data can be accessed in a timely and reliable manner?",
            type: "multiple-choice",
            options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
            answer: "Availability",
          },
          {
            text: "Integrity has two components: Non-repudiation and ____________ (Make sure to double-check spelling)",
            type: "fill-in-the-blank",
            answer: "Authenticity",
          },
          {
            text: "What type of Social Engineering attack would involve an email being sent by an attacker to an employee at a company in attempt to gain sensitive information from them?",
            type: "multiple-choice",
            options: ["Vishing", "Phishing", "Spim", "Shoulder Surfing"],
            answer: "Phishing",
          },
          {
            text: "An outsider wants to sneak inside the building of a company that has recently fired them. The front doors can only be opened by scanning a keycard, so the outsider waits until an employee scans their badge and walks into the building, and just before the door closes the outsider catches it and enters the building. What type of Social Engineering attack did the outsider perform?",
            type: "multiple-choice",
            options: ["Shoulder Surfing", "Tailgating", "Spear Phishing", "Pharming"],
            answer: "Tailgating",
          },
          {
            text: "What type of Social Engineering Attack involves looking over someone's shoulder to see the PIN number they enter for their debit card?",
            type: "fill-in-the-blank",
            answer: "Shoulder Surfing",
          },
          {
            text: "A Social Engineering attack method an attacker uses by having a potential victim initiate a conversation first is called _______ Social Engineering.",
            type: "fill-in-the-blank",
            answer: "Reverse",
          },
          {
          text: "Which layer is closest to the user?",
          type: "multiple-choice",
          options: [
            "Physical Layer",
            "Application Layer",
            "Transport Layer",
          ],
          answer: "Application Layer",
        },

        {
          text: "Consider your data is at the stage of being encrypted. What layer might that be?",
          type: "multiple-choice",
          options: [
            "Data Link Layer",
            "Presentation Layer",
            "Network Layer",
          ],
          answer: "Presentation Layer",
        },

        {
          text: "Name three closest layers to the human (do NOT include the word 'layer' after each name)",
          type: "fill-in-the-blank-multiple",
          answers: ["Application", "Presentation", "Session"],
        },
        {
            text: "What command checks the current directory a user are in?",
            type: "fill-in-the-blank",
            answer: "pwd",
          },
          {
            text: "What is the base command (do not include command-line arguments, just the command) that moves users between directories?",
            type: "fill-in-the-blank",
            answer: "cd",
          },
          {
            text: "What is the base command displays the contents of a file?",
            type: "fill-in-the-blank",
            answer: "cat",
          },
          {
            text: "What command diplays the current contents of the directory the user is in (NOT including hidden files)?",
            type: "fill-in-the-blank",
            answer: "ls",
          },
          {
            text: "What command diplays ALL contents (including hidden files) of the directory the user is in?",
            type: "fill-in-the-blank",
            answer: "ls -a",
          },
          {
            text: "(CHALLENGE QUESTION) What should the user type into the command line if they want to create a directory named 'test'?",
            type: "fill-in-the-blank",
            answer: "mkdir test",
          },
          {
            text: "Which of the following re-directs the output of a command to a file?",
            type: "multiple-choice",
            options: ["|", ">", ">>", "-s"],
            answer: ">",
          },
          {
            text: "Which of the following appends the output of a command to a file?",
            type: "multiple-choice",
            options: ["|", ">", ">>", "-s"],
            answer: ">>",
          },
          {
            text: "What command is used to change the permissions on a file or directory?",
            type: "fill-in-the-blank",
            answer: "chmod",
          },
          {
            text: "(CHALLENGE QUESTION) What should be entered in the command line if a user wants to change file permissions on a file called 'test.txt' so that User has read and write permissions?",
            type: "fill-in-the-blank",
            answer: "chmod u+rw test.txt",
          },
          {
            text: "(CHALLENGE QUESTION) What should be entered in the command line if a user wants to change file permissions on a file called 'file.txt' so that Group has only execute permissions??",
            type: "fill-in-the-blank",
            answer: "chmod g=x file.txt",
          },
          {
            text: "Which role involves simulating attacks to identify vulnerabilities?",
            type: "multiple-choice",
            options: ["Security Analyst", "Penetration Tester", "Incident Responder"],
            answer: "Penetration Tester",
          },
          {
            text: "Who is responsible for addressing cyberattacks in real-time?",
            type: "multiple-choice",
            options: ["Incident Responder", "Consultant", "Security Analyst"],
            answer: "Incident Responder",
          },
          {
            text: "What skill is essential for explaining cybersecurity concepts to non-technical teams?",
            type: "multiple-choice",
            options: ["Coding", "Communication", "Problem-Solving"],
            answer: "Communication",
          },
        ],
      };
    },
    methods: {

      //Back Button
      goBack() {
      this.$router.go(-1); 
      },
    },
  };
</script>
  
<style scoped>
  .page-title {
    text-align: center;
    font-size: 2.5em;
    margin-top: 20px;
    font-weight: bold;
  }
  
  .content-section {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 30px;
  }

</style>  