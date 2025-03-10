<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="table-theme">The OSI Model</h2>
        <p class="table-description">
          The overview of the work of the internet has always been practiced by understanding the theory behind it. Today, we are going to talk about the
          OSI Model and why it is important. 
          To start, let's understand what OSI is. OSI stands for Open System Interconnection model. This is a conceptual framework used for understanding 
          how communication systems works. The networking process, which is the main process in the OSI model, is divided in several layers, and each
          layer shows the path the data travels across the networking system and how it is transformed during each step.
        </p>
      </v-col>
    </v-row>

    <!-- Text-only Carousel Section -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="9">
        <v-carousel
          v-model="currentSlide"
          height="300"
          hide-delimiter-background
          show-arrows="hover"
          :continuous="false"
        >
          <v-carousel-item v-for="(layer, index) in layers2" :key="index">
            <v-card class="carousel-card h-100" elevation="4">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" class="pa-4">
                    <div class="layer-content text-center">
                      <h3 class="layer-title text-h4 mb-2">Layer {{ layer.number }}: {{ layer.layer }}</h3>
                      <div class="layer-subtitle mb-4">TCP/IP Equivalent: {{ layer.tcp }}</div>
                      <div class="layer-description">{{ layer.description }}</div>
                      <div class="layer-details mt-4">
                        <div class="example-text">{{ layer.example }}</div>
                        <div class="protocols mt-2" v-if="layer.protocols">
                          <strong>Key Protocols/Technologies:</strong> {{ layer.protocols }}
                        </div>
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
              <span>Layer {{ layers2[currentSlide].number }}: {{ layers2[currentSlide].layer }}</span>
              <span>{{ currentSlide + 1 }} of {{ layers2.length }}</span>
            </div>
            <v-progress-linear
              :value="((currentSlide + 1) / layers2.length) * 100"
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
        <v-card elevation="3" class="pa-4 mb-6">
          <h3 class="text-h5 mb-4">OSI Model Summary</h3>
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
        </v-card>
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
  name: "OSICarousel",

  components: {
    QuizStructure,
  },

  data() {
    return {
      currentSlide: 0,

      showQuizDialog: false,

      layers2: [
        { 
          number: "7", 
          layer: "Application Layer", 
          description: "The closest layer to the end user, allowing interaction with the network through applications.", 
          tcp: "Application Layer",
          example: "This layer directly interacts with software applications. Examples include web browsers, email clients, and file transfer tools.",
          protocols: "HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH, Telnet"
        },
        { 
          number: "6", 
          layer: "Presentation Layer", 
          description: "Prepares data for the application layer by ensuring it is in a readable format.", 
          tcp: "Application Layer",
          example: "This layer is responsible for data translation, encryption, and compression. It converts data from application format to network format and vice versa.",
          protocols: "SSL/TLS, JPEG, GIF, MPEG, ASCII, EBCDIC"
        },
        { 
          number: "5", 
          layer: "Session Layer", 
          description: "Manages sessions or connections between applications.", 
          tcp: "Application Layer",
          example: "This layer establishes, maintains, and terminates communication sessions between devices. It handles authentication and authorization.",
          protocols: "NetBIOS, RPC, PPTP, SAP, SQL"
        },
        { 
          number: "4", 
          layer: "Transport Layer", 
          description: "Ensures reliable data transfer between devices, providing error recovery and flow control.", 
          tcp: "Transport Layer",
          example: "This layer manages end-to-end communication, ensuring data arrives complete and in the right order. TCP provides reliability while UDP offers speed.",
          protocols: "TCP, UDP, SCTP, DCCP"
        },
        { 
          number: "3", 
          layer: "Network Layer", 
          description: "Handles routing and addressing of data to ensure it reaches the correct destination across multiple networks.", 
          tcp: "Network/Internet Layer",
          example: "This layer determines the optimal path for data to travel across networks. IP addressing and routing happens here.",
          protocols: "IP, ICMP, IGMP, RIP, OSPF, BGP"
        },
        { 
          number: "2", 
          layer: "Data Link Layer", 
          description: "Ensures reliable data transfer between two devices on the same network.", 
          tcp: "Data Link/Link Layer",
          example: "This layer handles node-to-node communication and error detection. It includes the MAC and LLC sublayers, managing physical addressing.",
          protocols: "Ethernet, PPP, HDLC, Frame Relay, ATM, ARP"
        },
        { 
          number: "1", 
          layer: "Physical Layer", 
          description: "Deals with the physical connection between devices and the transmission of raw binary data (0s and 1s).", 
          tcp: "Physical/Link Layer",
          example: "This layer transmits bits over a physical medium. It deals with hardware aspects such as cables, hubs, and network interface cards.",
          protocols: "USB, Ethernet physical layer, Bluetooth, IEEE 802.11, DSL, ISDN"
        },
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
          text: "Name three closest layers to the human (do NOT include the word 'layer' after each name)",
          type: "fill-in-the-blank-multiple",
          answers: ["Application", "Presentation", "Session"],
        },
      ],
    };
  },
  methods: {
    // Back Button
    goBack() {
      this.$router.go(-1);
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
  background-color: #f8f9fa;
  background-image: 
    linear-gradient(rgba(173, 216, 230, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(173, 216, 230, 0.3) 1px, transparent 1px),
    radial-gradient(circle, rgba(100, 149, 237, 0.1) 2px, transparent 2px);
  background-size: 50px 50px, 50px 50px, 40px 40px;
  background-position: 0 0, 0 0, 20px 20px;
  min-height: 100vh;
  padding-top: 20px;
  padding-bottom: 60px;
}

.text-center {
  text-align: center;
  margin-bottom: 30px;
}

.table-theme {
  font-size: 2.2em;
  color: #2c3e50;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.table-description {
  font-size: 1.2em;
  color: #34495e;
  margin-bottom: 20px;
  line-height: 1.6;
}

.carousel-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  max-width: 100%;
  border-left: 5px solid #3498db;
}

.layer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layer-title {
  color: #2c3e50;
  font-weight: 600;
}

.layer-subtitle {
  color: #7f8c8d;
  font-size: 1.1em;
  font-weight: 500;
}

.layer-description {
  font-size: 1.1em;
  color: #2c3e50;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.layer-details {
  max-width: 800px;
  margin: 0 auto;
}

.example-text {
  font-size: 1em;
  color: #34495e;
  line-height: 1.5;
}

.protocols {
  font-size: 0.95em;
  color: #34495e;
}

.text-below {
  font-size: 1.1em;
  color: #2c3e50;
  text-align: left;
  margin-top: 20px;
  line-height: 1.6;
}

.text-below-list {
  margin-top: 10px;
  margin-left: 20px;
  text-align: left;
  list-style-type: disc;
  color: #2c3e50;
  font-size: 1.1em;
  line-height: 1.6;
}

.text-below-list li {
  margin-bottom: 10px;
}

.progress-text {
  font-size: 0.9em;
  color: #2c3e50;
}

.h-100 {
  height: 100%;
}
</style>