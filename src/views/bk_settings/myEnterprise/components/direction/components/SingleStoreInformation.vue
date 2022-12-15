<template>
  <q-item
    clickable
    class="item-store storeContainer"
    @click="selecStore(
      { position: { lat: props.store.latitude, lng: props.store.longitude } })"
  >
    <q-item-section avatar>
      <q-icon name="mdi-storefront" style="color: #a7b0c4" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" style="color: #000000; align-self: flex-start"
      >LOCAL {{ props.store.store.toUpperCase() }}
      </q-item-label>
      <q-item-label
        style="color: #000000; align-self: flex-start"
        caption
        lines="1"
      >{{
          props.store.address.length > 10
            ? props.store.address.substring(0, 25) + " ..."
            : props.store.address
        }}
      </q-item-label>
    </q-item-section>
    <q-item-section avatar @click="editStore()">
      <q-icon name="mdi-pencil-outline" style="color: #049dd9" />
    </q-item-section>
    <q-item-section avatar @click="deleteStore()">
      <q-icon name="mdi-close-outline" style="color: #b22222" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type {IPosition, IStore} from "@/views/settings/myEnterprise/components/direction/IDirection";

const props = defineProps<{
  store: IStore
}>();

const emits = defineEmits<{
  (e: 'deleteStore', store: IStore): void;
  (e: 'editStore', store: IStore): void;
  (e:'selectStore', position:IPosition) : void;
}>()


const deleteStore=() => {
  emits('deleteStore', props.store);
}

const editStore = () => {
  emits('editStore', props.store);
}

const selecStore = (position: IPosition) => {
  emits('selectStore', position );
}
</script>

<style scoped>
.storeContainer{
  width: 320px;
}

@media (max-width: 1049px) {
  .storeContainer{
    width: 60vw;
    max-width: 500px;
    min-width: 320px;
  }
}
@media (min-width: 1050px) {
  .storeContainer{
    width: 17vw;
  }
}
</style>