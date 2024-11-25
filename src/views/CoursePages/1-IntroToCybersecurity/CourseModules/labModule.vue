<template>
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
    </v-container>
  </template>
  
  <script>
  export default {
    name: "LinuxTerminalPage",
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
  </style>
  