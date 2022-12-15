<template>
  <q-drawer
    v-model="app.drawer"
    :show-if-above="!isMobile"
    @mouseover="app.miniState = false"
    @mouseout="app.miniState = true"
    :mini="app.miniState"
    :width="200"
    :breakpoint="100"
    bordered
    style="background-color: #f0f7fb"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <template
          v-for="(route, index) in routesToShow"
          :key="'for_' + index"
        >
          <q-item clickable :to="route.path" :disable="isDisabled(route)">
            <q-item-section avatar>
              <q-icon :name="getRouteIcon(route.meta)" />
            </q-item-section>
            <q-item-section>
              {{ $t(getRouteLabel(route.meta))}}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import type Controller from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import type { RouteMeta, RouteRecordRaw } from "vue-router";
import router from "@/plugins/router";
import { computed } from "vue";


const app: typeof Controller = injectStrict("appController");
const isMobile: boolean = window.innerWidth < 500;

const routes = router.options.routes;

const routesToShow = computed(() => {
  return routes.filter((e) => app.getMenu.find((_itemMenu) => _itemMenu.code === e.name))
});

const isDisabled = (_route: RouteRecordRaw): boolean | undefined => {
  return app.getMenu.find((_itemMenu) => _itemMenu.code === _route.name)?.disabled
}

const getRouteIcon = (
  _routeMeta: RouteMeta | undefined
): string | undefined => {
  if (_routeMeta && typeof _routeMeta.icon == "string") return _routeMeta!.icon;
  return undefined;
};

const getRouteLabel = (
  _routeMeta: RouteMeta | undefined
): string => {
  if (_routeMeta && typeof _routeMeta.label == "string") return _routeMeta!.label;
  return "";
};
</script>

<style></style>
