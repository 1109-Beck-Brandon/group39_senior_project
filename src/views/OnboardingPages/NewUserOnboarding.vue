<template>
    <v-container fluid class="onboarding-page-container">
      <v-row justify="center" align="center">
        <v-col cols="12" md="7">
          <v-card elevation="3" class="onboarding-card pa-6">
            <h2 class="section-title text-center">Finish Creating Your Account</h2>
            <v-form @submit.prevent="completeOnboarding" class="onboarding-form">
               
                <!-- interest questions -->
                <h4>What type of content are you most interested in?</h4>
                <v-row>
                <v-col cols="6" v-for="option in contentOptions" :key="option">
                    <v-btn 
                    block 
                    :class="contentType === option ? 'option-button-selected' : 'option-button'" 
                    @click="contentType = option">
                    {{ option }}
                    </v-btn>
                </v-col>
                </v-row>

                <!-- academic status -->
                <h4>What is your academic status?</h4>
                <v-row>
                <v-col cols="6" v-for="status in academicOptions" :key="status">
                    <v-btn 
                    block 
                    :class="academicStatus === status ? 'option-button-selected' : 'option-button'" 
                    @click="academicStatus = status">
                    {{ status }}
                    </v-btn>
                </v-col>
                </v-row>
  
              <v-btn
                color="primary"
                type="submit"
                elevation="2"
                class="submit-button"
                :disabled="!formIsValid"
              >
                <v-icon left>mdi-checkbox-marked-circle</v-icon>
                Complete
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
    
        <v-col cols="12" md="5" class="text-center">
          <v-img
            :src="CyberPicture"
            alt="Cybersecurity Image"
            max-width="400"
            class="onboarding-image"
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import CyberPicture from './CyberPicture.png';  // dynamic image import
  import { updateLoginState } from '@/eventBus';
  
  export default {
    name: 'NewUserOnboarding',
    data() {
      return {
        CyberPicture,
        requiredRule: v => !!v || 'This field is required',

        contentType: '',
        contentOptions: ["CIA Triad", "Digital Forensics", "Machine Learning", "Other"],
        academicStatus: '',
        academicOptions: ["High School (9-12th)", "Undergraduate", "Graduate", "Industry"],

        firstName: '',
        lastName: '',
        email: '',
        role: '',
      };
    },
    computed: {
      formIsValid() {
        return (
          this.contentType &&
          this.academicStatus
        );
      },
    },
    created() {
      const email = this.$route.query.email;
      console.log('Individual user email is:', email);
      // Get any previously stored info (from ProfileCreate)
      const userInfo = JSON.parse(localStorage.getItem(email)) || {};
      console.log('User Info:', userInfo);
      this.firstName = userInfo.first_name || '';
      this.lastName = userInfo.last_name || '';
      this.email = userInfo.email || '';
      this.role = userInfo.role || '';
    },
    methods: {
      completeOnboarding() {
        if (!this.formIsValid) {
          alert('Please fill in all required fields correctly.');
          return;
        }
        
        const email = this.email;
        const userInfo = JSON.parse(localStorage.getItem(email)) || {};
        
        const updatedUser = {
          ...userInfo,
          contentType: this.contentType,
          academicStatus: this.academicStatus
        };
        
        // Save updated user info under their email key
        localStorage.setItem(email, JSON.stringify(updatedUser));
        
        // Also save as current logged-in user to maintain login state
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update login state if eventBus is available
        if (typeof updateLoginState === 'function') {
          updateLoginState();
        }
        
        console.log('Updated individual info saved:', updatedUser);
        
        this.$router.push({ path: '/profileView', query: { email: email } });
      },
    },
  };
  </script>
  
  <style scoped>

  h4 {
    margin-bottom: 20px;
    margin-top: 40px;
  }

  .onboarding-page-container {
    position: relative;
    background-color: #0a192f;
    background-image:
      radial-gradient(rgba(73, 216, 230, 0.1) 1px, transparent 1px),
      radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
    background-size: 50px 50px, 70px 70px;
    background-position: 0 0, 25px 25px;
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 60px;
    color: #e6f1ff;
  }
  
  .onboarding-card {
    background-color: #172a46;
    border-radius: 12px;
    border-left: 5px solid #64ffda;
    padding: 30px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #64ffda;
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
  }
  
  .onboarding-form {
    margin-top: 20px;
    color: #9cffe8;
  }
  
  .submit-button {
    background-color: #64ffda !important;
    color: #172a46 !important;
    font-weight: bold;
    margin-top: 20px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  .onboarding-image {
    margin-top: 40px;
    margin-left: 90px;
    border-radius: 12px;
    margin-bottom: 120px;
  }

.option-button {
  background-color: #233554;
  color: #e6f1ff;
  font-weight: normal;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.option-button-selected {
  background-color: #64ffda;
  color: #172a46;
  font-weight: bold;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.option-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

::v-deep .v-messages__message {
color: #ff9393 !important;
}

</style>

