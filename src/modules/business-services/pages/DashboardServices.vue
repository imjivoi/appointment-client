<template>
  <div>
    <div class="mb-10 flex justify-between items-center">
      <h2 class="text-2xl font-bold">Servicios</h2>
      <ui-button @click="addService">Agrear nuevo</ui-button>
    </div>
    <div class="grid gap-4">
      <service-item
        v-for="service in services"
        :key="service.id"
        v-bind="service"
        @update:info="openBusinessServicesUpdateModal"
        @update:time="openTimeSlotModal"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import { AddServiceModal, UpdateServiceModal, TimeSlotModal, ServiceItem } from '../components'

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
  component: AddServiceModal,
})

const { open: openBusinessServicesUpdateModal } = useModal({
  component: UpdateServiceModal,
})

const { open: openTimeSlotModal } = useModal({
  component: TimeSlotModal,
})

const addService = () => {
  openBusinessServicesAddModal()
}
</script>
