<template>
  <Suspense>
    <template #default>
      <div class="contains-all">
        <div id="q-app" class="tabs-pos">
          <q-tabs
            v-model="tab"
            align="justify"
            narrow-indicator
            active-color="pink-13"
            active-bg-color="grey-1"
            mobile-arrows
            style="margin-left: -23px; margin-right: -22px; height: 60px"
          >
            <q-tab
              icon="power_settings_new"
              class="text-purple individual-tab generalTab aligment"
              name="general"
              :label="$t('my-enterprise-tab-general')"
            ></q-tab>
            <q-tab
              icon="location_on"
              class="text-blue individual-tab directionTab aligment"
              name="direction"
              :label="$t('my-enterprise-tab-direction')"
            ></q-tab>
            <q-tab
              icon="schedule"
              class="text-orange individual-tab horarioTab aligment"
              name="horario"
              :label="$t('my-enterprise-tab-schedule')"
            ></q-tab>
            <q-tab
              icon="group_add"
              class="text-teal individual-tab equipoTab aligment"
              name="equipo"
              :label="$t('my-enterprise-tab-team')"
            ></q-tab>
          </q-tabs>
        </div>

        <div id="q-app" class="forms-cont form-stl">
          <div class="q-gutter-y-sm">
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="scale"
              transition-next="scale"
              class="text-white text-center firstTab"
            >
              <q-tab-panel name="general">
                <General />
              </q-tab-panel>
            </q-tab-panels>

            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="fade"
              transition-next="fade"
              class="text-white text-center firstTab"
            >
              <q-tab-panel name="equipo">
                <Team />
              </q-tab-panel>
            </q-tab-panels>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="fade"
              transition-next="fade"
              class="text-white text-center firstTab"
            >
              <q-tab-panel name="direction">
                <Direction />
              </q-tab-panel>
            </q-tab-panels>

            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-down"
              class="text-center firstTab"
            >
              <q-tab-panel name="horario">
                <Suspense>
                  <Schedule />
                </Suspense>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <h3>Cargando</h3>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import General from "./components/general/General.vue";
import Team from "./components/team/Team.vue";
import Schedule from "@/views/settings/myEnterprise/components/schedule/Schedule.vue";
import Direction from "@/views/settings/myEnterprise/components/direction/Direction.vue";
import directionController from "@/views/settings/myEnterprise/components/direction/direction";
directionController.loadInfo();
const tab: Ref<string> = ref("general");
</script>

<style scoped>
.form-stll {
  max-height: 84vh;
  height: 84vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: aqua !important;
}
.firstTab {
  background-color: #ffffff;
  padding-bottom: 0px;
}

.contains-all {
  min-height: 100%;
  position: relative;
  background-color: #ffffff;
  margin-top: -15px;
}

.form-stl {
  padding-top: 70px;
  padding-bottom: 0;
  margin-bottom: 0;
}

.tabs-pos {
  background-color: #ffffff;
  top: 0;
  height: 70px;
  left: 0;
  position: absolute;
  right: 0;
}

.directionTab {
  background-color: #faead5;
}

.horarioTab {
  background-color: #fdf6d1;
}

.equipoTab {
  background-color: #d1e7c3;
}
.generalTab {
  background-color: rgb(249, 205, 255);
}

.individual-tab {
  height: 50px;
  padding-top: 5px;
}

@media (max-width: 600px) {
  .aligment {
    justify-content: flex-start;
  }
}
</style>
