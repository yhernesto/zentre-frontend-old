<template>
  <h6>{{ props.title }}</h6>
  <div class="col-xl-6 col-lg-6 col-sm-12 col-xs-12">
    <q-color v-model="colorModel" no-header-tabs class="my-picker" />
    <q-btn flat label="Cancel" color="primary" @click="cancelColor" />
    <q-btn flat label="Ok" color="primary" @click="confirmColor" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const colorModel = ref("#7000ff");

const props = defineProps<{
  hexColorModel: string;
  title: string;
}>();

colorModel.value = props.hexColorModel;

const emits = defineEmits<{
  (e: "changeColor", color: string): void;
  (e: "cancelColor"): void;
}>();

function cancelColor() {
  emits("cancelColor");
}

function confirmColor() {
  console.log("%c⧭", "color: #e50000", "function is emmited");
  emits("changeColor", colorModel.value);
}
</script>

<style></style>
