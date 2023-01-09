<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-row no-gutters class="pb-4" justify="center" align="center">
          <v-col class="pa-4 pt-sm-0">
            <div class="text-h3">Artem Prokudanov</div>
            <div class="text-h5">Junior Fullstack C#/Js developer</div>
            <div class="pr-4 pt-4 text-h5">
              <div class="pb-4">
                Dynamic and motivated fullstack developer with 2 years of
                experience in commercial development.
              </div>

              <div class="pb-4">
                Skilled in C# (ASP.NET,PF, Xamarin, and Entity Framework),
                JavaScript (Vue.js), and SQL with Microsoft Server.
              </div>

              <div class="pb-4">
                Proficient in using Git and GitHub for version control and
                project collaboration.
              </div>
            </div>
          </v-col>
          <v-col class="order-first order-sm-last">
            <v-img
              min-height="100vh"
              min-width="75vh"
              src="/img/ProfilePhoto.png"
            ></v-img>
          </v-col>
        </v-row>

        <div class="text-h3 py-8 text-center">
          Artem Prokudanov through the eyes of others
        </div>
        <v-no-ssr>
          <div
            :class="($vuetify.display.mdAndUp ? 'text-center' : '') + ' pt-8'"
          >
            <v-tooltip :open-delay="1000" :close-delay="0">
              <template #activator="{ props }">
                <v-btn
                  size="x-large"
                  icon
                  outlined
                  elevation="24"
                  color="primary"
                  v-bind="props"
                  @click="makeReviewFormVisible()"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Add value</span>
            </v-tooltip>
          </div>
          <v-timeline
            align="start"
            justify="center"
            class="px-4 px-md-0"
            :density="$vuetify.display.smAndDown ? 'compact' : 'default'"
            :side="$vuetify.display.smAndDown ? 'end' : undefined"
          >
            <v-timeline-item
              v-for="review in reviews"
              :key="review.id"
              :dot-color="review ? review.color : ''"
              size="small"
            >
              <div>
                <h2
                  class="mt-n1 headline font-weight-light"
                  :style="`color: ${review ? review.color : ''}`"
                >
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
const emit = defineEmits(["update:reviews"]);

const { data: reviews } = await useAsyncData("reviews", loadData);

const reviewFormVisible = ref(false);

function makeReviewFormVisible() {
  reviewFormVisible.value = true;
}

async function loadData() {
  const response = await $fetch("http://localhost:5000/review");
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
