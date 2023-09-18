<template>
  <ui-card class="max-w-sm mx-auto">
    <ui-card-header>
      <ui-card-title class="font-bold text-xl text-center">Registrarse</ui-card-title>
    </ui-card-header>
    <ui-card-content>
      <form class="grid gap-4" @submit.prevent>
        <div>
          <ui-label>Nombre</ui-label>
          <ui-input v-model="form.firstName" />
          <template v-if="$v.firstName.$error">
            <div v-if="$v.firstName.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu nombre</div>
            <div v-else-if="$v.firstName.minLength?.$invalid" class="text-red-500 mt-1">
              Nombre debe contener al menos 3 digitos
            </div>
          </template>
        </div>
        <div>
          <ui-label>Apellido</ui-label>
          <ui-input v-model="form.lastName" />
          <template v-if="$v.lastName.$error">
            <div v-if="$v.lastName.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu nombre</div>
            <div v-else-if="$v.lastName.minLength?.$invalid" class="text-red-500 mt-1">
              Apellido debe contener al menos 3 digitos
            </div>
          </template>
        </div>
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
          <ui-button block :loading="isLoading" @click="validate">Registrar</ui-button>
          <p class="mt-4">
            Ya te registraste?
            <nuxt-link class="text-blue-700 font-bold" to="/auth/login">Entrar</nuxt-link>
          </p>
        </div>
      </form>
    </ui-card-content>
  </ui-card>
</template>
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import { register } from '../api'

definePageMeta({
  layout: 'no-sidebar',
})

const isLoading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const rules = {
  firstName: { required, minLength: minLength(3) },
  lastName: { required, minLength: minLength(3) },
  email: { required, email },
  password: { required, minLength: minLength(6) },
}

const $v = useVuelidate(rules, form)

async function validate() {
  try {
    await $v.value.$validate()
    await register({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    })
  } catch (error) {}
}
</script>
