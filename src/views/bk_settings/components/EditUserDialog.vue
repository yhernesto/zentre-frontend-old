<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6" style="display: grid; justify-items: center">
        {{ $t("settings-dialog-tittle") }}
        <q-btn
          style="margin-left: 500px; margin-top: 0px"
          icon="close"
          flat
          round
          dense
          v-close-popup
        />
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row">
        <div class="col-12">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              name="general"
              :label="$t('settings-dialog-tab-name-general')"
            />
            <q-tab
              name="privacy"
              :label="$t('settings-dialog-tab-name-privacy')"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="privacy">
              <br />
              <q-input
                outlined
                v-model="email"
                type="email"
                :label="$t('settings-dialog-privacy-email')"
                :rules="[(val) => isValidEmail(val) || 'Email is invalid']"
              >
                <template v-slot:before>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <br />
              <q-separator />
              <br />
              <q-btn
                label="modificar constraseña"
                v-if="!isPasswordEditing"
                style="margin-left: 27%"
                @click="editPassword"
              />
              <q-input
                v-model="oldPassword"
                v-if="isPasswordEditing"
                outlined
                :type="isPwd ? 'password' : 'text'"
                :label="$t('settings-dialog-privacy-old-password')"
                :rules="[
                  (val) =>
                    val !== newPassword ||
                    'Contraseña no puede ser la misma que la anterior',
                ]"
              >
                <template v-slot:before>
                  <q-icon name="password" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <br />
              <q-input
                v-model="newPassword"
                v-if="isPasswordEditing"
                outlined
                :type="isPwd ? 'password' : 'text'"
                :label="$t('settings-dialog-privacy-password')"
                :rules="[
                  (val) =>
                    val !== oldPassword ||
                    'Contraseña no puede ser la misma que la anterior',
                  (val) =>
                    val.length >= 8 ||
                    'Contraseña debe tener al menos 8 caracteres',
                ]"
              >
                <template v-slot:before>
                  <q-icon name="password" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <br />
              <q-input
                v-model="repitedPassword"
                v-if="isPasswordEditing"
                outlined
                :type="isPwd ? 'password' : 'text'"
                :label="$t('settings-dialog-privacy-password-confirm')"
                :rules="[
                  (val) => val === newPassword || 'Contraseñas no son iguales',
                  (val) =>
                    val.length >= 8 ||
                    'Contraseña debe tener al menos 8 caracteres',
                ]"
              >
                <template v-slot:before>
                  <q-icon name="password" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-tab-panel>

            <q-tab-panel name="general">
              <div class="row">
                <div class="col-4 col-img">
                  <q-img
                    class="img-editing-dialog"
                    src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
                  />
                  <input
                    ref="fileInput"
                    type="file"
                    style="display: none"
                    accept=".jpg, .jpeg, .png"
                    @change="onFileSelected"
                  />
                  <q-btn
                    class="btn-change-img"
                    :label="$t('settings-dialog-general-change-photo-btn')"
                    color="white"
                    push
                    text-color="blue"
                    @click="$refs.fileInput.click()"
                  />
                </div>
                <div class="col-1"></div>
                <div class="col-7">
                  <br />
                  <q-input
                    outlined
                    v-model="props.user.firstName"
                    :label="$t('settings-dialog-general-first-name')"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <br />
                  <q-input
                    outlined
                    v-model="props.user.lastName"
                    :label="$t('settings-dialog-general-last-name')"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <br />
                  <q-input
                    outlined
                    v-model="props.user.userName"
                    :label="$t('settings-dialog-general-username')"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <br />
                  <q-input
                    outlined
                    v-model="props.user.country"
                    :label="$t('settings-dialog-general-country')"
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <br />
                  <q-input
                    outlined
                    v-model="props.user.language"
                    label="Language"
                    disable
                    :rules="[(val) => !!val || 'Field is required']"
                  />
                  <br />
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="center" class="text-primary">
      <q-btn
        style="background-color: green; color: white"
        label="Guardar"
        v-close-popup
        :disable="disableBtn"
        @click="saveUser"
      >
        <q-tooltip :v-if="tooltipMsg.length > 1" class="bg-accent">{{
          tooltipMsg
        }}</q-tooltip></q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref, watch, type Ref } from "vue";
import type { IProfileForEditing } from "@/models/user/IUser";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import { useI18n } from "vue-i18n";
import { validateEmailFormat } from "@/utils/validations";

const { t, locale } = useI18n({ useScope: "global" });
const app: Controller = injectStrict("appController");
const props = defineProps<{
  user: IProfileForEditing;
}>();

const emits = defineEmits<{
  (e: "userSaved", user: IProfileForEditing): void;
  (e: "changeImage", formData: FormData, userEmail?: string): void;
  (
    e: "changeCredentials",
    email: string,
    isEmailEditing: boolean,
    isPasswordEditing: boolean,
    oldPassword?: string,
    newPassword?: string
  ): void;
}>();

const tab = ref("general");
const saveUser = () => {
  if (tab.value === "general") {
    emits("userSaved", props.user);
  } else {
    emits(
      "changeCredentials",
      email.value,
      isEmailEditing.value,
      isPasswordEditing.value,
      oldPassword.value,
      newPassword.value
    );
  }
};

const isEmailEditing = ref(false);
const isPasswordEditing = ref(false);
const disableBtn = ref(false);
const email = ref(app.user.m_profile?.email!);
const isPwd = ref(true);
const oldPassword: Ref<string> = ref("");
const newPassword: Ref<string> = ref("");
const repitedPassword = ref("");
let selectedFile: string | Blob = new Blob();
let formData = new FormData();

const onFileSelected = function (event: any) {
  selectedFile = event.target.files[0];
  formData = new FormData();
  formData.append("image", selectedFile);
  emits("changeImage", formData, email.value);
};
const tooltipMsg = ref("");

function editPassword() {
  isPasswordEditing.value = true;
}

const isValidEmail = (email: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(email) || "Invalid email";
};

watch(repitedPassword, (val) => {
  disableBtn.value = val !== newPassword.value;
  tooltipMsg.value = disableBtn.value ? "Contraseñas no son iguales" : "";
});
watch(newPassword, (val) => {
  disableBtn.value = repitedPassword.value !== val;
  if (disableBtn.value) tooltipMsg.value = "Contraseñas no son iguales";
  if (val === oldPassword.value) {
    disableBtn.value = true;
    tooltipMsg.value = "Contraseña no cambiada";
  } else tooltipMsg.value = "";
});
watch(oldPassword, (val) => {
  disableBtn.value = val === newPassword.value;
  tooltipMsg.value = "Contraseña no cambiada";
});

watch(email, (val) => {
  isEmailEditing.value = val !== app.user.m_profile?.email;
});
watch(disableBtn, (val) => {
  if (!val) tooltipMsg.value = "";
});
</script>

<style scoped>
.img-editing-dialog {
  margin-top: 50%;
  border-radius: 10%;
}
.btn-change-img {
  margin-top: 20%;
  margin-left: 15%;
}
.col-img {
  margin-top: 20%;
}
</style>
