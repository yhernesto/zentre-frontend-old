<template>
  <PageWrapper :dateSelector="true">
    <!-- ================== -->
    <!-- === Cards Info === -->
    <!-- ================== -->
    <div class="row q-gutter-none q-mb-md">
			<div
				v-for="(cardArea, idx) in cardsArea"
				:key="'card_' + idx"
				class="col-12 col-sm-4 q-px-xs"
			>
				<CardArea
					v-bind="cardArea"
					@selected="cardSelected"
				/>
			</div>
		</div>
    <!-- ================== -->
    <!-- === TimeSeries === -->
    <!-- ================== -->
    <div class="row q-gutter-none q-mb-md">
      <div class="col-12 q-px-xs">
        <ChartTimeSeries v-bind="cardTimeSeries"/>
      </div>
    </div>

    <div class="row q-gutter-none q-mb-md">
      <!-- ======================== -->
      <!-- === Payments by Type === -->
      <!-- ======================== -->
      <div class="col-12 col-sm-6 q-px-xs">
        <ChartPie v-bind="cardPaymentsByType"/>
      </div>
      <!-- ======================== -->
      <!-- === Payments by Status === -->
      <!-- ======================== -->
      <div class="col-12 col-sm-6 q-px-xs">
        <ChartPie v-bind="cardPaymentsByStatus"/>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import {CARD_CODES} from './IDashboard'
import dashboard from "./Dashboard";
import { useI18n } from "vue-i18n";

// Components
import PageWrapper from "@/components/pageWrapper/PageWrapper.vue";
import CardArea, { type ICardArea } from "./components/cardArea/CardArea.vue";


import type { ICardTimeSeries } from "./components/chartTimeSeries/ChartTimeSeries.vue";
import ChartTimeSeries from "./components/chartTimeSeries/ChartTimeSeries.vue";

import type { ICardPie } from "./components/chartPie/ChartPie.vue";
import ChartPie from "./components/chartPie/ChartPie.vue";

// ********
const app: Controller = injectStrict("appController");

const { t } = useI18n({ useScope: 'global' })

/*************
Cards Area ***
**************/

const cardsArea: Array<ICardArea> = reactive([
  {
    code: CARD_CODES.SALES_NUMBER,
    title: "dashboard-card-sales-number",
    value: computed(() => dashboard.summaryStats?.current.sell_quantity || 0),
    prevValue: computed(() => dashboard.summaryStats?.prev.sell_quantity || 0),
    diffs: computed(() => 100 * ((dashboard.summaryStats?.current.sell_quantity || 0) - (dashboard.summaryStats?.prev.sell_quantity || 0)) / (dashboard.summaryStats?.prev.sell_quantity || 1)),
    from: computed(() => dashboard.summaryStats?.current.init_time),
    to: computed(() => dashboard.summaryStats?.current.finish_time),

    active: true,
    loading: computed(() => false)
  },
  {
    code: CARD_CODES.SALES_AMOUNT,
    title: "dashboard-card-sales-amount",
    value: computed(() => dashboard.summaryStats?.current.sells || 0),
    prevValue: computed(() => dashboard.summaryStats?.prev.sells || 0),
    diffs: computed(() => 100 * ((dashboard.summaryStats?.current.sells || 0) - (dashboard.summaryStats?.prev.sells || 0)) / (dashboard.summaryStats?.prev.sells || 1)),
    from: computed(() => dashboard.summaryStats?.current.init_time),
    to: computed(() => dashboard.summaryStats?.current.finish_time),
    currency: true,

    active: false,
    loading: computed(() => false)
  },
  {
    code: CARD_CODES.TICKETS,
    title: "dashboard-card-tickets",
    value: computed(() => dashboard.summaryStats?.current.ticket_avg || 0),
    prevValue: computed(() => dashboard.summaryStats?.prev.ticket_avg || 0),
    diffs: computed(() => 100 * ((dashboard.summaryStats?.current.ticket_avg || 0) - (dashboard.summaryStats?.prev.ticket_avg || 0)) / (dashboard.summaryStats?.prev.ticket_avg || 1)),
    from: computed(() => dashboard.summaryStats?.current.init_time),
    to: computed(() => dashboard.summaryStats?.current.finish_time),

    active: false,
    loading: computed(() => false)
  }
])

const cardSelected = function(cardCode : CARD_CODES): void{
  cardsArea.forEach((card: ICardArea) => card.active = card.code === cardCode)
}

