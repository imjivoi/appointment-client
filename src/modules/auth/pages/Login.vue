<template>
  <ui-card class="max-w-sm mx-auto">
    <ui-card-header>
      <ui-card-title class="font-bold text-xl text-center">Entrar</ui-card-title>
    </ui-card-header>
    <ui-card-content>
      <form class="grid gap-4" @submit.prevent>
        <div>
          <ui-label>Correo</ui-label>
          <ui-input v-model="form.email" />
          <template v-if="$v.email.$error">
            <div v-if="$v.email.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu correo</div>
            <div v-else-if="$v.email.email?.$invalid" class="text-red-500 mt-1">Por favor un correo valido</div>
          </template>
        </div>
        <div>
          <ui-label>Contraseña</ui-label>
          <ui-input v-model="form.password" type="password" />
          <template v-if="$v.password.$error">
            <div v-if="$v.password.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu contraseña</div>
            <div v-else-if="$v.password.minLength?.$invalid" class="text-red-500 mt-1">
              Contraseña debe contener al menos 6 digitos
            </div>
          </template>
        </div>

        <div>
          <ui-button block :loading="isLoading" @click="validate">Entrar</ui-button>
          <p class="mt-4">
            Todavia no te registraste?
            <nuxt-link class="text-blue-700 font-bold" to="/auth/register">Registrarse</nuxt-link>
          </p>
        </div>
      </form>
    </ui-card-content>
  </ui-card>
</template>
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import { login } from '../api'

definePageMeta({
  layout: 'no-sidebar',
})

const isLoading = ref(false)
// const message = useMessage()

const form = reactive({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { minLength: minLength(6), required },
}

const $v = useVuelidate(rules, form)

async function validate() {
  try {
    await $v.value.$validate()
    await login({ email: form.email, password: form.password })
  } catch (error) {}
}
</script>
