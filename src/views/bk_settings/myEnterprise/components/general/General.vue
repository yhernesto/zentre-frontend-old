<template>
  <Suspense>
    <template #default>
      <q-form @submit.prevent="saveInfo">
        <div class="mainContainer">
          <div class="selected-options-child"></div>
          <div class="form-cnt">
            <div class="row">
              <div class="col-1"></div>

              <div class="col-10">
                <q-input
                  outlined
                  :label="$t('general-tab-form-business')"
                  v-model="generalInfo.enterpriseName"
                  lazy-rules
                />
              </div>
              <div class="col-1"></div>
            </div>
            <br />
            <div class="row phoneNumsCtn">
              <div class="col-1"></div>

              <div class="col-10">
                <vue-tel-input
                  style="height: 55px; margin-right: 5px"
                  enabledCountryCode
                  :defaultCountry="userCountry"
                  :inputOptions="{
                    placeholder: $t('general-number-wsp'),
                  }"
                  v-model="generalInfo.phones[0].compleateNumber"
                ></vue-tel-input>
              </div>

              <div class="col-1"></div>
              <div class="col-1"></div>
              <div class="col-9" style="margin-top: 15px">
                <vue-tel-input
                  style="height: 55px; margin-right: 5px"
                  autoDefaultCountry
                  v-model="generalInfo.phones[1].compleateNumber"
                  :inputOptions="{
                    placeholder: $t('general-number-main'),
                  }"
                ></vue-tel-input>
              </div>
              <div class="col-1" style="margin-top: 15px">
                <q-select
                  outlined
                  v-model="generalInfo.phones[1].type"
                  :options="phoneTypes"
                  label="Type"
                  style="height: 15px"
                  emit-value
                />
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-1"></div>

              <div class="col-10">
                <q-select
                  :label="$t('general-tab-currency')"
                  transition-show="scale"
                  transition-hide="scale"
                  outlined
                  v-model="generalInfo.currencyName"
                  :options="generalSettings.$m_generalOptions.currencyOptions"
                />
                <br />
              </div>
              <div class="col-1"></div>
            </div>

            <div class="row">
              <div class="col-1"></div>

              <div class="col-10">
                <q-select
                  :label="$t('general-tab-form-language')"
                  transition-show="scale"
                  transition-hide="scale"
                  outlined
                  v-model="generalInfo.language"
                  :options="availableLanguages"
                />
                <br />
              </div>
              <div class="col-1"></div>
            </div>
          </div>
        </div>

        <div class="gallery">
          <div
            class="enterpriseSelectDataChild"
            v-for="(question, index) in questionSelectors"
            :key="index"
          >
            <q-select
              :label="question"
              transition-show="scale"
              transition-hide="scale"
              outlined
              map-options
              stack-label
              emit-value
              option-value="option"
              option-label="option"
              v-model="
                generalInfo.answers.filter((e) => e.question === question)[0]
                  .answer
              "
              :options="optionsForSelectors[index]"
              @update:model-value="
                (val) => {
                  selectorChanged(question, val);
                }
              "
            />
          </div>
        </div>

        <div class="gallery-2">
          <div>
            <q-input
              outlined
              class="fb-input"
              v-model="generalInfo.urlFB"
              label="Facebook URL"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
                (val) => validateFbUrl(val) || 'Please enter a valid URL',
              ]"
            >
              <template v-slot:prepend>
                <q-icon
                  name="fab fa-facebook"
                  class="pointer-cursor"
                  @click="goToPageFB"
                />
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              outlined
              class="ig-input"
              v-model="generalInfo.urlIG"
              label="Instagram URL"
              @click="goToPageIG"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
                (val) => validateIgUrl(val) || 'Please enter a valid URL',
              ]"
            >
              <template v-slot:prepend>
                <q-icon
                  name="fab fa-instagram"
                  class="pointer-cursor"
                  @click="goToPageIG"
                /> </template
            ></q-input>
          </div>
        </div>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </template>

    <template #fallback>
      <h3>loading</h3>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { reactive, ref, type Ref, watch, watchEffect } from "vue";
import generalSettings from "./general";
import { VueTelInput } from "vue-tel-input";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import { translate } from "@/plugins/i18n/i18n";
import { validateFbUrl, validateIgUrl, validURL } from "@/utils/validations";
import type { IAnswer } from "./IGeneral";

const app: Controller = injectStrict("appController");
await generalSettings.loadInfo();

const generalInfo = reactive(generalSettings.$m_generalSettingInfo);

const followers: Ref<number | null> = ref(null);
const phoneTypes: Array<{ label: string; value: string }> = [
  {
    label: "Mobile",
    value: "MOB",
  },
  {
    label: "Landline phone",
    value: "TEL",
  },
];
//*******Language
const availableLanguages =
  generalSettings.$m_generalOptions.languageOptions.map((e) => {
    return translate(e);
  });
//************ */

const saveInfo = () => {
  generalSettings.saveAnswers(generalInfo);
};

const goToPageFB = () => {
  window.open(generalInfo.urlFB);
};

const goToPageIG = () => {
  window.open(generalInfo.urlIG);
};

const questionSelectors = Object.assign(
  [],
  generalSettings.m_clientQuestions.map((e) => {
    return e.question;
  })
);

const optionsForSelectors = Object.assign(
  [],
  generalSettings.m_clientQuestions.map((e) => {
    return e.options;
  })
);

for (let i = 0; i < questionSelectors.length; i++) {
  //NOTE: I do this to get the compleate object for Question, cause 'questionSelectors' contains only the string word
  const currentCompleateQuestion = generalSettings.m_clientQuestions.find(
    (e) => e.question === questionSelectors[i]
  );
  const a: IAnswer = {
    question: currentCompleateQuestion?.question!,
    answer: "",
    questionCode: currentCompleateQuestion?.questionCode!,
    questionOptionCode: "",
    id: currentCompleateQuestion?.id ?? undefined,
  };
  if (
    !generalInfo.answers.find(
      (e) => e.question === currentCompleateQuestion?.question
    )
  ) {
    generalInfo.answers?.push(a);
  }
}

const userCountry = app.user.m_profile?.country.substring(0, 2);

const selectorChanged = (question: any, val: any) => {
  console.log("%c⧭", "color: #eeff00", val);
  console.log("%c⧭", "color: #ffa280", question);
};

watch(
  () => generalInfo,
  () => {
    console.log("%c⧭", "color: #00258c", generalInfo);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.subgroupsTittle {
  color: black;
}

.mainContainer {
  display: row;
}
.selected-options-child {
  flex-grow: 0.3;
}

.form-cnt {
  flex-grow: 1;
}
.chb-options {
  color: black;
  margin-top: 30%;
}

.enterpriseSelectDataChild {
  height: 50px !important;
}

.gallery-checkbox {
  position: absolute;
}
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
.pointer-cursor {
  cursor: pointer;
}
@media (min-width: 700px) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 5rem;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    margin-left: 8.5%;
    margin-right: 8%;
  }
  .gallery-2 {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 5rem;
    grid-template-columns: repeat(auto-fit, minmax(60rem, 1fr));
    margin-left: 8.5%;
    margin-right: 8%;
  }
}

@media (max-width: 699px) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    margin-left: 13%;
    margin-right: 8%;
  }

  .gallery-2 {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    margin-left: 13%;
    margin-right: 8%;
  }
}

.textView-txt {
  color: black;
  white-space: nowrap;
  margin-top: 10px;
}
</style>
