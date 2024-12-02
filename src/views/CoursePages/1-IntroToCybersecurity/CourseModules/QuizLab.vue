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
      <!-- Page Title -->
      <v-row>
        <v-col cols="12">
          <h1 class="page-title">Linux Terminal Practice</h1>
          <p class="page-description">
            Use the embedded Linux terminal below to practice basic Unix commands.
            The terminal resets every time you reload this page.
          </p>
        </v-col>
      </v-row>
  
      <!-- Folder Management -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-btn @click="downloadFiles">Download Files</v-btn>
          <v-btn @click="uploadFiles">Upload Files</v-btn>
        </v-col>
      </v-row>
  
      <!-- JSLinux Terminal Embed -->
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="jslinux-container">
            <iframe
              src="https://bellard.org/jslinux/vm.html?cpu=riscv64&url=buildroot-riscv64.cfg&mem=256"
              width="100%"
              height="600"
              style="border: none;"
              title="Linux Terminal Emulator"
            ></iframe>
          </div>
        </v-col>
      </v-row>
  
      <!-- Quiz Section -->
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="6">
          <h2 class="quiz-title">Final Quiz</h2>
          <p class="quiz-description">
            Enter the correct flag to complete the challenge. The flag format is <code>flag{}</code>.
          </p>
  
          <!-- Quiz Form -->
          <v-form @submit.prevent="checkAnswer">
            <v-text-field
              v-model="userAnswer"
              label="Your Answer"
              placeholder="Enter flag here"
              outlined
            ></v-text-field>
            <v-btn type="submit" color="primary">Submit Answer</v-btn>
          </v-form>
  
          <!-- Quiz Result -->
          <v-alert v-if="quizResult !== null" :type="quizResult ? 'success' : 'error'" class="mt-4">
            <span v-if="quizResult">Correct! The flag is <code>flag{iamahacker}</code></span>
            <span v-else>Incorrect. Try again.</span>
          </v-alert>
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

      //Back Button
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
  .page-title {
    text-align: center;
    font-size: 2em;
    margin-top: 20px;
    font-weight: bold;
  }
  
  .page-description {
    text-align: center;
    font-size: 1.2em;
    color: #666;
    margin-bottom: 20px;
  }
  
  .jslinux-container {
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .quiz-title {
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .quiz-description {
    text-align: center;
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  
  .v-btn {
    display: block;
    margin: 0 auto;
  }
  
  .v-alert {
    text-align: center;
  }
  </style>  