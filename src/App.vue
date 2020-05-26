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
hr {
  max-width: 80%;
}

h1, h2, h3, h4, h5 {
  font-family: "Arial";
}


</style>