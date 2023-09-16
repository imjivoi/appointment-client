<template>
  <div class="bg-gray-50 rounded-xl py-4 px-8 max-w-sm mx-auto">
    <div class="mb-4">
      <h2 class="font-bold text-xl text-center">Registrarse</h2>
    </div>
    <div>
      <n-form ref="formRef" :model="formValue" :rules="rules" :disabled="isLoading">
        <n-form-item label="Nombre" path="firstName">
          <n-input v-model:value="formValue.firstName" placeholder="" maxlength="20" show-count />
        </n-form-item>
        <n-form-item label="Apellido" path="lastName">
          <n-input v-model:value="formValue.lastName" placeholder="" maxlength="20" show-count />
        </n-form-item>
        <n-form-item label="Email" path="email">
          <n-input v-model:value="formValue.email" placeholder="" />
        </n-form-item>
        <n-form-item label="Contraseña" path="password">
          <n-input v-model:value="formValue.password" placeholder="" type="password" />
        </n-form-item>

        <div>
          <n-button type="primary" block :loading="isLoading" @click="validate">Registrar</n-button>
          <p class="mt-4">
            Ya te registraste?
            <nuxt-link class="text-primary-500" to="/auth/login">Entrar</nuxt-link>
          </p>
        </div>
      </n-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormInst, useMessage, NForm, NFormItem, NInput, NButton } from 'naive-ui'

import { register } from '../api'

definePageMeta({
  layout: 'no-sidebar',
})

const isLoading = ref(false)
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const rules = {
  firstName: [
    { required: true, message: 'Por favor ingresa tu nombre' },
    { min: 3, message: 'Nombre debe contener al menos 3 digitos' },
  ],
  lastName: [
    { required: true, message: 'Por favor ingresa tu apellido' },
    { min: 3, message: 'Apellido debe contener al menos 3 digitos' },
  ],
  email: [
    { required: true, message: 'Por favor ingresa tu correo' },
    { type: 'email', message: 'Por favor ingresa un correo valido' },
  ],
  password: [
    { required: true, message: 'Por favor ingresa tu contraseña' },
    { min: 6, message: 'Contraseña debe contener al menos 6 digitos' },
  ],
}

async function validate() {
  try {
    await formRef.value?.validate()
    await register({
      firstName: formValue.value.firstName,
      lastName: formValue.value.lastName,
      email: formValue.value.email,
      password: formValue.value.password,
    })
  } catch (error) {}
}
</script>
