<template>
  <div class="whole-container">
    <div
      v-for="(collaborator, index) in teamController.teamList"
      :key="'collab' + index"
    >
      <TeamTable
        :collaborator="collaborator"
        @edit-collaborator="editCollaboratorModal"
      />
      <br />
    </div>

    <q-btn icon="add" round color="primary" @click="openModal"></q-btn>

    <q-dialog v-model="opened" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            Integrante
            <q-btn
              style="margin-left: 300px"
              icon="close"
              flat
              round
              dense
              v-close-popup
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model="newMember.name"
            :label="$t('team-dialog-name')"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <br />
          <q-input
            outlined
            v-model="newMember.email"
            :label="$t('team-dialog-email')"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <br />
          <q-select
            outlined
            v-model="newMember.jobTitle"
            label="Job Title"
            :options="teamController.$jobTitleOptions"
            emit-value
            option-value="code"
            option-label="title"
            map-options
          />
          <br />

          <vue-tel-input
            style="height: 55px; margin-right: 5px"
            autoDefaultCountry
            v-model="newMember.compleateNumber"
            :inputOptions="{
              placeholder: 'Telefono',
            }"
          ></vue-tel-input>
          <br />
          <q-select
            outlined
            v-model="newMember.phoneType"
            :options="phoneTypes"
            label="Tipo de telefono"
            emit-value
            map-options
          />
          <br />
          <q-select
            outlined
            v-model="selectedStoreId"
            :options="teamController.localOptions"
            :label="$t('team-dialog-store-name')"
          />
          <br />
          <q-toggle
            v-model="newMember.state"
            checked-icon="check"
            color="green"
            :label="
              newMember.state === true ? 'Estado activo' : 'Estado Inactivo'
            "
            unchecked-icon="clear"
          />
          <br />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            style="background-color: green; color: white"
            label="Guardar"
            v-close-popup
            @click="saveNewMember"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import TeamTable from "@/views/settings/myEnterprise/components/team/teamTable/TeamTable.vue";
import teamController from "@/views/settings/myEnterprise/components/team/teamTable/models/Team";
import { onMounted, reactive, ref, type Ref } from "vue";
import type {
  IJobTitle,
  ILocalOptions,
  ITeam,
  ITeamSave,
} from "./teamTable/models/ITeam";
import directionController from "@/views/settings/myEnterprise/components/direction/direction";
import { number } from "@intlify/core-base";
import { translate } from "@/plugins/i18n/i18n";
teamController.loadInfo();
const opened = ref(false);
const isNew = ref(false);
const selectedStoreId: Ref<ILocalOptions | null> = ref(null);
const idForExistingCollaborator = ref(0);

const phoneTypes: Array<{ label: string; value: string }> = [
  {
    label: translate("global-phone-mobile"),
    value: "MOB",
  },
  {
    label: translate("global-phone-tel"),
    value: "TEL",
  },
];

const openModal = () => {
  newMember.jobTitle = "";
  newMember.name = "";
  newMember.email = "";
  newMember.compleateNumber = "";
  newMember.phone = 0;
  newMember.phoneType = "";
  newMember.countryCode = 0;
  newMember.state = true;
  isNew.value = true;
  opened.value = true;
};
let newMember: ITeamSave = reactive({
  name: "",
  email: "",
  jobTitle: "",
});
const saveNewMember = () => {
  newMember.countryCode = Number(newMember.compleateNumber?.split(" ")[0]);
  newMember.phone = Number(
    newMember.compleateNumber?.split(" ").slice(1).join("")
  );
  opened.value = false;
  teamController.saveCollaborator(
    newMember,
    isNew.value,
    idForExistingCollaborator.value,
    selectedStoreId.value
  );
};

function editCollaboratorModal(p_collab: ITeam) {
  selectedStoreId.value = teamController.getStoreById(p_collab.storeId!)[0];
  idForExistingCollaborator.value = p_collab.id;
  newMember.email = p_collab.email!;
  newMember.name = p_collab.name;
  newMember.jobTitle = p_collab.jobTitle;
  newMember.compleateNumber =
    "+" + p_collab.countryCode.toString() + p_collab.phone?.toString();
  newMember.phone = p_collab.phone;
  newMember.phoneType = p_collab.phoneType;
  newMember.state = true;
  isNew.value = false;
  opened.value = true;
}

function isValidEmail() {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(newMember.email) || "Invalid email";
}
</script>
<style scoped>
.dialog-badge {
  max-width: 5px !important;
  height: 100px;
}
.whole-container {
  margin-top: 5vh;
}
</style>
