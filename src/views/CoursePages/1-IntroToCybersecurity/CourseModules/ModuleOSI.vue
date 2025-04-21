<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">Common Network Threats</h1>
        <img :src="headerImage" alt="Network Security Threats" class="header-image" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Understanding Network Threats</h2>
          <p class="section-description">
            In today's interconnected world, network security is more critical than ever. Organizations and individuals 
            face a growing array of threats that continuously evolve in sophistication. Understanding these threats is 
            the first step toward effective protection. This module explores common network threats that every 
            cybersecurity professional should be familiar with.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <h2 class="section-title text-center">Major Network Threats</h2>
        
        <v-carousel
          v-model="currentThreat"
          height="300"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
          delimiter-icon="mdi-circle"
          class="threat-carousel"
        >
          <v-carousel-item v-for="(threat, index) in networkThreats" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" class="pa-4">
                    <div class="threat-content text-center">
                      <h3 class="threat-title text-h4 mb-2">{{ threat.title }}</h3>
                      <div class="threat-description">{{ threat.description }}</div>
                      <div class="threat-protocols mt-4" v-if="threat.protocols">
                        <strong>Common Protection Methods:</strong> {{ threat.protocols }}
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
              <span>{{ networkThreats[currentThreat].title }}</span>
              <span>{{ currentThreat + 1 }} of {{ networkThreats.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentThreat + 1) / networkThreats.length) * 100"
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
          <h2 class="section-title">Essential Defense Strategies</h2>
          <p class="defense-description">
            Protecting against network threats requires a multi-layered security approach:
          </p>
          <v-row>
            <v-col cols="12" md="6" v-for="(strategy, index) in defenseStrategies" :key="index">
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
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="section-title">Module Quiz</h2>

        <!-- Take Quiz Button -->
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
import headerImg from '@/assets/osi.jpg';

export default {
  name: "NetworkThreats",

  components: {
    QuizStructure,
  },

  data() {
    return {
      headerImage: headerImg,
      currentThreat: 0,
      showQuizDialog: false,
      showPastAttemptsDialog: false,
      pastAttempts: [],

      networkThreats: [
        {
          title: "Malware",
          description: "Malware includes viruses, worms, trojans, ransomware, and spyware designed to damage systems or steal data. Modern malware is often sophisticated, using encryption and obfuscation techniques to avoid detection. Ransomware attacks have become particularly prevalent, encrypting victims' data and demanding payment for decryption keys.",
          protocols: "Antivirus, EDR, Sandboxing, Regular Updates"
        },
        {
          title: "Phishing Attacks",
          description: "Phishing attacks use deceptive emails, websites, or messages that appear legitimate to trick users into revealing sensitive information or installing malware. Spear phishing targets specific individuals with personalized content, while whaling attacks focus on high-value targets like executives.",
          protocols: "Email Filtering, User Training, Link Scanning, DMARC"
        },
        {
          title: "Man-in-the-Middle (MitM)",
          description: "In MitM attacks, hackers position themselves between a user and an application to intercept or alter communications. This can happen on unsecured public Wi-Fi, compromised routers, or through malware. Once positioned, attackers can steal credentials, redirect traffic, or inject malicious content.",
          protocols: "TLS/SSL, Certificate Validation, VPN, HTTPS"
        },
        {
          title: "Denial of Service (DoS)",
          description: "DoS attacks overwhelm networks, servers, or services with traffic to render them unavailable. Distributed Denial of Service (DDoS) attacks use multiple compromised systems to launch the attack. Modern DDoS attacks can reach massive scales, with some exceeding terabits per second of malicious traffic.",
          protocols: "Traffic Filtering, Rate Limiting, CDN, DDoS Protection Services"
        }
      ],
      
      defenseStrategies: [
        {
          title: "Network Segmentation",
          description: "Divide networks into isolated segments to contain breaches.",
          icon: "mdi-lan"
        },
        {
          title: "Multi-Factor Authentication",
          description: "Require multiple verification methods to access resources.",
          icon: "mdi-account-key"
        },
        {
          title: "Regular Updates",
          description: "Keep systems and software patched against known vulnerabilities.",
          icon: "mdi-update"
        },
        {
          title: "Security Monitoring",
          description: "Implement continuous monitoring and threat detection.",
          icon: "mdi-shield-search"
        }
      ],
      
      quizQuestions: [
        {
          text: "Which attack type primarily relies on social engineering?",
          type: "multiple-choice",
          options: ["DoS Attack", "Phishing Attack", "Man-in-the-Middle"],
          answer: "Phishing Attack",
        },
        {
          text: "What type of attack overwhelms systems with excessive traffic?",
          type: "multiple-choice",
          options: ["Ransomware", "Denial of Service", "Spyware"],
          answer: "Denial of Service",
        },
        {
          text: "Which defense strategy involves verifying identity through multiple methods?",
          type: "multiple-choice",
          options: ["Network Segmentation", "Regular Updates", "Multi-Factor Authentication"],
          answer: "Multi-Factor Authentication",
        }
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

.threat-protocols {
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