<template>
  <n-button @click="openCreateTimeSlotModal">Crear horario</n-button>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useModal } from 'vue-final-modal'

import { TimeSlotCreateModal } from '#components'

const { open: openCreateTimeSlotModal } = useModal({
  component: TimeSlotCreateModal,
})
</script>
