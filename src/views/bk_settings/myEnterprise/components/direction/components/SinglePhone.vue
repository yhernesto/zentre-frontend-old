<template>
  <div class="phoneContainer">
    <h6>{{ props.phone.phone}}</h6>
  </div>

</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import type {IPhone} from "@/views/settings/myEnterprise/components/direction/IDirection";

const props = defineProps<{
  phone: IPhone
}>()
</script>

<style scoped>
.phoneContainer{
  display: flex !important;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
  0 15px 40px rgba(166, 173, 201, 0.2);
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  max-width: 70vw;
  margin: 10px auto;
}
</style>