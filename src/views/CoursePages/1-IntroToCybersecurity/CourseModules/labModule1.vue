<template>

    <!-- Back Button -->
    <v-btn icon class="position-absolute" style="left: 16px; background-color: gray;" @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container fluid>
      
      <!-- Page Title -->
      <v-row>
        <v-col cols="12">
          <h1 class="page-title">Basic Unix Command Lab</h1>
          <p class="page-description">
            Use the embedded Linux terminal below to practice basic Unix commands. 
            Please note terminal resets every time the page is reloaded.
            See lab instructions below. 
          </p>
        </v-col>
      </v-row>
  
      <!-- Terminal and Instructions -->
      <v-row>

        <!-- JSLinux Terminal -->
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

        <!-- Lab Instructions-->
        <v-col cols="12" md="6">
          <div class="instructions-container" style="height: 600px; overflow-y: auto;">
            <h1 class="page-title">Instructions</h1>
            <p class="lab-instructions">
              In this lab you will be learning some useful unix commands that will be essential for you to use in future terminal-based labs on this site. 
            </p>
            <h2 class="lab-section">Basic Commands</h2>
            <p class="lab-instructions"> 
              Unix commands are typed in a terminal on what is called a shell. Each command can take a number of arguments, commonly called "command-line arguments". 
              The commands that are entered in the shell are not executed until the "Enter" key is pressed. If there are any errors that occur during command execution, they will be reported on the shell window. 
              The box you see above is the virtual terminal you will be using for this lab. It is automatically configured so that you are currently a localhost user in what is known as the root directory, with some pre-made files already present in the directory. 
              Think of a directory as a folder. On linux, your home folder is the "root" folder, which you are already in on the virtual terminal.
              Please note, in a linux terminal, commands ARE case-sensitive. Also, if you ever want to re-use past commands, you can press the UP arrowkey to autofill previously used commands. 
              <br><br>
              In order to see what current directory you are in, use the "pwd" command:
              <br><br>
              <b>pwd</b>
              <br><br>
              To list the contents of the current directory you are in, use the "ls" command (Note it is a lowercase "el" that is used):
              <br><br>
              <b>ls</b>
              <br><br>
              Along with the files you currently see in the root directory, there are other files that are "hidden". In Unix, "hidden" files are files you don't necessarily want to see all of the time. Any file or directory that begins with a '.' is a hidden file, and is also called a "dot" file. In order to list all objects including hidden files, the argument "-a" (which means "all") should be used with the "ls" command (Please note that any arguments used with a command must have a space in between the command and each argument):
              <br><br>
              <b>ls -a</b>
              <br><br>
              If you want to see information such as the owner, size, and permissions for files, then the -l (long) option may be used, as shown below:
              <br><br>
              <b>ls -al</b>
              <br><br>
              You can also use the command without showing hidden files by typing and entering:
              <br><br>
              <b>ls -l</b>
              <br><br>
              You may be wondering what the permissions mean on the far left. Don't worry, these will be covered in the next lab for exploring more intermediate unix commands. 
              The contents of another directory, other than the one you are currently in, can be accomplished by entering in the path of the directory as a command-line argument. In this case we will view the contents of the bin in the default usr directory in linux:
              <br><br>
              <b>ls /usr/bin</b>
              <br><br>
              If you want to make your own directory, you can accomplish this by using the "mkdir" command. First use the "ls" command to see the current files in your root folder. Then use the "mkdir" command to create a new temporary directory. You can see your newly created directory by using the "ls" command once again:
              <br><br>
              <b>ls</b>
              <br>
              <b>mkdir temp</b>
              <br>
              <b>ls</b>
              <br><br>
              To change to the new directory you just made, use the "cd" command followed by the name of the directory as the command-line argument. Use the "pwd" command to check that you are in the new directory you made:
              <br><br>
              <b>cd temp</b>
              <br>
              <b>pwd</b>
              <br><br>
              Now list all contents of the directory, including hidden files:
              <br><br>
              <b>ls -a</b>
              <br><br>
              You may notice that even though the directory is brand new, it is not necessarily empty. Every directory has at least two items in them, named "." and ".." (dot and dotdot). The "." directory is a shortcut to the current directory, while ".." is the shortcut to the parent directory (A parent directory is the folder that your currently present directory is in). To list the contents of the parent directory, use the following:
              <br><br>
              <b>ls ..</b>
              <br><br>
              Since the parent directory of the temp directory you made is the root directory, your output should look familiar. In order to go back to the previous directory you were in (the parent directory), use the ".." argument with the "cd" command, and check to make sure you are back at the root directory:
              <br><br>
              <b>cd ..</b>
              <br>
              <b>pwd</b>
              <br><br>
              Note that with the "cd" command. Typing and entering the command by itself will automatically take you to your home directory (in this case your root directory). 
              <br><br>
              Files or directories can be moved or renamed by using the "mv" command. Let's rename the temp directory you made to temp2, and then use the "ls" command to check that the name change worked:
              <br><br>
              <b>mv temp temp2</b>
              <br>
              <b>ls</b>
              <br><br>
              File copying can be accomplished with the "cp" command. Let's copy one of the default text files to the temp2 directory:
              <br><br>
              <b>cp readme.txt temp2</b>
              <br>
              <b>ls temp2</b>
              <br><br>
              You should see the readme.txt file outputted to the terminal. You can also copy a file while renaming it in the process. Let's rename the readme.txt as it is copied to th temp2 directory:
              <br><br>
              <b>cp readme.txt temp2/renamedFile.txt</b>
              <br>
              <b>ls temp2</b>
              <br><br>
              Directories can be removed if necessary by using the "rmdir" command. Attempt to remove the temp2 directory:
              <br><br>
              <b>rmdir temp2</b>
              <br><br>
              This attempt to remove the temp2 directory should have failed, due to items still inside the directory. To delete all files inside the directory, use the "rm" command. Note that in this case, the "*" symbol (which stands for wild card) is used. This means all files will be targeted for deletion. In this specfic case, the "*" symbol after "re" means that any file starting with the letters "re" will be removed, which works in this case for readme.txt and renamedFile.txt:
              <br><br>
              <b>rm temp2/re*</b>
              <br><br>
              After using the "ls" command to check that there is no more content in the temp2 directory, use the "rmdir" command once again:
              <br><br>
              <b>ls temp2</b>
              <br>
              <b>rmdir temp2</b>
              <br>
              <b>ls</b>
              <br><br>
              In the event that you would like to view the contents of a file, the "cat" command can be used. Let us use this command to view the contents of the default readme.txt file:
              <br><br>
              <b>cat readme.txt</b>
              <br><br>
              If you would like to display content to the terminal screen, you can use the "echo" command, followed by the text you want to displayed inside double quotes:
              <br><br>
              <b>echo "hello world"</b>
              <br><br>
              While this may seem useless now, the echo command will be a useful tools for future items that will be covered such as writing scripts. 
              <br><br>
              The last basic unix command that we will learn in this lab is the "clear" command. If you no longer need to see previous content that has been displayed on your terminal window, and you want to de-clutter, simply type and enter the "clear" command:
              <br><br>
              <b>clear</b>
              <br><br>
            </p>
            <h3>Congratulations! You have finished the basic unix commands lab, test your knowledge of the lab with the quiz questions below. (Note that proper command syntax must be used for each question)</h3>
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
        courseTitle: "Unix Basic Commands Lab",

        showQuizDialog: false,
        showPastAttemptsDialog: false,
        pastAttempts: [],

        //Add quiz questions to this
        quizQuestions: [
          {
            text: "What command checks the current directory a user are in?",
            type: "fill-in-the-blank",
            answer: "pwd",
          },
          {
            text: "What is the base command (do not include command-line arguments, just the command) that moves users between directories?",
            type: "fill-in-the-blank",
            answer: "cd",
          },
          {
            text: "What is the base command displays the contents of a file?",
            type: "fill-in-the-blank",
            answer: "cat",
          },
          {
            text: "What command diplays the current contents of the directory the user is in (NOT including hidden files)?",
            type: "fill-in-the-blank",
            answer: "ls",
          },
          {
            text: "What command diplays ALL contents (including hidden files) of the directory the user is in?",
            type: "fill-in-the-blank",
            answer: "ls -a",
          },
          {
            text: "(CHALLENGE QUESTION) What should the user type into the command line if they want to create a directory named 'test'?",
            type: "fill-in-the-blank",
            answer: "mkdir test",
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
  