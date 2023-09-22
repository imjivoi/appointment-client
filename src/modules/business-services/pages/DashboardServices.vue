<template>
  <div>
    <div class="mb-10 flex justify-between items-center">
      <h2 class="text-2xl font-bold">Servicios</h2>
      <ui-button @click="addService">Agrear nuevo</ui-button>
    </div>
    <div class="grid gap-4">
      <business-services-item />
      <business-services-item />
      <business-services-item />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import { BusinessServicesAddModal } from '#components'

const { open: openBusinessServicesAddModal } = useModal({
  component: BusinessServicesAddModal,
})

const addService = () => {
  openBusinessServicesAddModal()
  console.log('addService')
}
</script>
