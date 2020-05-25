<template>
  <div class="kanban-board">
    <!-- <Board /> -->
    <v-row no-gutters>
      <v-col
        class="kanban-column"
        v-for="(candidates, key) in candidatesGrouped"
        :key="key"
        sm="2"
      >
        <h3>{{ key }}</h3>
        <draggable
          :data-stage="key"
          @add="onAdd"
          class="list-group"
          v-model="candidatesGrouped[key]"
          group="candidates"
          @change="log"
        >
          <div
            :data-pk="candidate.pk"
            class="list-group-item"
            v-for="(candidate, index) in candidates"
            :key="candidate.pk"
          >
            {{ candidate.first_name }} {{ candidate.pk }}
          </div>
        </draggable>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Board from "./Board";
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
const storeActions = mapActions("candidates", ["updateCandidate"]);
const storeGetters = mapGetters("candidates", ["candidates", "candidatesGrouped", "candidatesMappedByPk"]);

export default {
  display: "Kanban",

  props: {},
  data() {
    return {
      test: {
        AP: [
          {
            first_name: "John",
            last_name: "Doe",
            phone: "123456789",
            address: "Fake st, Fakeland CA",
            stage: "AP",
            resume: null,
            pk: 2,
          },
          {
            first_name: "asds",
            last_name: "asdd",
            phone: "asd",
            address: "asd",
            stage: "AP",
            resume: null,
            pk: 9,
          },
        ],
        PS: [],
        OS: [],
        OF: [],
        AC: [],
        RE: [
          {
            first_name: "a",
            last_name: "s",
            phone: "s",
            address: "s",
            stage: "RE",
            resume: null,
            pk: 14,
          },
          {
            first_name: "a",
            last_name: "s",
            phone: "s",
            address: "s",
            stage: "RE",
            resume: null,
            pk: 15,
          },
        ],
      },
    };
  },
  computed: {
    ...storeGetters,
  },
  components: {
    Board,
    draggable,
  },

  methods: {
    onAdd: function(evt) {
      const newStage = evt.target.dataset.stage;
      const candidate = this.candidatesMappedByPk[evt.item.dataset.pk];
      candidate.stage = newStage;
      this.updateCandidate(candidate);
    },
    ...storeActions,
    log: function(evt) {
      window.console.log(evt);
    },
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
