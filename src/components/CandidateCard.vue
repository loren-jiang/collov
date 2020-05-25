<template>
  <v-card>
    <v-card-title>
      {{ candidate.first_name }} {{ candidate.last_name }}
    </v-card-title>
    <v-card-text>
      <ModalCandidateUpdate :candidate="candidate" btnHtml="edit" />
    </v-card-text>
  </v-card>
</template>

<script>
import ModalCandidateUpdate from "./ModalCandidateUpdate";

export default {
  display: "Kanban",
  name: "CandidateCard",
  props: {
    candidate: Object,
  },
  components: {
    ModalCandidateUpdate,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card {
  width: 85%;
  margin: 10px auto;
}
</style>

