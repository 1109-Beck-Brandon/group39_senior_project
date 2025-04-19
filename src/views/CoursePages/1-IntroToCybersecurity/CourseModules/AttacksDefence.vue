<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">Cybersecurity Attacks</h1>
        <img :src="headerImage" alt="Header Image" class="header-image" />
        <p class="section-description">
          The time has come to understand what cybersecurity is all about. Today we are going to learn about common cyberattacks,
          what they represent, and how we can defend against them.
        </p>
      </v-col>
    </v-row>

    <!-- Attack Types Carousel Section -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <h2 class="section-title text-center">Common Attack Types</h2>
        
        <v-carousel
          v-model="currentSlide"
          height="400"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
          delimiter-icon="mdi-circle"
          class="threat-carousel"
        >
          <v-carousel-item v-for="(attack, index) in attacks" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="5" class="d-flex align-center justify-center">
                    <v-img
                      :src="attack.image"
                      :alt="attack.name + ' Image'"
                      max-height="300"
                      contain
                      class="attack-image"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="7" class="pa-4">
                    <div class="attack-content">
                      <h3 class="threat-title text-h4 mb-3">{{ attack.name }}</h3>
                      <div class="threat-description">{{ attack.description }}</div>
                      <div class="threat-description mt-4" v-if="attack.details">
                        {{ attack.details }}
                      </div>
                      <div class="mt-4" v-if="attack.subtypes && attack.subtypes.length > 0">
                        <strong class="text-white">Types:</strong>
                        <ul class="subtype-list mt-2">
                          <li v-for="(subtype, idx) in attack.subtypes" :key="idx">
                            <strong class="text-white">{{ subtype.name }}:</strong> 
                            <span class="text-white">{{ subtype.description }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-carousel-item>
        </v-carousel>

        <!-- Progress Bar -->
        <v-card class="mt-4 mb-6" elevation="2">
          <v-card-text class="pa-2">
            <div class="progress-text d-flex justify-space-between mb-1">
              <span>{{ attacks[currentSlide].name }}</span>
              <span>{{ currentSlide + 1 }} of {{ attacks.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentSlide + 1) / attacks.length) * 100"
              height="12"
              color="primary"
              rounded
              striped
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Summary Section -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="defense-card pa-4 mb-6">
          <h2 class="section-title">Cybersecurity Attacks Summary</h2>
          <p class="defense-description">
            Understanding these common attacks is crucial for maintaining strong cybersecurity defenses.
            Let's review what we've learned:
          </p>
          <v-row>
            <v-col cols="12">
              <ul class="summary-list">
                <li><strong>Malware:</strong> Malicious software including spyware, ransomware, viruses, and worms that can damage systems.</li>
                <li><strong>Man-in-the-middle:</strong> Attacks where hackers insert themselves into communications between two parties.</li>
                <li><strong>Denial-of-service:</strong> Attacks that flood systems with traffic to exhaust resources and disrupt services.</li>
                <li><strong>SQL injection:</strong> Inserting malicious code into servers that use SQL to manipulate databases.</li>
                <li><strong>Zero-day exploit:</strong> Attacks that target announced but unpatched vulnerabilities.</li>
                <li><strong>DNS tunneling:</strong> Using DNS protocol to communicate non-DNS traffic and bypass security measures.</li>
                <li><strong>Phishing:</strong> Fraudulent communications designed to steal sensitive data through deception.</li>
              </ul>
              <p class="defense-description mt-4">
                Remember that staying informed about these threats is your first line of defense in the digital world.
              </p>
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
        
      </v-col>
    </v-row>

    <!-- Add Quiz Component -->
    <QuizStructure 
      :quizQuestions="quizQuestions" 
      v-model:showQuizDialog="showQuizDialog"
      @quiz-completed="onQuizCompleted"
    />

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
import headerImage from "@/assets/1000_F_245067789_zik0XUAuBWDyC5YCHKfAQbKAJceKFdK4.jpg";
import malwareImage from "@/assets/images.jpg";
import mitmImage from "@/assets/Phases-of-man-in-middle-attack-alt.png";
import ddosImage from "@/assets/ddos attack (1)-1.webp";
import sqlInjectionImage from "@/assets/SQL-Injection-1.png";
import zeroDayImage from "@/assets/Zero-Day-Attack.png";
import dnsTunnelingImage from "@/assets/how-dns-tunneling-works.webp";
import phishingImage from "@/assets/phishing.webp";

import QuizStructure from '@/components/QuizStructure.vue';
import progressTracking from '@/mixins/progressTracking.js';

export default {
  name: "CyberAttacksCarousel",

  components: {
    QuizStructure,
  },

  mixins: [progressTracking],

  data() {
    return {
      headerImage,
      currentSlide: 0,
      moduleId: 2,
      moduleName: "Attacks and Defense",
      showQuizDialog: false,
      showPastAttemptsDialog: false,
      pastAttempts: [],

      attacks: [
        {
          name: "Malware",
          description: "Malware is a term used to describe malicious software, including spyware, ransomware, viruses, and worms. These malicious programs can perform various harmful functions such as stealing, encrypting, or deleting sensitive data.",
          image: malwareImage,
          details: "Malware can infect systems through downloads, email attachments, or security vulnerabilities. Modern malware is often designed to avoid detection while stealing data or spying on users."
        },
        {
          name: "Man-in-the-Middle Attack",
          description: "These attacks occur when attackers insert themselves into a two-party transaction, intercepting and potentially altering the communication between the two parties who believe they are directly communicating with each other.",
          image: mitmImage,
          details: "This attack can happen on unsecured WiFi networks, allowing attackers to intercept sensitive information such as login credentials or payment details."
        },
        {
          name: "Denial-of-Service Attack",
          description: "A denial-of-service attack floods systems, servers, or networks with traffic to exhaust resources and bandwidth, preventing legitimate users from accessing services.",
          image: ddosImage,
          details: "When multiple compromised devices are used in the attack, it's called a Distributed Denial of Service (DDoS) attack. These attacks can target websites, services, or entire networks."
        },
        {
          name: "SQL Injection",
          description: "An attacker inserts malicious code into a server that uses SQL by exploiting vulnerabilities in a website's database. This can allow attackers to access or delete data, or even take control of the server.",
          image: sqlInjectionImage,
          details: "SQL injections remain one of the most common web application vulnerabilities and can lead to exposure of sensitive data, authentication bypass, or complete database compromise."
        },
        {
          name: "Zero-Day Exploit",
          description: "A zero-day exploit hits after a network vulnerability is announced but before a solution or patch is implemented. Attackers target the vulnerability during this window of opportunity.",
          image: zeroDayImage,
          details: "These exploits are particularly dangerous because there are no defenses in place, giving organizations little to no time to mitigate the vulnerability before it can be exploited."
        },
        {
          name: "DNS Tunneling",
          description: "DNS tunneling utilizes the DNS protocol to communicate non-DNS traffic over port 53, bypassing security controls by hiding data within DNS queries and responses.",
          image: dnsTunnelingImage,
          details: "Attackers can use DNS tunneling to maintain persistent connections to command and control servers, exfiltrate data, or bypass captive portals in restricted networks."
        },
        {
          name: "Phishing",
          description: "Phishing is the practice of sending fraudulent communications that appear to come from reputable sources, usually through email. The goal is to steal sensitive data like credit card numbers, login information, or to install malware.",
          image: phishingImage,
          details: "Phishing attacks often use urgency and fear to pressure victims into acting quickly without carefully verifying the sender or the request.",
          subtypes: [
            { name: "Email Phishing", description: "Fake emails designed to trick users into providing sensitive information." },
            { name: "Spear Phishing", description: "Targeted attacks on specific individuals or organizations, often personalized to increase success." },
            { name: "Whaling", description: "Phishing attacks targeting high-level executives or prominent individuals." },
            { name: "Smishing", description: "Phishing carried out through SMS (text messages)." },
            { name: "Vishing", description: "Phishing conducted over voice calls to deceive victims." }
          ]
        }
      ],
      // Quiz data
      quizQuestions: [
        {
          text: "What is the name of the phishing attack targeting high-level executives?",
          type: "multiple-choice",
          options: ["Smishing", "Whaling", "Spear Phishing"],
          answer: "Whaling",
        },
        {
          text: "What type of phishing attack uses SMS messages?",
          type: "multiple-choice",
          options: ["Smishing", "Email Phishing", "Vishing"],
          answer: "Smishing",
        },
        {
          text: "Which type of phishing attack involves voice calls?",
          type: "multiple-choice",
          options: ["Spear Phishing", "Vishing", "Whaling"],
          answer: "Vishing",
        },
      ],
    };
  },
  methods: {
    // Back Button
    goBack() {
      this.$router.go(-1);
    },
    async onQuizCompleted(result) {
      // Call handleQuizCompleted to track progress or show feedback
      await this.handleQuizCompleted(result);

      // Reload past attempts
      this.loadPastAttempts();
    },
    
    async handleQuizCompleted(result) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.user_id) {
        console.error('User not logged in. Progress not saved.');
        return;
      }
      
      try {
        // Save progress using the mixin method
        await this.trackProgress(result.correctAnswers, result.totalQuestions);
        
        // Show feedback to the user
        this.$root.$emit('show-snackbar', 'Your progress has been saved!', 'success');
      } catch (error) {
        console.error('Error saving progress:', error);
        this.$root.$emit('show-snackbar', 'Failed to save progress', 'error');
      }
    },

    loadPastAttempts() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.user_id) {
        console.error("User not logged in. Cannot load past attempts.");
        return;
      }

      const quizId = this.$route.path; // Use the route path as a unique quiz ID
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
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.section-title {
  font-size: 1.8rem;
  margin: 20px 0;
  color: #64ffda;
}

.section-description {
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

.carousel-card {
  background-color: #172a46;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  max-width: 100%;
  border-left: 5px solid #64ffda;
}

.attack-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.threat-title {
  color: #64ffda;
  font-weight: 600;
}

.threat-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #ffffff;
}

.defense-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.defense-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.summary-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
  color: #ffffff;
  font-size: 1.1em;
  line-height: 1.6;
}

.summary-list li {
  margin-bottom: 10px;
}

.attack-image {
  max-height: 300px;
  padding: 10px;
  filter: drop-shadow(0 0 10px rgba(100, 255, 218, 0.3));
}

.subtype-list {
  list-style-type: disc;
  padding-left: 20px;
  color: #a8b2d1;
}

.subtype-list li {
  margin-bottom: 8px;
}

.progress-text {
  font-size: 0.9em;
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