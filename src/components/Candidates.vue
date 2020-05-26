<template>
  <v-container class="kanban-board">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>
          Collov
        </h2>
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
          new candidate
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <!-- TODO: implement login if time -->
        <!-- <v-btn text>
          <v-icon>mdi-login-variant</v-icon>
        </v-btn> -->
      </span>
    </v-app-bar>
    <br />
    <br />
    <Kanban />
    <v-dialog v-model="newCandidateModal" max-width="500px">
      <v-card>
        <v-card-title class="headline"> Add candidate </v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field label="First name" v-model="first_name" />
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field placeholder="Last name" v-model="last_name" />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field label="Phone number" v-model="phone" />
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                placeholder="Address"
                v-model="address"
                label="Address"
              />
              <v-row>
                <v-col md="3" sm="12">
                  <v-select v-model="stage" :items="stageOptions" label="Stage">
                  </v-select>
                </v-col>
                <v-col md="9" sm="12">
                  <v-file-input
                    show-size
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
                    label="Resume"
                    v-model="resume"
                  ></v-file-input>
                </v-col>
              </v-row>

              <br /><br />
            </v-container>
          </v-form>
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
                email: email,
                address: address,
                stage: stage,
                resume: resume,
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
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      stage: Object.keys(StagesMap)[0],
      resume: undefined,
      
      newCandidateModal: false,
      stageOptions: Object.keys(StagesMap).map((key) => ({
        text: StagesMap[key],
        value: key,
      })),
    };
  },
  computed: mapState({
    candidates: (state) => state.candidates.candidates,
  }),
  methods: {
    ...mapActions("candidates", ["addCandidate", "deleteCandidate"]),
  },
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
