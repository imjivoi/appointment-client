<template>
  <div>
    <div class="mb-10 flex justify-between items-center">
      <h2 class="text-2xl font-bold">Servicios</h2>
      <ui-button @click="addService">Agrear nuevo</ui-button>
    </div>
    <div class="grid gap-4">
      <business-services-item
        v-for="service in services"
        :key="service.id"
        v-bind="service"
        @edit="openBusinessServicesUpdateModal"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import { BusinessServicesAddModal, BusinessServicesUpdateModal } from '#components'

const services = [
  {
    id: '1',
    name: 'Corte de cabello',
    description: 'Corte de cabello para hombre',
    duration: 30,
  },
  {
    id: '2',
    name: 'Corte de cabello',
    description: 'Corte de cabello para mujer',
    duration: 30,
  },
  {
    id: '3',
    name: 'Corte de cabello',
    description: 'Corte de cabello para niño',
    duration: 30,
  },
]

const { open: openBusinessServicesAddModal } = useModal({
  component: BusinessServicesAddModal,
})

const { open: openBusinessServicesUpdateModal } = useModal({
  component: BusinessServicesUpdateModal,
})

const addService = () => {
  openBusinessServicesAddModal()
}
</script>
