<template>
  <q-splitter v-model="splitterModel" class="splitter-arg">
    <template v-slot:before>
      <q-tabs
        v-model="tabSelected"
        vertical
        align="justify"
        switch-indicator
        mobile-arrows
        stretch
        no-caps
        content-class="my-special-class"
        active-class="my-active-class"
        :breakpoint="500"
        class="text-teal"
      >
        <q-tab
          style="height: 120px"
          name="users"
          icon="fa fa-eye"
          label="Users"
        />
        <q-tab
          style="height: 120px"
          name="sessions"
          icon="fa fa-users"
          label="Sessions"
        />
        <q-tab
          style="height: 120px"
          name="bounceRate"
          icon="fa fa-archive"
          label="Bounce Rate"
        />
        <q-tab
          style="height: 120px"
          name="sessionDuration"
          icon="fa fa-archive"
          label="Session Duration"
        />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="tabSelected"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="users" class="individual-tab">
          <AudiencePerDay :chart-options="chartOptions" />
        </q-tab-panel>

        <q-tab-panel name="sessions">
          <AudiencePerDay :chart-options="chartOptions" />
        </q-tab-panel>

        <q-tab-panel name="bounceRate">
          <AudiencePerDay :chart-options="chartOptions" />
        </q-tab-panel>
        <q-tab-panel name="sessionDuration">
          <AudiencePerDay :chart-options="chartOptions" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script lang="ts" setup>

import { computed, reactive, ref, watch } from "vue";
import AudiencePerDay from "@/views/charts/components/usersViews/components/AudiencePerDay.vue";
import type { IAnalyticsViewsResponse } from "@/views/charts/models/IAnalyticsViews";
import chartsController from "@/views/charts/chartsController";
const tabSelected = ref("users");
const audienceInformation: IAnalyticsViewsResponse = chartsController.chartGeneralAudience!;
const splitterModel = ref(25)

const chartData = computed(() => {
  switch (tabSelected.value) {
    case "users":
      return audienceInformation.dates.map(e => {
        return [new Date(e.date!).toLocaleDateString(), e.users]
      })

    case "sessions":
      return audienceInformation.dates.map((e) => {
        return [new Date(e.date!).toLocaleDateString(), e.sessions];
      });

    case "bounceRate":
      return audienceInformation.dates.map((e) => {
        return [new Date(e.date!).toLocaleDateString(),e.bounceRate];
      });

    case "sessionDuration":
      return audienceInformation.dates.map((e) => {
        return [new Date(e.date!).toLocaleDateString(), e.sessionDuration];
      });

  }
})



const chartOptions = reactive( {
  title: {
    text: "General Audience",
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      data: chartData
    }
  ]
})

watch(
  () => chartData,
  () => {
    console.log({chartData})
  },
  {immediate: true, deep: true}
)
</script>

<style scoped>

</style>