/****************
 * TimeSeries ***
 ****************/
const cardTimeSeries: ICardTimeSeries = reactive({
  title: computed(() => t(cardsArea.find((card: ICardArea) => card.active)?.title || '')),
  loading: computed(() => false),
  series: [{
    type: 'areaspline',
    name: computed(() => t(cardsArea.find((card: ICardArea) => card.active)?.title || '' )),
    // data:  computed(() => dashboard.likes.rows)
    data:  computed(() => {
      if (!dashboard.summaryStats)
        return [[]]

      switch(cardsArea.find((card: ICardArea) => card.active)?.code) { 
        case CARD_CODES.SALES_NUMBER: {  
          return dashboard.summaryStats.current.stats_by_time?.map( log => [new Date(log.time).getTime(), log.sell_quantity]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
        } 
        case CARD_CODES.SALES_AMOUNT: {
          return dashboard.summaryStats.current.stats_by_time?.map( log => [new Date(log.time).getTime(), log.sells]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
        }
        case CARD_CODES.TICKETS: { 
          return dashboard.summaryStats.current.stats_by_time?.map( log => [new Date(log.time).getTime(), log.ticket_avg]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
        }
        default: {
          return [[]]
        } 
      }
    }),
    xAxis: 0
  },
  {
    type: 'areaspline',
    name: computed(() => t(cardsArea.find((card: ICardArea) => card.active)?.title || '') + ' (' + t("dashboard-chart-previous-period")+ ')'),
    // data: computed(() => dashboard.prvLikes.rows),
    data:  computed(() => {
      if (!dashboard.summaryStats)
        return [[]]

      switch(cardsArea.find((card: ICardArea) => card.active)?.code) { 
        case CARD_CODES.SALES_NUMBER: { 
          return dashboard.summaryStats.prev.stats_by_time?.map( log => [new Date(log.time).getTime(), log.sell_quantity]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
        } 
        case CARD_CODES.SALES_AMOUNT: {
          return dashboard.summaryStats.prev.stats_by_time?.map( log => [new Date(log.time).getTime(), log.sells]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
        }
        case CARD_CODES.TICKETS: { 
          return dashboard.summaryStats.prev.stats_by_time?.map( log => [new Date(log.time).getTime(), log.ticket_avg]).sort((a: number[], b: number[]) => a[0] > b[0] ? 1 : -1) || [[]]
        }
        default: { 
          return [[]]
        } 
      }
    }),
    xAxis: 1
  },
  ],
  xAxis: computed(() => {
    if (dashboard.summaryStats)
      return {
        from: new Date(dashboard.summaryStats.current.init_time),
        to: new Date(dashboard.summaryStats.current.finish_time)
      }
    return undefined;
  }),
  xAxisPrv: computed(() => {
    if (dashboard.summaryStats)
      return {
        from: new Date(dashboard.summaryStats.prev.init_time),
        to: new Date(dashboard.summaryStats.prev.finish_time)
      }
    return undefined;
  })
})

/*****************************
 ***    Payment by type    ***
 *****************************/
const cardPaymentsByType: ICardPie = reactive({
  title: computed(() => t('dashboard-payments-type')),
  tooltipFormatter: "- " + t('chart-pie-amount') + " {point.y}S/. ({point.percentage:.1f}%)<br/> -" + t('chart-pie-quantity') + ": {point.quantity:.1f}",
  data: computed(() => {
    return dashboard.paymentsByType.map((payment) => {
      return {
        name: payment.payment_type,
        y: Number(payment.amount),
        quantity: Number(payment.quantity),
        // color: "#7dec7c", // It could be sent from server
      }
    })
  })
})

/*******************************
 ***    Payment by status    ***
 *******************************/
const cardPaymentsByStatus: ICardPie = reactive({
  title: t('dashboard-payments-status'),
  tooltipFormatter: "- " + t('chart-pie-quantity') + " {point.y} ({point.percentage:.1f}%)",
  data: computed(() => {
    return dashboard.paymentsByStatus.map((payment) => {
      return {
        name: payment.status,
        y: Number(payment.quantity),
      }
    })
  })
})

// ============
// === Watcher
// ============
watch(
  () => app.period,
  () => {
    // dashboard.loadInfo(app.getDaysFromPeriod())
    dashboard.loadInfo(app.period)
    // dashboard.loadInfo(app.getRangesFromPeriod())
  },
  {immediate: true, deep: true}
)

</script>

<style scoped></style>
