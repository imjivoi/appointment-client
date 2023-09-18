<template>
  <ui-card class="max-w-sm mx-auto">
    <ui-card-header>
      <ui-card-title class="font-bold text-xl text-center">Crea tu negocio</ui-card-title>
    </ui-card-header>

    <ui-card-content>
      <form class="grid gap-4" @submit.prevent>
        <div>
          <ui-label>Nombre de tu negocio</ui-label>
          <ui-input v-model="form.businessName" />
          <template v-if="$v.businessName.$error">
            <div v-if="$v.businessName.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa nombre de tu negocio
            </div>
          </template>
        </div>
        <div>
          <ui-label>Categoria</ui-label>
          <ui-select v-model="form.category">
            <ui-select-trigger>
              <ui-select-value placeholder="Eligi una categoria" />
            </ui-select-trigger>
            <ui-select-content>
              <ui-select-group>
                <ui-select-item v-for="(category, idx) in categories" :key="idx" :value="category.value">
                  {{ category.label }}
                </ui-select-item>
              </ui-select-group>
            </ui-select-content>
          </ui-select>
          <template v-if="$v.category.$error">
            <div v-if="$v.category.required?.$invalid" class="text-red-500 mt-1">Por favor eligir una categoria</div>
          </template>
        </div>
        <div>
          <ui-label>Nombre de tu servicio</ui-label>
          <ui-input v-model="form.serviceName" />
          <template v-if="$v.serviceName.$error">
            <div v-if="$v.serviceName.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa nombre de tu servicio
            </div>
          </template>
        </div>
        <div class="grid gap-2">
          <ui-button block :loading="isLoading" @click="validate">Crear</ui-button>
        </div>
      </form>
    </ui-card-content>
  </ui-card>
</template>
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const isLoading = ref(false)

const form = reactive({
  businessName: '',
  category: '',
  serviceName: '',
  // serviceDescription: '',
})

const rules = {
  businessName: {
    required,
  },
  category: {
    required,
  },
  serviceName: {
    required,
  },
  // serviceDescription: {},
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

const $v = useVuelidate(rules, form)

async function validate() {
  try {
    await $v.value.$validate()
    await createBusiness()
  } catch (error) {}
}

async function createBusiness() {
  isLoading.value = true
  await sleep(2000)
  isLoading.value = false
}
</script>
