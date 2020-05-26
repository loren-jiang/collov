<template>
  <div style="display: inline-block">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="First name"
                    v-model="candidateToEdit.first_name"
                  />
                </v-col>
                <v-col md="6" sm="12">
                  <v-text-field
                    placeholder="Last name"
                    v-model="candidateToEdit.last_name"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col md="6" sm="12">
                  <v-text-field
                    label="Phone number"
                    v-model="candidateToEdit.phone"
                  />
                </v-col>
                <v-col md="6" sm="12"> </v-col>
              </v-row>
              <v-text-field
                placeholder="Address"
                v-model="candidateToEdit.address"
                label="Address"
              />
              <v-select
                v-model="candidateToEdit.stage"
                :items="stageOptions"
                label="Stage"
              >
              </v-select>
              <p>Resume</p>
              <p v-if="candidateToEdit.resume">
                Current:
                <a :href="candidateToEdit.resume">
                  {{ candidateToEdit.resume.split("/").pop() }}
                </a>
              </p>
              <v-file-input
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
                label="Resume"
                v-model="newResumeUpload"
              ></v-file-input>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="handleSave"
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
      {{ btnHtml }}
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { StagesMap } from "../utils/data";

const storeActions = mapActions("candidates", [
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
      stageOptions: Object.keys(StagesMap).map((key) => ({
        text: StagesMap[key],
        value: key,
      })),
      newResumeUpload: undefined, // needed to handle new file uploads
    };
  },
  components: {},
  methods: {
    ...storeActions,
    handleSave() {
      this.dialog = false;
      const { resume, ...candidateNoResumeKey } = this.candidateToEdit; // filter out resume key from object

      // if new file,  assign new file to resume key
      // else, we don't want to send candidateToEdit.resume since it's a string...
      // TODO: a bit hacky, maybe fix this if time
      if (typeof this.newResumeUpload !== undefined) {
        // check in case user cancels file upload
        if (this.newResumeUpload) {
          candidateNoResumeKey.resume = this.newResumeUpload;
          this.candidateToEdit.resume = this.newResumeUpload.name;
          window.console.log(this.newResumeUpload.name)
          this.updateCandidate(candidateNoResumeKey);
        }
      } else {
        this.updateCandidate(candidateNoResumeKey);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card__text {
  width: unset;
}
</style>
