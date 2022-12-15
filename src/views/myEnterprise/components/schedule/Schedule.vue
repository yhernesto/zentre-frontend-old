<template>
  <Suspense>
    <template #default>
      <div>
        <q-select rounded
                  outlined
                  v-model="selectedStore"
                  :options="teamController.localOptions"
                  label="Store"
                  emit-value
                  map-options
        />

        <q-form @submit="onSubmit" class="q-gutter-md">
          <div v-if="selectedStore"
              v-for="(weekDay) in weekDays"
              class="row q-pt-md"
          >
            <div class="col-md-2 text-h6">
              {{ $t(weekDay.label) }}
            </div>

            <div class="col-md-2">
              <q-toggle
                :modelValue="scheduleController.getIsOpened(weekDay.weekday)"
                @update:modelValue="(isOpened: any) => isOpened ? scheduleController.openScheduleByDay(weekDay.weekday) : scheduleController.closeScheduleByDay(weekDay.weekday)"
                checked-icon="check"
                color="green"
                :label="scheduleController.getIsOpened(weekDay.weekday) ? 'On' : 'Off'"
                unchecked-icon="clear"
              />
            </div>

            <div class="col-md-8">
                <DaySchedule v-if="scheduleController.getScheduleByDay(weekDay.weekday)"
                        :schedule="scheduleController.getScheduleByDay(weekDay.weekday)"
                />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col justify-center">
              <q-btn :label="$t('general-save')" type="submit" color="primary"/>
            </div>
          </div>
        </q-form>
        <!-- <q-btn @click="saveInformation">SAVE</q-btn> -->
      </div>
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {ref, watch} from "vue";
import { useQuasar } from "quasar";
import weekDays from "@/utils/weekDay";
import scheduleController from "@/views/myEnterprise/components/schedule/Schedule";
import teamController from "@/views/myEnterprise/components/team/teamTable/models/Team";
import DaySchedule from "@/views/myEnterprise/components/schedule/components/daySchedule/DaySchedule.vue";
import {useI18n} from "vue-i18n";
import type { ILocalOptions } from "../team/teamTable/models/ITeam";

const { t } = useI18n({ useScope: 'global' })

await teamController.loadInfo();

const selectedStore: Ref<ILocalOptions | null> = ref(teamController.localOptions[0] || null)

const $q = useQuasar();
const onSubmit = async () => {
  await scheduleController.saveSchedule();
  $q.notify({
    type: "positive",
    position: 'top',
    message: t('general-saved')
  });
}

watch(
  () => selectedStore,
  async () => {
    if (selectedStore.value)
      await scheduleController.loadInfo(selectedStore.value.id);
  },
  {immediate: true, deep: true}
)

</script>

<style scoped>
</style>
