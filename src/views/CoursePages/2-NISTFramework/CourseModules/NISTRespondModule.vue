<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">NIST CSF 2.0: Respond Function</h1>
        
        <!-- Interactive Image Map -->
        <div class="image-map-container">
          <img :src="headerImage" alt="NIST Respond Function" class="header-image" usemap="#nist-map" />
          
          <!-- Image Map Areas -->
          <div class="map-overlay" ref="mapOverlay">
            <div 
              v-for="(module, index) in nistModules" 
              :key="index"
              class="module-hotspot"
              :class="{ 'active': hoveredModule === module.name }"
              :style="module.style"
              @mouseover="hoveredModule = module.name"
              @mouseleave="hoveredModule = null"
              @click="navigateToModule(module.route)"
            >
              <div class="module-tooltip" v-if="hoveredModule === module.name">
                {{ module.name }}
                <span class="click-hint">Click to navigate</span>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Understanding the Respond Function</h2>
          <p class="section-description">
            The "Respond" function is a core component of the NIST Cybersecurity Framework 2.0. 
            It focuses on the ability to take action regarding a detected cybersecurity incident.
            Another term associated with this function is incident response. 
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <h2 class="section-title text-center">Key Respond Categories</h2>
        
        <v-carousel
          v-model="currentCategory"
          height="300"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
          delimiter-icon="mdi-circle"
          class="category-carousel"
        >
          <v-carousel-item v-for="(category, index) in respondCategories" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" class="pa-4">
                    <div class="category-content text-center">
                      <h3 class="category-title text-h4 mb-2">{{ category.title }}</h3>
                      <div class="category-description">{{ category.description }}</div>
                      <div class="category-outcomes mt-4" v-if="category.outcomes">
                        <strong>Key Outcomes:</strong> {{ category.outcomes }}
                      </div>
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
              <span>{{ respondCategories[currentCategory].title }}</span>
              <span>{{ currentCategory + 1 }} of {{ respondCategories.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentCategory + 1) / respondCategories.length) * 100"
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
        <v-card elevation="3" class="implementation-card pa-4 mb-6">
          <h2 class="section-title">Implementation Strategies</h2>
          <p class="implementation-description">
            Effective implementation of the Respond function requires strategic approaches:
          </p>
          <v-row>
            <v-col cols="12" md="6" v-for="(strategy, index) in implementationStrategies" :key="index">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">{{ strategy.icon }}</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">{{ strategy.title }}</div>
                    <div class="strategy-description text-white">{{ strategy.description }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row>
      <v-col cols="12">
        <h1>Module Quiz</h1>

        <!-- Take Quiz Button -->
        <v-btn color="primary" @click="showQuizDialog = true">Take Quiz</v-btn>

        <!-- Past Attempts Button -->
        <v-btn 
          v-if="pastAttempts.length > 0" 
          color="secondary" 
          @click="showPastAttemptsDialog = true" class="mb-6 ml-4">
          See Past Attempts
        </v-btn>
        <br><br><br><br><br>
      </v-col>
    </v-row>

    <!-- Add Quiz Component -->
    <QuizStructure :quizQuestions="quizQuestions" v-model:showQuizDialog="showQuizDialog" @quiz-completed="loadPastAttempts" />

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

export default {
  name: "NISTRespondModule",

  components: {
    QuizStructure,
  },

  data() {
    return {
      headerImage: require("@/assets/nist.png"),
      currentCategory: 0,
      showQuizDialog: false,
      hoveredModule: null,
      showPastAttemptsDialog: false,
      pastAttempts: [],
      
      // Define the NIST modules with their navigation paths and positions on the image
      nistModules: [
        {
          name: "Govern",
          route: "/course/nist-framework/governModule",
          style: "top: 9%; left: 76.38%; width: 8%; height: 17%;"
        },
        {
          name: "Identify",
          route: "/course/nist-framework/identifyModule",
          style: "top: 62.7%; left: 21.6%; width: 8%; height: 17%;"
        },
        {
          name: "Protect",
          route: "/course/nist-framework/protectModule",
          style: "top: 27%; left: 27.7%; width: 8%; height: 17%;"
        },
        {
          name: "Detect",
          route: "/course/nist-framework/detectModule",
          style: "top: 15%; left: 45.7%; width: 8%; height: 17%;"
        },
        {
          name: "Respond",
          route: "/course/nist-framework/respondModule",
          style: "top: 29%; left: 63.7%; width: 8%; height: 17%;"
        },
        {
          name: "Recover",
          route: "/course/nist-framework/recoverModule",
          style: "top: 63%; left: 70.2%; width: 8%; height: 17%;"
        }
      ],

      respondCategories: [
        {
          title: "Incident Management (RS.MA)",
          description: "Responses to detected cybersecurity incidents are managed. This includes executing incident response plans accordingly once an incident is detected, the incident is categorized and prioritized, and the incident is escalated or elevated as needed.",
          outcomes: "Proper incident management, Improved response capabilities"
        },
        {
          title: "Incident Analysis (RS.AN)",
          description: "The incident is investigated to ensure an effective response, as well as support forensics and recovery activities. This includes identifying the root cause of the incident, the extent of the damage, and any potential vulnerabilities that were exploited.",
          outcomes: "Incident Understanding, Improved Recovery Efforts"
        },
        {
          title: "Incident Response Reporting and Communication (RS.CO)",
          description: "Response activities are coordinated with both internal and external stakeholders (employees, customers, law enforcement, etc) as required by laws and policies. This includes notifying stakeholders of the incident and sharing information with them.",
          outcomes: "Proper Communication, Main Stakeholder Trust"
        },
        {
          title: "Incident Mitigation (RS.MI)",
          description: "Actions are taken to prevent the expansion of an ongoing incident, and to minimize the damage done from it. This includes isolating affected systems, blocking malicious traffic, and applying patches or updates to vulnerable systems.",
          outcomes: "Reduced Damage, Improved Recovery Efforts"

        }
      ],
      
      implementationStrategies: [
        {
          title: "Incident Escalation Procedures",
          description: "Define clear escalation paths to help prioritize incidents, ensuring they are handled by the right team.",
          icon: "mdi-arrow-up-bold"
        },
        {
          title: "Stakeholder Communication Plans",
          description: "Create communication plans to address stakeholders during and after a security incident.",
          icon: "mdi-account-group-outline"
        },
        {
          title: "Containment Strategies",
          description: "Implement containment measures, such as isolating affected systems or blocking malicous IP addresses.",
          icon: "mdi-shield-lock-outline"
        },
        {
          title: "Incidient Response Drills",
          description: "Conduct drills to test incident response plans and ensure all team members are familiar with their roles.",
          icon: "mdi-run-fast"
        }
      ],
      
      quizQuestions: [
        {
          text: "Why is it important to notify stakeholders that a security incident has occurred?",
          type: "multiple-choice",
          options: ["You should not notify them to avoid worrying them.", "To maintain stakeholder trust.", "So that they can eliminate the threat for you."],
          answer: "To maintain stakeholder trust.",
        },
        {
          text: "What Respond Category involves taking actions to minimize the damage done by a security incident?",
          type: "multiple-choice",
          options: ["Incident Management", "Incident Analysis", "Incident Response Reporting and Communication", "Incident Mitigation"],
          answer: "Incident Mitigation",
        },
        {
          text: "Which of the following is NOT a proper mitigation strategy?",
          type: "multiple-choice",
          options: ["Isolate Affected Systems", "Disable Affected Accounts", "Turn the affected computer off and on", "Block Malicious IP Addresses"],
          answer: "Turn the affected computer off and on",
        }
      ],
    };
  },
  
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    navigateToModule(route) {
      this.$router.push(route);
    },
    adjustHotspots() {
    },

    // Load past attempts from local storage
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
    this.$nextTick(() => {
    });

    // Load Past Attempts
    this.loadPastAttempts();
  }
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

/* Image Map Styling */
.image-map-container {
  position: relative;
  margin: 0 auto;
  max-width: 100%;
}

.header-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: block;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.module-hotspot {
  position: absolute;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.module-hotspot:hover {
  background-color: rgba(100, 255, 218, 0.3);
  box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
}

.module-hotspot.active {
  background-color: rgba(100, 255, 218, 0.3);
}

.module-tooltip {
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #233554;
  color: #64ffda;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border: 1px solid #64ffda;
}

.module-tooltip:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border-width: 8px;
  border-style: solid;
  border-color: #64ffda transparent transparent transparent;
}

.click-hint {
  display: block;
  font-size: 12px;
  color: #a8b2d1;
  margin-top: 4px;
}

.section-title {
  font-size: 1.8rem;
  margin: 20px 0;
  color: #64ffda;
}

.intro-card, .implementation-card, .carousel-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.section-description,
.implementation-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.category-carousel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.category-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.category-title {
  color: #64ffda;
  font-weight: 600;
}

.category-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #ffffff;
  max-width: 800px;
  margin: 0 auto;
}

.category-outcomes {
  font-size: 0.95em;
  color: #a8b2d1;
  margin-top: 15px;
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