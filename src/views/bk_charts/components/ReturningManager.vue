<template>
  <q-splitter v-model="splitterModel" class="splitter-arg">
    <template v-slot:before>
      <q-tabs
        v-model="tabSelectedForUserView"
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
          style="height: 200px"
          name="acquisition"
          icon="fa fa-eye"
          label="Acquisition "
        />
        <q-tab
          style="height: 200px"
          name="behaviour"
          icon="fa fa-users"
          label="Behaviour"
        />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-select
        v-model="categorySelected"
        emit-value
        map-options
        :options="categoryOptions"
      />
      <q-tab-panels
        v-model="tabSelectedForUserView"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="acquisition" class="individual-tab">
          <ReturningUsers ref="returningUsers" :chart-options="chartOptions" />
        </q-tab-panel>

        <q-tab-panel name="behaviour">
          <ReturningUsers ref="returningUsers" :chart-options="chartOptions" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script lang="ts" setup>
import ReturningUsers from "@/views/charts/components/usersViews/components/ReturningUsers.vue";
import { computed, reactive, ref, watch } from "vue";
import type { IAnalyticsAudienceGenResponse } from "@/views/charts/models/IAudienceTypes";

const props = defineProps<{
  chartInformation: IAnalyticsAudienceGenResponse;
}>();
const tabSelectedForUserView = ref("acquisition");
const acquisitionCategories = [
  {
    label: "Users",
    val: "users",
  },
  {
    label: "New Users",
    val: "new users",
  },
  {
    label: "Sessions",
    val: "sessions",
  },
];
const behaviourCategories = [
  {
    label: "Bounce Rate",
    val: "bounceRate",
  },
  {
    label: "Views Per Session",
    val: "viewsPerSession",
  },
  {
    label: "Session Duration",
    val: "avgSessionDuration",
  },
];
const categorySelected = ref(acquisitionCategories[0].val);
//LINK: computed documentation -> https://vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods
let categoryOptions = computed(() => {
  return tabSelectedForUserView.value == "acquisition"
    ? acquisitionCategories
    : behaviourCategories;
});

const splitterModel = ref(25);

const chartData = computed(() => {
  switch (categorySelected.value) {
    case "users":
      return props.chartInformation.data.map((e) => {
        return [e.name, e.users];
      });

    case "new users":
      return props.chartInformation.data.map((e) => {
        return [e.name, e.newUsers];
      });

    case "sessions":
      return props.chartInformation.data.map((e) => {
        return [e.name, e.sessions];
      });

    case "bounceRate":
      return props.chartInformation.data.map((e) => {
        return [e.name, e.bounceRate];
      });

    case "viewsPerSession":
      return props.chartInformation.data.map((e) => {
        return [e.name, e.sessions];
      });

    case "avgSessionDuration":
      return props.chartInformation.data.map((e) => {
        return [e.name, e.sessions];
      });
  }
});
console.log({chartData})

const chartOptions = reactive({
  title: {
    text: "Returning VS New Users",
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      type: "pie",
      allowPointSelect: true,
      keys: ["name", "y"],
      data: chartData,
      showInLegend: true,
    },
  ],
  legend: {
    maxHeight: 90,
  },
  chart: {
    animation: {
      duration: 1000,
    },
  },
});

const returningUsers = ref<InstanceType<typeof ReturningUsers> | null>(null);
watch(tabSelectedForUserView, (act) => {
  /*returningUsers.value.updateChart(
    props.chartInformation.data.map((e) => {
      return [e.name, e.sessions];
    })
  );*/
  console.log(returningUsers.value);
  if (act == "acquisition") {
    categorySelected.value = acquisitionCategories[0].val;
  }
  if (act == "behaviour") {
    categorySelected.value = behaviourCategories[0].val;
  }
});
</script>

<style scoped></style>
