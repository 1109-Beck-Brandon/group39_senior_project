<template>
  <div class="home">

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <v-layout class="rounded rounded-md">
    <v-app-bar color="surface-variant" title="Cybersecurity Learning Platform"></v-app-bar>

    <v-navigation-drawer width="300">
      <v-list>
        <h2>Resources</h2>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Resource Description</v-list-item-title>
            <v-list-item-subtitle class="wrap-text">
              This section will be for resources that users can click on to further reinforce their learning.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
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

<style scoped>
/* Ensure the text wraps and prevents ellipsis */
.wrap-text {
  white-space: normal !important; /* Forces the text to wrap */
  overflow: visible !important;  /* Ensures no clipping */
  text-overflow: unset !important; /* Disables ellipsis */
  word-wrap: break-word; /* Handles long words */
  overflow-wrap: break-word; /* Ensures proper line breaking */
}
</style>