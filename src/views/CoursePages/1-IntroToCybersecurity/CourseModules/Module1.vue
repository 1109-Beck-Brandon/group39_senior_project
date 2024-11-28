<template>
    <!--Appplication  Bar-->
    <v-layout class="rounded rounded-md">
      <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
    </v-layout>

    <v-container fluid>
      <!-- Top Section: Course Content -->
      <v-row>
        <v-col cols="12">
          <h1 class="page-title">{{ courseTitle }}</h1>
          <div class="content-section">
            <p>
                In this module, you'll learn about the CIA Triad, a fundamental concept in Cybersecurity.
                <br><br>
                The CIA Triad consists of three core concepts: Confidentiality, Integrity, and Availability.
                <br><br>
            </p>
            <v-col cols="12">
                <v-img
                    :src="require('../../../../assets/CIA-Triad.png')"
                    class="my-3"
                    contain
                    height="225"
                />
            </v-col>
            <h2>Confidentiality</h2>
            <p>
                Confidentiality is ensuring that only the people who are allowed to have access to specific information are the only ones who can access it. It focuses upon protocols that ensure outside parties cannot view information or data that they are not allowed to view.
                <br><br>
            </p>
            <h2>Integrity</h2>
            <p>
                Integrity revolves around the protection of data and file tampering. Integrity ensures two concepts known as non-repudiation and authenticity. 
                <br><br>
            </p>
            <h3>Non-Repudiation</h3>
            <p>
              Non-Repudiation is a concept that ensures that a party cannot deny their involvement in a transaction. 
            </p>
            <h3>Authenticity</h3>
                Authenticity is a concept in which a person is who they say they are. This is usually verified through the use of a digital signature, which is unique to the sender of a message and cannot be tampered with unless the attacker knows it. 
            <p>
            <br><br>
            </p>
            <h2>Availability</h2>
            <p>
                Availability is about ensuring that the data that individuals need to access is accessible in a timely and reliable manner. 
                <br><br>
            </p>
            <h3>Additional Resources and Content Source</h3>
            <p> NIST Executive Summary: https://www.nccoe.nist.gov/publication/1800-25/VolA/index.html</p>

          </div>
        </v-col>
      </v-row>
  
      <!-- Quiz Section -->
      <v-row>
        <v-col cols="12">
          <h2 class="quiz-title">Module Quiz</h2>
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
        courseTitle: "The CIA Triad",
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
        ],
        userAnswers: {}, // Stores user's answers
        feedback: {}, // Stores feedback for each question
      };
    },
    methods: {
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
              message: `Correct! The answer is "${question.answer}".`,
            };
          } else {
            this.feedback[index] = {
              correct: false,
              message: `Incorrect. The correct answer is "${question.answer}".`,
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