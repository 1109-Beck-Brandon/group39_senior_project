<template>
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">Explore Careers in Cybersecurity</h1>
        <img :src="headerImage" alt="Cybersecurity Jobs" class="header-image" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Why Choose Cybersecurity?</h2>
          <p class="section-description">
            Cybersecurity is one of the fastest-growing and most essential fields in the modern world. With the increasing
            reliance on technology, the demand for skilled professionals to protect sensitive data has never been higher.
            While this module won't cover the entirety of jobs available that are cybersecurity related, here are some key
            roles you may commonly hear about:
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <h2 class="section-title text-center">Key Roles in Cybersecurity</h2>
        
        <v-carousel
          v-model="currentRole"
          height="450"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
          delimiter-icon="mdi-circle"
          class="role-carousel"
        >
          <v-carousel-item v-for="(role, index) in careerRoles" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="5" class="d-flex align-center justify-center">
                    <v-img
                      :src="role.image"
                      :alt="role.title"
                      max-height="300"
                      contain
                      class="role-image"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="7" class="pa-4">
                    <div class="role-content">
                      <h3 class="role-title text-h4 mb-2">{{ role.title }}</h3>
                      <div class="role-description">{{ role.description }}</div>
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
              <span>{{ careerRoles[currentRole].title }}</span>
              <span>{{ currentRole + 1 }} of {{ careerRoles.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentRole + 1) / careerRoles.length) * 100"
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
        <v-card elevation="3" class="skills-card pa-4 mb-6">
          <h2 class="section-title">Skills Required for Cybersecurity</h2>
          <p class="skills-description">
            To thrive in cybersecurity, you need a mix of technical and soft skills:
          </p>
          <v-row>
            <v-col cols="12" md="6" v-for="(skill, index) in skills" :key="index">
              <v-card class="skill-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">{{ skill.icon }}</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">{{ skill.title }}</div>
                    <div class="skill-description text-white">{{ skill.description }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="4" class="quiz-card">
          <v-card-title class="quiz-title">Test Your Cybersecurity Knowledge</v-card-title>
          <v-card-text>
            <div class="quiz-container">
              <div
                v-for="(question, index) in quizQuestions"
                :key="index"
                class="quiz-question mb-6"
              >
                <p class="question-text font-weight-bold mb-3 text-white">{{ index + 1 }}. {{ question.text }}</p>
      
                <div class="answer-options">
                  <v-radio-group v-model="userAnswers[index]" row class="text-white">
                    <v-radio
                      v-for="(option, optIndex) in question.options"
                      :key="optIndex"
                      :label="option"
                      :value="option"
                      class="text-white"
                    ></v-radio>
                  </v-radio-group>
                </div>
      
                <v-alert
                  v-if="feedback[index]"
                  :type="feedback[index].correct ? 'success' : 'error'"
                  dense
                  class="mt-2"
                >
                  {{ feedback[index].message }}
                </v-alert>
              </div>
            </div>
            <v-btn color="primary" @click="submitQuiz" class="mt-4">Submit Quiz</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import headerImage from "@/assets/Cybersecurity_Career_List-01.webp";
import securityAnalystImage from "@/assets/information_security_analyst.jpg";
import penetrationTesterImage from "@/assets/How-to-become-penetration-tester-skillset-for-pen-testing.png";
import incidentResponderImage from "@/assets/logo.webp";
import consultantImage from "@/assets/5db715334d39bc64c600f95d_cyber-security-consultant.jpg";

export default {
  name: "JobsAtCyber",
  data() {
    return {
      headerImage,
      currentRole: 0,
      careerRoles: [
        {
          title: "Security Analyst",
          image: securityAnalystImage,
          description: "A Security Analyst is responsible for monitoring an organization's networks and systems to protect against unauthorized access, breaches, and other cyber threats. They analyze security measures, review logs, and respond to potential incidents before they become full-scale problems. Security Analysts also play a vital role in setting up firewalls, intrusion detection systems, and security protocols to protect sensitive information."
        },
        {
          title: "Penetration Tester",
          image: penetrationTesterImage,
          description: "Often called \"ethical hackers,\" Penetration Testers simulate cyberattacks to identify weaknesses in a system's defenses. They perform rigorous testing on networks, applications, and hardware to uncover vulnerabilities that malicious hackers could exploit. By thinking like an attacker, they help organizations bolster their security measures. After completing their tests, Penetration Testers provide detailed reports outlining the vulnerabilities found."
        },
        {
          title: "Incident Responder",
          image: incidentResponderImage,
          description: "Incident Responders are the first line of defense during a cyberattack. They monitor systems for suspicious activity and act quickly to identify, contain, and eliminate threats. Their primary goal is to minimize damage and recover systems to a secure state as quickly as possible. This involves analyzing the root cause of the incident, restoring affected systems, and documenting the incident for future prevention."
        },
        {
          title: "Cybersecurity Consultant",
          image: consultantImage,
          description: "Cybersecurity Consultants work with various organizations to assess their security needs and provide tailored solutions. They evaluate existing infrastructure, identify potential risks, and recommend strategies to strengthen defenses. Consultants often help organizations comply with regulations, implement security frameworks, and develop long-term plans to safeguard their systems. This role requires strong communication skills to explain complex technical concepts."
        }
      ],
      skills: [
        {
          title: "Technical Skills",
          description: "Networking, coding, and threat analysis.",
          icon: "mdi-code-tags"
        },
        {
          title: "Problem-Solving",
          description: "Quickly addressing and resolving complex issues.",
          icon: "mdi-puzzle"
        },
        {
          title: "Communication",
          description: "Explaining security concepts to non-technical audiences.",
          icon: "mdi-account-group"
        },
        {
          title: "Adaptability",
          description: "Keeping up with evolving cyber threats and solutions.",
          icon: "mdi-rotate-3d-variant"
        }
      ],
      quizQuestions: [
        {
          text: "Which role involves simulating attacks to identify vulnerabilities?",
          type: "multiple-choice",
          options: ["Security Analyst", "Penetration Tester", "Incident Responder"],
          answer: "Penetration Tester",
        },
        {
          text: "Who is responsible for addressing cyberattacks in real-time?",
          type: "multiple-choice",
          options: ["Incident Responder", "Consultant", "Security Analyst"],
          answer: "Incident Responder",
        },
        {
          text: "What skill is essential for explaining cybersecurity concepts to non-technical teams?",
          type: "multiple-choice",
          options: ["Coding", "Communication", "Problem-Solving"],
          answer: "Communication",
        },
      ],
      userAnswers: [],
      feedback: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    submitQuiz() {
      this.feedback = this.quizQuestions.map((question, index) => {
        const userAnswer = this.userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        return {
          correct: isCorrect,
          message: isCorrect
            ? "Correct! Great job!"
            : `Incorrect. The correct answer is: ${question.answer}`,
        };
      });
    },
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

.intro-card, .skills-card, .quiz-card, .carousel-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.section-description,
.skills-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.role-carousel {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.role-image {
  padding: 10px;
  max-height: 300px;
  transition: transform 0.3s ease;
}

.role-image:hover {
  transform: scale(1.05);
}

.role-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.role-title {
  color: #64ffda;
  font-weight: 600;
}

.role-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #ffffff;
}

.progress-text {
  font-size: 0.9em;
  color: #ffffff;
}

.skill-item {
  background-color: #233554;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #64ffda;
}

.skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.skill-description {
  color: #ffffff;
}

.quiz-title {
  font-size: 1.8em;
  color: #64ffda;
  padding: 20px;
  background-color: #233554;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.quiz-container {
  padding: 20px;
}

.question-text {
  font-size: 1.2em;
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

.v-radio {
  color: #ffffff !important;
}

.v-radio >>> .v-label {
  color: #ffffff !important;
}
</style>