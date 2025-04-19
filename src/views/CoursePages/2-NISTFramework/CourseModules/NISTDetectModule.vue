<template>
    <!-- Back Button -->
    <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  
    <v-container fluid class="main-container">
      <!-- Header -->
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="header-title">NIST CSF 2.0: Detect Function</h1>
          
          <!-- Interactive Image Map -->
          <div class="image-map-container">
            <img :src="headerImage" alt="NIST Detect Function" class="header-image" usemap="#nist-map" />
            
            <!-- Image Map Areas -->
            <div class="map-overlay" ref="mapOverlay">
              <div 
                v-for="(module, index) in nistModules" 
                :key="index"
                class="module-hotspot"
                :class="{ 'active': hoveredModule === module.name }"
                :style="module.style"
                @mouseover="hoveredModule = module.name"
                @mouseleave="hoveredModule = null"
                @click="navigateToModule(module.route)"
              >
                <div class="module-tooltip" v-if="hoveredModule === module.name">
                  {{ module.name }}
                  <span class="click-hint">Click to navigate</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
  
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <v-card elevation="3" class="intro-card pa-4 mb-6">
            <h2 class="section-title">Understanding the Detect Function</h2>
            <p class="section-description">
              The "Detect" function is a core component of the NIST Cybersecurity Framework 2.0. 
              It focuses on finding and analyzing possible cybersecurity attacks and compromises.
              Any signs of an attack or a security compromise is analyzed and characterized so that
              any events with similar characteristics can be detected in the future.
            </p>
          </v-card>
        </v-col>
      </v-row>
  
      <v-row justify="center" align="center">
        <v-col cols="12" md="9">
          <h2 class="section-title text-center">Key Detect Categories</h2>
          
          <v-carousel
            v-model="currentCategory"
            height="300"
            hide-delimiter-background
            show-arrows="hover"
            :continuous="false"
            delimiter-icon="mdi-circle"
            class="category-carousel"
          >
            <v-carousel-item v-for="(category, index) in detectCategories" :key="index">
              <v-card class="carousel-card h-100" elevation="4">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" class="pa-4">
                      <div class="category-content text-center">
                        <h3 class="category-title text-h4 mb-2">{{ category.title }}</h3>
                        <div class="category-description">{{ category.description }}</div>
                        <div class="category-outcomes mt-4" v-if="category.outcomes">
                          <strong>Key Outcomes:</strong> {{ category.outcomes }}
                        </div>
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
                <span>{{ detectCategories[currentCategory].title }}</span>
                <span>{{ currentCategory + 1 }} of {{ detectCategories.length }}</span>
              </div>
              <v-progress-linear
                :value="((currentCategory + 1) / detectCategories.length) * 100"
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
          <v-card elevation="3" class="implementation-card pa-4 mb-6">
            <h2 class="section-title">Implementation Strategies</h2>
            <p class="implementation-description">
              Effective implementation of the Protect function requires strategic approaches:
            </p>
            <v-row>
              <v-col cols="12" md="6" v-for="(strategy, index) in implementationStrategies" :key="index">
                <v-card class="strategy-item pa-3 mb-3" outlined>
                  <div class="d-flex align-center">
                    <v-icon color="primary" size="36" class="mr-3">{{ strategy.icon }}</v-icon>
                    <div>
                      <div class="font-weight-bold text-white">{{ strategy.title }}</div>
                      <div class="strategy-description text-white">{{ strategy.description }}</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
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
    name: "NISTDetectModule",
  
    components: {
      QuizStructure,
    },
  
    data() {
      return {
        headerImage: require("@/assets/nist.png"),
        currentCategory: 0,
        showQuizDialog: false,
        hoveredModule: null,
        
        // Define the NIST modules with their navigation paths and positions on the image
        nistModules: [
          {
            name: "Govern",
            route: "/course/nist-framework/governModule",
            style: "top: 9%; left: 76.38%; width: 8%; height: 17%;"
          },
          {
            name: "Identify",
            route: "/course/nist-framework/identifyModule",
            style: "top: 62.7%; left: 21.6%; width: 8%; height: 17%;"
          },
          {
            name: "Protect",
            route: "/course/nist-framework/protectModule",
            style: "top: 27%; left: 27.7%; width: 8%; height: 17%;"
          },
          {
            name: "Detect",
            route: "/course/nist-framework/detectModule",
            style: "top: 15%; left: 45.7%; width: 8%; height: 17%;"
          },
          {
            name: "Respond",
            route: "/course/nist-framework/respondModule",
            style: "top: 29%; left: 63.7%; width: 8%; height: 17%;"
          },
          {
            name: "Recover",
            route: "/course/nist-framework/recoverModule",
            style: "top: 63%; left: 70.2%; width: 8%; height: 17%;"
          }
        ],
  
        detectCategories: [
          {
            title: "Continuous Monitoring (DE.CM)",
            description: "Assets are monitored in order to find unusual behavior, any indication of a compromise, and other potentially suspicious events.",
            outcomes: "Improved threat detection, better situational awareness"
          },
          {
            title: "Adverse Event Analysis (DE.AE)",
            description: "Analysis from detected compromises or suspicious events is used to help discover other cybersecurity incidents.",
            outcomes: "Improved threat detection, Improved threat knowledge"
          }
        ],
        
        implementationStrategies: [
          {
            title: "Threat Hunting",
            description: "Actively search for threats and any signs of compromise in the environment.",
            icon: "mdi-magnify"
          },
          {
            title: "Incident Detection Playbooks",
            description: "Create and utilize playbooks for detecting specific types of incidents or compromises.",
            icon: "mdi-book-open-outline"
          },
          {
            title: "Log Analysis",
            description: "Gather logs from various computer systems and applications for analysis to detect suspicous activity.",
            icon: "mdi-file-document"
          },
          {
            title: "Network Traffic Analysis",
            description: "Use tools such as packet sniffers to analyze network traffic for suspicous or unauthorized activity.",
            icon: "mdi-lan-connect"
          }
        ],
        
        quizQuestions: [
          {
            text: "What implementation of the Detect function involves analyzing log files for suspicious activity?",
            type: "multiple-choice",
            options: ["File Detection", "Log Analysis", "Network Traffic Analysis", "None of these"],
            answer: "Log Analysis",
          },
          {
            text: "What implementation of the Detect function would be useful for analyzing incoming or outgoing network packets?",
            type: "multiple-choice",
            options: ["Network Traffic Analysis", "Mail Package Inspection", "Internet Search Engine"],
            answer: "Network Traffic Analysis",
          },
          {
            text: "The two key categories of the Detect function are _________ (DE.CM) and _________ (DE.AE). (Double check your spelling!)",
            type: "fill-in-the-blank-multiple",
            answers: ["Continuous Monitoring", "Adverse Event Analysis"],
          }
        ],
      };
    },
    
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      navigateToModule(route) {
        this.$router.push(route);
      },
      adjustHotspots() {
      }
    },
    
    mounted() {
      this.$nextTick(() => {
      });
    }
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
  
  /* Image Map Styling */
  .image-map-container {
    position: relative;
    margin: 0 auto;
    max-width: 100%;
  }
  
  .header-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    display: block;
  }
  
  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .module-hotspot {
    position: absolute;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .module-hotspot:hover {
    background-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.5);
  }
  
  .module-hotspot.active {
    background-color: rgba(100, 255, 218, 0.3);
  }
  
  .module-tooltip {
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #233554;
    color: #64ffda;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 10;
    border: 1px solid #64ffda;
  }
  
  .module-tooltip:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: #64ffda transparent transparent transparent;
  }
  
  .click-hint {
    display: block;
    font-size: 12px;
    color: #a8b2d1;
    margin-top: 4px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin: 20px 0;
    color: #64ffda;
  }
  
  .intro-card, .implementation-card, .carousel-card {
    background-color: #172a46;
    border-radius: 12px;
    border-left: 5px solid #64ffda;
  }
  
  .section-description,
  .implementation-description {
    font-size: 1.2rem;
    margin-bottom: 20px;
    line-height: 1.6;
    color: #ffffff;
  }
  
  .category-carousel {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }
  
  .category-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }
  
  .category-title {
    color: #64ffda;
    font-weight: 600;
  }
  
  .category-description {
    font-size: 1.1em;
    line-height: 1.6;
    color: #ffffff;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .category-outcomes {
    font-size: 0.95em;
    color: #a8b2d1;
    margin-top: 15px;
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
  </style>