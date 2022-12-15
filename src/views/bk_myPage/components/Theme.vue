<template>
  <div class="cardContainer">
    <div class="close-icon">
      <q-btn icon="close" flat round dense v-close-popup />
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      class="scroll-theme-area"
      style="min-height: 60vh; min-width: 300px"
    >
      <h6>Opciones de tema primario</h6>
      <div class="row" style="gap: 15px">
        <div v-for="(color, index) in colors" :key="index">
          <div
            class="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
            style="gap: 25px"
          >
            <SingleBtnColor
              :color="color"
              @color-selected="existingPrimaryColorSelected"
            />
          </div>
        </div>
        <q-btn round color="black" @click="addColor" v-if="showAddColorBtn">
          <q-icon name="add" />
        </q-btn>
      </div>
      <div v-if="showPalleteColor" class="">
        <ColorPicker
          :hex-color-model="hex"
          title="Color Primario"
          @cancel-color="cancelPrimaryColor"
          @change-color="onPrimaryColorChange"
        />
      </div>
      <br />
      <hr />
      <br />
      <h6>Opciones de tema Secundario</h6>
      <div class="row" style="gap: 15px">
        <div v-for="(color, index) in colorsSecondary" :key="index">
          <div
            class="col-xl-1 col-lg-1 col-md-1 col-xs-1 col-sm-1"
            style="gap: 25px"
          >
            <SingleBtnColor
              :color="color"
              @color-selected="existingSecundaryColorSelected"
            />
          </div>
        </div>
        <q-btn
          round
          color="black"
          @click="addColorSecundary"
          v-if="showAddColorBtnSecundary"
        >
          <q-icon name="add" />
        </q-btn>
      </div>
      <div v-if="showPalleteColorSecundary" class="">
        <ColorPicker
          :hex-color-model="hexSecundary"
          title="Color secundario"
          @cancel-color="cancelSecondaryColor"
          @change-color="onSecundaryColorChange"
        />
      </div>
    </q-scroll-area>
    <q-btn class="save-btn" @click="saveChanges">Guardar</q-btn>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, type Ref } from "vue";
import type { IColor } from "../models/IMyPage";
import SingleBtnColor from "./singleBtnColor.vue";
import ColorPicker from "./colorPicker.vue";
import { createWarnNotification } from "@/utils/notifications";
import myPageController from "../MyPage";

const hex = ref("#FF00FF");
const hexSecundary = ref("#FF00FF");
const showPalleteColor: Ref<Boolean> = ref(false);
const showAddColorBtn: Ref<Boolean> = ref(true);

const showPalleteColorSecundary: Ref<Boolean> = ref(false);
const showAddColorBtnSecundary: Ref<Boolean> = ref(true);

function addColor() {
  showPalleteColor.value = true;
}
function addColorSecundary() {
  showPalleteColorSecundary.value = true;
}

let colors: Array<IColor> = reactive([
  { color: "#FF00FF", selected: false },
  { color: "#FF005F", selected: false },
  { color: "#FF60FF", selected: false },
  { color: "#568ddb", selected: false },
  { color: "#00ffd4", selected: false },
  { color: "#bacc1d", selected: true },
  { color: "#42a3ed", selected: false },
  { color: "#9000ff", selected: false },
  { color: "#7000ff", selected: false },
]);
let colorsSecondary: Array<IColor> = reactive([
  { color: "#FF00FF", selected: false },
  { color: "#FF005F", selected: false },
  { color: "#FF60FF", selected: false },
  { color: "#568ddb", selected: true },
  { color: "#00ffd4", selected: false },
  { color: "#bacc1d", selected: false },
  { color: "#42a3ed", selected: false },
  { color: "#9000ff", selected: false },
  { color: "#7000ff", selected: false },
]);

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
};

function saveChanges() {
  myPageController.saveColor(colors, colorsSecondary);
}

//NOTE: this is for the color picker
//******************************* */

function genericColorsManager(array: Array<IColor>, p_color: string) {
  const indexFounded = array.findIndex((e) => e.selected == true);
  array.splice(indexFounded, 1, {
    color: array[indexFounded].color,
    selected: false,
  });
  const existSelectedColor = array.findIndex((e) => e.color === p_color);

  if (existSelectedColor != -1) {
    createWarnNotification("El color ya existe");
    array.splice(existSelectedColor, 1, {
      color: array[existSelectedColor].color,
      selected: true,
    });
  } else {
    array.push({ color: p_color, selected: true });
  }
}

function onSecundaryColorChange(p_color: string) {
  genericColorsManager(colorsSecondary, p_color);
  showPalleteColorSecundary.value = false;
}

function onPrimaryColorChange(p_color: string) {
  genericColorsManager(colors, p_color);
  showPalleteColor.value = false;
}
function cancelSecondaryColor() {
  showPalleteColorSecundary.value = false;
  showAddColorBtnSecundary.value = true;
}
function cancelPrimaryColor() {
  showPalleteColor.value = false;
  showAddColorBtn.value = true;
}
//******************************** */

//NOTE: this is for the color circle btn
//**************************** */

function genericExistingColorSelected(array: Array<IColor>, p_color: IColor) {
  const indexFounded = array.findIndex((e) => e.selected == true);
  array.splice(indexFounded, 1, {
    color: array[indexFounded].color,
    selected: false,
  });

  const selectedColorIndex = array.findIndex((e) => e.color === p_color.color);
  array.splice(selectedColorIndex, 1, {
    color: p_color.color,
    selected: true,
  });
}

function existingPrimaryColorSelected(p_color: IColor) {
  genericExistingColorSelected(colors, p_color);
}

function existingSecundaryColorSelected(p_color: IColor) {
  genericExistingColorSelected(colorsSecondary, p_color);
}
/***************************** */
</script>

<style scoped>
@media (width > 1000px) {
  .cardContainer {
    display: block !important;
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
      0 15px 40px rgba(166, 173, 201, 0.2);
    padding: 40px;
    background: #fff;
    border-radius: 20px;
    max-width: 50vw;
    margin: 10px auto;
  }
}

@media (width <= 1000px) {
  .cardContainer {
    display: block !important;
    box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
      0 15px 40px rgba(166, 173, 201, 0.2);
    padding: 40px;
    background: #fff;
    border-radius: 20px;
    max-width: 90vw;
    margin: 10px auto;
  }
}

.my-picker {
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
}

.scroll-theme-area {
  height: 35vw;
  width: 25vw;
}
.save-btn {
  background-color: #3973cc;
  margin-left: 75%;
}
.save-btn:hover {
  transform: scale(1.5);
  background: #3973cc;
  transition: all 0.7s;
}
.close-icon {
  display: flex;
  justify-content: flex-end;
}
</style>
