<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">{{ courseTitle }}</h1>
        <img :src="headerImage" alt="Social Engineering Threats" class="header-image" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Introduction to Social Engineering</h2>
          <p class="section-description">
            In this module, you'll learn what Social Engineering is, what types of Social Engineering attacks there are, and how to be more aware of these attacks and defend against them.
            <br><br>
            Social Engineering is the process of convincing an individual to give up sensitive information about them through deceptive practices.
            Unlike viruses and malware, Social Engineering attacks are targeted toward the people of a computing environment.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="defense-card pa-4 mb-6">
          <h2 class="section-title">Why does Social Engineering work?</h2>
          <v-row>
            <v-col cols="12">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-brain</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">Cialdini's Social Influence Theory</div>
                    <div class="strategy-description text-white">
                      Attackers trick victims through six fundamental principles of influence: Reciprocity, Consistency and Commitment, Social Proof, Liking, Authority, and Scarcity.
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-account-check</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">Truth Default Theory</div>
                    <div class="strategy-description text-white">
                      Assume that communication is honest unless proven otherwise.
                    </div>
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
        <v-card elevation="3" class="defense-card pa-4 mb-6">
          <h2 class="section-title">Defenses</h2>
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-school</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">Awareness and Training</div>
                    <div class="strategy-description text-white">
                      Learn about the different types of Social Engineering attacks, so that you can learn to detect them as they happen
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-card-account-details</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">Identity Verification</div>
                    <div class="strategy-description text-white">
                      For impersonation-related social engineering attacks, it would be best to have a system in place where an employee ID badge needs to be presented
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="strategy-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">mdi-shield-check</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">MFA & Monitoring</div>
                    <div class="strategy-description text-white">
                      Other strong defenses include Multi-Factor Authentication (MFA) and constant monitoring
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <h2 class="section-title text-center">Types of Social Engineering Attacks</h2>
        
        <v-carousel
          v-model="currentAttack"
          height="500"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
          delimiter-icon="mdi-circle"
          class="threat-carousel"
        >
          <v-carousel-item v-for="(attack, index) in socialEngineeringTypes" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <v-img
                      :src="attack.image"
                      :alt="attack.name"
                      class="rounded threat-image"
                      height="400"
                      contain
                    ></v-img>
                  </v-col>
                  <v-col cols="8" class="pa-4">
                    <div class="threat-content">
                      <h3 class="threat-title text-h4 mb-2">{{ attack.name }}</h3>
                      <div class="threat-description">{{ attack.description }}</div>
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
              <span>{{ socialEngineeringTypes[currentAttack].name }}</span>
              <span>{{ currentAttack + 1 }} of {{ socialEngineeringTypes.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentAttack + 1) / socialEngineeringTypes.length) * 100"
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
          <h2 class="section-title">Phishing IQ Activity</h2>
          <p class="section-description">
            The following links will take you to websites where you can practice identifying phishing emails by determining if the presented 
            email is legitimate or a phishing email. You may use a fake name and a fake email address to use the quizzes.
          </p>
          <div class="text-center mt-4">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="primary" class="cyber-button">Activity Quizzes</v-btn>
              </template>
              <v-list class="cyber-menu">
                <v-list-item>
                  <a href="https://www.sonicwall.com/phishing-iq-test" target="_blank" class="text-decoration-none"> Phishing Activity 1 </a>
                </v-list-item>
                <v-list-item>
                  <a href="https://phishingquiz.withgoogle.com/" target="_blank" class="text-decoration-none"> Phishing Activity 2 </a>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="defense-card pa-4 mb-6">
          <h2 class="section-title">Additional Resources</h2>
          <div class="text-center mt-4">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="primary" class="cyber-button">Show Resources</v-btn>
              </template>
              <v-list class="cyber-menu">
                <v-list-item>
                  <a href="https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/" target="_blank" class="text-decoration-none"> Microsoft Security Blog </a>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="section-title">Module Quiz</h1>

        <!-- Take Quiz Button-->
        <v-btn color="primary" @click="showQuizDialog = true" class="cyber-button mb-6">Take Quiz</v-btn>

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
  import PhishingIMG from "@/assets/Course1SEimages/Phishing.jpg"
  import SmishingIMG from "@/assets/Course1SEimages/Smishing.jpg"
  import VishingIMG from "@/assets/Course1SEimages/Vishing.jpg"
  import SpamIMG from "@/assets/Course1SEimages/Spam.jpeg"
  import SpimIMG from "@/assets/Course1SEimages/SPIM.jpg"
  import SpearPhishingIMG from "@/assets/Course1SEimages/Spear-Phishing.jpeg"
  import WhalingIMG from "@/assets/Course1SEimages/Whaling.png"
  import PharmingIMG from "@/assets/Course1SEimages/Pharming.jpg"
  import DumpsterDivingIMG from "@/assets/Course1SEimages/Dumpster-Diving.jpg"
  import ShoulderSurfingIMG from "@/assets/Course1SEimages/Shoulder-Surfing.jpg"
  import TailgatingIMG from "@/assets/Course1SEimages/Tailgating-Piggybacking.jpg"
  import ElicitInfoIMG from "@/assets/Course1SEimages/ElicitInformation.jpg"
  import PrependingIMG from "@/assets/Course1SEimages/Prepending.jpg"
  import IdentityFraudIMG from "@/assets/Course1SEimages/IdentityFraud.jpg"
  import InvoiceScamIMG from "@/assets/Course1SEimages/InvoiceScam.jpg"
  import ReverseSEIMG from "@/assets/Course1SEimages/ReverseSocialEngineering.jpg"
  import ReconnaissanceIMG from "@/assets/Course1SEimages/Reconnaissance.jpg"
  import TypoSquattingIMG from "@/assets/Course1SEimages/TypoSquatting.jpg"

  import QuizStructure from "@/components/QuizStructure.vue";

  export default {
    name: "SocialEngineeringModule",

    components: {
      QuizStructure,
    },

    data() {
      return {
        //Title
        courseTitle: "Intro to Social Engineering",
        headerImage: "/api/placeholder/800/400", // Placeholder for social engineering header image
        currentAttack: 0,
        showQuizDialog: false,
        showPastAttemptsDialog: false,
        pastAttempts: [],

        //Social Engineering Types
        socialEngineeringTypes: [
        {
          name: "Phishing",
          description: "This attack involves the attacker attempting to obtain sensitive information from a user, through means such impersonating a trusted entity in order to obtain information such as usernames, passwords, credit card information, or similar sensitive data. This attack is more often done via email.",
          image: PhishingIMG,
        },
        {
          name: "Smishing",
          description: "This is a version of phishing in which the attacker uses SMS (text message) on a cell phone to conduct the attack.",
          image: SmishingIMG,
        },
        {
          name: "Vishing",
          description: "This is another version of phishing that uses voice communication (a phone call). This version of phishing is normally more successful due to the trust people put in the telephone network.",
          image: VishingIMG,
        },
        {
          name: "Spam",
          description: "Unsolicited emails sent in bulk. Spam is not generally considered a social engineering issue, but it can be considered a security issue due to some spam emails containing links to malicious websites.",
          image: SpamIMG,
        },
        {
          name: "Spim",
          description: "Spam that is sent over SMS text messaging instead of email. Stands for Spam over Internet Messaging.",
          image: SpimIMG,
        },
        {
          name: "Spear Phishing",
          description: "A phishing attack that is targeted at a group of people or businesses with something in common. Due to a specific group being targeted, the average number of successful attacks (people respond to the phishing message) usually increases in comparison to randomly sent emails.",
          image: SpearPhishingIMG,
        },
        {
          name: "Whaling",
          description: "An attack that targets a high-value person such as a CEO or CFO, and is custom-built to increase the odds of success.",
          image: WhalingIMG,
        },
        {
          name: "Pharming",
          description: "This attack involves misdirecting users to fake websites that look like legitimate ones.",
          image: PharmingIMG,
        },
        {
          name: "Dumpster Diving",
          description: "As the name sounds, the attacker goes through the victim's trash in hopes of finding valuable information that can later be used to aid a phishing attack or get into personal accounts. The best way to defend against this is to shred documents that may contain sensitive information before they are thrown in the trash.",
          image: DumpsterDivingIMG,
        },
        {
          name: "Shoulder Surfing",
          description: "The attacker simply looks over the victim's shoulder while they are entering sensitive information such as a PIN number or gate code. The best way to defend against this is to ensure no one is directly behind you, or shield with your hand the device you are inputting information to.",
          image: ShoulderSurfingIMG,
        },
        {
          name: "Tailgating/Piggybacking",
          description: "The attacker gains access to a room or building they are not allowed in by closely following behind a person who uses their own credentials to get into the room or building.",
          image: TailgatingIMG,
        },
        {
          name: "Eliciting Information",
          description: "The attacker assumes a role such as a help desk worker, and convinces the victim to allow them access to certain information to 'fix' it or similar reasoning.",
          image: ElicitInfoIMG,
        },
        {
          name: "Prepending",
          description: "In the context of social engineering, the attacker gains the victim's trust by supplying information that will be acted upon frequently before it is actually asked for in an attempt to try to legitimize the attacker's actual request that will come later on.",
          image: PrependingIMG,
        },
        {
          name: "Identity Fraud",
          description: "The attacker uses fake credentials to pose as the role of someone they are not, whether it is used for infiltration or gaining access to confidential information.",
          image: IdentityFraudIMG,
        },
        {
          name: "Invoice Scams",
          description: "The attacker sends a fake invoice to a company in order to trick them into paying for something they did not order.",
          image: InvoiceScamIMG,
        },
        {
          name: "Reverse Social Engineering",
          description: "In this scenario the attacker gets the victim to be the one to initiate contact. This can be done by posing as a helpful resource that happens to be nearby when the victim needs it. This method is often successful because due to the victim initiating contact, there is usually no question of the attacker's authenticity.",
          image: ReverseSEIMG,
        },
        {
          name: "Reconnaissance",
          description: "Similar to the way this word is used in the military, the attacker will examine the systems they are wanting to attack to learn how they work.",
          image: ReconnaissanceIMG,
        },
        {
          name: "Typo Squatting",
          description: "The attacker takes advantage of common typos that occur when users enter in a website address. Normally when entering in the incorrect address, the page results in a 404 'Not Found' error, however if the attacker registers a website with the typo included the user will be sent to the attacker's website.",
          image: TypoSquattingIMG,
        },
        ],

        //Add quiz questions to this
        quizQuestions: [
          {
            text: "What type of Social Engineering attack would involve an email being sent by an attacker to an employee at a company in attempt to gain sensitive information from them?",
            type: "multiple-choice",
            options: ["Vishing", "Phishing", "Spim", "Shoulder Surfing"],
            answer: "Phishing",
          },
          {
            text: "An outsider wants to sneak inside the building of a company that has recently fired them. The front doors can only be opened by scanning a keycard, so the outsider waits until an employee scans their badge and walks into the building, and just before the door closes the outsider catches it and enters the building. What type of Social Engineering attack did the outsider perform?",
            type: "multiple-choice",
            options: ["Shoulder Surfing", "Tailgating", "Spear Phishing", "Pharming"],
            answer: "Tailgating",
          },
          {
            text: "What type of Social Engineering Attack involves looking over someone's shoulder to see the PIN number they enter for their debit card?",
            type: "fill-in-the-blank",
            answer: "Shoulder Surfing",
          },
          {
            text: "A Social Engineering attack method an attacker uses by having a potential victim initiate a conversation first is called _______ Social Engineering.",
            type: "fill-in-the-blank",
            answer: "Reverse",
          },
        ],
      };
    },

    methods: {
      //Back Button
      goBack() {
        this.$router.go(-1); 
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

.threat-content {
  height: 100%;
  display: flex;
  flex-direction: column;
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
}

.threat-image {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
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

.cyber-button {
  background-color: #64ffda !important;
  color: #0a192f !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  border: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
  transition: all 0.3s ease;
}

.cyber-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.8);
}

.cyber-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.cyber-button:hover:before {
  left: 100%;
}

.cyber-menu {
  background-color: #172a46 !important;
  border: 1px solid #64ffda;
}

.text-decoration-none {
  text-decoration: none;
  color: #64ffda !important;
}
</style>