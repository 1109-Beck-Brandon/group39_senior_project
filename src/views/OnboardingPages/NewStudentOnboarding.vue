<template>
    <v-container fluid class="onboarding-page-container">
      <v-row justify="center" align="center">
        <v-col cols="12" md="7">
          <v-card elevation="3" class="onboarding-card pa-6">
            <h2 class="section-title text-center">Finish Creating your Student Account</h2>
            <v-form @submit.prevent="completeOnboarding" class="onboarding-form">
              <!-- School Name: required -->
              <v-text-field
                v-model="schoolName"
                label="School Name"
                placeholder="Enter your school name"
                outlined
                color="cyan-darken-2"
                :rules="[requiredRule]"
                required
              />
  
              <!-- optional classroom id -->
              <v-text-field
                v-model="classId"
                label="Classroom ID (if applicable)"
                placeholder="Enter your class ID or leave blank"
                outlined
                color="cyan-darken-2"
              />
  
              <!-- grade levels-->
              <h4>Grade Level:</h4>
              <v-row>
                <v-col cols="6" v-for="grade in grades" :key="grade">
                  <v-btn 
                    block 
                    :class="gradeLevel === grade ? 'grade-button-selected' : 'grade-button'" 
                    @click="gradeLevel = grade">
                    {{ grade }}
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
  import CyberPicture from './CyberPicture.png'; 
  import { updateLoginState } from '@/eventBus';
  
  export default {
    name: 'NewStudentOnboarding',
    data() {
      return {
        CyberPicture,
        requiredRule: v => !!v || 'This field is required',
        schoolName: '',
        classId: '', // Optional field
        gradeLevel: '',
        grades: ['9th grade', '10th grade', '11th grade', '12th grade'],

        firstName: '',
        lastName: '',
        email: '',
        role: '',
      };
    },
    computed: {
      formIsValid() {
        return (
          this.schoolName &&
          this.gradeLevel
        );
      },
    },
    created() {
      const email = this.$route.query.email;
      console.log('Student email is:', email);
      // Retrieve existing user info (e.g., from ProfileCreate)
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
          schoolName: this.schoolName,
          gradeLevel: this.gradeLevel,
          classId: this.classId ? this.classId : ''
        };
  
        // Save updated user info under their email key
        localStorage.setItem(email, JSON.stringify(updatedUser));
        
        // Also save as current logged-in user
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Update login state (if using eventBus)
        if (typeof updateLoginState === 'function') {
          updateLoginState();
        }
        
        console.log('Updated student info saved:', updatedUser);
  
        this.$router.push({ path: '/profileView', query: { email: email } });
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  .grade-button {
    background-color: #233554;
    color: #e6f1ff;
    font-weight: normal;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .grade-button-selected {
    background-color: #64ffda;
    color: #172a46;
    font-weight: bold;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .grade-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  ::v-deep .v-messages__message {
    color: #ff9393 !important;
  }
  </style>
