<template>
    <!--Appplication  Bar-->
    <v-layout class="rounded rounded-md">
      <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>
    </v-layout>

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
            <p>
                - Cialdini's Social Influence Theory: Attackers trick victims through six fundamental principles of influence: Reciprocity, Consistency and Commitment, Social Proof, Liking, Authority, and Scarcity. 
                <br>
                - Truth Default Theory: Assume that communication is honest unless proven otherwise. 
                <br><br>
            </p>
            <h2>Defenses</h2>
            <p>
                - Awareness and Training: Learn about the different types of Social Engineering attacks, so that you can learn to detect them as they happen
                <br>
                - For impersonation-related social engineering attacks, it would be best to have a system in place where an employee ID badge needs to be presented if they are not personally known
                <br>
                - Other strong defenses include Multi-Factor Authentication (MFA) and constant monitoring
                <br><br>
            </p>
            <h2>Types of Social Engineering Attacks</h2>
            <p class="SE-Types-Description">
                Familiarizing yourself with the different kinds of Social Engineering attacks can help you identify when one is occurring to you or someone in your workplace.
                <br><br>
                Phishing: This attack involves the attacker attempting to obtain sensitive information from a user, through means such impersonating a trusted entity in order to obtain information such as usernames, passwords, credit card information, or similar sensitive data. This attack is more often done via email.
                <br><br>
                Smishing: This is a version of phishing in which the attacker uses SMS (text message) on a cell phone to conduct the attack
                <br><br>
                Vishing: This is another version of phishing that uses voice communication (a phone call). This version of phishing is normally more successful due to the trust people put in the telephone network. 
                <br><br>
                Spam: Unsolicited emails sent in bulk. Spam is not generally considered a social engineering issue, but it can be considered a security issue due to some spam emails containing links to malicious websites.
                <br><br>
                Spim: Spam that is sent over SMS text messaging instead of email. Stands for Spam over Internet Messaging.
                <br><br>
                Spear Phishing: A phishing attack that is targeted at a group of people or businesses with something in common. Due to a specific group being targeted, the average number of successful attacks (people respond to the phishing message) usually increases in comparison to randomly sent emails.
                <br><br>
                Whaling: An attack that targets a high-value person such as a CEO or CFO, and is custom-built to increase the odds of success.
                <br><br>
                Pharming: This attack involves misdirecting users to fake websites that look like legitimate ones. 
                <br><br>
                Dumpster Diving: As the name sounds, the attacker goes through the victim's trash in hopes of finding valuable information that can later be used to aid a phishing attack or get into personal accounts. The best way to defend against this is to shred documents that may contain sensitive information before they are thrown in the trash.
                <br><br>
                Shoulder Surfing: The attacker simply looks over the victim's shoulder while they are entering sensitive information such as a PIN number or gate code. The best way to defend against this is to ensure no one is directly behind you, or shield with your hand the device you are inputting information to. 
                <br><br>
                Tailgating/Piggybacking: The attacker gains access to a room or building they are not allowed in by closely following behind a person who uses their own credentials to get into the room or building. 
                <br><br>
                Eliciting Information: The attacker assumes a role such as a help desk worker, and convinces the victim to allow them access to certain information to "fix" it or similar reasoning.
                <br><br>
                Prepending: In the context of social engineering, the attacker gains the victim's trust by supplying information that will be acted upon frequently before it is actually asked for in an attempt to try to legitimize the attacker's actual request that will come later on.
                <br><br>
                Identity Fraud: The attacker uses fake credentials to pose as the role of someone they are not, whether it is used for infiltration or gaining access to confidential information.
                <br><br>
                Invoice Scam: The attacker sends a fake invoice to a company in order to trick them into paying for something they did not order. 
                <br><br>
                Reverse Social Engineering: In this scenario the attacker gets the victim to be the one to initiate contact. This can be done by posing as a helpful resource that happens to be nearby when the victim needs it. This method is often successful because due to the victim initiating contact, there is usually no question of the attacker's authenticity.
                <br><br>
                Reconnaissance: Similar to the way this word is used in the military, the attacker will examine the systems they are wanting to attack to learn how they work. 
                <br><br>
                Typo Squatting: The attacker takes advantage of common typos that occur when users enter in a website address. Normally when entering in the incorrect address, the page results in a 404 "Not Found" error, however if the attacker registers a website with the typo included the user will be sent to the attacker's website. 
                <br><br>

            </p>

            <h2>Phishing IQ Activity</h2>
            <p>
                The following links will take you to websites where you can practice identifying phishing emails by determining if the presented 
                <br> email is legitimate or a phishing email. You may use a fake name and a fake email address to use the quizzes.
                <br>
                Quiz 1: <a href="https://www.sonicwall.com/phishing-iq-test">https://www.sonicwall.com/phishing-iq-test</a>
                <br>
                Quiz 2: <a href="https://phishingquiz.withgoogle.com/">https://phishingquiz.withgoogle.com/</a>
            </p>

            <h3>Additional Resources</h3>
            <p> Microsoft Security Blog: https://www.microsoft.com/en-us/security/blog/2021/08/26/widespread-credential-phishing-campaign-abuses-open-redirector-links/

            </p>

          </div>
        </v-col>
      </v-row>
  
      <!-- Quiz Section -->
      <v-row>
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
  
              <!-- Fill in the Blank -->
              <div v-else-if="question.type === 'fill-in-the-blank'" class="answer-input">
                <v-text-field
                  v-model="userAnswers[index]"
                  label="Your Answer"
                  outlined
                ></v-text-field>
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
  export default {
    name: "CourseWithQuizPage",
    data() {
      return {
        courseTitle: "Intro to Social Engineering",
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
        userAnswers: {}, // Stores user's answers
        feedback: {}, // Stores feedback for each question
      };
    },
    methods: {
      submitQuiz() {
        this.feedback = {}; // Reset feedback
  
        this.quizQuestions.forEach((question, index) => {
          //Ensures that fill in the blank questions are not case sensitive
          const userAnswer = this.userAnswers[index]?.trim()?.toLowerCase();
          const correctAnswer = question.answer.toLowerCase();
          
          //Checks for correct answer
          if (userAnswer === correctAnswer) {
            this.feedback[index] = {
              correct: true,
              message: `Correct! The answer is "${question.answer}".`,
            };
          } else {
            this.feedback[index] = {
              correct: false,
              message: `Incorrect. The correct answer is "${question.answer}".`,
            };
          }
        });
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
  }

  .SE-Types-Description {
    text-align: left;
  }
  
  .quiz-title {
    text-align: center;
    font-size: 2em;
    margin-top: 30px;
    font-weight: bold;
  }
  
  .quiz-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .quiz-question {
    margin-bottom: 20px;
  }
  
  .question-text {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .answer-options {
    margin-left: 20px;
  }
  
  .answer-input {
    margin-left: 20px;
    width: 300px;
  }
  
  .feedback-correct {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .feedback-wrong {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
</style>  