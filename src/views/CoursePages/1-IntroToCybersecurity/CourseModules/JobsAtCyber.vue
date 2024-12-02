<template>

  <!-- Application Bar -->
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
  </v-layout>

  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray;" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  
    <v-container fluid>
      <!-- Full Page Content -->
      <v-row justify="center" align="center" style="min-height: 100vh;">
        <!-- Header Section -->
        <v-col cols="12" class="text-center">
          <h1 class="header-title">Explore Careers in Cybersecurity</h1>
          <img :src="headerImage" alt="Cybersecurity Jobs" class="header-image" />
        </v-col>
  
        <!-- Introduction Section -->
        <v-col cols="12" md="8" class="text-center">
          <h2 class="section-title">Why Choose Cybersecurity?</h2>
          <p class="section-description">
            Cybersecurity is one of the fastest-growing and most essential fields in the modern world. With the increasing
            reliance on technology, the demand for skilled professionals to protect sensitive data has never been higher.
            While this module won't cover the entirety of jobs availible that are cybersecurity related, here are some key
            roles you may commonly hear about:
          </p>
        </v-col>
  
        <!-- Job Roles Section -->
        <v-col cols="12" md="8" class="text-center">
          <h2 class="section-title">Key Roles in Cybersecurity</h2>
          <ul class="job-roles">
            <li>
              <strong>Security Analyst</strong>
              A Security Analyst is responsible for monitoring an organization's networks and systems to protect against unauthorized access, 
              breaches, and other cyber threats. They analyze security measures, review logs, and respond to potential incidents before they 
              become full-scale problems. Security Analysts also play a vital role in setting up firewalls, intrusion detection systems, and 
              security protocols to protect sensitive information. In addition, they collaborate with other departments to educate employees 
              about best practices in cybersecurity, ensuring the entire organization remains vigilant.
            </li>
            <li>
              <strong>Penetration Tester</strong>
              Often called "ethical hackers," Penetration Testers simulate cyberattacks to identify weaknesses in a system's defenses. 
              They perform rigorous testing on networks, applications, and hardware to uncover vulnerabilities that malicious hackers could exploit. 
              By thinking like an attacker, they help organizations bolster their security measures. After completing their tests, 
              Penetration Testers provide detailed reports outlining the vulnerabilities found and recommendations for mitigating them. 
              Their work is critical in proactively addressing potential threats.
            </li>
            <li>
              <strong>Incident Responder</strong>
              Incident Responders are the first line of defense during a cyberattack. They monitor systems for suspicious activity and act 
              quickly to identify, contain, and eliminate threats. Their primary goal is to minimize damage and recover systems to a secure 
              state as quickly as possible. This involves analyzing the root cause of the incident, restoring affected systems, and documenting 
              the incident for future prevention. Incident Responders must stay calm under pressure, as their decisions directly impact an 
              organization’s ability to recover from a breach.
            </li>
            <li>
              <strong>Cybersecurity Consultant</strong>
              Cybersecurity Consultants work with various organizations to assess their security needs and provide tailored solutions. 
              They evaluate existing infrastructure, identify potential risks, and recommend strategies to strengthen defenses. 
              Consultants often help organizations comply with regulations, implement security frameworks, and develop long-term plans 
              to safeguard their systems. This role requires strong communication skills, as consultants must explain complex technical 
              concepts to non-technical stakeholders and gain buy-in for their recommendations.
            </li>
          </ul>
          <!-- Job Images -->
          <div>
            <img :src="images.securityAnalyst" alt="Security Analyst" class="job-image" />
            <br>
            CyberSecurity Analyst
            <br>
            <img :src="images.penetrationTester" alt="Penetration Tester" class="job-image" />
            <br>
            Penetration Tester
            <br>
            <img :src="images.incidentResponder" alt="Incident Responder" class="job-image" />
            <br>
            incidentResponder
            <br>
            <img :src="images.consultant" alt="Cybersecurity Consultant" class="job-image" />
            <br>
            Cybersecurity Consultant
            <br>
          </div>
        </v-col>
  
        <!-- Skills Section -->
        <v-col cols="12" md="8" class="text-center">
          <h2 class="section-title">Skills Required for Cybersecurity</h2>
          <p class="skills-description">
            To thrive in cybersecurity, you need a mix of technical and soft skills:
          </p>
          <ul class="skills-list">
            <li><strong>Technical Skills:</strong> Networking, coding, and threat analysis.</li>
            <li><strong>Problem-Solving:</strong> Quickly addressing and resolving complex issues.</li>
            <li><strong>Communication:</strong> Explaining security concepts to non-technical audiences.</li>
            <li><strong>Adaptability:</strong> Keeping up with evolving cyber threats and solutions.</li>
          </ul>
        </v-col>
  
        <!-- Quiz Section -->
        <v-col cols="12" class="text-center">
          <h2 class="quiz-title">Test Your Cybersecurity Knowledge</h2>
          <div class="quiz-container">
            <div
              v-for="(question, index) in quizQuestions"
              :key="index"
              class="quiz-question"
            >
              <p class="question-text">{{ question.text }}</p>
  
              <!-- Multiple Choice -->
              <div v-if="question.type === 'multiple-choice'" class="answer-options">
                <v-radio-group v-model="userAnswers[index]" row>
                  <v-radio
                    v-for="(option, optIndex) in question.options"
                    :key="optIndex"
                    :label="option"
                    :value="option"
                  ></v-radio>
                </v-radio-group>
              </div>
  
              <!-- Feedback -->
              <p
                v-if="feedback[index]"
                :class="feedback[index].correct ? 'feedback-correct' : 'feedback-wrong'"
              >
                {{ feedback[index].message }}
              </p>
            </div>
          </div>
          <v-btn color="primary" @click="submitQuiz">Submit Quiz</v-btn>
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
        images: {
          securityAnalyst: securityAnalystImage,
          penetrationTester: penetrationTesterImage,
          incidentResponder: incidentResponderImage,
          consultant: consultantImage,
        },
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

      //Back Button
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
  .header-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .header-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin: 20px 0;
  }
  
  .section-description,
  .skills-description {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .job-roles,
  .skills-list {
    list-style: none;
    padding: 0;
  }
  
  .job-roles li,
  .skills-list li {
    margin-bottom: 15px;
  }
  
  .job-image {
    max-width: 100%;
    margin: 10px 0;
  }
  
  .quiz-container {
    margin-top: 40px;
  }
  
  .feedback-correct {
    color: green;
  }
  
  .feedback-wrong {
    color: red;
  }
  </style>  