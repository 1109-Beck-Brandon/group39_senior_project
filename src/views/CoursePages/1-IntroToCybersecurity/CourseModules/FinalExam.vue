<template>
    <!--Appplication  Bar-->
    <v-layout class="rounded rounded-md">
      <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform">
      </v-app-bar>
    </v-layout>

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
          <h2 class="quiz-title">Questions:</h2>
          <div class="quiz-container">
            <div
              v-for="(question, index) in quizQuestions"
              :key="index"
              class="quiz-question"
            >
              <p class="question-text">{{ question.text }}</p>
  
              <!-- Multiple Choice -->
              <div v-if="question.type === 'multiple-choice'" class="answer-options">
                <v-radio-group v-model="userAnswers[index]" row>
                  <v-radio
                    v-for="(option, optIndex) in question.options"
                    :key="optIndex"
                    :label="option"
                    :value="option"
                  ></v-radio>
                </v-radio-group>
              </div>
  
              <!-- Fill in the Blank -->
              <div v-else-if="question.type === 'fill-in-the-blank'" class="answer-input">
                <v-text-field
                  v-model="userAnswers[index]"
                  label="Your Answer"
                  outlined
                ></v-text-field>
              </div>
  
              <!-- Feedback -->
              <p
                v-if="feedback[index]"
                :class="feedback[index].correct ? 'feedback-correct' : 'feedback-wrong'"
              >
                {{ feedback[index].message }}
              </p>
            </div>
          </div>
          <v-btn color="primary" @click="submitQuiz">Submit Quiz</v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script>
  export default {
    name: "CourseWithQuizPage",
    data() {
      return {
        courseTitle: "Intro to Cybersecurity Final Quiz",
        //Add quiz questions to this
        quizQuestions: [
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
          text: "Name three closests layers to the human (Try this one without looking at the table!)",
          type: "fill-in-the-blank",
          answer: "Application, Presentation, Session",
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
        userAnswers: {}, // Stores user's answers
        feedback: {}, // Stores feedback for each question
      };
    },
    methods: {

      //Back Button
      goBack() {
      this.$router.go(-1); 
      },

      //Quiz Logic
      submitQuiz() {
        this.feedback = {}; // Reset feedback
  
        this.quizQuestions.forEach((question, index) => {
          //Ensures that fill in the blank questions are not case sensitive
          const userAnswer = this.userAnswers[index]?.trim()?.toLowerCase();
          const correctAnswer = question.answer.toLowerCase();
          
          //Checks for correct answer
          if (userAnswer === correctAnswer) {
            this.feedback[index] = {
              correct: true,
              message: `Correct!`,
            };
          } else {
            this.feedback[index] = {
              correct: false,
              message: `Incorrect. Please review this questions module.`,
            };
          }
        });
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
  
  .quiz-title {
    text-align: center;
    font-size: 2em;
    margin-top: 30px;
    font-weight: bold;
  }
  
  .quiz-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .quiz-question {
    margin-bottom: 20px;
  }
  
  .question-text {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .answer-options {
    margin-left: 20px;
  }
  
  .answer-input {
    margin-left: 20px;
    width: 300px;
  }
  
  .feedback-correct {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .feedback-wrong {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
</style>  