<template>
  <Suspense>
    <template #default>
      <div v-if="schedule">
        <div v-for="(range, _rangeIdx) in schedule.ranges"
              class="row items-center"
        >
          <HourRange :single-hour-range="range" class="col-md-10"/>
          <div class="col-md-2">
            <q-btn
              round
              :color="schedule.ranges.length >= 2 ? 'red' : 'blue'"
              :icon="schedule.ranges.length >= 2 ? 'remove' : 'add'"
              @click="schedule && schedule.ranges.length >= 2 ? removeRange(_rangeIdx) : addRange()"
              class="btn-add-hours"
            />
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import type {ISchedule} from "@/views/settings/myEnterprise/components/schedule/models/ISchedule";
import HourRange  from "@/views/settings/myEnterprise/components/schedule/components/daySchedule/component/HoursRange.vue";

const props = defineProps<{
  schedule: ISchedule | undefined // even if it can be undefined, it should avoid render this component when is undefined
}>();

const removeRange = function(rangeIdx: number){
  if (props.schedule)
    props.schedule.ranges.splice(rangeIdx, 1);
}

const addRange = function(){
  if (props.schedule)
    props.schedule.ranges.push({from: '', to: ''})
}
</script>

<style scoped>
</style>