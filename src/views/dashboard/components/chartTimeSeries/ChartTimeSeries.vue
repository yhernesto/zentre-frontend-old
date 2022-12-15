<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <div
        class="row q-gutter-none"
        style="width: 100%"
      >
        <div class="col-12">
          <div
            :id="divId"
            style="height:100%; width:100%; position:relative;"
            class="q-py-xs"
          >
          </div>
        </div>
        <q-inner-loading
          :showing="cardTimeSeries.loading"
          label="Please wait..."
          label-style="font-size: 1.1em"
        >
          <q-spinner-bars color="purple" />
        </q-inner-loading>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import type { ICardSectionWrapper } from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import type { SeriesAreasplineOptions } from 'highcharts';
import type { IDateRange } from '../../IDashboard';
import ChartTimeSeries from './ChartTimeSeries'

export interface ICardTimeSeries extends ICardSectionWrapper{
    title: string;
    series: Array<SeriesAreasplineOptions>,
    xAxis?: IDateRange;
    xAxisPrv?: IDateRange;
}

const cardTimeSeries = defineProps<ICardTimeSeries>()

const divId: string = '_' + Math.random().toString(36).substr(2, 9)
const _timeSeries: ChartTimeSeries = new ChartTimeSeries(divId);

watch(
    () => cardTimeSeries.series,
    () => {
      _timeSeries.series = cardTimeSeries.series
    },
    { immediate: true, deep: true },
);

watch(
    () => cardTimeSeries.xAxis,
    () => {
        _timeSeries.renderDateRange = cardTimeSeries.xAxis
    },
    { immediate: true, deep: true },
);
watch(
    () => cardTimeSeries.xAxisPrv,
    () => {
        _timeSeries.renderPrvDateRange = cardTimeSeries.xAxisPrv
    },
    { immediate: true, deep: true },
);

onMounted(() => {
    _timeSeries.createChart();
});
</script>