<template>  <q-card>
  <q-card-section>
    <div class="text-h6">{{ props.tenancySelected.name }}</div>
    <q-img
      :src="props.tenancySelected.logo"
      style="height: 100px; width: 200px"
    />
  </q-card-section>

  <q-card-section class="q-pt-none">
    Is Active: {{ props.tenancySelected.isActive }}
  </q-card-section>
  <q-card-section class="q-pt-none">
    <div class="text-h6">
      Description: {{ props.tenancySelected.description }}
    </div>
  </q-card-section>

  <q-card-actions align="right">
    <q-btn flat label="OK" color="primary" v-close-popup @click="closeDialog"/>
  </q-card-actions>
</q-card>
</template>

<script setup lang="ts">
import type {ITenancies} from "@/models/user/IUser";

const props = defineProps<{
  tenancySelected: ITenancies
}>();
const emits = defineEmits<{
  (e:'closeDialog'): void;
}>();
const closeDialog = () => {
  emits('closeDialog');
}
</script>

<style scoped>

</style>