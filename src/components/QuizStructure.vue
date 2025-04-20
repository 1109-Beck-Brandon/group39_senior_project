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

    <!-- Past Attempts Dialog -->
    <v-dialog v-model="showPastAttemptsDialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Past Attempts</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="(attempt, index) in pastAttempts"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>Attempt {{ index + 1 }}</v-list-item-title>
                <v-list-item-subtitle>
                  Date: {{ attempt.date }} | Score: {{ attempt.score }}%
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showPastAttemptsDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
  
<script>
export default {
  name: "QuizStructure",
  props: {
    quizQuestions: {
      type: Array,
      required: true,
    },
    showQuizDialog: {
        type: Boolean,
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
      pastAttempts: [],
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

      // Calculate results
      this.correctAnswers = 0;
      this.quizQuestions.forEach((question, index) => {
        if (question.type === 'fill-in-the-blank-multiple') {
          const userAnswers = this.userAnswers[index].map(answer => answer.trim().toLowerCase());
          const correctAnswers = question.answers.map(answer => answer.toLowerCase());
          const uniqueUserAnswers = [...new Set(userAnswers)];
          const correctCount = uniqueUserAnswers.filter(answer => correctAnswers.includes(answer)).length;
          if (correctCount === correctAnswers.length) {
            this.correctAnswers++;
          }
        } else {
          const userAnswer = this.userAnswers[index]?.trim()?.toLowerCase();
          const correctAnswer = question.answer.toLowerCase();
          if (userAnswer === correctAnswer) {
            this.correctAnswers++;
          }
        }
      });

      const score = Math.round((this.correctAnswers / this.quizQuestions.length) * 100);

      // Save Quiz Attempt
      this.saveQuizAttempt(score);

      // Emit quiz-completed event
      this.$emit('quiz-completed', {
        correctAnswers: this.correctAnswers,
        totalQuestions: this.quizQuestions.length,
        score
      });

      this.quizSubmitted = true;
    },
    saveQuizAttempt(score) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.user_id) {
        console.error("User not logged in. Cannot save quiz attempt.");
        return;
      }

      const quizId = this.$route.path;
      const attemptsKey = `quizAttempts_${user.user_id}_${quizId}`;
      const attempts = JSON.parse(localStorage.getItem(attemptsKey)) || [];

      // Add the new attempt
      attempts.push({
        date: new Date().toLocaleString(),
        score,
      });

      // Save back to localStorage
      localStorage.setItem(attemptsKey, JSON.stringify(attempts));

      // Update local past attempts
      this.pastAttempts = attempts;
    },
    loadPastAttempts() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.user_id) {
        console.error("User not logged in. Cannot load past attempts.");
        return;
      }

      const quizId = this.$route.path;
      const attemptsKey = `quizAttempts_${user.user_id}_${quizId}`;
      this.pastAttempts = JSON.parse(localStorage.getItem(attemptsKey)) || [];
    },
    exitQuiz() {
      this.localShowQuizDialog = false;
      this.showExitConfirmation = false;
      this.quizSubmitted = false;
      this.userAnswers = this.initializeUserAnswers();
      this.feedback = {};
    },
  },
  mounted() {
    this.loadPastAttempts();
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