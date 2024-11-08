<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>

  </v-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
