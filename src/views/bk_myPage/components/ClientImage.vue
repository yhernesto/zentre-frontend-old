<template>
  <q-img
    class="logo-img"
    v-if="props.imageUrl && props.imageUrl.length > 0"
    fit="fill"
    clickable
    :src="props.imageUrl"
  >
    <q-icon
      class="absolute all-pointer-events logo-icon"
      size="32px"
      name="info"
      color="blue-grey-10"
    ></q-icon>
    <q-tooltip
      class="bg-indigo"
      transition-show="scale"
      transition-hide="scale"
      :offset="[10, 10]"
    >
      {{ tooltipMsg }}
    </q-tooltip>
  </q-img>
  <q-img
    class="logo-img"
    fit="fill"
    clickable
    v-else
    src="@/assets/no_image.jpg"
  >
    <q-icon
      class="absolute all-pointer-events logo-icon"
      size="32px"
      name="info"
      color="blue-grey-10"
      style="top: 50%; left: 8px"
    ></q-icon>
    <q-tooltip
      class="bg-indigo"
      transition-show="scale"
      transition-hide="scale"
      :offset="[10, 10]"
    >
      {{ tooltipMsg }}
    </q-tooltip>
  </q-img>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tooltipMsg: string;
  imageUrl: string | null;
}>();
</script>

<style scoped>
.logo-img {
  cursor: pointer;
}

.logo-icon {
  color: darkgray;
  visibility: hidden;
}
.logo-icon:hover {
  color: darkgray;
  visibility: visible;
}
</style>
