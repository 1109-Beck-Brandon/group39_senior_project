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
        <!-- Image at the Beginning -->
        <v-col cols="12" class="text-center">
          <img :src="headerImage" alt="Header Image" class="header-image" />
        </v-col>
        <!-- Text Section -->
            <v-col cols="12" md="8" class="text-center">
            <h2 class="table-theme">Attacks</h2>
            <p class="table-description">
                The time has come to understand what cybersecurity is all about. Today we are going to learn about common cyberattacks,
                what they represent, and how we can defend against them.
            </p>
            <ul class="text-below-list">
                <li>
                <strong>Malware:</strong>
                Malware is a term used to describe malicious software, including spyware, ransomware, viruses, and worms.
                <img :src="images.malware" alt="Malware Image" class="text-image" />
                </li>
                <li>
                <strong>Man-in-the-middle attack:</strong>
                These attacks occur when attackers insert themselves into a two-party transaction.
                <img :src="images.mitm" alt="Man-in-the-Middle Image" class="text-image" />
                </li>
                <li>
                <strong>Denial-of-service attack:</strong>
                A denial-of-service attack floods systems, servers, or networks with traffic to exhaust resources.
                <img :src="images.ddos" alt="DDoS Image" class="text-image" />
                </li>
                <li>
                <strong>SQL injection:</strong>
                An attacker inserts malicious code into a server that uses SQL.
                <img :src="images.sqlInjection" alt="SQL Injection Image" class="text-image" />
                </li>
                <li>
                <strong>Zero-day exploit:</strong>
                A zero-day exploit hits after a network vulnerability is announced but before a solution is implemented.
                <img :src="images.zeroDay" alt="Zero-Day Exploit Image" class="text-image" />
                </li>
                <li>
                <strong>DNS tunneling:</strong>
                DNS tunneling utilizes the DNS protocol to communicate non-DNS traffic over port 53.
                <img :src="images.dnsTunneling" alt="DNS Tunneling Image" class="text-image" />
                </li>
                <li>
                <strong>Phishing:</strong>
                Phishing is the practice of sending fraudulent communications to steal sensitive data.
                <img :src="images.phishing" alt="Phishing Image" class="text-image" />
                Phishing often involves emails that appear to come from reputable sources, aiming to steal credit card details, login information, or install malware.
                </li>
                <li>
                <strong>Types of Phishing:</strong>
                There are several types of phishing attacks, each targeting victims in different ways:
                <ul>
                    <li><strong>Email Phishing:</strong> Fake emails designed to trick users into providing sensitive information.</li>
                    <li><strong>Spear Phishing:</strong> Targeted attacks on specific individuals or organizations, often personalized to increase success.</li>
                    <li><strong>Whaling:</strong> Phishing attacks targeting high-level executives or prominent individuals.</li>
                    <li><strong>Smishing:</strong> Phishing carried out through SMS (text messages).</li>
                    <li><strong>Vishing:</strong> Phishing conducted over voice calls to deceive victims.</li>
                </ul>
                </li>
            </ul>
        </v-col>
        <!-- Quiz Section -->
        <v-col cols="12">
          <h2 class="quiz-title">Module Quiz</h2>
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
  import headerImage from "@/assets/1000_F_245067789_zik0XUAuBWDyC5YCHKfAQbKAJceKFdK4.jpg";
  import malwareImage from "@/assets/images.jpg";
  import mitmImage from "@/assets/Phases-of-man-in-middle-attack-alt.png";
  import ddosImage from "@/assets/ddos attack (1)-1.webp";
  import sqlInjectionImage from "@/assets/SQL-Injection-1.png";
  import zeroDayImage from "@/assets/Zero-Day-Attack.png";
  import dnsTunnelingImage from "@/assets/how-dns-tunneling-works.webp";
  import phishingImage from "@/assets/phishing.webp";
  
  export default {
    name: "OSITable",
    data() {
      return {
        headerImage,
        images: {
          malware: malwareImage,
          mitm: mitmImage,
          ddos: ddosImage,
          sqlInjection: sqlInjectionImage,
          zeroDay: zeroDayImage,
          dnsTunneling: dnsTunnelingImage,
          phishing: phishingImage,
        },
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
          const isCorrect =
            userAnswer === question.answer;
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
  .header-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 30px;
  }
  
  .text-image {
    display: block;
    max-width: 100%;
    margin: 20px auto;
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