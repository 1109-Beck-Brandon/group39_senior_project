// tests/unit/UserLogin.spec.js
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import UserLogin from '@/views/UserLogin.vue'
import * as api from '@/services/api'

// Mock the API module
jest.mock('@/services/api', () => ({
  login: jest.fn()
}))

// Mock vue router
const mockRouter = {
  push: jest.fn()
}

describe('UserLogin.vue', () => {
  let wrapper

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    
    // Create a mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn()
    }
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    
    // Mount the component
    wrapper = mount(UserLogin, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
  })

  it('calls login API with correct credentials when form is submitted', async () => {
    // Setup test data
    const testCredentials = {
      email: 'test@example.com',
      password: 'password123'
    }
    
    // Set input values
    await wrapper.find('input[type="email"]').setValue(testCredentials.email)
    await wrapper.find('input[type="password"]').setValue(testCredentials.password)
    
    // Mock successful login response
    api.login.mockResolvedValueOnce({
      data: {
        message: 'Logged in successfully',
        user: {
          id: 1,
          first_name: 'Test',
          last_name: 'User',
          email: 'test@example.com',
          role: 'Student'
        }
      }
    })
    
    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick() // Wait for promises to resolve
    
    // Assert API was called correctly
    expect(api.login).toHaveBeenCalledWith(testCredentials)
    
    // Assert localStorage was updated
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({
        id: 1,
        user_id: 1,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        role: 'Student'
      })
    )
    
    // Assert redirection to dashboard
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    
    // Assert no error message is displayed
    const errorElement = wrapper.find('.error')
    expect(errorElement.exists()).toBe(false)
  })

  it('displays error message when login fails', async () => {
    // Set input values
    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('wrongpassword')
    
    // Mock failed login
    const errorMessage = 'Invalid credentials'
    api.login.mockRejectedValueOnce({
      response: { data: { error: errorMessage } }
    })
    
    // Submit the form
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick() // Wait for promises to resolve
    
    // Assert error message is displayed
    const errorElement = wrapper.find('.error')
    expect(errorElement.exists()).toBe(true)
    expect(errorElement.text()).toBe(errorMessage)
    
    // Assert localStorage was not updated
    expect(window.localStorage.setItem).not.toHaveBeenCalled()
    
    // Assert no redirection happened
    expect(mockRouter.push).not.toHaveBeenCalled()
  })
})