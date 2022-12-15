<template>
  <div>
    <q-card class="card-products">
      <q-card-section horizontal>
        <q-img
          v-if="props.product.images?.length > 0"
          class="col imageProduct"
          :src="props.product.images[0].src"
          style="height: 290px"
        >
          <div class="absolute-bottom-right text-caption">
            Cantidad de imagenes: {{props.product.images?.length}}
          </div></q-img
        >
        <q-img
          v-else
          class="col imageProduct"
          src="@/assets/no_image.jpg"
          style="height: 290px"
        ></q-img>

        <!--<q-icon  @click="$refs.fileInput.click()" name="edit" class="text-green" size="1.5em" />-->
        <q-icon
          @click="openModal"
          name="edit"
          class="text-green"
          size="1.5em"
        />

        <q-card-section class="productInfo">
          <div class="row justify-around" style="gap: 5px">
            <div class="col-12">
              <q-input
                outlined
                v-model="props.product.name"
                label="Nombre del producto"
              />
            </div>
            <div class="col-12">
              <q-input
                outlined
                v-model="props.product.description"
                label="Descripcion"
              />
            </div>
            <div class="col-5">
              <q-input outlined v-model="props.product.price" label="Precio" />
            </div>

            <div class="col-5">
              <q-input outlined v-model="props.product.sku" label="SKU" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions vertical class="justify-around">
          <q-toggle
            v-model="props.product.isActive"
            checked-icon="check"
            color="green"
            label="Producto activo"
            unchecked-icon="clear"
          />

          <q-btn
            padding="xs lg"
            style="margin-left: 15px"
            color="red"
            icon="delete"
            @click="deleteSelectedProduct"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="opened" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" style="white-space: nowrap">
          Imagenes de: {{ props.product.name }}
          <q-btn
            class="close-bnt-modal"
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="gallery-modal-prod">
          <div
            v-for="(image, index) in props.product.images"
            :key="index"
            class="card-image-modal"
          >
            <div>
              <q-icon
                name="delete"
                style="
                  color: #c50110;
                  font-size: 1.4em;
                  margin-left: auto;
                  margin-top: auto;
                "
                @click="removeSelectedImage(image)"
              />
              <q-img :src="image.src" class="modal-img"> </q-img>
            </div>
            <q-inner-loading
              :showing="loading"
              label="Please wait..."
              label-class="text-teal"
              label-style="font-size: 1.1em"
            />
          </div>
        </div>
        <q-uploader
          v-if="props.product.images.length < 6"
          style="
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
            min-width: 100px;
            margin-top: 5rem;
          "
          label="Subir nueva imagen"
          multiple
          flat
          auto-upload
          hide-upload-btn
          :max-files="maxFilesToUpload"
          class="uploader-img"
          accept=".jpg, image/*"
          @rejected="onRejected"
          @added="onUploaded"
        />
        <br />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          @click="saveChanges"
          style="
            background-color: #049dd9;
            color: #fff;
            height: 50px;
            margin-left: 40%;
          "
          >Guardar</q-btn
        >
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { IProduct, IProductImage } from "../../models/IProduct";
import { ref, type Ref, watch } from "vue";
import productController from "@/views/products/models/Product";
import { useQuasar } from "quasar";
const $q = useQuasar();
const props = defineProps<{
  product: IProduct;
}>();

const maxFilesToUpload: Ref<number> = ref(7 - props.product.images?.length!);

let imagesUploaded: any;

const loading: Ref<boolean> = ref(false);
const deleteSelectedProduct = () => {
  productController.deleteProduct(props.product.id);
};

const opened: Ref<boolean> = ref(false);
const openModal = () => {
  opened.value = true;
};

const noImageSrc = "../../../../assets/no_image.jpg";

function onRejected(rejectedEntries: any) {
  // Notify plugin needs to be installed
  // https://quasar.dev/quasar-plugins/notify#Installation
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
}

function onUploaded(info: any) {
  imagesUploaded = info;
  let newImageUrL: any;
  info.forEach(function (valor: any, indice: any) {
    //LINK: https://poopcode.com/convert-a-string-to-a-blob-object-in-javascript/
    newImageUrL = URL.createObjectURL(new Blob([info[indice]]));
    props.product.images?.push({ name: valor.__key, src: newImageUrL });
  });
}

function removeSelectedImage(image: IProductImage) {
  productController.removeSpeficiImageProduct(props.product.id, image);
}

function saveChanges() {}
</script>

<style scoped>
.card-products {
  max-height: 500px;
  width: 90vw;
  margin-left: 10%;
}

.imageProduct {
  max-width: 200px;
  max-height: 200px;
  min-width: 80px;
  min-height: 80px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 10% !important;
}
.productInfo {
  margin-left: 5%;
  width: 50vw;
}
.gallery-modal-prod {
  display: grid;
  gap: 4rem;
  margin-left: 3rem;
  grid-auto-rows: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
}
.modal-img {
  margin-top: 5px;
  height: 100px;
  width: 100px;
}

.text-caption {
  height: 5px;
  margin-right: 10%;
  font-size: xx-small;
  border-radius: 50%;
  padding-bottom: 15%;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
}
.card-image-modal {
  max-width: 200px;
}

@media (max-width: 600px) {
  .close-bnt-modal {
    margin-left: 15px;
  }
}

@media (min-width: 601px) {
  .close-bnt-modal {
    margin-left: 150px;
  }
}
</style>
