<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <div class="row justify-start q-my-sm">
        <div class="col">
          <p
            style="font-weight: bold; opacity: 0.6 !important;"
            class="aumentedFontSize"
          >
            {{ cardSection.title }}
          </p>
        </div>
      </div>

      <div
        class="row q-gutter-none"
        style="width: 100%"
      >
        <div class="col-12">
          <slot>
          </slot>
        </div>
        <q-inner-loading
          :showing="cardSection.loading"
          label="Please wait..."
          label-style="font-size: 1.1em"
        >
          <q-spinner-bars color="purple" />
        </q-inner-loading>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
export interface ICardSectionWrapper {
  title?: string;
  loading?: boolean;
}

const cardSection = defineProps<ICardSectionWrapper>()

</script>