<template>
  <v-container>
    <v-row class="align-items-end mt-5">
      <v-col class="text-left" cols="6">
        <h1 class="display-2 font-weight-bold mb-3 gradient-text space-grotesk">
          Welcome to the Cybersecurity<br>Learning Platform
        </h1>
        <p class="subheading font-weight-regular grey-text">
          This website is here to help educators and individuals who want<br>to learn more about the field of cybersecurity!
        </p>
      </v-col>

      <v-col class="text-right" cols="6">
        <v-img
          :src="require('../assets/1_0tfkWrWCeG5gR2tGozNrHg.gif')"
          class="my-3"
          contain
          height="325"
        />
      </v-col>
    </v-row>

    <v-divider class="gradient-line mt-5"></v-divider>

    <v-row class="text-center mt-5">

      <!-- Sliding Photos Section -->
      <v-col cols="12">
        <v-carousel
          class="my-carousel"
          show-arrows
          hide-delimiters
          cycle
          :interval="3000"
        >
          <v-carousel-item
            v-for="(photo, index) in photos"
            :key="index"
          >
            <v-container class="text-center">
              <v-img 
                :src="photo.src" 
                :alt="photo.alt" 
                class="photo-slide" 
              />
              <p class="photo-name mt-3">{{ photo.alt }}</p>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <!-- New Section -->
    <v-row class="mt-6">
      <v-col class="text-left" cols="6">
        <h3 class="subheading font-weight-bold gradient-text mb-3 space-grotesk">Learn from Experts</h3>
        <p class="grey-text">
          Join our cybersecurity professional website to gain knowledge on securing digital infrastructures, protecting sensitive data, and preventing cyber threats.
        </p>
      </v-col>
      <v-col class="text-right" cols="6">
        <v-img
          :src="require('../assets/1584115837673.jpg')"
          class="my-3"
          contain
          height="250"
        />
      </v-col>
    </v-row>

    <v-divider class="gradient-line mt-5"></v-divider>

    <v-row justify="center" class="mt-6">
      <v-btn
        class="gradient-button"
        rounded
        large
        href="#"
        @click="redirectToLogin"
      >
        Start journey now!
      </v-btn>
    </v-row>

    <!-- New Section: 3 -->
    <v-container>
      <!-- Section Heading -->
      <v-row justify="center" class="mt-6">
        <v-col cols="12" class="text-center">
          <h2 class="headline font-weight-bold gradient-text space-grotesk">
            Why Choose Us?
          </h2>
          <p class="grey-text">
            Explore new knowledge with world-class examples!
          </p>
        </v-col>
      </v-row>

      <!-- Content with Subheadings -->
      <v-row justify="center" class="mt-6">
        <v-col class="text-center" cols="4">
          <v-img
            :src="require('../assets/6783360.png')"
            class="my-3"
            contain
            height="200"
          />
          <h3 class="subheading font-weight-bold space-grotesk">Cybersecurity Basics</h3>
          <p class="grey-text">
            Learn the core principles of cybersecurity, from data protection to secure systems.
          </p>
        </v-col>

        <v-col class="text-center" cols="4">
          <v-img
            :src="require('../assets/2092663.png')"
            class="my-3"
            contain
            height="200"
          />
          <h3 class="subheading font-weight-bold space-grotesk">Advanced Techniques</h3>
          <p class="grey-text">
            Delve into advanced methods for securing networks and mitigating cyber threats.
          </p>
        </v-col>

        <v-col class="text-center" cols="4">
          <v-img
            :src="require('../assets/Icon_hacker.png')"
            class="my-3"
            contain
            height="200"
          />
          <h3 class="subheading font-weight-bold space-grotesk">Real-World Examples</h3>
          <p class="grey-text">
            Apply your knowledge to solve real-world challenges and secure critical systems.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    importantLinks: [
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
    ],
    photos: [
      { src: require('../assets/trojan-horse-black-background-vector-illustration-trojan-horse-black-background-vector-illustration-isolated-backgound-127316684.webp'), alt: 'Secure' },
      { src: require('../assets/HD-wallpaper-sound-skull-bones-crossbones-pirate-skull-sound-removebg-preview.png'), alt: 'Innovate' },
      { src: require('../assets/pngtree-vector-globe-icon-png-image_855070.jpg'), alt: 'Empower' },
    ],
  }),

  methods: { 
    redirectToLogin() { 
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

.grey-text {
  color: grey;
  font-size: 20px;
}

.gradient-line {
  height: 4px;
  background: linear-gradient(to right, rgb(225, 119, 5), #d514b2, purple);
  margin: 20px 0;
}

.text {
  color: white;
}

.home {
  background-color: black;
}

.wrap-text {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.join-button-container {
  position: fixed; 
  top: 100px; 
  right: 5px; 
  z-index: 10; 
}

.join-button {
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
}

.gradient-text {
  background: linear-gradient(to right, rgb(225, 119, 5), #d514b2, purple);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.mt-5 {
  margin-top: 5rem;
}
.mt-6 {
  margin-top: 8rem;
}

.mt-4 {
  margin-top: 4rem;
}

.display-2 { 
  font-size: 48px;
  font-family: 'Space Grotesk', sans-serif; 
} 

.subheading { 
  font-size: 26px;
  font-family: 'Space Grotesk', sans-serif; 
} 

.headline { 
  font-size: 28px;
  font-family: 'Space Grotesk', sans-serif; 
}

.my-carousel {
  max-width: 500px;
  margin: 0 auto;
}

.photo-slide {
  height: 400px;
  object-fit: cover;
}

.photo-name {
  font-size: 16px;
  font-weight: bold;
  color: rgb(159, 157, 157);
}

.gradient-button {
  background: linear-gradient(to right, rgb(225, 119, 5), #d514b2, purple);
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-transform: none;
  padding: 10px 20px;
}

.photo-name {
  font-size: 42px; 
  font-weight: bold; 
  color: white; 
  text-transform: uppercase;
  margin-top: 20px;
}

</style>