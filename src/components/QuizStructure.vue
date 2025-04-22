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
      this.feedback = {};
      this.quizQuestions.forEach((question, index) => {
        if (question.type === 'fill-in-the-blank-multiple') {
          const userAnswers = this.userAnswers[index].map(answer => answer.trim().toLowerCase());
          const correctAnswers = question.answers.map(answer => answer.toLowerCase());
          const uniqueUserAnswers = [...new Set(userAnswers)];
          const correctCount = uniqueUserAnswers.filter(answer => correctAnswers.includes(answer)).length;
          const isCorrect = correctCount === correctAnswers.length;

          if (isCorrect) {
            this.correctAnswers++;
            this.feedback[index] = { correct: true, message: "Correct!" };
          } else {
            this.feedback[index] = { correct: false, message: "Incorrect" };
          }
        } else {
          const userAnswer = this.userAnswers[index]?.trim()?.toLowerCase();
          const correctAnswer = question.answer.toLowerCase();
          const isCorrect = userAnswer === correctAnswer;

          if (isCorrect) {
            this.correctAnswers++;
            this.feedback[index] = { correct: true, message: "Correct!" };
          } else {
            this.feedback[index] = { correct: false, message: "Incorrect" };
          }
        }
      });

      const score = Math.round((this.correctAnswers / this.quizQuestions.length) * 100);

      // Save Quiz Attempt
      this.saveQuizAttempt(score);

      // Update module progress in localStorage
      this.updateModuleProgress(score);

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
    updateModuleProgress(score) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.user_id) {
        console.error("User not logged in. Cannot update module progress.");
        return;
      }

      // Extract module ID from route path
      const path = this.$route.path;
      let moduleId = null;
      
      // Parse module ID from route path
      if (path.includes('intro-to-cybersecurity')) {
        // Map intro-to-cybersecurity module paths to IDs
        if (path.includes('moduleOne')) moduleId = '1';
        else if (path.includes('AttacksDefensemodule')) moduleId = '2';
        else if (path.includes('SEmodule')) moduleId = '3';
        else if (path.includes('OSImodule')) moduleId = '4';
        else if (path.includes('labModule') && !path.includes('labModule2')) moduleId = '5';
        else if (path.includes('labModule2')) moduleId = '6';
        else if (path.includes('Jobsmodule')) moduleId = '7';
        else if (path.includes('FinalQuiz')) moduleId = '8';
      } else if (path.includes('nist-framework')) {
        // Map NIST modules to IDs
        if (path.includes('governModule')) moduleId = '11';
        else if (path.includes('identifyModule')) moduleId = '12';
        else if (path.includes('protectModule')) moduleId = '13';
        else if (path.includes('detectModule')) moduleId = '14';
        else if (path.includes('respondModule')) moduleId = '15';
        else if (path.includes('recoverModule')) moduleId = '16';
      }
      
      if (!moduleId) {
        console.error('Could not determine module ID from route:', path);
        return;
      }

      // Update module progress in localStorage
      const localProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
      if (!localProgress[user.user_id]) {
        localProgress[user.user_id] = {};
      }
      
      localProgress[user.user_id][moduleId] = {
        score,
        completedAt: new Date().toISOString(),
        status: 'completed'
      };
      
      localStorage.setItem('moduleProgress', JSON.stringify(localProgress));
      console.log(`Module ${moduleId} progress saved locally with score ${score}%`);

      // Update enrolled courses progress
      this.updateCourseProgress(moduleId);
    },
    updateCourseProgress(moduleId) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.user_id) return;

      // Determine course ID based on module ID
      let courseId = null;
      if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(moduleId)) {
        courseId = '1'; // Intro to Cybersecurity
      } else if (['11', '12', '13', '14', '15', '16'].includes(moduleId)) {
        courseId = '2'; // NIST Framework
      }

      if (!courseId) return;

      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '{}');
      if (!enrolledCourses[user.user_id]) return;

      const userCourses = enrolledCourses[user.user_id];
      const courseIndex = userCourses.findIndex(course => course.id === courseId);
      
      if (courseIndex === -1) return;
      
      // Calculate new progress
      const moduleProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
      if (!moduleProgress[user.user_id]) return;
      
      const moduleMap = {
        '1': ['1', '2', '3', '4', '5', '6', '7', '8'], // Intro to Cybersecurity modules
        '2': ['11', '12', '13', '14', '15', '16'], // NIST Framework modules
      };
      
      const courseModules = moduleMap[courseId] || [];
      let completedCount = 0;
      
      courseModules.forEach(modId => {
        if (moduleProgress[user.user_id][modId]) {
          completedCount++;
        }
      });
      
      // Update progress percentage
      const progressPercentage = Math.round((completedCount / courseModules.length) * 100);
      userCourses[courseIndex].progress = progressPercentage;
      
      // Save back to localStorage
      enrolledCourses[user.user_id] = userCourses;
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      console.log(`Course ${courseId} progress updated to ${progressPercentage}%`);
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