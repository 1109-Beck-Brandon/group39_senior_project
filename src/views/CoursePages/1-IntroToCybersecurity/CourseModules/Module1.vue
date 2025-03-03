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
                In this module, you'll learn about the CIA Triad, a fundamental concept in Cybersecurity.
                <br><br>
                The CIA Triad consists of three core concepts: Confidentiality, Integrity, and Availability.
                <br><br>
            </p>
            <v-col cols="12">
                <v-img
                    :src="require('../../../../assets/CIA-Triad.png')"
                    class="my-3"
                    contain
                    height="225"
                />
            </v-col>

            <!--Stepper for CIA Triad Concepts-->
            <h1>The Parts of the CIA Triad</h1>
            <v-container>
              <v-row>
                <v-col>
                  <v-carousel v-model="currentSlide" show-arrows show-indicators>
                    <v-carousel-item
                      v-for="(item, index) in CIATriadItems"
                      :key="index"
                    >
                      <v-row>
                        <v-col cols="10" style="margin-left: 100px; text-align: left;">
                          <br>
                          <h1>{{ item.name }}</h1>
                          <br><br><br>
                          <p>{{ item.description }}</p>
                        </v-col>
                      </v-row>
                    </v-carousel-item>
                  </v-carousel>
                </v-col>
              </v-row>
            </v-container>

            <h3>Additional Resources and Content Source</h3>
            
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="primary">Show Resources</v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <a href="https://www.nccoe.nist.gov/publication/1800-25/VolA/index.html" target="_blank"> NIST Executive Summary </a>
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

import QuizStructure from '@/components/QuizStructure.vue';

  export default {
    name: "CourseWithQuizPage",
    
    components: {
      QuizStructure,
    },

    data() {
      return {
        courseTitle: "The CIA Triad",
        currentSlide: 0,
        showQuizDialog: false,

        //Items for CIA Triad Stepper
        CIATriadItems: [
          {
            name: "Confidentiality",
            description: "Confidentiality is ensuring that only the people who are allowed to have access to specific information are the only ones who can access it. It focuses upon protocols that ensure outside parties cannot view information or data that they are not allowed to view.",
          },
          {
            name: "Integrity",
            description: "Integrity revolves around protecting data from imporper modification/destruction. Integrity ensures two concepts known as non-repudiation and authenticity.",
          },
          {
            name: "Non-Repudiation",
            description: "Non-Repudiation is a part of the Integrity component of the CIA Triad. It is a concept that ensures that a party cannot deny their involvement in a transaction. It verifies authenticated sending and receipt of messages.",
          },
          {
            name: "Authenticity",
            description: "Authenticity is another part of the Integirty component of the CIA Triad. It is a concept in which a person is who they say they are. This is usually verified through the use of a digital signature, which is unique to the sender of a message and cannot be tampered with unless the attacker knows it.",
          },
          {
            name: "Availability",
            description: "Availability is about ensuring that the data that individuals need to access is accessible in a timely and reliable manner.", 
          },
          {
            name: "The Importance of the CIA Traid in Cybersecurity",
            description: "The CIA Triad is a concept that you will encounter repeatedly when studying cybersecurity, especially in fields such as cryptography and network security. The work that one does in the field of cybersecurity ultimately comes down to enforcing this concept, whether it is for the company they work at, or the consumers that use a product their company supplies.",
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
  }
</style>  

