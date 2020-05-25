<template>
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
      <select type="text" placeholder="Stage" v-model="candidateToEdit.stage">
        <option value="AP">Applied</option>
        <option value="PS">Phone screen</option>
        <option value="OS">On site</option>
        <option value="OF">Offered</option>
        <option value="AC">Accepted</option>
        <option value="RE">Rejected</option>
      </select>
      <div>
        <v-btn
          @click="
            updateCandidate({
              first_name: candidateToEdit.first_name,
              last_name: candidateToEdit.last_name,
              phone: candidateToEdit.phone,
              address: candidateToEdit.address,
              stage: candidateToEdit.stage,
              pk: candidateToEdit.pk,
            })
          "
          :disabled="
            !candidateToEdit.first_name ||
              !candidateToEdit.last_name ||
              !candidateToEdit.phone ||
              !candidateToEdit.address ||
              !candidateToEdit.stage
          "
          >Save</v-btn
        >
      </div>
      <!-- TODO: add resume file field in the form -->
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
const actions = mapActions("candidates", ["updateCandidate"]);

export default {
  name: "candidateUpdateForm",
  props: {
    candidate: Object,
  },
  data() {
    return {
      candidateToEdit: {
        ...this.$props.candidate,
      },
    };
  },
  methods: {
    ...actions,
    onSave: (ev) => {
        window.console.log(ev)
    }
  },
};
</script>
