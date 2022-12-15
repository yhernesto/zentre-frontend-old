<template>
  <highcharts :options="props.chartOptions"></highcharts>
</template>

<script lang="ts" setup>

//
// const chart = ref<HTMLElement | null>(null);
// chart.value?.focus();
import { defineProps } from "vue";

const props = defineProps<{
  chartOptions: any;
}>();


function updateChart (){
  console.log("")
}
</script>

<style scoped>

</style>