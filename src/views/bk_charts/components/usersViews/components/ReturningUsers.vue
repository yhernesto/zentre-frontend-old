<template>
  <highcharts :options="reactiveChartOptions"></highcharts>
</template>

<script lang="ts" setup>

//LINK: keep reactivity: https://stackoverflow.com/questions/70631273/vuejs3-reactivity-of-props-object
//LINK: EXPOSEEE -> https://vuejs.org/guide/typescript/composition-api.html#typing-component-template-refs
import { computed, ref, toRef, watch } from "vue";

const props = defineProps<{
  chartOptions: any
}>();

const reactiveChartOptions = toRef(props, 'chartOptions');
function updateChart(_chartOptions: any) {
  console.log("im being used")
  reactiveChartOptions.value = _chartOptions;
}

defineExpose({
  reactiveChartOptions,
  updateChart
})
const highcharts = ref(null);


watch(
  () => reactiveChartOptions,
  () => {
    console.log("props changeddddd");
    console.log(reactiveChartOptions.value.series, "ññññ")
  },
  {immediate: true, deep: true}
)
</script>

<style scoped>

</style>