<template>
  <v-dialog v-model="localShowQuizDialog" max-width="1000px" persistent>
    <v-card>
      <v-card-title class="headline">Module Quiz</v-card-title>
      <v-card-text>
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

            <!-- Fill in the Blank with Multiple Answers -->
            <div v-else-if="question.type === 'fill-in-the-blank-multiple'" class="answer-input">
              <div v-for="inputIndex in question.answers.length" :key="inputIndex">
                <v-text-field
                  v-model="userAnswers[index][inputIndex - 1]"
                  label="Your Answer"
                  outlined
                ></v-text-field>
              </div>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!quizSubmitted" color="blue darken-1" text @click="showExitConfirmation = true">Exit Quiz</v-btn>
        <v-btn v-if="!quizSubmitted" color="blue darken-1" text @click="submitQuiz">Submit Quiz</v-btn>
        <v-btn v-if="quizSubmitted" color="blue darken-1" text @click="exitQuiz">Exit Quiz</v-btn>
      </v-card-actions>
      <v-card-text v-if="quizSubmitted">
        <p> Score on this attempt: {{ correctAnswers }} / {{ quizQuestions.length }} </p>
      </v-card-text>
    </v-card>

    <!-- Exit Confirmation Dialog -->
    <v-dialog v-model="showExitConfirmation" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Exit</v-card-title>
        <v-card-text>
          Are you sure you want to exit the quiz? Your answers will not be saved.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showExitConfirmation = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="exitQuiz">Exit Quiz</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
    <!-- Snackbar for Unanswered Questions -->
    <v-snackbar v-model="showSnackbar" :timeout="9000" top>
      You have 1 or more unanswered questions. Please answer all questions before submitting.
      <v-btn color="red" text @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-dialog>
</template>
  
<script>
import { progressTracking } from '@/mixins/progressTracking.js';

export default {
  name: "QuizStructure",
  mixins: [progressTracking],
  props: {
    quizQuestions: {
      type: Array,
      required: true,
    },
    showQuizDialog: {
      type: Boolean,
      required: true,
    },
    moduleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localShowQuizDialog: this.showQuizDialog,
      showExitConfirmation: false,
      quizSubmitted: false,
      correctAnswers: 0,
      showSnackbar: false,
      userAnswers: this.initializeUserAnswers(),
      feedback: {},
    };
  },
  watch: {
    showQuizDialog(val) {
        this.localShowQuizDialog = val;
    },
    localShowQuizDialog(val) {
        this.$emit('update:showQuizDialog', val);
    },
  },
  methods: {
    initializeUserAnswers() {
      const answers = {};
      this.quizQuestions.forEach((question, index) => {
        if (question.type === 'fill-in-the-blank-multiple') {
          answers[index] = Array(question.answers.length).fill('');
        } else {
          answers[index] = '';
        }
      });
      return answers;
    },
    async submitQuiz() {
      // Check if all questions are answered, if not then display snackbar warning
      const unansweredQuestions = this.quizQuestions.some((question, index) => {
        if (question.type === 'fill-in-the-blank-multiple') {
          return question.answers.some((_, inputIndex) => !this.userAnswers[index] || !this.userAnswers[index][inputIndex]);
        }
        return !this.userAnswers[index];
      });
      if (unansweredQuestions) {
        this.showSnackbar = true;
        return;
      }
  
      this.feedback = {}; // Reset feedback
      this.correctAnswers = 0; // Reset correct answers
  
      // Check answers and populate feedback
      this.quizQuestions.forEach((question, index) => {
        // Different logic for fill in the blank questions with multiple answers
        if (question.type === 'fill-in-the-blank-multiple') {
          // Make input non-case sensitive
          const userAnswers = this.userAnswers[index].map(answer => answer.trim().toLowerCase());
          const correctAnswers = question.answers.map(answer => answer.toLowerCase());

          // Check for duplicate answers and count correct answers
          const uniqueUserAnswers = [...new Set(userAnswers)];
          const correctCount = uniqueUserAnswers.filter(answer => correctAnswers.includes(answer)).length;

          if (correctCount === correctAnswers.length) {
            this.feedback[index] = {
              correct: true,
              message: `Correct!`,
            };
            this.correctAnswers++;
          } else {
            this.feedback[index] = {
              correct: false,
              message: `Incorrect.`,
            };
          }
        } else {
          // The normal logic for mutliple choice / single fill-in-the-blank questions
          // Ensures that fill in the blank questions are not case sensitive
          const userAnswer = this.userAnswers[index]?.trim()?.toLowerCase();
          const correctAnswer = question.answer.toLowerCase();

          // Checks for correct answer
          if (userAnswer === correctAnswer) {
            this.feedback[index] = {
              correct: true,
              message: `Correct!`,
            };
            this.correctAnswers++;
          } else {
            this.feedback[index] = {
              correct: false,
              message: `Incorrect.`,
            };
          }
        }
      });
  
      this.quizSubmitted = true; // Track when submit quiz button is clicked
  
      // Calculate score percentage
      const scorePercentage = Math.round((this.correctAnswers / this.quizQuestions.length) * 100);
      
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.user_id;
  
      // Save progress to backend
      try {
        if (userId && this.moduleId) {
          await this.trackProgress(this.correctAnswers, this.quizQuestions.length);
          this.$emit('progress-saved', {
            score: scorePercentage,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.quizQuestions.length
          });
        } else {
          console.error('Missing userId or moduleId for progress tracking');
        }
      } catch (error) {
        console.error('Failed to save quiz progress:', error);
      }
    },
    exitQuiz() {
      this.localShowQuizDialog = false;
      this.showExitConfirmation = false;
      this.quizSubmitted = false;
      this.userAnswers = this.initializeUserAnswers();
      this.feedback = {};
    },
  },
};
</script>
  
<style scoped>
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