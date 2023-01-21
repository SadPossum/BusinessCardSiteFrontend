<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row no-gutters class="pb-4" justify="center" align="center">
          <v-col class="pa-4 pt-md-0 text-center text-md-start" :cols="descriptionCols">
            <div class="text-h3">Artem Prokudanov</div>
            <div class="text-h5">Fullstack C#/Js developer</div>
            <div class="pr-4 pt-4 text-h5">
              <div class="pb-4">Dynamic and motivated fullstack developer with 2 years of experience in commercial development.</div>

              <div class="pb-4">Skilled in C# (ASP.NET,PF, Xamarin, and Entity Framework), JavaScript (Vue.js), and SQL with Microsoft Server.</div>

              <div class="pb-4">Proficient in using Git and GitHub for version control and project collaboration.</div>
            </div>
          </v-col>
          <v-col class="order-first order-md-last">
            <v-img
              class="ml-auto mr-auto"
              min-height="100vh"
              min-width="75vh"
              max-height="125vh"
              max-width="100vh"
              src="/img/profile-photo.png"
            ></v-img>
          </v-col>
        </v-row>

        <div class="text-h3 py-8 text-center">Artem Prokudanov through the eyes of others</div>
        <v-no-ssr>
          <v-timeline
            align="start"
            justify="center"
            class="px-4 px-md-0"
            :density="$vuetify.display.mdAndDown ? 'compact' : 'default'"
            :side="$vuetify.display.mdAndDown ? 'end' : undefined"
            truncate-line="both"
            max-width="95%"
          >
            <v-timeline-item class="mb-12" size="80">
              <template v-slot:icon>
                <v-tooltip :open-delay="1000" :close-delay="0">
                  <template #activator="{ props }">
                    <v-btn size="x-large" icon outlined elevation="24" color="primary" v-bind="props" @click="makeReviewFormVisible()">
                      <v-icon size="large">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Add value</span>
                </v-tooltip>
              </template>
            </v-timeline-item>
            <v-timeline-item v-for="review in reviews" :key="review.id" :dot-color="review ? review.color : ''" size="small" max-width="95%">
              <div class="text-wrap">
                <h2 class="mt-n1 headline font-weight-light text-wrap" :style="`color: ${review ? review.color : ''}`">
                  {{ review ? review.authorName : "" }}
                </h2>
                <div v-if="review ? review.authorInformation : ''">
                  {{ review ? review.authorInformation : "" }}
                </div>
                <div v-if="review ? review.authorContacts : ''">
                  {{ review ? review.authorContacts : "" }}
                </div>
                <div class="pt-4">
                  {{ review ? review.subjectDescription : "" }}
                </div>
                <div class="pt-2">
                  {{ review ? review.subjectOpinion : "" }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-no-ssr>
      </v-col>
    </v-row>

    <ReviewForm v-model:visible="reviewFormVisible" @saved="handleSaved()" />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";

const display = ref(useDisplay());

const emit = defineEmits(["update:reviews"]);

const { data: reviews } = await useAsyncData("reviews", loadData);

const reviewFormVisible = ref(false);

// TODO Remove later. Quick fix for vuetify smAndDown true value before page update
const descriptionCols = ref(false);
watch(useDisplay().smAndDown, (val) => {
  descriptionCols.value = val ? 12 : false;
});

function makeReviewFormVisible() {
  reviewFormVisible.value = true;
}

async function loadData() {
  const response = await useApiFetch("review");

  response.sort((a, b) => (a.id < b.id ? 1 : -1));
  const reviewsWithColor = response.map((a) => ({
    ...a,
    color: getColorByString(a.authorName),
  }));
  return reviewsWithColor;
}

const handleSaved = () => refreshNuxtData("reviews");

function getColorByString(string) {
  var hash = 0;
  if (string.length === 0) return hash;
  for (var i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var rgb = [0, 0, 0];
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}
</script>
