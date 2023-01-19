<template>
  <v-dialog v-model="visible" :fullscreen="$vuetify.display.xs" width="600" persistent scrollable @keydown.esc="close">
    <v-card>
      <v-toolbar dark class="flex-grow-0">
        <v-toolbar-title>Add review</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn text icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="formValid" lazy-validation>
          <v-text-field v-model="editedItem.authorName" label="plain" class="pb-2" dirty :rules="[required]">
            <template #label>
              <FormLabel label="Name" required />
            </template>
          </v-text-field>
          <v-text-field v-model="editedItem.authorContacts" label="anything" class="pb-2" dirty>
            <template #label>
              <FormLabel label="Contacts" />
            </template>
          </v-text-field>
          <v-text-field v-model="editedItem.authorInformation" label="anything" class="pb-2" dirty>
            <template #label>
              <FormLabel label="Personal info" />
            </template>
          </v-text-field>
          <v-textarea v-model="editedItem.subjectDescription" label="anything" class="pb-2" dirty :rules="[required]">
            <template #label>
              <FormLabel label="Description" required />
            </template>
          </v-textarea>
          <v-textarea v-model="editedItem.subjectOpinion" label="anything" dirty :rules="[required]">
            <template #label>
              <FormLabel label="Opinion" required />
            </template>
          </v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-0 pt-4 px-4">
        <v-row align="center" justify="center" no-gutters>
          <v-col>
            <v-row justify="center" no-gutters>
              <v-btn class="mx-2 mb-4" :disabled="!formValid" color="primary" @click="save"> Add </v-btn>
              <v-btn class="mx-2 mb-4" @click="close"> Close </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const { visible } = toRefs(props);

const emit = defineEmits(["saved", "update:visible"]);

const form = ref(null);

const formValid = ref(true);
const defaultItem = ref({
  authorName: "",
  authorContacts: "",
  authorInformation: "",
  subjectDescription: "",
  subjectOpinion: "",
});
const editedItem = ref({
  authorName: "",
  authorContacts: "",
  authorInformation: "",
  subjectDescription: "",
  subjectOpinion: "",
});

watch(visible, (newValue) => {
  if (newValue === true) {
    editedItem.value = JSON.parse(JSON.stringify(defaultItem.value));
  }
});

async function save() {
  if (form.value.validate()) {
    await useApiFetch("review", {
      method: "POST",
      body: editedItem.value,
    });

    close();
    emit("saved");
  }
}

async function close() {
  emit("update:visible", false);
}

function required(value) {
  return (value !== undefined && value !== null && value !== "") || "Requered";
}
</script>
