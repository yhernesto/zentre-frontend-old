<template>
  <Suspense>
    <template #default>
      <div class="row">
        <div class="cardContainer col-xl-10 col-md-10 col-sm-12">
          <q-splitter v-model="splitterModel" class="splitter-arg">
            <template v-slot:before>
              <q-tabs
                v-model="tabSelectedForUserView"
                vertical
                align="justify"
                switch-indicator
                mobile-arrows
                stretch
                no-caps
                content-class="my-special-class"
                active-class="my-active-class"
                :breakpoint="500"
                class="text-teal"
              >
                <q-tab
                  style="height: 120px"
                  name="views"
                  icon="fa fa-eye"
                  label="Views"
                />
                <q-tab
                  style="height: 120px"
                  name="users"
                  icon="fa fa-users"
                  label="Users"
                />
                <q-tab
                  style="height: 120px"
                  name="sessions"
                  icon="fa fa-archive"
                  label="Sessions"
                />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tabSelectedForUserView"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="views" class="individual-tab">
                  <UsersView :chart-opt="chartOptionsForViews" />
                </q-tab-panel>

                <q-tab-panel name="users">
                  <UsersView :chart-opt="chartOptionsForUsers" />
                </q-tab-panel>

                <q-tab-panel name="sessions">
                  <UsersView :chart-opt="chartOptionsForSessions" />
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </div>

        <div class="cardContainer col-xl-10 col-md-10 col-sm-12">
          <DevicesManager :chart-information="userViewController.chartAudienceDevices" />
        </div>

        <div class="cardContainer col-xl-10 col-md-10 col-sm-12">
          <ReturningManager :chart-information="userViewController.chartAudienceTypes" />
        </div>
        <div class="cardContainer col-xl-10 col-md-10 col-sm-12">
         <AudiencePerDayController />
        </div>
      </div>
    </template>
    <template #fallback>
      <div>
        <h6>Cargando...</h6>
        <UiCardSkeleton />
      </div>

    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import UsersView from "@/views/charts/components/usersViews/components/usersView.vue";
import { reactive, ref, watch } from "vue";
import DeviceConecctions from "./components/usersViews/components/deviceConecctions.vue";
import userViewController from "./chartsController";
import UiCardSkeleton from "../../components/skeletons/UiCardSkeleton.vue";
import ReturningManager from "@/views/charts/components/ReturningManager.vue";
import DevicesManager from "@/views/charts/components/DevicesManager.vue";
import AudiencePerDay from "@/views/charts/components/usersViews/components/AudiencePerDay.vue";
import AudiencePerDayController from "@/views/charts/components/AudiencePerDayController.vue";

await userViewController.loadInfo();
const tabSelectedForUserView = ref("views");
const splitterModel = ref(25);

const chartOptionsForViews = reactive(
  userViewController.getChartOptions("views")
);
const chartOptionsForUsers = reactive(
  userViewController.getChartOptions("users")
);
const chartOptionsForSessions = reactive(
  userViewController.getChartOptions("sessions")
);
</script>

<style scoped>
.cardContainer {
  display: flex !important;
  box-shadow: 0px 5px 10px 0px rgba(0, 255, 255, 0.7);
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  max-width: 70vw;
  margin: 10px auto;
  justify-content: center;
}
.splitter-arg {
  max-height: 400px;
  min-width: 69vw;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
}
.my-active-class {
  color: black;
  background-color: #ecf5f2;
  border-radius: 5%;
  margin-right: 5px;
  margin-left: 5px;
}

.my-active-class:before {
  content: "";
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(-45deg, #fff95b 0%, #ff930f 100%);
  transform: translate3d(0px, 5px, 0) scale(0.95);
  filter: blur(20px);
  opacity: var(0.7);
  transition: opacity 0.3s;
  border-radius: inherit;
}

.my-active-class::after {
  content: "";
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: inherit;
  border-radius: inherit;
}
</style>
