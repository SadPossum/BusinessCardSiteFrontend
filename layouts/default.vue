<template>
  <v-app>
    <!-- <v-app-bar class="px-3" flat>
      <v-spacer />
      <v-tabs centered>
        <v-tab v-for="link in links" :to="link.link" :key="link.name">
          {{ link.name }}
        </v-tab>
      </v-tabs>
      <v-spacer />
    </v-app-bar> -->

    <v-parallax src="/img/background.png">
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
      <v-footer absolute app color="transparent">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-parallax>
  </v-app>
</template>

<script setup>
// const links = ref([
//   { name: "Home", link: "/" },
//   { name: "Blog", link: "/blog" },
// ]);
</script>
