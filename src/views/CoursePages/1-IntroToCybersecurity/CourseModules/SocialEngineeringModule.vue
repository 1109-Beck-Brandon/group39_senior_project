<template>

    <!-- Back Button -->
    <v-btn icon class="position-absolute" style="left: 16px; background-color: gray;" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container fluid>
      <!-- Top Section: Course Content -->
      <v-row>
        <v-col cols="12">
          <h1 class="page-title">{{ courseTitle }}</h1>
          <div class="content-section">
            <p>
                In this module, you'll learn what Social Engineering is, what types of Social Engineering attacks there are, and how to be more aware of these attacks and defend against them.
                <br><br>
                Social Engineering is the process of convincing an individual to give up sensitive information about them through deceptive practices.
                Unlike viruses and malware, Social Engineering attacks are targeted toward the people of a computing environment. 
                <br><br>
            </p>
            
            <h2>Why does Social Engineering work?</h2>
            <p class="formatted-description">
                - Cialdini's Social Influence Theory: Attackers trick victims through six fundamental principles of influence: Reciprocity, Consistency and Commitment, Social Proof, Liking, Authority, and Scarcity. 
                <br>
                - Truth Default Theory: Assume that communication is honest unless proven otherwise. 
                <br><br>
            </p>
            <h2>Defenses</h2>
            <p class="formatted-description">
                - Awareness and Training: Learn about the different types of Social Engineering attacks, so that you can learn to detect them as they happen
                <br>
                - For impersonation-related social engineering attacks, it would be best to have a system in place where an employee ID badge needs to be presented if they are not personally known
                <br>
                - Other strong defenses include Multi-Factor Authentication (MFA) and constant monitoring
                <br><br>
            </p>
            <h2 class="SE-Types-Title">Types of Social Engineering Attacks</h2>
            <v-container>
              <v-row>
                <v-col>
                  <v-carousel show-arrows>
                    <v-carousel-item
                      v-for="(attack, index) in socialEngineeringTypes"
                      :key="index"
                    >
                      <v-row>
                        <v-col cols="4">
                          <v-img
                            :src="attack.image"
                            :alt="attack.name"
                            class="rounded"
                            style="height: 400px; width: 100%; object-fit: cover; margin-left: 80px"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" style="margin-left: 80px;">
                          <br>
                          <h3>{{ attack.name }}</h3>
                          <p>{{ attack.description }}</p>
                        </v-col>
                      </v-row>
                    </v-carousel-item>
                  </v-carousel>
                </v-col>
              </v-row>
            </v-container>

            <h2>Phishing IQ Activity</h2>
            <p>
                The following links will take you to websites where you can practice identifying phishing emails by determining if the presented 
                <br> email is legitimate or a phishing email. You may use a fake name and a fake email address to use the quizzes.
                <br>

                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" color="primary">Activity Quizzes</v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <a href="https://www.sonicwall.com/phishing-iq-test" target="_blank"> Phishing Activity 1 </a>
                    </v-list-item>
                    <v-list-item>
                      <a href="https://phishingquiz.withgoogle.com/" target="_blank"> Phishing Activity 2 </a>
                    </v-list-item>
                  </v-list>
                </v-menu>
            </p>

            <h3>Additional Resources</h3>
            
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="primary">Show Resources</v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <a href="https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/" target="_blank"> Microsoft Security Blog </a>
                </v-list-item>
              </v-list>
            </v-menu>

          </div>
        </v-col>
      </v-row>
  
      <!-- Quiz Section -->
      <v-row>
        <v-col cols="12">
          <h1>Module Quiz</h1>
          <v-btn color="primary" @click="showQuizDialog = true">Take Quiz</v-btn>
          <br><br><br><br><br>
        </v-col>
      </v-row>

      <!-- Add Quiz Component -->
      <QuizStructure :quizQuestions="quizQuestions" v-model:showQuizDialog="showQuizDialog" />
      
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
    name: "CourseWithQuizPage",

    components: {
      QuizStructure,
    },

    data() {
      return {
        //Title
        courseTitle: "Intro to Social Engineering",

        showQuizDialog: false,

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
    },
  };
</script>
  
<style scoped>
  .page-title {
    text-align: center;
    font-size: 2.5em;
    margin-top: 20px;
    font-weight: bold;
  }
  
  .content-section {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 30px;
    text-align: left;
  }

  .formatted-description {
    text-align: left;
    margin-left: 20px;
    margin-right: 20px;
  }

  .SE-Types-Title {
    text-align: center;
  }

  .SE-Types-Description {
    text-align: left;
  }

  v-img {
    border-radius: 8px;
  }
  h3 {
    margin-top: 0;
  }

</style>  