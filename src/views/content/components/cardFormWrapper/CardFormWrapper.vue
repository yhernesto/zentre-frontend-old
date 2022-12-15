<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <div class="row justify-between q-my-sm">
        <div class="col">
          <p style="font-weight: bold; opacity: 0.6 !important;">
            {{ cardSection.config.title }}
          </p>
        </div>
        <div v-if="cardSection.config.display !== undefined" class="col-2">
          <q-toggle v-model="cardSection.config.display" style="float: right;"/>
        </div>
      </div>
      <div v-if="cardSection.config.description">
        <div v-if="editingDescription" class="row justify-center q-my-sm">
          <div class="col-4" style="text-align: center;">
            <q-input
              borderless
              input-style="text-align: center;"
              v-model="cardSection.config.description"
              autogrow
              :autofocus="editingDescription"
              @blur="editingDescription = false"
            />
          </div>
        </div>
        <div v-else class="row justify-center q-my-sm">
          <div class="col-6 q-py-sm"
               style="text-align: center; cursor: pointer !important; width: fit-content;"
               @click="editingDescription = true"
          >
          <!-- <q-input
              borderless
              input-style="text-align: center;"
              v-model="cardSection.config.description"
              autogrow
              readonly
              style="cursor: pointer !important;"
            >
              <template v-slot:append>
                <q-icon name="edit" />
              </template>
            </q-input> -->
            <span >{{cardSection.config.description}}</span><q-icon name="edit" />
          </div>
        </div>
      </div>

      <div
        class="row justify-center q-my-sm"
        style="width: 100%"
      >
        <slot>
        </slot>
        <q-inner-loading
          :showing="cardSection.config.loading"
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
import { ref, type Ref } from 'vue';
import type { CCardFormWrapper } from './CardFormWrapper';

export interface ICardFormWrapper {
  config: CCardFormWrapper
}

const cardSection = defineProps<ICardFormWrapper>()

const editingDescription : Ref<boolean> = ref(false)

</script>