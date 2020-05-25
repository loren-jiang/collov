<template>
  <v-container class="kanban-board">
    <Kanban v-bind:candidatesGrouped="candidatesGrouped" />
    <br />
    <p>First name</p>
    <input type="text" placeholder="First name" v-model="first_name" />
    <p>Last name</p>
    <input type="text" placeholder="Last name" v-model="last_name" />
    <p>Phone number</p>
    <input type="text" placeholder="Phone number" v-model="phone" />
    <p>Address</p>
    <input type="text" placeholder="Address" v-model="address" />
    <p>Stage</p>
    <select type="text" placeholder="Stage" v-model="stage" value="AP">
      <option value="AP">Applied</option>
      <option value="PS">Phone screen</option>
      <option value="OS">On site</option>
      <option value="OF">Offered</option>
      <option value="AC">Accepted</option>
      <option value="RE">Rejected</option>
    </select>
    <br /><br />
    <v-btn
      type="submit"
      @click="
        addCandidate({
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          address: address,
          stage: stage,
        })
      "
      :disabled="!first_name || !last_name || !phone || !address || !stage"
    >
      Add
    </v-btn>

    <hr />
    <h3>Candidates on Database</h3>
    <p v-if="candidates.length === 0">No Candidates</p>
    <div
      class="candidate"
      v-for="(candidate, index) in candidates"
      :key="index"
    >
      <p class="candidate-index">[{{ index }}]</p>
      <p class="candidate-pk" v-html="candidate.pk"></p>
      <p class="candidate-first-name" v-html="candidate.first_name"></p>
      <p class="candidate-last-name" v-html="candidate.last_name"></p>
      <p class="candidate-phone" v-html="candidate.phone"></p>
      <p class="candidate-address" v-html="candidate.address"></p>
      <p class="candidate-stage" v-html="candidate.stage"></p>
      <v-btn color="error" @click="deleteCandidate(candidate.pk)">
        Delete
      </v-btn>
      <ModalCandidateUpdate :candidate="candidate" />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Kanban from "./Kanban";
import ModalCandidateUpdate from "./ModalCandidateUpdate";

const STAGES = ["AP", "PS", "OS", "OF", "AC", "RE"];

export default {
  name: "Candidates",
  data() {
    return {
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
      stage: "",
    };
  },
  computed: mapState({
    candidates: (state) => state.candidates.candidates,
    candidatesGrouped: (state) => {
      const allCandidates = state.candidates.candidates;
      const stageMap = {};
      STAGES.forEach((s) => {
        stageMap[s] = allCandidates.filter((c) => c.stage === s);
      });
      return stageMap;
    },
  }),
  methods: mapActions("candidates", ["addCandidate", "deleteCandidate"]),
  created() {
    this.$store.dispatch("candidates/getCandidates");
  },
  components: {
    Kanban,
    ModalCandidateUpdate,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  max-width: 65%;
}

.candidate {
  margin: 0 auto;
  max-width: 30%;
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.candidate-index {
  color: #ccc;
  font-size: 0.8rem;
  /* margin-bottom: 0; */
}

img {
  width: 250px;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
