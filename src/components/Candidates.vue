<template>
  <v-container class="kanban-board">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>
          Collov-Kanban
        </h1>
      </div>

      <v-spacer></v-spacer>

      <span class="mr-2">
        <v-btn
          text
          @click="
            newCandidateModal = true;
            addCandidate;
          "
        >
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn text>
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </span>
    </v-app-bar>
    <Kanban />
    <v-dialog v-model="newCandidateModal" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Add candidate </v-card-title>

        <v-card-text>
          <v-container>
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
            <select type="text" placeholder="Stage" v-model="stage">
              <option value="AP">Applied</option>
              <option value="PS">Phone screen</option>
              <option value="OS">On site</option>
              <option value="OF">Offered</option>
              <option value="AC">Accepted</option>
              <option value="RE">Rejected</option>
            </select>
            <br /><br />
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            @click="
              addCandidate({
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                address: address,
                stage: stage,
              });
              newCandidateModal = false;
            "
            :disabled="
              !first_name || !last_name || !phone || !address || !stage
            "
          >
            Add
          </v-btn>
          <v-btn color="blue darken-1" text @click="newCandidateModal = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Kanban from "./Kanban";
import ModalCandidateUpdate from "./ModalCandidateUpdate";
import { StagesMap } from "../utils/data";

export default {
  name: "Candidates",
  data() {
    return {
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
      stage: Object.keys(StagesMap)[0],
      newCandidateModal: false,
    };
  },
  computed: mapState({
    candidates: (state) => state.candidates.candidates,
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
