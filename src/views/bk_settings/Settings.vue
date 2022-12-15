<template>
  <div class="column" style="height: 85vh">
    <div class="col-4 first-container">
      <div class="text-h4" style="margin-left: 10px; margin-top: 10px">
        {{ $t("settings-tittle") }}
      </div>
    </div>
    <div class="col-8 second-container">
      <SettingCard @tenancy-selected="tenancyWasSelected" />
      <q-btn
        :label="$t('settings-edit-btn')"
        color="green"
        @click="editUser"
        class="edit-user-btn"
      />
    </div>
  </div>
  <q-dialog v-model="alert">
    <TenanciesDialog
      :tenancy-selected="tenancySelected"
      @close-dialog="alert = false"
    />
  </q-dialog>

  <q-dialog v-model="modelForEditUser">
    <EditUserDialog
      :user="editedUser"
      @user-saved="saveUser"
      @change-image="changeUserImage"
      @change-credentials="changeUserCredentials"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import SettingCard from "@/views/settings/components/SettingCard.vue";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import { reactive, ref } from "vue";
import type {
  IProfile,
  IProfileForEditigCredentials,
  IProfileForEditing,
  ITenancies,
} from "@/models/user/IUser";
import type User from "@/models/user/User";
import EditUserDialog from "@/views/settings/components/EditUserDialog.vue";
import TenanciesDialog from "@/views/settings/components/TenanciesDialog.vue";
import settingsController from "@/views/settings/Settings";
import { useI18n } from "vue-i18n";
import type { IPrivacy } from "./ISettings";
const app: Controller = injectStrict("appController");
const alert = ref(false);
const modelForEditUser = ref(false);
const { t, locale } = useI18n({ useScope: "global" });

let tenancySelected: ITenancies = reactive(app.user.m_profile?.tenancies[0]!);
const tenancyWasSelected = reactive(
  (tenancyName: string, tenancy: ITenancies) => {
    tenancySelected = Object.assign({}, tenancy);
    alert.value = true;
  }
);

const editedUser: IProfileForEditing = reactive({
  language: "",
  lastName: "",
  firstName: "",
  country: "",
  userName: "",
});
const editedCredentials: IProfileForEditigCredentials = reactive({
  oldPassword: "",
  newPassword: "",
  email: app.user.m_profile?.email! ?? "",
});
function editUser() {
  //TODO: i this this should not work like this
  //TODO do i really need to pass the password???
  console.log(app.user.m_profile);
  editedUser.language = app.user.m_profile?.language ?? "";
  editedUser.lastName = app.user.m_profile?.lastName ?? "";
  editedUser.userName = app.user.m_profile?.userName ?? "";
  editedUser.country = app.user.m_profile?.country ?? "";
  editedUser.firstName = app.user.m_profile?.firstName ?? "";
  modelForEditUser.value = true;
}

const changeUserCredentials = (
  email?: string,
  isEmailEditing?: boolean,
  isPasswordEditing?: boolean,
  oldPassword?: string,
  newPassword?: string
) => {
  let privacyData: IPrivacy;
  if (isEmailEditing && !isPasswordEditing) {
    privacyData = {
      newEmail: email!,
    };
  } else if (isPasswordEditing && !isEmailEditing) {
    privacyData = {
      currentPassword: oldPassword!,
      newPassword: newPassword!,
    };
  } else if (isEmailEditing && isPasswordEditing) {
    privacyData = {
      newEmail: email!,
      currentPassword: oldPassword!,
      newPassword: newPassword!,
    };
  }
  settingsController.editUserPrivacy(app.user.m_profile?.email!, privacyData!);
};

const saveUser = async (user: IProfileForEditing) => {
  await settingsController.saveEditedUser(user, app.user.m_profile?.email!);
};

function changeUserImage(formData: FormData, email?: string) {
  settingsController.editUserPhoto(email!, formData);
}
</script>

<style scoped>
.first-container {
  background-color: #23c6ff;
  color: #f0f7fb;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.second-container {
  background-color: #fff;
}
.edit-user-btn {
  margin: 0;
  position: absolute;
  top: 75%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
