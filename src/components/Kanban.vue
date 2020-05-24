<template>
  <div class="kanban-board">
    <!-- <Board /> -->
    <v-row no-gutters>
      <v-col
        class="kanban-column"
        v-for="(stage, index) in stages"
        :key="stage"
        sm="2"
      >
        {{ stage }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Board from "./Board";
import draggable from "vuedraggable";

export default {
  props: {
    candidatesGrouped: Object,
  },
  data() {
    return {
      stages: ["AP", "PS", "OS", "OF", "AC", "RE"],
    };
  },

  components: {
    Board,
    draggable,
  },
};
</script>
