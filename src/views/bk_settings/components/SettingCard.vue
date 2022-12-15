<template>
  <div class="cardContainer">
    <div class="row">
      <div class="col-4">
        <q-img class="image-profile" :src="userPhoto" />
      </div>
      <div class="col-1"></div>
      <div class="col-7">
        <div class="row" style="gap: 5px">
          <div class="col-12">
            <q-input
              standout
              v-model="userEmail"
              :label="$t('settings-card-email')"
              disable
            />
          </div>
          <div class="col-12">
            <q-input
              standout
              v-model="userCountry"
              :label="$t('settings-card-country')"
              disable
            />
          </div>
          <div class="col-12">
            <q-input
              standout
              v-model="userName"
              :label="$t('settings-card-name')"
              disable
            />
          </div>
          <div class="col-12">
            <div v-for="(tenancy, index) in tenancies" :key="index">
              <q-chip
                clickable
                @click="openTenancy(tenancy)"
                color="primary"
                text-color="white"
                icon="event"
              >
                {{ tenancy.name }}
              </q-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import type {Controller} from "@/controller/Controller";
import {injectStrict} from "@/utils/injections";
import {ref} from "vue";
import type {ITenancies} from "@/models/user/IUser";
import { translate } from "@/plugins/i18n/i18n";
const app: Controller = injectStrict("appController");


const userEmail: Ref<string | undefined> = ref( app.user.m_profile?.email!)
const userName: Ref<string | undefined> = ref( app.user.m_profile?.userName!)
const userCountry: Ref<string | undefined> = ref( app.user.m_profile?.country)
const tenancies = app.user.m_profile?.tenancies!;

const emits = defineEmits<{
  (e: "tenancySelected", name: string, tenancy: ITenancies): void;
}>();

const openTenancy = (tenancy: ITenancies) => {
  emits("tenancySelected", tenancy.name!, tenancy);
};
</script>

<style scoped>
.cardContainer {
  position: relative;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.8);
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  max-width: 70vw;
  margin: 10px auto;
  top: -100px;
}
.image-profile {
  border-radius: 5%;
}
</style>
