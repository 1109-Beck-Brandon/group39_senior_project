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
    baseURL: process.env.VUE_APP_API_URL || 'https://cybersecurity-learning-platform.onrender.com/api',
    headers: {
      'Content-Type': 'application/json',
      // Add CORS headers to try to address issues
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    },
    // Add timeout to avoid long-hanging requests
    timeout: 5000,
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
      isOfflineMode: !navigator.onLine, // Track offline status
    };
  },

  created() {
    // Get module and course ID from route when component is created
    this.moduleId = getModuleIdFromRoute(this.$route.path);
    if (this.moduleId) {
      this.courseId = getCourseIdFromModuleId(this.moduleId);
    }
    
    // Add online/offline event listeners
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  },
  
  beforeDestroy() {
    // Clean up event listeners
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  },

  methods: {
    /**
     * Handle connection status changes
     */
    handleConnectionChange() {
      this.isOfflineMode = !navigator.onLine;
      
      // If we're now online, attempt to sync any stored progress
      if (navigator.onLine) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.user_id) {
          this.syncLocalProgress(user.user_id);
        }
      }
    },
    
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
      
      // Always save progress locally first
      this.saveProgressLocally(user.user_id, this.moduleId, score);
      
      // If we're offline, don't even attempt the API call
      if (this.isOfflineMode) {
        console.log('Device is offline. Progress saved locally only.');
        this.progressSaved = true;
        this.showProgressInfo('Progress saved locally. Will sync when online.', 'info');
        return true;
      }
      
      try {
        // Use Promise.race to implement timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        );
        
        await Promise.race([
          this.saveModuleProgress(user.user_id, this.moduleId, score),
          timeoutPromise
        ]);
        
        console.log(`Module ${this.moduleId} progress saved: ${score}%`);
        
        // Update local data
        this.progressSaved = true;
        this.progressError = null;
        
        // Show success message
        this.showProgressInfo('Progress saved successfully!', 'success');
        
        // Notify parent components
        this.$emit('module-completed', {
          moduleId: this.moduleId,
          courseId: this.courseId,
          score: score
        });
        
        return true;
      } catch (error) {
        console.error('Error saving module progress:', error);
        
        // Check specifically for CORS errors
        const isCorsError = error.message && (
          error.message.includes('Network Error') || 
          error.message.includes('CORS') ||
          error.message.includes('Failed to fetch') ||
          error.message.includes('Request timeout')
        );
        
        if (isCorsError) {
          console.warn('CORS or network error detected. Using local storage fallback.');
          // We already saved progress locally above
          this.progressSaved = true;
          this.showProgressInfo('Progress saved locally. Will sync when connection is available.', 'info');
        } else {
          this.progressError = 'Failed to save progress: ' + (error.message || 'Unknown error');
          this.showProgressInfo('There was an issue saving your progress', 'warning');
        }
        
        return true; // Return true anyway to provide good UX
      }
    },
    
    /**
     * Display progress info message
     * @param {string} message - Message to display
     * @param {string} type - Message type (success, info, warning, error)
     */
    showProgressInfo(message, type = 'info') {
      this.showProgressSavedMessage = true;
      
      // If root has a show-snackbar event, use it
      if (this.$root) {
        this.$root.$emit('show-snackbar', message, type);
      }
      
      setTimeout(() => {
        this.showProgressSavedMessage = false;
      }, 3000);
    },
    
    /**
     * Save module progress to the backend
     * @param {number} userId - User ID
     * @param {number} moduleId - Module ID
     * @param {number} score - Score achieved (0-100)
     * @returns {Promise} - API response
     */
    async saveModuleProgress(userId, moduleId, score) {
      try {
        const { saveModuleProgress } = await import('@/services/api');
        return saveModuleProgress(userId, moduleId, score);
      } catch (error) {
        console.error('Error importing api service:', error);
        // Fallback to the local implementation if module import fails
        return saveModuleProgress(userId, moduleId, score);
      }
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
        
        // Add this to sync local progress when connection is restored
        this.scheduleSyncProgress(userId);
      } catch (e) {
        console.error('Error saving progress locally', e);
      }
    },

    // Add this method to attempt syncing local progress when online
    scheduleSyncProgress(userId) {
      // Only set up sync once
      if (this._syncScheduled) return;
      this._syncScheduled = true;
      
      // Try to sync when online
      window.addEventListener('online', () => {
        console.log('Connection restored, syncing progress...');
        this.syncLocalProgress(userId);
      });
    },

    // Add this method to sync local progress with the server
    async syncLocalProgress(userId) {
      try {
        const localProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}');
        const userProgress = localProgress[userId];
        
        if (!userProgress) return;
        
        let syncSuccessCount = 0;
        let syncFailCount = 0;
        
        // Try to sync each module's progress
        for (const [moduleId, data] of Object.entries(userProgress)) {
          try {
            await this.saveModuleProgress(userId, Number(moduleId), data.score);
            console.log(`Synced module ${moduleId} progress`);
            
            // Remove from local storage after successful sync
            delete userProgress[moduleId];
            syncSuccessCount++;
          } catch (err) {
            console.log(`Failed to sync module ${moduleId} progress`, err);
            syncFailCount++;
          }
        }
        
        // Update local storage
        localProgress[userId] = userProgress;
        localStorage.setItem('moduleProgress', JSON.stringify(localProgress));
        
        // Notify about sync results
        if (syncSuccessCount > 0) {
          this.showProgressInfo(`Synced ${syncSuccessCount} module(s) progress successfully`, 'success');
        }
        
        if (syncFailCount > 0) {
          console.warn(`Failed to sync ${syncFailCount} module(s) progress`);
        }
      } catch (err) {
        console.error('Error syncing local progress', err);
      }
    }
  }
};