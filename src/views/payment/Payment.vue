<template>
  <PageWrapper :dateSelector="true">
    <!-- ==================== -->
    <!-- === Payment List === -->
    <!-- ==================== -->
    <div class="row q-gutter-none q-mb-md">
      <div class="col-12 q-px-xs">
        <PaymentsTable :title="$t('dashboard-payment-list')" :rows="payment.paymentList"/>
      <!-- paymentList: {{ dashboard.paymentList }} -->
      </div>
    </div>
	</PageWrapper>
</template>
<script setup lang="ts">
import { watch } from "vue";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";

// Components
import PageWrapper from "@/components/pageWrapper/PageWrapper.vue";
import PaymentsTable from './components/paymentsTable/PaymentsTable.vue';
import payment from "./Payment";

// ********
const app: Controller = injectStrict("appController");


watch(
  () => app.period,
  () => {
    // dashboard.loadInfo(app.getDaysFromPeriod())
    payment.loadInfo(app.period)
  },
  {immediate: true, deep: true}
)
</script>
<style scoped>
</style>