<template>
  <Suspense>
    <template #default>
      <div class="">

        <div class="row">
          <div class="col-12 cover">
            <input
              ref="fileInputCover"
              type="file"
              style="display: none"
              accept=".jpg, .jpeg, .png"
              @change="onFileSelectedForCover"
            />
            <input
              ref="fileInputLogo"
              type="file"
              style="display: none"
              accept=".jpg, .jpeg, .png"
              @change="onFileSelectedForLogo"
            />
            <ClientImage
              style="max-height: 300px"
              :image-url="myPageInfo.cover"
              :tooltip-msg="translate('ma-page-change-cover')"
              @click="$refs.fileInputCover.click()"
            /><ClientImage
              class="logo-imgage"

              :image-url="myPageInfo.logo"
              :tooltip-msg="translate('my-page-change-logo')"
              @click="$refs.fileInputLogo.click()"
            />
            <q-btn color="teal" class="btn-temas" @click="openDialog">
              <q-icon left size="3em" name="fa fa-palette" />
              <div>Temas</div>
            </q-btn>
          </div>

          <div
            class="col-lg-4 col-md-4 col-sm-10 col-xs-10 offset-md-1 offset-sm-1 offset-xs-1"
          >
            <q-input
              outlined
              v-model="myPageInfo.tenancyName"
              :label="translate('my-page-business-name')"
              class="business-name"
            />
          </div>
        </div>
        <div class="row">
          <div
            class="col-xl-4 col-lg-4 col-md-4 col-sm-10 col-xs-10 offset-md-1 offset-sm-1 offset-xs-1 offset-xl-1"
          >
            <q-input
              v-model="myPageInfo.tenancyName"
              outlined
              color="green-8"
              label="Nombre del negocio"
              class="row-tenancy-name"
            />
            <br />
            <q-input
              v-model="myPageInfo.description"
              outlined
              autogrow
              color="green-8"
              :label="translate('my-page-description')"
            />
            <br />
            <q-toggle
              v-model="tmp"
              checked-icon="check"
              color="green"
              left-label
              style="font-weight: bold"
              :label="translate('my-page-show-whatsApp-contact')"
              unchecked-icon="clear"
            />
            <br />
            <q-input
              outlined
              class="ig-input"
              type="url"
              v-model="myPageInfo.urlIG"
              label="Instagram URL"
            >
              <template v-slot:prepend>
                <q-icon
                  name="fab fa-instagram"
                  class="pointer-cursor"
                /> </template
            ></q-input>
            <br />
            <q-input
              outlined
              class="fb-input"
              v-model="myPageInfo.urlFB"
              label="Facebook URL"
            >
              <template v-slot:prepend>
                <q-icon name="fab fa-facebook" class="pointer-cursor" />
              </template>
            </q-input>
          </div>
        </div>

        <q-dialog v-model="showDialog">
          <Theme />
        </q-dialog>
        <q-dialog v-model="showDialogForImageCroppingLogo">
        <ImageCropper :image-src="imageForCropping" @image-saved="imageCroppedLogo" />
        </q-dialog>
        <q-dialog v-model="showDialogForImageCroppingCover">
          <RectangleImageCropper :image-src="imageForCropping" @image-saved="imageCroppedCover" />
        </q-dialog>
        <br>
      </div>
    </template>
    <template #fallback>
      <h4>Cargando...</h4>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import myPageController from "./MyPage";
import MyPageController from "./MyPage";
import ClientImage from "./components/ClientImage.vue";
import { ref } from "vue";
import Theme from "./components/Theme.vue";
import { translate } from "@/plugins/i18n/i18n";
import ImageCropper from "@/views/myPage/components/ImageCropper.vue";
import RectangleImageCropper from "@/views/myPage/components/RectangleImageCropper.vue";

const showDialog = ref(false);
const showDialogForImageCroppingLogo = ref(false);
const showDialogForImageCroppingCover = ref(false);
const app: Controller = injectStrict("appController");
const imageForCropping = ref('');
let formData = new FormData();
await myPageController.loadInfo();
const myPageInfo = Object.assign({}, myPageController.$clientInformation);
const coverImageMetadata = new Image();
coverImageMetadata.src = myPageInfo.cover!;
const coverHeight: number = coverImageMetadata.height;
const userId = myPageInfo.id;
console.log({userId})
//TODO: change this tmp variable
const tmp = true;

const openDialog = () => {
  showDialog.value = !showDialog.value;
};

const onFileSelectedForCover = (event: any) => {
  const selectedFile:  Blob = event.target.files[0];
  const imgToCropper = new Image();
  imgToCropper.src = URL.createObjectURL(selectedFile);
  imageForCropping.value = imgToCropper.src;
  showDialogForImageCroppingCover.value = true;
};

const onFileSelectedForLogo = (event: any) => {
  const selectedFile:   Blob = event.target.files[0];
  const imgToCropper = new Image();
  imgToCropper.src = URL.createObjectURL(selectedFile);
  imageForCropping.value = imgToCropper.src;
  showDialogForImageCroppingLogo.value = true;
};

function imageCroppedLogo(p_formData: FormData) {
  myPageController.changeImage(p_formData, userId, true);
  showDialogForImageCroppingLogo.value = false;
}

function imageCroppedCover(p_formData: FormData) {
  myPageController.changeImage(p_formData, userId, false);
  showDialogForImageCroppingCover.value = false;
}
</script>

<style scoped>
.ig-input:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px 2px rgba(123, 0, 255, 0.7);
  height: 55px;
  cursor: auto;
}
.fb-input:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px 2px rgb(11, 158, 255);
  height: 55px;
  cursor: auto;
}

.redes {
  min-width: 350px;
  margin-left: 120px;
}

.logo-imgage {
  width: 250px;
  position: relative;
  top: -75px;
  clip-path: circle();
  left: 40px;
}
.business-name {
  position: relative;
  left: 300px;
  top: -150px;
  max-width: 300px;
}

@media (width < 1023px) {
  .business-name {
    position: relative;
    left: calc(80% - 250px);
    top: -45px;
    max-width: 300px;
  }

  .btn-temas {
    position: relative;
    border-radius: 5%;
    left: 10px;
    top: calc(100vh - 30vh);
    right: 55px;
  }
}

@media (width >= 1023px) {
  .btn-temas {
    position: relative;
    border-radius: 5%;
    left: calc(100% - 40%);
    right: 15px;
  }
}
</style>
