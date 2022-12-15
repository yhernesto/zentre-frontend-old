<template>
  <div>
    <q-toolbar>
      <q-btn flat @click="menuClicker" round dense icon="menu" />

      <!-- Title -->
      <q-toolbar-title>
        <span style="font-size: 28px;">Zentre</span>
      </q-toolbar-title>

      <q-space />

      <q-btn
        v-for="(_environment, _idx) in Controller.environments()"
        :key="'for_' + _idx"
        class="q-mx-xs"
        padding="xs lg"
        color="primary"
        round
        @click="app.environment = _environment.code"
        :disable="_environment.disabled"
      >
        <span style="font-size: 12px">{{$t(_environment.label)}}</span>
      </q-btn>
      

      <q-space />
      <!-- ================= -->
      <!-- === User Info === -->
      <!-- ================= -->
      <div class="row q-gutter-none" style="width: 220px">
        <div class="col-4">
          <q-img v-if="userProfile?.photo"
            :src="userProfile.photo"
            color="secondary"
            text-color="white"
            loading="eager"
            class="icon-account"
          />
          <q-img v-else
            src="@/assets/noAccountPhoto.png"
            color="secondary"
            text-color="white"
            loading="eager"
            class="icon-account"
          />
        </div>
        <div class="col-8">
          <div class="row q-gutter-none">
            <div class="col-12">
              <q-btn-dropdown stretch flat :label="userProfile?.userName" class="q-pl-none">
                <q-list>
                  <q-item-label header>{{ $t('menu-settings') }}</q-item-label>
                  <q-item :disabled="true" clickable v-close-popup tabindex="0">
                    <q-item-section avatar>
                      <q-avatar
                        icon="settings"
                        color="secondary"
                        text-color="white"
                      ></q-avatar>
                    </q-item-section>
                    <!-- <q-item-section v-on:click="goToSetting"> -->
                    <q-item-section>
                      <q-item-label>{{ $t('menu-settings') }}</q-item-label>
                      <q-item-label caption>{{ $t('menu-settings-dropdown') }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="info"></q-icon>
                    </q-item-section>
                  </q-item>
                  <q-separator inset spaced></q-separator>
                  <q-item clickable @click="doLogout()">
                    <q-item-section>{{ $t("menu-logout") }}</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="col-12">
              <div class="email-text">{{ userProfile?.email }}</div>
            </div>
          </div>
        </div>        
      </div>
    </q-toolbar>
  </div>
</template>

<script setup lang="ts">
import router, { ROUTER_NAME } from "../../plugins/router";
import  { Controller } from "../../controller/Controller";
import { injectStrict } from "../../utils/injections";

const app: Controller = injectStrict("appController");
const menuClicker = () => {
  app.drawer = !(app.drawer);
  app.miniState = !(app.miniState);
};

const userProfile = app.user.profile;

// Methods

const goToSetting = async () => {
  await router.push({ name: ROUTER_NAME.SETTINGS });
};

const doLogout = async function (): Promise<void> {
  await app.user.logout();
  await router.push({ name: ROUTER_NAME.LOGIN });
};

</script>

<style lang="sass" scoped>
.minegocio-title
  font-size: 25px
  padding-bottom: 15px

.online-badge
  position: absolute
  left: 130px
  top: 30px
  background-color: #ffffff
  color: #000000

.logo-img
  height: 55px
  width: 150px

.email-text
  text-overflow: ellipsis
  width: 130px

.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em

  & + &
    margin-top: 18px

.headerTool
  padding-top: 0px !important

.icon-account
  height: 45px
  width: 55px
  border-radius: 50%
  margin-bottom: 10px
  margin-top: 7px
</style>
