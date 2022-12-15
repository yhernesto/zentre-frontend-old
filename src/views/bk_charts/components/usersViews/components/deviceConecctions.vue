<template>
  <highcharts :options="props.chartOptions"></highcharts>
</template>

<script lang="ts" setup>
import { seriesType } from "highcharts";

const props = defineProps<{
  chartOptions: any
}>();
</script>

<style></style>
