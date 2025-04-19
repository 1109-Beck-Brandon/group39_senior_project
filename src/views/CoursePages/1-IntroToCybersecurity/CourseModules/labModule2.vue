<template>

    <!-- Back Button -->
    <v-btn icon class="position-absolute" style="left: 16px; background-color: gray;" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container fluid>

      <!-- Page Title -->
      <v-row>
        <v-col cols="12">
          <h1 class="page-title">Unix Command Lab Continued</h1>
          <p class="page-description">
            Use the embedded Linux terminal below to practice Unix commands. 
            Please note that terminal resets every time the page is reloaded.
            See lab instructions below. 
          </p>
        </v-col>
      </v-row>
  
      <!-- Terminal and Instructions -->
      <v-row>

        <!--Terminal-->
        <v-col cols="12" md="6">
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

        <!-- Instructions -->
        <v-col cols="12" md="6">
          <div class="instructions-container" style="height: 600px; overflow-y: auto;">
            <h1 class="page-title">Instructions</h1>
            <p class="lab-instructions">
              In this lab you will be continuing to learn useful unix commands that will be essential for you to use in future terminal-based labs on this site. It is strongly recommended that you complete the basic unix command lab before starting this one.
            </p>
            <h2 class="lab-section">Pipe and Redirection Commands</h2>
            <p class="lab-instructions"> 
              You may remember from the previous lab module, when viewing the contents of /usr/bin, the terminal screen was covered by a large amount of items that made it difficult to see all at once. You can replicate this scenario with the following command:
              <br><br>
              <b>ls /usr/bin</b>
              <br><br>
              One way to slow down output generation is to "pipe" the output. The pipe symbol "|" can be used with the "more" command to display a smaller section of the overall output at a time. To see the next section of the output, press the space bar. To see one line of output at a time, press the "Enter" key. If you would like to stop viewing the output midway, press the "q" key to quit. Enter the following to pipe the output of /usr/bin:
              <br><br>
              <b>ls /usr/bin | more</b>
              <br><br>
              Another method for dealing with a large output is redirection. This can be accomplished with the ">" symbol. You can redirect the output of a command to a file by doing the following, which will create a file named "listing" with the output of /usr/bin. Use "ls" to see that the listing file is in your root directory: 
              <br><br>
              <b>ls /usr/bin > listing</b>
              <br>
              <b>ls</b>
              <br><br>
              The file can also be viewed using the "cat" or "more" command that you learned earlier.
              <br><br>
              If the same command it repeated for the same file, the file will be overwritten by the redirection. You can instead add to the file (apending) by using the ">>" symbol. Use the following commands to append the current listing file and see the added line at the end of the file:
              <br><br>
              <b>echo "testing" >> listing</b>
              <br>
              <b>cat listing</b>
            </p>

            <h2 class="lab-section">Searching Commands</h2>
            <p class="lab-instructions">
              If you ever want to search for a specifc keyword in a group of files or directories, the "grep" (global regular expression pattern) command can be used. For example you can search the entire contents of the /etc directory for anything containing the keyword "network" (note that '*' is used at the end of the /etc directory to specify everything contained in this directory):
              <br><br>
              <b>grep network /etc/*</b>
              <br><br>
              The "grep" command usually outputs the file name that the keyword is contained in (if it is found) and sometimes the line in the file in which the keyword is found in. You may have noticed there were some errors present in the output, along with the files containing the network keyword. To make the output of the "grep" command more clean, you can silence the error outputs using "-s":
              <br><br>
              <b>grep -s network /etc/*</b>
              <br><br>
              An extremely useful command in unix is the "find" command. Along with "grep", it is useful for finding things. The syntax for the "find" command can be complicated at times, but has a wide range of uses, more than what can be shown in this lab. A basic use of the "find" command is to locate a file with a known name. In the /etc folder, there is a file named "hosts". You the "find" command to locate the "hosts" folder in /etc and print to the terminal:
              <br><br>
              <b>find /etc -name hosts -print</b>
              <br><br>
              (Note that you will not have a problem using the command in this way for this lab, due to the static nature of the virtual linux terminal and already having the appropriate privileges. On actual linux systems, you will most likely need sudo privileges. Sudo privileges are another way of saying a user has root privileges, the highest priviliege level a user can have)
              <br><br>
              The wild card symbol '*' can also be used with the "find" command. However when using '*' with the "find" command, it must be quoted. For example, in order to find and print a list of every single file that ends with ".h", enter the following:
              <br><br>
              <b>find /usr/include -name "*.h" -print</b>
              <br><br>
              The "find" command can also be used to display the path of every file it sees. For example, the following command can be used to print out every file or object contained in the /usr/local path:
              <br><br>
              <b>find /usr/local -print</b>
            </p>

            <h2 class="lab-section">Access Control Commands</h2>
            <p class="lab-instructions">
              Remember from the previous lab, you could see the permissions of a file when using the "ls -l" command? In this section you will learn more about these permission and how to modify them.
              <br><br>
              Start by displaying ALL contents of your home directory, "cd" to it if you are not there already:
              <br><br>
              <b>cd</b>
              <br>
              <b>ls -al</b>
              <br><br>
              The permissions for each file are listed on the left side of the screen. The permissions are in 3 different read, write, and execute groups. These groups are (User)(Group)(Other), and are formatted as (r w x)(r w -)(r - -). When the "r" is present, it means reading permissions are enabled. When the "w" is present, it means that writing permissions are enabled. When the "x" is present, it means that the execute permission is enabled. Otherwise, a "-" means that specific permission is not granted. For example, you can see that after entering the last command, the readme.txt file has read and write permissions turned on for the User, and only read permissions enabled for Group and Other. 
              <br><br>
              To change permissions on a file or directory, the "chmod" command can be used. While there a multiple ways to use the "chmod" command, this lab will stick to using the easier methods to understand and remember. When using the "chmod" command, 'u' is used to specify User, 'g' is used to specify Group, and 'o' is used to specify Other. For read, write, and execute, the symbols 'r', 'w', and 'x' should be used respectively. For example, use the following command to change permissions on the readme.txt file so that everyone (Other) can write to it:
              <br><br>
              <b>ls -l readme.txt</b>
              <br>
              <b>chmod o+w readme.txt</b>
              <br>
              <b>ls -l readme.txt</b>
              <br><br>
              To remove the newly granted file permission, use the following:
              <br><br>
              <b>chmod o-w readme.txt</b>
              <br>
              <b>ls -l readme.txt</b>
              <br><br>
              You are also able to modify multiple values at once. For example, to give all three permission types to User, Group, and Other for the readme.txt file, use the following command:
              <br><br>
              <b>chmod ugo+rwx readme.txt</b>
              <br>
              <b>ls -l readme.txt</b>
              <br><br>
              To make it so that Group and Other specifically can only have read access, use the following command:
              <br><br>
              <b>chmod go=r readme.txt</b>
              <br>
              <b>ls -l readme.txt</b>
              </p>

              <h2 class="lab-section">History</h2>
              <p class="lab-instructions">
              By default, most Unix terminals keep track of the commands that have been entered in a current session. To see the commands you've entered so far, enter the following in the command line:
              <br><br>
              <b>history</b>
              <br><br>
              There are several benefits to keeping a history of previously entered commands. One is so that you do not need to re-type a previously entered command, especially if the command is long. The up arrow key can be used to scroll through previously commands, so that they may be entered again.
              </p>

            <h3>Congratulations! You have finished the second part of the unix commands lab! You will learn about more complex unix commands in labs from other courses. Test your knowledge of the lab with the quiz questions below. (Note that proper command syntax must be used for each question)</h3>
          </div>
        </v-col>

      </v-row>

      <!-- Quiz Section -->
      <v-row justify="center" align="center">
        <v-col cols="12" md="8" class="text-center">
          <h2 class="section-title">Module Quiz</h2>

          <!-- Take Quiz Button -->
          <v-btn color="primary" @click="showQuizDialog = true" class="mb-6">Take Quiz</v-btn>

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
      <QuizStructure :quizQuestions="quizQuestions" v-model:showQuizDialog="showQuizDialog" @quiz-completed="loadPastAttempts" />

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

  import QuizStructure from '@/components/QuizStructure.vue';

  export default {
    name: "LinuxTerminalPage",

    components: {
      QuizStructure,
    },

    data() {
      return {
        courseTitle: "Unix Basic Commands Lab Part 2",

        showQuizDialog: false,
        showPastAttemptsDialog: false,
        pastAttempts: [],

        //Add quiz questions to this
        quizQuestions: [
          {
            text: "Which of the following re-directs the output of a command to a file?",
            type: "multiple-choice",
            options: ["|", ">", ">>", "-s"],
            answer: ">",
          },
          {
            text: "Which of the following appends the output of a command to a file?",
            type: "multiple-choice",
            options: ["|", ">", ">>", "-s"],
            answer: ">>",
          },
          {
            text: "What command is used to change the permissions on a file or directory?",
            type: "fill-in-the-blank",
            answer: "chmod",
          },
          {
            text: "(CHALLENGE QUESTION) What should be entered in the command line if a user wants to change file permissions on a file called 'test.txt' so that User has read and write permissions?",
            type: "fill-in-the-blank",
            answer: "chmod u+rw test.txt",
          },
          {
            text: "(CHALLENGE QUESTION) What should be entered in the command line if a user wants to change file permissions on a file called 'file.txt' so that Group has only execute permissions??",
            type: "fill-in-the-blank",
            answer: "chmod g=x file.txt",
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

  .lab-section {
    text-align: left;
    font-size: 1.5em;
    margin-top: 20px;
    font-weight: bold;
  }

  .lab-instructions {
    text-align: left;
    font-size: 1.2em;
    color: #666;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 1.8rem;
    margin: 20px 0;
    color: #64ffda;
  }

  </style>
  