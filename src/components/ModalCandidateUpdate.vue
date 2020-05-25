<template>
  <div style="display: inline-block">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text>
          <v-container>
            <v-form>
              <p>First name</p>
              <input
                type="text"
                placeholder="First name"
                v-model="candidateToEdit.first_name"
              />
              <p>Last name</p>
              <input
                type="text"
                placeholder="Last name"
                v-model="candidateToEdit.last_name"
              />
              <p>Phone number</p>
              <input
                type="text"
                placeholder="Phone number"
                v-model="candidateToEdit.phone"
              />
              <p>Address</p>
              <input
                type="text"
                placeholder="Address"
                v-model="candidateToEdit.address"
              />
              <p>Stage</p>
              <select
                type="text"
                placeholder="Stage"
                v-model="candidateToEdit.stage"
              >
                <option value="AP">Applied</option>
                <option value="PS">Phone screen</option>
                <option value="OS">On site</option>
                <option value="OF">Offered</option>
                <option value="AC">Accepted</option>
                <option value="RE">Rejected</option>
              </select>
              <div></div>
              <!-- TODO: add resume file field in the form -->
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="
              dialog = false;
              updateCandidate(candidateToEdit);
            "
            :disabled="
              !candidateToEdit.first_name ||
                !candidateToEdit.last_name ||
                !candidateToEdit.phone ||
                !candidateToEdit.address ||
                !candidateToEdit.stage
            "
            >Save
          </v-btn>
          <v-btn color="error" @click="deleteCandidate(candidateToEdit.pk)">
            Delete
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="primary" dark @click.stop="dialog = true">
      {{btnHtml}}
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const actions = mapActions("candidates", [
  "updateCandidate",
  "deleteCandidate",
]);

export default {
  name: "Modal",
  props: {
    btnHtml: String,
    title: String,
    candidate: Object,
  },
  data() {
    return {
      dialog: false,
      candidateToEdit: {
        ...this.$props.candidate,
      },
    };
  },
  components: {},
  methods: {
    ...actions,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card__text {
  width: unset;
}
</style>
