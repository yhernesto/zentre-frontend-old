<template>
  <q-card
    class="cursor-pointer q-hoverable my-card"
    :class="cardArea.active ? 'my-card-active' : ''"
    flat
    bordered
    clickable
    @click="$emit('selected', cardArea.code)"
  >
    <q-card-section horizontal>
      <q-card-section
        style="width: 100%; padding-left: 8px; padding-right: 0px"
        class="q-py-xs"
      >
        <div class="row q-gutter-none justify-center">
          <p
            class="q-mb-xs"
            disabled
            style="font-weight: bold;"
          >
            {{ $t(cardArea.title) }}
          </p>
        </div>
        <div class="row q-gutter-none justify-center">
          <span class="app-text-title">
            {{ cardArea.currency ? 'S/. ' + $n(cardArea.value, 'decimal') : $n(cardArea.value, isDecimal(cardArea.value) ? 'decimal' : '') }}
          </span>
        </div>
        <div class="row q-gutter-none justify-center">
          <q-chip
            :color="cardArea.diffs > 0 ? 'green' : 'red'"
            text-color="white"
            :icon="cardArea.diffs > 0 ? 'arrow_upward' : 'arrow_downward'"
          >
            {{ $n(cardArea.diffs, 'decimal') }}%
            <q-tooltip anchor="center right" self="center left">
              {{ $t("dashboard-card-previous-value")}}:             {{ cardArea.currency ? 'S/. ' + $n(prevValue, 'decimal') : $n(prevValue, isDecimal(prevValue) ? 'decimal' : '') }} 
            </q-tooltip>
          </q-chip>
        </div>
        <div class="row q-gutter-none justify-center">
          <span
            class="app-text-subtitle2 q-mt-xs"
            disabled
          >{{ $t('dashboard-than-last-period') }}</span>
        </div>
        <div class="row q-gutter-none justify-center">
          <span
            class="app-text-subtitle2 q-mt-xs"
            disabled
          >
            {{ cardArea.from ? $d(cardArea.from) : "" }} - {{ cardArea.to ? $d(cardArea.to) : "" }}
          </span>
        </div>
      </q-card-section>

    </q-card-section>
    <q-inner-loading
      :showing="cardArea.loading"
      label="Please wait..."
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<script setup lang="ts">
import type { CARD_CODES } from '../../IDashboard.js';
import { isDecimal } from '@/utils/validations';

export interface ICardArea{
  code: CARD_CODES;
  title: string;
  value: number;
  prevValue: number;
  diffs: number;
  from?: Date;
  to?: Date;
  currency?: boolean;

  active?: boolean;
	loading?: boolean;
}

const cardArea = defineProps<ICardArea>()

const emit = defineEmits<{
  (e: 'selected', value: CARD_CODES): void
}>()

</script>

<style lang="scss" scoped>
.my-card {
  transition: box-shadow .3s;
  border-radius: 8px;
  text-align: center;
}
.my-card-active {
  box-shadow: 0px 0px 15px rgba(34, 34, 34, 0.2) !important; 
}

.app-less{
    @extend .app-text-subtitle;
    color: red;
}
.app-greater{
    @extend .app-text-subtitle;
    color: green;
}
.app-text-title {
    font-size: 28px ;
    font-weight: bold;
}
.app-text-subtitle {
    font-size: 14px ;
    font-weight: bold;
}
.app-text-subtitle2 {
    font-size: 10px ;
    font-weight: bold;
}
</style>