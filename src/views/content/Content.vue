<template>
  <PageWrapper>
    <div class="row q-gutter-none justify-end q-mb-md">
      <div class="col-3 q-pa-xs">
				<q-btn :push="canPublish"
								:flat="!canPublish"
								:disable="!canPublish"
								@click="doPublish"
								:round="false"
								color="primary"
								style="width: 100%;"
								:label="t('content-publish')"
				/>
			</div>
		</div>
		<div class="row q-gutter-none q-mb-md">
      <div class="col-12 q-pa-xs">
				<CardFormWrapper :config="enterpriseName" />
			</div>
      <div class="col-12 q-pa-xs">
				<CardFormWrapper :config="enterpriseDescription" />
			</div>
      <div class="col-12 q-pa-xs">
				<CardFormWrapper :config="enterprisePhone" />
			</div>
      <div class="col-12 q-pa-xs">
				<CardFormWrapper :config="enterpriseUserTypes">
					<q-btn :push="dni"
									:flat="!dni"
									@click="dni = !dni"
									:round="false"
									color="primary"
									style="border-radius: 0px;"
									:label="t('content-dni')"
					/>
					<q-btn :push="ruc"
									:flat="!ruc"
									@click="ruc = !ruc"
									:round="false"
									color="primary"
									style="border-radius: 0px;"
									:label="t('content-ruc')"
					/>
				</CardFormWrapper>
			</div>
		</div>
	</PageWrapper>
</template>
<script setup lang="ts">
// Components
import PageWrapper from "@/components/pageWrapper/PageWrapper.vue";
import type {Controller} from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import { ref, watch, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { CCardFormWrapper } from "./components/cardFormWrapper/CardFormWrapper";
import CardFormWrapper from "./components/cardFormWrapper/CardFormWrapper.vue";

const { t } = useI18n({ useScope: 'global' })

const app: Controller = injectStrict("appController");

// const enterpriseName: CCardFormWrapper = reactive({
// 	title: "TITLE",
// 	description: "Appeiron Tech",
// 	display: true
// })

const enterpriseName = new CCardFormWrapper({
	title: t("content-field-business-title"),
	description: "Appeiron Tech",
})

const enterpriseDescription = new CCardFormWrapper({
	title: t("content-field-business-description"),
	description: "Appeiron Tech",
})

const enterprisePhone = new CCardFormWrapper({
	title: t("content-field-phone"),
	display: true
})

const enterpriseUserTypes = new CCardFormWrapper({
	title: t("content-field-user-types")
})

const dni: Ref<boolean> = ref(false)
const ruc: Ref<boolean> = ref(false)

const resetting: Ref<boolean> = ref(false)

const canPublish: Ref<boolean> = ref(false)
const doPublish = async () => {
	resetting.value = true;
	await reset();
	resetting.value = false;
}

const reset = async () => {
	// Resetting variables
	canPublish.value = false;
	enterpriseName.edited = false;
	enterpriseDescription.edited = false;
	enterprisePhone.edited = false;
	dni.value = false;
	ruc.value = false;
}

// ============
// === Watcher
// ============
watch(
  () => [resetting, enterpriseName.edited, enterpriseDescription.edited, enterprisePhone.edited, dni.value, ruc.value],
  () => {
		if(!resetting.value){
			canPublish.value = true
		}
  }
)
</script>
<style scoped>
</style>