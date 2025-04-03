<template>
  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray; z-index: 10;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Header -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="header-title">Linux Terminal Practice</h1>
      </v-col>
    </v-row>

    <v-row justify="center" align="center">
      <v-col cols="12" md="8" class="text-center">
        <v-card elevation="3" class="intro-card pa-4 mb-6">
          <p class="section-description">
            Use the embedded Linux terminal below to practice basic Unix commands.
            The terminal resets every time you reload this page.
          </p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Folder Management -->
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-btn color="primary" class="mr-2" elevation="2">Download Files</v-btn>
        <v-btn color="primary" elevation="2">Upload Files</v-btn>
      </v-col>
    </v-row>

    <!-- JSLinux Terminal Embed -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="terminal-card pa-2 mb-6">
          <div class="jslinux-container">
            <iframe
              src="https://bellard.org/jslinux/vm.html?cpu=riscv64&url=buildroot-riscv64.cfg&mem=256"
              width="100%"
              height="600"
              style="border: none;"
              title="Linux Terminal Emulator"
            ></iframe>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="defense-card pa-4 mb-6">
          <h2 class="section-title text-center">Final Quiz</h2>
          <p class="defense-description text-center">
            Enter the correct flag to complete the challenge. The flag format is <code class="flag-code">flag{}</code>.
          </p>

          <!-- Quiz Form -->
          <v-form @submit.prevent="checkAnswer" class="quiz-form">
            <v-text-field
              v-model="userAnswer"
              label="Your Answer"
              placeholder="Enter flag here"
              outlined
              dark
              class="quiz-input"
              background-color="#233554"
              color="#64ffda"
            ></v-text-field>
            <div class="text-center mt-4">
              <v-btn 
                type="submit" 
                color="#64ffda" 
                dark 
                elevation="3"
                class="submit-btn"
              >
                Submit Answer
              </v-btn>
            </div>
          </v-form>

          <!-- Quiz Result -->
          <v-alert v-if="quizResult !== null" :type="quizResult ? 'success' : 'error'" class="mt-4 quiz-alert">
            <span v-if="quizResult">Correct! The flag is <code class="flag-code">flag{iamahacker}</code></span>
            <span v-else>Incorrect. Try again.</span>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LinuxTerminalPage",
  data() {
    return {
      // Predefined folders with logs.txt files
      folders: [
        {
          name: "folder1",
          files: [
            {
              name: "logs.txt",
              content: this.generateRandomContent(true) // Include flag in folder1
            }
          ]
        },
        {
          name: "folder2",
          files: [
            {
              name: "logs.txt",
              content: this.generateRandomContent(false) // No flag in folder2
            }
          ]
        }
      ],
      userAnswer: "",
      quizResult: null, // null means no answer yet, true for correct, false for incorrect
    };
  },
  methods: {
    // Back Button
    goBack() {
      this.$router.go(-1);
    },

    // Generate random content for the logs.txt file
    generateRandomContent(includeFlag = false) {
      const lines = [];
      const flagLine = "flag{iamahacker}"; // Line to ensure is included in the file

      // Add random lines
      for (let i = 0; i < 49; i++) {
        const randomLine = this.generateRandomString(50);  // Create random strings of length 50
        lines.push(randomLine);
      }

      // Insert the flag line at a random position if needed
      if (includeFlag) {
        const flagPosition = Math.floor(Math.random() * (lines.length + 1));
        lines.splice(flagPosition, 0, flagLine);
      }

      return lines.join("\n");
    },

    // Generate a random string of a given length
    generateRandomString(length) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    },

    // Download the folders and files as a JSON file
    downloadFiles() {
      const fileData = new Blob([JSON.stringify(this.folders)], { type: "application/json" });
      const url = URL.createObjectURL(fileData);
      const link = document.createElement("a");
      link.href = url;
      link.download = "folders_and_files.json";
      link.click();
    },

    // Upload folders and files from a JSON file
    uploadFiles(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.folders = JSON.parse(reader.result);
      };
      reader.readAsText(file);
    },

    // Check the user's answer for the quiz
    checkAnswer() {
      const correctAnswer = "flag{iamahacker}";
      if (this.userAnswer === correctAnswer) {
        this.quizResult = true; // Correct answer
      } else {
        this.quizResult = false; // Incorrect answer
      }
    }
  },
  mounted() {
    // Load the predefined folders and files on component mount
    const storedFolders = JSON.parse(localStorage.getItem("folders"));
    if (storedFolders) {
      this.folders = storedFolders;
    }
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

.section-title {
  font-size: 1.8rem;
  margin: 20px 0;
  color: #64ffda;
}

.intro-card, .defense-card, .terminal-card {
  background-color: #172a46;
  border-radius: 12px;
  border-left: 5px solid #64ffda;
}

.section-description,
.defense-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ffffff;
}

.jslinux-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.quiz-form {
  max-width: 600px;
  margin: 0 auto;
}

.quiz-input {
  color: #ffffff;
}

.submit-btn {
  background-color: #64ffda !important;
  color: #0a192f !important;
  font-weight: 600;
  padding: 0 25px;
  height: 44px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.quiz-alert {
  max-width: 600px;
  margin: 20px auto;
}

.flag-code {
  background-color: #233554;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  color: #64ffda;
}

/* Override Vuetify's alert colors */
.v-alert.success {
  background-color: rgba(100, 255, 218, 0.15) !important;
  border-color: #64ffda !important;
  color: #64ffda !important;
}

.v-alert.error {
  background-color: rgba(255, 76, 76, 0.15) !important;
  border-color: #ff4c4c !important;
  color: #ff4c4c !important;
}
</style>