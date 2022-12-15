<template>
  <q-btn round class="color-btn" @click="selectColor">
    <q-icon v-if="props.color.selected" name="check" />
  </q-btn>
</template>

<script lang="ts" setup>
import type { IColor } from "../models/IMyPage";
import myPageController from "../MyPage";

const props = defineProps<{
  color: IColor;
}>();
const color = props.color.color;

const emits = defineEmits<{
  (e: "colorSelected", color: IColor): void;
}>();

function selectColor() {
  emits("colorSelected", props.color);
}
</script>
<style scoped>
.color-btn {
  background-color: v-bind(color);
}
</style>
