<template>
  <v-container fluid>
    <!-- Full Page Content -->
    <v-row justify="center" align="center" style="min-height: 100vh;">
      <!-- Text Section -->
      <v-col cols="12" md="8" class="text-center">
        <h2 class="table-theme">The OSI Model</h2>
        <p class="table-description">
          The overview of the work of the internet has always been practiced by understanding the theory behind it. Today, we are going to talk about
          OSI Model and why it is important. 
          To start, let's understand what OSI is. OSI stand for Open System Interconnection model. This is a conceptual framework used for understanfing 
          how the communication system works. The networking process, which is the main process in OSI model, is divided in several layers, and each
          layer shows hat path the data travels across the networking system and how it is transformed during each step.
        </p>
      </v-col>

      <!-- Table Section -->
      <v-col cols="12" md="8">
        <div class="table-box">
          <!-- Scrollable Table -->
          <div class="table-scroll">
            <v-table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>Layer</th>
                  <th>Description</th>
                  <th>TCP Layer</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(lab, index) in labs" :key="index">
                  <td>{{ lab.number }}</td>
                  <td>{{ lab.layer }}</td>
                  <td>{{ lab.description }}</td>
                  <td>{{ lab.tcp }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <p class="text-below">
          The following layers are a representation of network data path.
          So, what are they exactly? It is important that we go from the top to bottom, since the closest layer to us, humans, is:
        </p>
        <ul class="text-below-list">
          <li><strong>Application Layer:</strong> The closest layer for the human to understand. Data is represented and shown as understandable pieces of data.</li>
          <li><strong>Presentation Layer:</strong> Translates, encrypts, and compresses data before sending it to the Application layer.</li>
          <li><strong>Session Layer:</strong> Manages sessions (authentication, authorization, start/close) and connections between devices.</li>
          <li><strong>Transport Layer:</strong> Ensures reliable data delivery using TCP and UDP, keeping data in order and avoiding duplication.</li>
          <li><strong>Network Layer:</strong> Routes data packets and determines paths across the network.</li>
          <li><strong>Data Link Layer:</strong> Handles reliable data transmission over a physical link and manages MAC addresses.</li>
          <li><strong>Physical Layer:</strong> Processes raw binary data and handles the physical connection between devices.</li>
        </ul>
        <p class="text-below">
          Don't worry if it is hard or doesn't make sense. We will go deeper into the OSI model later. For now, it is important to understand the basic concept.
        </p>
      </v-col>
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
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "OSITable",
  data() {
    return {
      // Static data for the table (Layers)
      layers2: [
        { number: "7", layer: "Application Layer", description: "The closest layer to the end user, allowing interaction with the network through applications.", tcp: "Application Layer" },
        { number: "6", layer: "Presentation Layer", description: "Prepares data for the application layer by ensuring it is in a readable format.", tcp: "Application Layer" },
        { number: "5", layer: "Session Layer", description: "Manages sessions or connections between applications.", tcp: "Application Layer" },
        { number: "4", layer: "Transport Layer", description: "Ensures reliable data transfer between devices, providing error recovery and flow control.", tcp: "Transport Layer" },
        { number: "3", layer: "Network Layer", description: "Handles routing and addressing of data to ensure it reaches the correct destination across multiple networks.", tcp: "Network/Internet Layer" },
        { number: "2", layer: "Data Link Layer", description: "Ensures reliable data transfer between two devices on the same network.", tcp: "Data Link/Link Layer" },
        { number: "1", layer: "Physical Layer", description: "Deals with the physical connection between devices and the transmission of raw binary data (0s and 1s).", tcp: "Physical/Link Layer" },
      ],
      // Quiz data
      quizQuestions: [
        {
          text: "Which layer is closest to the user?",
          type: "multiple-choice",
          options: [
            "Physical Layer",
            "Application Layer",
            "Transport Layer",
          ],
          answer: "Application Layer",
        },

        {
          text: "Consider your data is at the stage of being encrypted. What layer might that be?",
          type: "multiple-choice",
          options: [
            "Data Link Layer",
            "Presentation Layer",
            "Network Layer",
          ],
          answer: "Presentation Layer",
        },

        {
          text: "Name three closests layers to the human (Try this one without looking at the table!)",
          type: "fill-in-the-blank",
          answer: "Application, Presentation, Session",
        },
      ],
      userAnswers: [],
      feedback: [],
    };
  },
  methods: {
    submitQuiz() {
      this.feedback = this.quizQuestions.map((question, index) => {
        const userAnswer = this.userAnswers[index];
        const isCorrect =
          question.type === "multiple-choice"
            ? userAnswer === question.answer
            : userAnswer?.trim().toLowerCase() ===
              question.answer.toLowerCase();
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
  background-color: white;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.text-center {
  text-align: center;
  margin-bottom: 30px;
}

.table-box {
  padding: 20px;
  border: 2px solid #42b983; 
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.table-theme {
  font-size: 1.8em;
  color: #ffffff;
  margin-bottom: 20px;
}

.table-description {
  font-size: 1.2em;
  color: #ffffff;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.text-below {
  font-size: 1em;
  color: #ffffff;
  text-align: left;
  list-style: none;
  margin-top: 20px;
  line-height: 1.6;
}

.text-below-list {
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
  list-style: none;
  color: #ffffff; 
  font-size: 1em;
  line-height: 1.6;
}

.text-below-list li {
  margin-bottom: 10px;
}
</style>