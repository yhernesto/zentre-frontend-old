<template>
  <CardSectionWrapper v-bind="cardPie">
    <div
      :id="divId"
      style="height:100%; width:100%; position:relative;"
      class="q-py-xs"
    ></div>
  </CardSectionWrapper>
</template>
<script setup lang="ts">
import { onMounted, watch } from "vue";
import ChartPie from "./ChartPie";
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import type { ICardSectionWrapper } from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import type { PointOptionsObject } from "highcharts";

export interface ICardPie extends ICardSectionWrapper {
  title: string;
  tooltipFormatter?: string;
  data: Array<number | [string, number | null] | null | PointOptionsObject>;
}

const cardPie = defineProps<ICardPie>()

const getRandomIdToRendChart = function() {
  const randomIdString: string =
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);
  return randomIdString;
};

const divId: string = getRandomIdToRendChart();
const _pie: ChartPie = new ChartPie(divId);

watch(
  () => cardPie.data,
  () => {
    _pie.data = cardPie.data;
  },
  { immediate: true, deep: true }
);

watch(
  () => cardPie.tooltipFormatter,
  () => {
    _pie.tooltipFormatter = cardPie.tooltipFormatter
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  _pie.createChart();
});
</script>

<style scoped lang="scss">
</style>
