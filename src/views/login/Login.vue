<template>
  <div class="container">
    <div class="column crd-login">
      <q-form ref="loginForm" class="q-gutter-md" @submit="doLogin">
        <div class="col-4 login-hdr">
          <div class="text-h4">Login</div>
        </div>
        <div class="col-8 form-login">
          <div class="row" style="margin-left: 25px; margin-right: 25px">
            <div class="col-12">
              <q-input
                v-model="login.email"
                class="frmInput"
                outlined
                color="primary"
                label="Email"
                label-color="primary"
                lazy-rules
                autofocus
                :rules="[
                  (val) => (val && val.length > 0) || $t('should-not-be-empty'),
                ]"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="login.password"
                :type="isPwd ? 'password' : 'text'"
                class="frmInput"
                outlined
                color="primary"
                label="Password"
                label-color="primary"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || $t('should-not-be-empty'),
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

<!-- <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input> -->

            </div>
            <div class="col-6">
              <div class="text-h6 text-no-pass">¿Olvidaste tu contraseña?</div>
            </div>
            <div class="col-6">
              <q-btn
                class="btnLongin"
                label="LOGIN"
                type="submit"
                @click="doLogin"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Login } from "@/views/login/Login";
import { reactive, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";

const login: Login = reactive(new Login());
const router = useRouter();
const wrongCredentials: Ref<boolean> = ref(false);
const app: Controller = injectStrict("appController");

const isPwd: Ref<boolean> = ref(true)

const doLogin = function (): void {
  loginForm.value.validate().then(async (success: boolean) => {
    if (success) {
      let successfulLogin: boolean = false;
      if (login.email !== null && login.password !== null) {
        successfulLogin = await handle(
          app.user.doLogin({
            email: login.email,
            password: login.password,
          })
        );
      }

      wrongCredentials.value = !successfulLogin;
      //loginForm.value.resetValidation();
      if(!wrongCredentials.value)
        await router.push("/");
    } else {
    }
  });
};

const handle = (promise: any) => {
  return promise
    .then((data: any) => [data, undefined])
    .catch((error: any) => {
      Promise.resolve([undefined, error]);
      wrongCredentials.value = true;
    });
};

const loginForm: Ref<any> = ref(null);
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(https://img.freepik.com/foto-gratis/tecnologia-fondo-toque-humano-nueva-version-moderna-creacion-adan_53876-129794.jpg)
    no-repeat;
  background-size: 100% 100%;
}

.login-hdr {
  background-color: #5285ed;
  text-justify: auto;
  color: #f0f7fb;
  height: 80px;
  padding-top: 15px;
  align-items: center;
}
.crd-login {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
}
.text-no-pass {
  color: #f28705;
  font-size: small;
}
.btnLongin {
  background-color: #52f28a;
  color: #f0f7fb;
  margin-bottom: 25px;
}
.form-login {
  background-color: #ffffff;
}
</style>
