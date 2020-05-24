<template>
    <div class="kanban-board">
        <Board/>
        <div class="kanban-column" v-for="(stage, index) in stages" :key="stage" >
            <p>{{stage}}</p>
        </div>
    </div>
</template>


<script>
import Board from "./Board";

export default {
  data() {
    return {
      stages: ["AP", "PS", "OS", "AC", "RE"],
    };
  },
  components: {
      Board
  }
};
</script>
