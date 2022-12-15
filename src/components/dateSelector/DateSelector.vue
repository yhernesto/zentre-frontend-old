<template>
  <div class="row justify-end">
    <div class="col self-center text-right">
      <q-btn-toggle
        v-model="app.period"
        class="q-mr-sm"
        dense
        toggle-color="amber-5"
        no-caps
        :options="periodList"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
  import { injectStrict } from '../../utils/injections';
  import type { Controller } from '../../controller/Controller';
  import { PeriodList } from "../../utils/dates";
  import { useI18n } from 'vue-i18n';


  const { t } = useI18n({ useScope: 'global' })
  const app: Controller = injectStrict('appController');

  const periodList = PeriodList.map((period) => { return {label: t(period.label), value: period.value}})

</script>