<template>
<div class="containerBackground">
  <q-page class="q-py-md q-mx-lg ">
    <!-- Header -->
    <div
      class="row q-gutter-none q-mb-md"
    >
      <div
        v-if="dateSelector" 
        class="col items-end"
      >
        <DateSelector />
      </div>
    </div>
    <!-- Body -->
    <div class="q-mb-md">
      <slot></slot>
    </div>
    <!-- Footer -->
  </q-page>
  </div>
</template>

<script setup lang='ts'>
  import DateSelector from '@/components/dateSelector/DateSelector.vue';

  defineProps<{
    dateSelector?: boolean;
  }>()

</script>
<style scoped>
.containerBackground{
  background-color: #F6F6F6;
}
</style>
