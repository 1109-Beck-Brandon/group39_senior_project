<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">NIST Introduction</h1>
        <img :src="headerImage" alt="NIST Framework" class="header-image" />
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <h2 class="section-title">Understanding NIST</h2>
          <p class="section-description">
            NIST (National Institute of Standards and Technology) or NMI (National Metrology Institute for the 
            United States), is a cybersecurity framework and a U.S Federal Agency focused on information technology 
            and cybersecurity. Its main goal is to develop standards, guidelines, and best practices for 
            cybersecurity, information technology, and other critical domains.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="focus-areas-card pa-4 mb-6">
          <h2 class="section-title text-center mb-4">NIST Focus Areas</h2>
          <p class="section-description mb-5">
            NIST works with many different strategic initiatives and research programs across various domains. 
            Select a focus area below to learn more:
          </p>
          
          <v-row justify="center">
            <v-col cols="12" sm="6" md="4" v-for="(area, index) in focusAreas" :key="index">
              <v-btn 
                block 
                x-large 
                class="focus-area-btn mb-4" 
                @click="showFocusAreaDetails(index)"
                :color="currentArea === index ? 'accent' : 'primary'"
                height="70"
              >
                <v-icon left size="24">{{ area.icon }}</v-icon>
                {{ area.title }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" v-if="currentArea !== null">
      <v-col cols="12" md="8">
        <v-card elevation="4" class="area-details-card pa-4 mb-6">
          <div class="d-flex justify-space-between align-center mb-3">
            <h2 class="area-title">{{ focusAreas[currentArea].title }}</h2>
            <v-btn icon color="accent" @click="visitAreaWebsite" class="visit-btn">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
          <p class="area-description">{{ focusAreas[currentArea].description }}</p>
          <div class="area-link d-none">{{ focusAreas[currentArea].link }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="framework-card pa-4 mb-6">
          <h2 class="section-title">NIST Cybersecurity Framework (CSF)</h2>
          <p class="framework-description mb-4">
            The NIST Cybersecurity Framework consists of 6 core functions that provide a strategic view of the 
            lifecycle of an organization's management of cybersecurity risk:
          </p>
          <v-row>
            <v-col cols="12" md="6" v-for="(pillar, index) in csfPillars" :key="index">
              <v-card class="pillar-item pa-3 mb-3" outlined>
                <div class="d-flex align-center">
                  <v-icon color="primary" size="36" class="mr-3">{{ pillar.icon }}</v-icon>
                  <div>
                    <div class="font-weight-bold text-white">{{ pillar.title }}</div>
                    <div class="pillar-description text-white">{{ pillar.description }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <p class="mt-4 text-white">We will talk more about each of these pillars in upcoming modules.</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="section-title">Test Your Knowledge</h2>
        <v-btn color="primary" large class="mt-3 mb-6" @click="showQuizDialog = true">Take Quiz</v-btn>
      </v-col>
    </v-row>

    <!-- Add Quiz Component -->
    <QuizStructure :quizQuestions="quizQuestions" v-model:showQuizDialog="showQuizDialog" />
  </v-container>
</template>

<script>
import QuizStructure from '@/components/QuizStructure.vue';

export default {
  name: "NISTIntroduction",

  components: {
    QuizStructure,
  },

  data() {
    return {
      headerImage: "/api/placeholder/800/400", // Placeholder for NIST header image
      currentArea: null,
      showQuizDialog: false,

      focusAreas: [
        {
          title: "Artificial Intelligence",
          description: "NIST promotes innovation and cultivates trust in the design, development, use and governance of artificial intelligence (AI) technologies and systems in ways that enhance economic security, competitiveness, and quality of life.",
          icon: "mdi-brain",
          link: "https://www.nist.gov/artificial-intelligence"
        },
        {
          title: "Cybersecurity",
          description: "NIST develops cybersecurity standards, guidelines, best practices, and other resources to meet the needs of U.S. industry, federal agencies and the broader public.",
          icon: "mdi-shield-lock",
          link: "https://www.nist.gov/cybersecurity"
        },
        {
          title: "Manufacturing",
          description: "NIST helps American industries adopt innovative manufacturing methods and efficiently produce reliable, safe products.",
          icon: "mdi-factory",
          link: "https://www.nist.gov/manufacturing"
        },
        {
          title: "Energy",
          description: "NIST develops new measurement techniques and disseminates reference materials and data that researchers and manufacturers rely on to develop and commercialize new energy production, distribution and efficiency technologies.",
          icon: "mdi-lightning-bolt",
          link: "https://www.nist.gov/energy"
        },
        {
          title: "Health & Bioscience",
          description: "As a non-regulatory agency, NIST provides a solid foundation of measurement assurance that enables innovations in health and bioscience.",
          icon: "mdi-medical-bag",
          link: "https://www.nist.gov/health-bioscience"
        },
        {
          title: "Next-Gen Communications",
          description: "NIST is currently the U.S. government's leader in fundamental and applied research, standards and government-academia-industry coordination for advanced communications technologies.",
          icon: "mdi-antenna",
          link: "https://www.nist.gov/advanced-communications"
        },
        {
          title: "Quantum Science",
          description: "Quantum effects set fundamental limits on the precision of physical measurements, so as the nation's measurement science agency, NIST has a key role in studying and developing standards for quantum measurement.",
          icon: "mdi-atom",
          link: "https://www.nist.gov/quantum-information-science"
        },
        {
          title: "Standards",
          description: "The National Institute of Standards and Technology (NIST) has been deeply devoted to efforts in this area for more than 120 years. NIST has brought about improvements to everyday life you may take for granted, and solved problems that have advanced everything from manufacturing to public safety.",
          icon: "mdi-certificate",
          link: "https://www.nist.gov/standards"
        }
      ],

      csfPillars: [
        {
          title: "Govern",
          description: "Set strategy, policies, and oversight for cybersecurity (new in v2.0).",
          icon: "mdi-gavel"
        },
        {
          title: "Identify",
          description: "Understand your assets, risks, and environment.",
          icon: "mdi-magnify"
        },
        {
          title: "Protect",
          description: "Safeguard assets and limit the impact of potential events.",
          icon: "mdi-shield"
        },
        {
          title: "Detect",
          description: "Discover cybersecurity events quickly.",
          icon: "mdi-radar"
        },
        {
          title: "Respond",
          description: "Take action to contain and mitigate an incident.",
          icon: "mdi-alert-circle"
        },
        {
          title: "Recover",
          description: "Restore systems and data to normal operations.",
          icon: "mdi-backup-restore"
        }
      ],

      quizQuestions: [
        {
          text: "What does NIST stand for?",
          type: "multiple-choice",
          options: ["National Information Security Technology", "National Institute of Standards and Technology", "Network Infrastructure Security Team"],
          answer: "National Institute of Standards and Technology",
        },
        {
          text: "Which of these is NOT one of the NIST Cybersecurity Framework core functions?",
          type: "multiple-choice",
          options: ["Identify", "Protect", "Implement", "Recover"],
          answer: "Implement",
        },
        {
          text: "Which function was newly added to the NIST Cybersecurity Framework in v2.0?",
          type: "multiple-choice",
          options: ["Govern", "Protect", "Respond", "Detect"],
          answer: "Govern",
        }
      ],
    };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    
    showFocusAreaDetails(index) {
      this.currentArea = index;
    },
    
    visitAreaWebsite() {
      if (this.currentArea !== null) {
        window.open(this.focusAreas[this.currentArea].link, '_blank');
      }
    }
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

.intro-card, .focus-areas-card, .framework-card, .area-details-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.section-description,
.framework-description,
.area-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  line-height: 1.6;
  color: #ffffff;
}

.focus-area-btn {
  background-color: #233554 !important;
  color: #ffffff !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #64ffda !important;
  border-radius: 8px !important;
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
}

.focus-area-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: #2d4366 !important;
}

.area-title {
  color: #64ffda;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.area-link {
  display: none;
}

.visit-btn {
  background-color: #233554 !important;
  border: 1px solid #64ffda !important;
}

.pillar-item {
  background-color: #233554;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #64ffda;
  border-radius: 8px;
}

.pillar-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.pillar-description {
  color: #ffffff;
  font-size: 0.95rem;
}

.text-white {
  color: #ffffff !important;
}

.d-none {
  display: none !important;
}
</style>