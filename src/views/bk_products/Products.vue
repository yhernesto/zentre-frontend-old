<template>
  <Transition mode="out-in">
  <Suspense>
    <template #default>
  <div class="">
    <div class="gallery">
      <div
        v-for="(product, idx) in productController.AllProducts"
        :key="'prod_' + idx"
        class="cardProd"
      >
        <product-item :product="product" />
      </div>
      <q-btn @click="addNewProduct" color="green">Nuevo producto</q-btn>
    </div>
  </div>
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
  </Transition>
</template>

<script setup lang="ts">
import ProductItem from "@/views/products/components/productItem/ProductItem.vue";
import productController from "@/views/products/models/Product";

await productController.loadInfo();

const addNewProduct = () => {
  productController.addNewProductTemplate();
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
};
</script>

<style scoped>
@media (min-width: 501px) {
  .gallery {
    display: grid;
    gap: 13rem;
    grid-auto-rows: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
  }
}

@media (max-width: 500px) {
  .gallery {
    display: grid;
    gap: 13rem;
    grid-auto-rows: 1rem;
    margin-left: -10%;
    margin-right: -10%;
    grid-template-columns: repeat(auto-fill, minmax(1fr, 1fr));
  }
}

.cardProd {
  max-width: 450px;
  max-height: 100px !important;
  height: 99px !important;
}
</style>
