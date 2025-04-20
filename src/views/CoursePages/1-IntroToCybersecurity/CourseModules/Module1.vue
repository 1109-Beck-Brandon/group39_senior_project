<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">The CIA Triad</h1>
        <img :src="headerImage" alt="CIA Triad Diagram" class="header-image" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Understanding the CIA Triad</h2>
          <p class="section-description">
            In this module, you'll learn about the CIA Triad, a fundamental concept in Cybersecurity.
            The CIA Triad consists of three core concepts: Confidentiality, Integrity, and Availability.
            These principles form the foundation of information security practices and policies.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <h2 class="section-title text-center">The Parts of the CIA Triad</h2>
        
        <v-carousel
          v-model="currentSlide"
          height="300"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
          delimiter-icon="mdi-circle"
          class="threat-carousel"
        >
          <v-carousel-item v-for="(item, index) in CIATriadItems" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" class="pa-4">
                    <div class="threat-content text-center">
                      <h3 class="threat-title text-h4 mb-2">{{ item.name }}</h3>
                      <div class="threat-description">{{ item.description }}</div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-carousel-item>
        </v-carousel>

        <v-card class="mt-4 mb-6" elevation="2">
          <v-card-text class="pa-2">
            <div class="progress-text d-flex justify-space-between mb-1">
              <span>{{ CIATriadItems[currentSlide].name }}</span>
              <span>{{ currentSlide + 1 }} of {{ CIATriadItems.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentSlide + 1) / CIATriadItems.length) * 100"
              height="12"
              color="primary"
              rounded
              striped
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="defense-card pa-4 mb-6">
          <h2 class="section-title">Additional Resources</h2>
          <p class="defense-description">
            Expand your knowledge with these trusted resources:
          </p>
          <v-row>
            <v-col cols="12" md="6">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-file-document</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">NIST Executive Summary</div>
                    <div class="strategy-description text-white">Official guidelines and frameworks for implementing CIA principles.</div>
                    <v-btn 
                      text 
                      color="#64ffda" 
                      href="https://www.nccoe.nist.gov/publication/1800-25/VolA/index.html" 
                      target="_blank" 
                      class="mt-2"
                    >
                      Access Resource
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="section-title">Module Quiz</h2>

        <!-- Take Quiz Button-->
        <v-btn color="primary" @click="showQuizDialog = true" class="mb-6">Take Quiz</v-btn>
      
        <!-- Past Attempts Button -->
        <v-btn 
          v-if="pastAttempts.length > 0" 
          color="secondary" 
          @click="showPastAttemptsDialog = true" class="mb-6 ml-4">
          See Past Attempts
        </v-btn>
        
      </v-col>
    </v-row>

    <!-- Add Quiz Component -->
    <QuizStructure :quizQuestions="quizQuestions" v-model:showQuizDialog="showQuizDialog" @quiz-completed="loadPastAttempts"/>

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
  </v-container>
</template>

<script>
import QuizStructure from '@/components/QuizStructure.vue';
import headerImg from '@/assets/cia.jpg';

export default {
  name: "CIATtriad",

  components: {
    QuizStructure,
  },

  data() {
    return {
      headerImage: headerImg,
      currentSlide: 0,
      showQuizDialog: false,
      showPastAttemptsDialog: false,
      pastAttempts: [],

      //Items for CIA Triad Stepper
      CIATriadItems: [
        {
          name: "Confidentiality",
          description: "Confidentiality is ensuring that only the people who are allowed to have access to specific information are the only ones who can access it. It focuses upon protocols that ensure outside parties cannot view information or data that they are not allowed to view."
        },
        {
          name: "Integrity",
          description: "Integrity revolves around protecting data from improper modification/destruction. Integrity ensures two concepts known as non-repudiation and authenticity."
        },
        {
          name: "Non-Repudiation",
          description: "Non-Repudiation is a part of the Integrity component of the CIA Triad. It is a concept that ensures that a party cannot deny their involvement in a transaction. It verifies authenticated sending and receipt of messages."
        },
        {
          name: "Authenticity",
          description: "Authenticity is another part of the Integrity component of the CIA Triad. It is a concept in which a person is who they say they are. This is usually verified through the use of a digital signature, which is unique to the sender of a message and cannot be tampered with unless the attacker knows it."
        },
        {
          name: "Availability",
          description: "Availability is about ensuring that the data that individuals need to access is accessible in a timely and reliable manner."
        },
        {
          name: "The Importance of the CIA Triad in Cybersecurity",
          description: "The CIA Triad is a concept that you will encounter repeatedly when studying cybersecurity, especially in fields such as cryptography and network security. The work that one does in the field of cybersecurity ultimately comes down to enforcing this concept, whether it is for the company they work at, or the consumers that use a product their company supplies."
        }
      ],

      //Add quiz questions to this
      quizQuestions: [
        {
          text: "What are the three main components of the CIA Triad? (Check your spelling!)",
          type: "fill-in-the-blank-multiple",
          answers: ["Confidentiality", "Integrity", "Availability"],
        },
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
    };
  },
  
  methods: {
    goBack() {
      this.$router.go(-1);
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
  },

  mounted() {
    this.loadPastAttempts();
  },
};
</script>

<style scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.main-container {
  position: relative;
  background-color: #0a192f;
  background-image: 
    radial-gradient(rgba(73, 216, 230, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(0, 149, 237, 0.05) 2px, transparent 2px);
  background-size: 50px 50px, 70px 70px;
  background-position: 0 0, 25px 25px;
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #e6f1ff;
}

.header-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #64ffda;
  text-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
}

.header-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.section-title {
  font-size: 1.8rem;
  margin: 20px 0;
  color: #64ffda;
}

.intro-card, .defense-card, .carousel-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.section-description,
.defense-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.threat-carousel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.threat-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.threat-title {
  color: #64ffda;
  font-weight: 600;
}

.threat-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
}

.progress-text {
  font-size: 0.9em;
  color: #ffffff;
}

.strategy-item {
  background-color: #233554;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #64ffda;
}

.strategy-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.strategy-description {
  color: #ffffff;
}

.h-100 {
  height: 100%;
}

.v-progress-linear {
  background: #233554 !important;
}

.v-progress-linear__determinate {
  background: #64ffda !important;
}

.text-white {
  color: #ffffff !important;
}
</style>