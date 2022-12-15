<template>
    <div
    v-for="(phone, index) in props.phones"
    :key="index"
    >
      <SinglePhone :phone="phone" />
    </div>
</template>

<script setup lang="ts">
import type {IPhone} from "@/views/myEnterprise/components/direction/IDirection";
import SinglePhone from "@/views/myEnterprise/components/direction/components/SinglePhone.vue";



const props = defineProps<{
  phones: Array<IPhone>
}>()

</script>

<style scoped>

</style>