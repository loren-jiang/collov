<template>
  <div class="kanban-board">
    <v-row no-gutters>
      <v-col
        v-for="(candidates, key) in candidatesGrouped"
        :key="key"
        sm="2"
        style="min-width: 150px;"
      >
        <div class="kanban-column">
          <h2 style="text-align: center;">{{ StagesMap[key] }}</h2>
          <draggable
            :data-stage="key"
            @add="onAdd"
            class="list-group"
            v-model="candidatesGrouped[key]"
            group="candidates"
          >
            <div
              :data-pk="candidate.pk"
              class="list-group-item"
              v-for="candidate in candidates"
              :key="candidate.pk"
            >
              <CandidateCard :candidate="candidate" />
            </div>
          </draggable>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CandidateCard from "./CandidateCard";
import { StagesMap } from "../utils/data";

import { mapActions, mapGetters } from "vuex";
const storeActions = mapActions("candidates", ["updateCandidate"]);
const storeGetters = mapGetters("candidates", [
  "candidates",
  "candidatesGrouped",
  "candidatesMappedByPk",
]);

export default {
  display: "Kanban",

  props: {},
  data() {
    return {
      StagesMap,
    };
  },
  computed: {
    ...storeGetters,
  },
  components: {
    draggable,
    CandidateCard,
  },

  methods: {
    onAdd: function(evt) {
      const newStage = evt.target.dataset.stage;
      const candidate = this.candidatesMappedByPk[evt.item.dataset.pk];
      const { resume, ...candidateNoResumeKey } = candidate; // filter out resume key from object
      candidateNoResumeKey.stage = newStage;
      this.updateCandidate(candidateNoResumeKey)
    },
    ...storeActions,
  
    orderList() {
      // this.list = this.list.sort((one, two) => {
      //   return one.order - two.order;
      // });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      // return (
      //   (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      // );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kanban-column {
  min-height: 500px;
  background-color: aliceblue;
  margin: 5px;
  padding: 2rem 0;
  padding-top: 1rem;
}
.list-group-item {
  cursor: grab;
}
</style>
