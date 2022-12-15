<template>
  <div class="q-pa-md all-page-cnt">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <!-- ================== -->
      <!-- === Login Page === -->
      <!-- ================== -->
      <template v-if="app.loadingConfig">
        <div>
          Loading policy....
        </div>
      </template>

      <template v-else-if="useRoute().name === undefined || useRoute().name == 'LOGIN'">
        <router-view v-if="!(app.loadingConfig)" />
      </template>

      <template v-else>
        <!-- ======================= -->
        <!-- === TOOLBAR         === -->
        <!-- ======================= -->
        <q-header elevated class="toolbar-cnt">
          <Toolbar/>
        </q-header>

        <!-- ======================= -->
        <!-- === MENU DRAWER     === -->
        <!-- ======================= -->
        <NavigationDrawer/>

        <!-- ======================= -->
        <!-- === MAIN PAGE       === -->
        <!-- ======================= -->
        <q-page-container>
          <q-page class="page-cnt" v-if="!(app.loadingConfig)" >
            <router-view />
          </q-page>
        </q-page-container>
      </template>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";

import Toolbar from '@/components/toolbar/Toolbar.vue'
import NavigationDrawer from "@/components/navigationDrawer/NavigationDrawer.vue";
import { useRoute } from "vue-router";

const app: Controller = injectStrict("appController");

</script>

<style lang="sass" scoped>
.all-page-cnt
  padding: 0

.page-cnt
  background-color: #ffffff

.toolbar-cnt
  background-color: #2bacdf
  height: 65px
</style>
