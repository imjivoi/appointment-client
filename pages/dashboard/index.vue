<template>
  <n-button type="primary" @click="open">Agregar nuevo horario</n-button>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useModal } from 'vue-final-modal'

import { TimeSlotCreateModal } from '#components'

const { open } = useModal({ component: TimeSlotCreateModal })
</script>
