<template >
  <div v-if="props.singleHourRange.from !== undefined" class="row justify-evenly">
    <div class="col-5">
      <q-input outlined v-model="props.singleHourRange.from" mask="time" :rules="['time', timeRule]">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="props.singleHourRange.from">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="col-5">
      <q-input outlined v-model="props.singleHourRange.to" mask="time" :rules="['time', timeRule]">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="props.singleHourRange.to">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IHourRange} from "@/views/settings/myEnterprise/components/schedule/models/ISchedule";

const props = defineProps<{
  singleHourRange: IHourRange,
}>();

const timeRule = (): string | boolean => {
  if (props.singleHourRange.from && props.singleHourRange.to && props.singleHourRange.from > props.singleHourRange.to)
    return 'Min hour should be upper than max hour'
  return true
}

</script>

<style scoped>
</style>