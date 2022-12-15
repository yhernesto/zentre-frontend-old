<template>
  <Suspense>
    <template #default>
      <div>
        <div>
          <highcharts :options="chartOptions"></highcharts>
          <q-dialog v-model="userViewController.showDialog">
            <selected-country />
          </q-dialog>
        </div>
      </div>
    </template>
    <template #fallback>
      <ListSkeleton />
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import userViewController from "@/views/charts/chartsController";
import { toRef } from "vue";
import SelectedCountry from "@/views/charts/components/usersViews/components/selectedCountry.vue";
import ListSkeleton from "../../../../../components/skeletons/ListSkeleton.vue";

//NOTE: This is the used library
//LINK: https://www.npmjs.com/package/highcharts-vue

const props = defineProps<{
  chartOpt: any;
}>();

const chartOptions = toRef(props, "chartOpt");
</script>

<style scoped></style>
