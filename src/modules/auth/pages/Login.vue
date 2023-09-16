<template>
  <div class="bg-gray-50 rounded-xl py-4 px-8 max-w-sm mx-auto">
    <div class="mb-4">
      <h2 class="font-bold text-xl text-center">Entrar</h2>
    </div>
    <div>
      <n-form ref="formRef" :model="formValue" :rules="rules" :disabled="isLoading">
        <n-form-item label="Email" path="email">
          <n-input placeholder="" v-model:value="formValue.email" />
        </n-form-item>
        <n-form-item label="Contraseña" path="password">
          <n-input placeholder="" v-model:value="formValue.password" type="password" />
        </n-form-item>

        <div>
          <n-button type="primary" block :loading="isLoading" @click="validate">Entrar</n-button>
          <p class="mt-4">
            Todavia no te registraste?
            <nuxt-link class="text-primary-500" to="/auth/register">Registrarse</nuxt-link>
          </p>
        </div>
      </n-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormInst, useMessage, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { login } from '../api'

definePageMeta({
  layout: 'no-sidebar',
})

const isLoading = ref(false)
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  email: '',
  password: '',
})

const rules = {
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
    await login({ email: formValue.value.email, password: formValue.value.password })
  } catch (error) {}
}
</script>
