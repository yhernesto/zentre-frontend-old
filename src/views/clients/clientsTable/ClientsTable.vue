<template>
  <div class="q-pa-md">
    <!-- <q-table 
      title="Clients"
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="none"
      rows-per-page-label="Total products per page"
      v-model:pagination="pagination"
      hide-pagination
    >
    <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-italic text-purple"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
     </q-table>
     <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>-->
  </div>
</template>

<script setup lang="ts">

</script>


<style scoped>
</style>