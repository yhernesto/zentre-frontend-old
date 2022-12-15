<template>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="saveStore">Save</button>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import type { IStoreSave } from "@/views/settings/myEnterprise/components/direction/IDirection";

const props = defineProps<{
  open: boolean;
  newStore: IStoreSave;
}>();

const emits = defineEmits<{
  (e: "save", newStore: IStoreSave): void;
}>();

const saveStore = () => {
  emits("save", props.newStore);
};
</script>

<style></style>
