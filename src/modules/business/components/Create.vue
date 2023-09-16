<template>
  <div class="bg-gray-50 rounded-xl py-4 px-8 max-w-sm mx-auto">
    <div class="mb-4">
      <h2 class="font-bold text-xl text-center">{{ stepper.current.value.title }}</h2>
    </div>
    <div>
      <n-form ref="formRef" :model="formValue" :rules="rules" :disabled="isLoading">
        <div v-if="stepper.isCurrent('business')">
          <n-form-item label="Nombre" path="businessName">
            <n-input v-model:value="formValue.businessName" maxlength="30" show-count />
          </n-form-item>
          <n-form-item label="Categoria" path="category">
            <client-only>
              <n-select v-model:value="formValue.category" clearable :options="categories"></n-select>
            </client-only>
          </n-form-item>
          <n-form-item label="Descripcion" path="businessDescription">
            <n-input
              v-model:value="formValue.businessDescription"
              type="textarea"
              maxlength="150"
              show-count
              :autosize="{
                minRows: 3,
                maxRows: 3,
              }"
            />
          </n-form-item>
        </div>
        <div v-if="stepper.isCurrent('service')">
          <n-form-item label="Nombre de tu servicio" path="serviceName">
            <n-input v-model:value="formValue.serviceName" maxlength="30" show-count />
          </n-form-item>
          <n-form-item label="Descripcion" path="serviceDescription">
            <n-input
              v-model:value="formValue.serviceDescription"
              type="textarea"
              maxlength="150"
              show-count
              :autosize="{
                minRows: 3,
                maxRows: 3,
              }"
            />
          </n-form-item>
        </div>
        <div class="grid gap-2">
          <n-button type="primary" block :loading="isLoading" @click="stepper.current.value.validate()">
            Siguiente
          </n-button>
          <n-button v-if="stepper.isCurrent('service')" block :disabled="isLoading" @click="stepper.goToPrevious()">
            Anterior
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NSelect, NForm, NFormItem, NInput, FormInst, FormRules, NButton, useMessage } from 'naive-ui'

const isLoading = ref(false)
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  businessName: '',
  businessDescription: '',
  category: '',
  serviceName: '',
  serviceDescription: '',
})

const rules: FormRules = {
  businessName: {
    key: 'business',
    required: true,
    message: 'Por favor ingresa nombre de tu negocio',
    trigger: 'blur',
  },
  businessDescription: {
    key: 'business',
    required: false,
  },
  category: {
    key: 'business',
    required: true,
    message: 'Por favor selecciona una categoria',
    trigger: 'blur',
  },
  serviceName: {
    required: true,
    message: 'Por favor ingresa nombre de tu servicio',
    trigger: 'blur',
  },
  serviceDescription: {
    required: false,
  },
}

const categories = [
  {
    label: 'Salud',
    value: 'health',
  },
  {
    label: 'Belleza',
    value: 'beauty',
  },
  {
    label: 'Deportes',
    value: 'sports',
  },
  {
    label: 'Educación',
    value: 'education',
  },
  {
    label: 'Servicios',
    value: 'services',
  },
  {
    label: 'Otros',
    value: 'others',
  },
]

const stepper = useStepper({
  business: {
    validate: () => {
      try {
        formRef.value?.validate(
          (errors) => {
            if (!errors) {
              stepper.goToNext()
            }
          },
          (rule) => rule?.key === 'business',
        )
      } catch (error) {}
    },
    title: 'Crea tu negocio',
  },
  service: {
    validate: async () => {
      try {
        await formRef.value?.validate()
        createBusiness()
      } catch (error) {}
    },
    title: 'Agrega tu primero servicio',
  },
})

async function createBusiness() {
  isLoading.value = true
  await sleep(2000)
  message.success('Negocio creado')
  isLoading.value = false
}
</script>
