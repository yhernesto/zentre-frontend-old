<template>
  <q-splitter
    v-model="splitterModel"
    style="max-height: 800px; min-width: 60vw; background-color: #fafafa"
    after-class="bg-grey-1"
    before-class="bg-grey-1"
  >
    <template v-slot:before>
      <q-card style="margin-right: 5px">
        <Cropper
          ref="cropper"
          :src="props.imageSrc"
          :debounce="false"
          class="upload-example-cropper cropper"
          :stencil-props="{
		      handlers: {},
		      movable: false,
		      scalable: false,
		      aspectRatio: 16/5,
	}"
          :resize-image="{
		adjustStencil: false
	}"
          image-restriction="stencil"
          @change="change"
        />


          <div class="column" style="max-height: 200px; margin-top: 10px">
            <div class="col">
              <div class="row justify-around">

                <div class="col-1">
                  <q-btn round @click="zoomIn" icon="fa fa-search-plus" />
                </div>
                <div class="col-1">
                  <q-btn round @click="zoomOut" icon="fa fa-search-minus" />
                </div>

              </div>
            </div>
            <div class="col">
              <div class="row justify-center" style="margin-bottom: 15px">
                <q-btn label="Save" @click="uploadImage" />
              </div>
            </div>
          </div>

      </q-card>
    </template>
    <template v-slot:after>
      <q-card class="after-card">
        <h6>Image Preview</h6>
        <Preview
          :width="400"
          :height="120"
          class="image-preview"
          :image="imageCopped.image"
          :coordinates="imageCopped.coordinates"
        />
        <br>
      </q-card>
    </template>


  </q-splitter>
</template>

<script lang="ts" setup>
import { Cropper, Preview } from "vue-advanced-cropper";
import { ref } from "vue";

const splitterModel = ref(50);
const cropper = ref<HTMLInputElement | any | null>(null);
cropper.value?.focus();
const imageCopped: any = ref({ coordinates: null, image: null });
const props = defineProps<{
  imageSrc: string
}>();
const emits = defineEmits<{
  (e: "imageSaved", form: FormData): void;
}>();


function uploadImage(this: any) {
  const { canvas } = cropper.value.getResult();
  if (canvas) {
    const formdata = new FormData();
    canvas.toBlob((blob: string | Blob) => {
      formdata.append("image", blob);
      emits("imageSaved", formdata);
    }, "image/jpg");
  }
}

function zoomIn() {
  cropper.value.zoom(2);
}

function zoomOut() {
  cropper.value.zoom(0.5);
}

function change({ coordinates, image, canvas }: any) {
  imageCopped.value = {
    coordinates: coordinates,
    image: image
  };
}

</script>

<style scoped>
.cropper {
  margin-top: 20px;
  padding-top: 15px;
  height: 400px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  background: #fafafa;
}
.after-card{
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 25%;
}
.image-preview{
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
</style>