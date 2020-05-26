<template>
  <div style="display: inline-block">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text>
          <v-form>
            <v-container>
              <h2>Info</h2>

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
                <v-col md="6" sm="12">
                  <v-text-field
                    v-model="candidateToEdit.email"
                    :rules="emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                placeholder="Address"
                v-model="candidateToEdit.address"
                label="Address"
              />

              <br />
              <h2>Review</h2>
              <br />

              <v-select
                v-model="candidateToEdit.stage"
                :items="stageOptions"
                label="Stage"
              >
              </v-select>

              <v-textarea
                label="Comments"
                v-model="candidateToEdit.comments"
              ></v-textarea>
              <br />
              <h2>Resume</h2>
              <br />

              <v-file-input
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf, image/*"
                label="Resume"
                v-model="newResumeUpload"
              ></v-file-input>
              <p v-if="candidateToEdit.resume">
                Current:
                <a :href="candidateToEdit.resume">
                  {{ candidateToEdit.resume.split("/").pop() }}
                </a>
              </p>
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
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
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
      if (this.newResumeUpload) {
        // check in case user cancels file upload
        if (this.newResumeUpload) {
          candidateNoResumeKey.resume = this.newResumeUpload;
          this.candidateToEdit.resume = this.newResumeUpload.name;
          window.console.log(this.newResumeUpload.name);
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
<style scoped></style>
