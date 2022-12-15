<template>
  <CardSectionWrapper v-bind="{title: paymentTableRows.title}">
		<q-table
      :rows="paymentTableRows.rows"
      :columns="columns"
      row-key="mp_id"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <div v-if="$q.screen.gt.xs" class="col">
          <template v-for="(column) in columns">
            <q-toggle
              v-if="!column.required"
              v-model="visibleColumns"
              :val="column.name"
              :label="column.label"
            />
          </template>
        </div>
        <q-select
          v-else
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns.filter((column) => !column.required)"
          option-value="name"
          style="min-width: 150px"
        />

        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>

      <template #body-cell-date_approved="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $d(new Date(props.row.date_approved), 'long') }}
          </span>
        </q-td>
      </template>
      <template #body-cell-date_created="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $d(props.row.date_created, 'long') }}
          </span>
        </q-td>
      </template>
      <template #body-cell-transaction_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.transaction_amount)) }}
          </span>
        </q-td>
      </template>
      <template #body-cell-fee_details_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.fee_details_amount)) }}
          </span>
        </q-td>
      </template>
      <template #body-cell-trans_net_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.trans_net_amount)) }}
          </span>
        </q-td>
      </template>
      <template #body-cell-trans_total_amount="props">
        <q-td :props="props">
          <span style="white-space: initial;">
            {{ $n(Number(props.row.trans_total_amount)) }}
          </span>
        </q-td>
      </template>
    </q-table>
  </CardSectionWrapper>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import type { IPaymentList } from '@/views/dashboard/IDashboard';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import type { ICardSectionWrapper } from '@/components/cardSectionWrapper/CardSectionWrapper.vue';


export interface IPaymentTable extends ICardSectionWrapper{
		title: string;
	rows: Array<IPaymentList>

}

const paymentTableRows = defineProps<IPaymentTable>()

const visibleColumns: Ref<Array<string>> = ref([ 'mp_id', 'operation_type', 'card_id_type', 'card_id_number', 'date_approved', 'date_created', 'fee_details_amount', 'trans_net_amount', 'trans_total_amount' ])

const columns = [
  { name: 'mp_id', required: true, label: 'mp_id-label', field: 'mp_id', sortable: true},
	{ name: 'operation_type', required: true, label: 'operation_type', field: 'operation_type', sortable: true},
  { name: 'card_id_type', required: true, label: 'card_id_type', field: 'card_id_type', sortable: true},
  { name: 'card_id_number', required: true, label: 'card_id_number', field: 'card_id_number', sortable: true},
  { name: 'card_first_six_digits', required: false, label: 'card_first_six_digits', field: 'card_first_six_digits', sortable: true},
  { name: 'date_approved', required: true, label: 'date_approved', field: 'date_approved', sortable: true},
  { name: 'date_created', required: true, label: 'date_created', field: 'date_created', sortable: true},
  { name: 'api_call_id', required: false, label: 'api_call_id', field: 'api_call_id', sortable: true},
  { name: 'fee_details_amount', required: true, label: 'fee_details_amount', field: 'fee_details_amount', sortable: true},
  { name: 'fee_details_type', required: false, label: 'fee_details_type', field: 'fee_details_type', sortable: true},
  { name: 'installments', required: false, label: 'installments', field: 'installments', sortable: true},
  { name: 'order_type', required: false, label: 'order_type', field: 'order_type', sortable: true},
  { name: 'payment_method_id', required: false, label: 'payment_method_id', field: 'payment_method_id', sortable: true},
  { name: 'payment_type_id', required: false, label: 'payment_type_id', field: 'payment_type_id', sortable: true},
  { name: 'status', required: false, label: 'status', field: 'status', sortable: true},
  { name: 'status_detail', required: false, label: 'status_detail', field: 'status_detail', sortable: true},
  { name: 'taxes_amount', required: false, label: 'taxes_amount', field: 'taxes_amount', sortable: true},
  { name: 'transaction_amount', required: false, label: 'transaction_amount', field: 'transaction_amount', sortable: true},
  { name: 'trans_net_amount', required: true, label: 'trans_net_amount', field: 'trans_net_amount', sortable: true},
  { name: 'trans_total_amount', required: true, label: 'trans_total_amount', field: 'trans_total_amount', sortable: true}
]
</script>
