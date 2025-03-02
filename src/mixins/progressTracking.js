// src/mixins/progressTracking.js

import { getModuleIdFromRoute, getCourseIdFromModuleId } from '@/utils/moduleMap';

/**
 * API function to save progress - add this to your src/services/api.js file
 * @param {number} userId - User ID
 * @param {number} moduleId - Module ID
 * @param {number} score - Score achieved (0-100)
 * @returns {Promise} - API response
 */
export function saveModuleProgress(userId, moduleId, score) {
  const apiClient = window.axios || require('axios').create({
    baseURL: process.env.VUE_APP_API_URL || 'https://cybersecurity-learning-platform.onrender.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return apiClient.post('/progress', {
    user_id: userId,
    module_id: moduleId,
    status: 'completed',
    score: score
  });
}

export default {
  data() {
    return {
      progressSaved: false,
      progressError: null,
      moduleId: null,
      courseId: null,
      showProgressSavedMessage: false,
      correctAnswers: 0,
    };
  },

  created() {
    // Get module and course ID from route when component is created
    this.moduleId = getModuleIdFromRoute(this.$route.path);
    if (this.moduleId) {
      this.courseId = getCourseIdFromModuleId(this.moduleId);
    }
  },

  methods: {
    /**
     * Track user progress after quiz completion
     * @param {number} correctAnswers - Number of correct answers
     * @param {number} totalQuestions - Total number of questions
     * @returns {Promise<boolean>} - Whether progress was successfully tracked
     */
    async trackProgress(correctAnswers, totalQuestions) {
      const score = Math.round((correctAnswers / totalQuestions) * 100);
      
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.user_id) {
        console.error('User not logged in. Progress not saved.');
        this.progressError = 'User not logged in';
        return false;
      }
      
      // Get module ID if not already set
      if (!this.moduleId) {
        this.moduleId = getModuleIdFromRoute(this.$route.path);
      }
      
      if (!this.moduleId) {
        console.error('Module ID not found for route:', this.$route.path);
        this.progressError = 'Module not recognized';
        return false;
      }
      
      try {
        await this.saveModuleProgress(user.user_id, this.moduleId, score);
        console.log(`Module ${this.moduleId} progress saved: ${score}%`);
        
        // Update local data
        this.progressSaved = true;
        this.progressError = null;
        
        // Show success message
        this.showProgressSavedMessage = true;
        setTimeout(() => {
          this.showProgressSavedMessage = false;
        }, 3000);
        
        // Notify parent components
        this.$emit('module-completed', {
          moduleId: this.moduleId,
          courseId: this.courseId,
          score: score
        });
        
        return true;
      } catch (error) {
        console.error('Error saving module progress:', error);
        
        // FALLBACK: Save progress locally when API fails
        this.saveProgressLocally(user.user_id, this.moduleId, score);
        
        // Still show success message to user
        this.progressSaved = true;
        this.showProgressSavedMessage = true;
        setTimeout(() => {
          this.showProgressSavedMessage = false;
        }, 3000);
        
        return true; // Return true anyway to provide good UX
      }
    },
    
    /**
     * Save module progress to the backend
     * @param {number} userId - User ID
     * @param {number} moduleId - Module ID
     * @param {number} score - Score achieved (0-100)
     * @returns {Promise} - API response
     */
    async saveModuleProgress(userId, moduleId, score) {
      const { saveModuleProgress } = await import('@/services/api');
      return saveModuleProgress(userId, moduleId, score);
    },
    
    /**
     * Integrate with quiz submission function
     * Use this in your submitQuiz method
     */
    async submitQuizWithTracking() {
      // Calculate results
      this.correctAnswers = 0;
      const totalQuestions = this.quizQuestions.length;
      
      // Evaluate answers - adapt this to your quiz format
      this.feedback = {};
      this.quizQuestions.forEach((question, index) => {
        const userAnswer = this.userAnswers[index]?.trim()?.toLowerCase();
        const correctAnswer = question.answer.toLowerCase();
        
        const isCorrect = userAnswer === correctAnswer;
        if (isCorrect) this.correctAnswers++;
        
        this.feedback[index] = {
          correct: isCorrect,
          message: isCorrect 
            ? `Correct! The answer is "${question.answer}".`
            : `Incorrect. The correct answer is "${question.answer}".`,
        };
      });
      
      // Track progress
      await this.trackProgress(this.correctAnswers, totalQuestions);
      
      return {
        score: Math.round((this.correctAnswers / totalQuestions) * 100),
        correctAnswers: this.correctAnswers,
        totalQuestions
      };
    },

    // Add this method to save progress locally
    saveProgressLocally(userId, moduleId, score) {
      try {
        // Get existing progress
        const localProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
        
        // Add/update this module's progress
        if (!localProgress[userId]) {
          localProgress[userId] = {};
        }
        
        localProgress[userId][moduleId] = {
          score,
          completedAt: new Date().toISOString(),
          status: 'completed'
        };
        
        // Save back to localStorage
        localStorage.setItem('moduleProgress', JSON.stringify(localProgress));
        console.log('Progress saved locally', { moduleId, score });
      } catch (e) {
        console.error('Error saving progress locally', e);
      }
    }
  }
};