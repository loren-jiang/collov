<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap");

h1,
h2,
h3,
h4,
h5 {
  font-family: "Raleway", sans-serif;
}
</style>
