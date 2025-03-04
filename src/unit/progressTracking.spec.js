import { mount, createLocalVue } from '@vue/test-utils'
import { nextTick } from 'vue'
import Vuetify from 'vuetify'
import QuizStructure from '@/components/QuizStructure.vue'
import progressTracking from '@/mixins/progressTracking.js'
import * as api from '@/services/api'

// Create mock for API calls
jest.mock('@/services/api', () => ({
  saveModuleProgress: jest.fn().mockResolvedValue({ data: { success: true } })
}))

describe('Quiz Progress Tracking', () => {
  let wrapper
  let localVue
  let vuetify
  
  beforeEach(() => {
    // Set up localStorage mock
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn()
    }
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    
    // Mock user being logged in
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'user') {
        return JSON.stringify({ user_id: 123 })
      }
      return null
    })
    
    localVue = createLocalVue()
    vuetify = new Vuetify()
    
    // Create test component that uses the mixin
    const TestComponent = {
      template: `
        <div>
          <QuizStructure 
            :quizQuestions="quizQuestions" 
            :showQuizDialog="showQuizDialog"
            :moduleId="1"
          />
        </div>
      `,
      mixins: [progressTracking],
      components: { QuizStructure },
      data() {
        return {
          showQuizDialog: true,
          quizQuestions: [
            {
              text: "Test question?",
              type: "multiple-choice",
              options: ["A", "B", "C", "D"],
              answer: "B"
            }
          ]
        }
      }
    }
    
    wrapper = mount(TestComponent, {
      localVue,
      vuetify,
      global: {
        stubs: {
          'v-dialog': true,
          'v-card': true
        }
      }
    })
  })
  
  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('saves quiz progress to API when quiz is submitted', async () => {
    // Find QuizStructure component
    const quizComponent = wrapper.findComponent(QuizStructure)
    expect(quizComponent.exists()).toBe(true)
    
    // Select an answer
    await quizComponent.setData({ userAnswers: ['B'] }) // Vue 3 way to set data
    
    // Submit the quiz
    await quizComponent.vm.submitQuiz()
    await nextTick()
    
    // Verify that API was called with correct parameters
    expect(api.saveModuleProgress).toHaveBeenCalledWith(
      123, // user ID
      1,   // module ID
      100  // score (100% since all answers were correct)
    )
    
    // Verify that success message is shown
    expect(quizComponent.vm.showProgressSavedMessage).toBe(true)
  })
  
  it('saves progress locally when API fails', async () => {
    // Mock API to fail
    api.saveModuleProgress.mockRejectedValueOnce(new Error('Network error'))
    
    // Find QuizStructure component
    const quizComponent = wrapper.findComponent(QuizStructure)
    
    // Select an answer
    await quizComponent.setData({ userAnswers: ['B'] })
    
    // Submit the quiz
    await quizComponent.vm.submitQuiz()
    await nextTick()
    
    // Verify that localStorage was called with the correct data
    expect(window.localStorage.setItem).toHaveBeenCalled()
    
    // Check that the call included moduleProgress in the first arg
    const setItemCalls = window.localStorage.setItem.mock.calls
    const localStorageKey = setItemCalls[0][0]
    expect(localStorageKey).toBe('moduleProgress')
    
    // Verify the stored data contains our progress
    const storedData = JSON.parse(setItemCalls[0][1])
    expect(storedData['123']['1'].score).toBe(100)
    expect(storedData['123']['1'].status).toBe('completed')
  })
})