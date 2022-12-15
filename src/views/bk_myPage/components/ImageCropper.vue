<template>
  <q-card>
  <Cropper
    ref="cropper"
    :src="props.imageSrc"
    :debounce="false"
    class="upload-example-cropper cropper"
    :stencil-props="{
		aspectRatio: 1,
		movable: true,
		resizable: true
	}"
    :stencil-component="CircleStencil"
    @change="change"
  />

  <q-btn label="Upload" @click="uploadImage" />

  <Preview
    :width="120"
    :height="120"
    :image="imageCopped.image"
    :coordinates="imageCopped.coordinates"
  />
  <br>
<q-img :src="imggg.src" />
  </q-card>
</template>

<script lang="ts" setup>
import { Cropper,CircleStencil, Preview } from "vue-advanced-cropper";
import { onMounted, ref, watch } from "vue";

//NOTE: Template REFS using vue 3 and typescript
//LINK: https://vuejs.org/guide/typescript/composition-api.html#typing-template-refs
const cropper = ref<HTMLInputElement | any | null>(null);
cropper.value?.focus();

const props = defineProps<{
  imageSrc: string
}>()

const imageCopped: any = ref({ coordinates: null, image: null });
let imggg = new Image();


function change({ coordinates, image, canvas }: any) {
  imageCopped.value = {
    coordinates: coordinates,
    image: image
  };
  const url = canvas.toDataURL("image/png");

  imggg.src = url;
  console.log({ imggg });
  const formdata = new FormData();
  formdata.append("image", imggg.src);
  console.log({ formdata });
}


function uploadImage(this: any) {
const {canvas} = cropper.value.getResult();
if(canvas){
  const formdata = new FormData();
  canvas.toBlob((blob: string | Blob) => {
    formdata.append('image', blob);
    emits('imageSaved', formdata);
  }, 'image/jpg')
}
}

const emits = defineEmits<{
  (e: 'imageSaved', form: FormData): void;
}>()

</script>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #DDD;
}
</style>