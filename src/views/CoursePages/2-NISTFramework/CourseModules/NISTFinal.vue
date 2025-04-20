<template>

  <!-- Back Button -->
  <v-btn icon class="position-absolute" style="left: 16px; background-color: gray;" @click="goBack">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>

  <v-container fluid class="main-container">
    <!-- Top Section: Course Content -->
    <v-row>
      <v-col cols="12">
        <h1 class="page-title">{{ courseTitle }}</h1>
        <div class="content-section">
          <p>
              Congratulations on completing the content of this course!
              <br><br>
              You will now complete your final exam for this course, which will mark your completion of this course. 
              <br><br>
              Note: If you are taking this course as part of a classroom, this final quiz will be your final grade for this course.
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Quiz Section -->
    <v-row>
      <v-col cols="12">
        <h1>Module Final Exam</h1>
        <v-btn color="primary" @click="showQuizDialog = true">Take Exam</v-btn>
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
        courseTitle: "NIST Cybersecurity Framework Final Quiz",

        showQuizDialog: false,

        //Add quiz questions to this
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
        },
        {
          text: "Which Govern category focuses on defining the organization's risk priorities and tolerance?",
          type: "multiple-choice",
          options: ["Organizational Context", "Risk Management Strategy", "Oversight"],
          answer: "Risk Management Strategy",
        },
        {
          text: "What was newly introduced in NIST CSF 2.0 to better inform cybersecurity decisions?",
          type: "multiple-choice",
          options: ["Organizational Context", "Supply Chain Risk Management", "Policy Management"],
          answer: "Organizational Context",
        },
        {
          text: "Which implementation strategy involves C-suite support for cybersecurity initiatives?",
          type: "multiple-choice",
          options: ["Integrated Risk Management", "Executive Sponsorship", "Culture Development"],
          answer: "Executive Sponsorship",
        },
        {
          text: "Which Identify category involves cataloging physical systems, devices, and software platforms?",
          type: "multiple-choice",
          options: ["Asset Management", "Risk Assessment", "Business Environment"],
          answer: "Asset Management",
        },
        {
          text: "What key outcome results from effective Supply Chain Risk Management?",
          type: "multiple-choice",
          options: ["Defined risk tolerance", "Supplier assessment program", "Complete asset inventory"],
          answer: "Supplier assessment program",
        },
        {
          text: "Which benefit of implementing the Identify function helps organizations determine where to focus cybersecurity efforts?",
          type: "multiple-choice",
          options: ["Process Reliability", "Gap Identification", "Complex System Management"],
          answer: "Gap Identification",
        },
        {
          text: "Which Protect category focuses on managing access to physical and logical assets?",
          type: "multiple-choice",
          options: ["Data Security (PR.DS)", "Identity Management and Access Control (PR.AC)", "Protective Technology (PR.PT)"],
          answer: "Identity Management and Access Control (PR.AC)",
        },
        {
          text: "Which implementation strategy restricts access rights to only what is necessary for users?",
          type: "multiple-choice",
          options: ["Defense-in-Depth", "Security by Design", "Principle of Least Privilege"],
          answer: "Principle of Least Privilege",
        },
        {
          text: "Which Protect category addresses security education for personnel and partners?",
          type: "multiple-choice",
          options: ["Awareness and Training (PR.AT)", "Information Protection Processes (PR.IP)", "Maintenance (PR.MA)"],
          answer: "Awareness and Training (PR.AT)",
        },
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
        },
        {
          text: "Why is it important to notify stakeholders that a security incident has occurred?",
          type: "multiple-choice",
          options: ["You should not notify them to avoid worrying them.", "To maintain stakeholder trust.", "So that they can eliminate the threat for you."],
          answer: "To maintain stakeholder trust.",
        },
        {
          text: "What Respond Category involves taking actions to minimize the damage done by a security incident?",
          type: "multiple-choice",
          options: ["Incident Management", "Incident Analysis", "Incident Response Reporting and Communication", "Incident Mitigation"],
          answer: "Incident Mitigation",
        },
        {
          text: "Which of the following is NOT a proper mitigation strategy?",
          type: "multiple-choice",
          options: ["Isolate Affected Systems", "Disable Affected Accounts", "Turn the affected computer off and on", "Block Malicious IP Addresses"],
          answer: "Turn the affected computer off and on",
        },
        {
          text: "It is not necessary to check the integrity of backups or other restoration tools before using them for restoration.",
          type: "multiple-choice",
          options: ["True", "False"],
          answer: "False",
        },
        {
          text: "Which of the following is NOT a key outcome of the Recover function?",
          type: "multiple-choice",
          options: ["Restored Operations", "Minimal Downtime", "No Transparency", "Maintain Stakeholder Trust"],
          answer: "No Transparency",
        },
        {
          text: "Recovery efforts should be prioritized based on the criticality of systems and data.",
          type: "multiple-choice",
          options: ["True", "False"],
          answer: "True",
        }
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

</style>  