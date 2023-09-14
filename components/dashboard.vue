<template>
  <div>
    <div class="mb-10">
      <h2 class="text-2xl font-bold">Dashboard</h2>
    </div>
    <div class="grid grid-cols-2 gap-10">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">Próximos turnos</h3>
          <n-button :tag="defineNuxtLink({})" to="/dashboard/appointments">Ver todos</n-button>
        </div>
        <div class="grid gap-4">
          <appointment-item
            first-name="Test"
            last-name="testssssssssssssssssssssssssss"
            start-at="2023-09-13T20:00:00.000Z"
            end-at="2023-09-13T21:00:00.000Z"
            email="test@test.com"
          />
        </div>
      </div>
      <div>
        <div class="p-4 rounded-xl border-gray-300 border-2 border-solid">
          <h4 class="font-bold mb-4">Link a la página de programación</h4>
          <div class="flex mb-2">
            <a class="underline decoration-black underline-offset-4 truncate leading-8">
              https://sdfsfas/asfasdfsadffffffffffffffsssssssssssssssssssssssssss
            </a>
          </div>
          <n-button type="primary" round size="tiny">
            <template #icon>
              <Icon name="ic:round-content-copy" />
            </template>
            Copiar
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useModal } from 'vue-final-modal'

import { TimeSlotCreateModal } from '#components'

const { open: openCreateTimeSlotModal } = useModal({
  component: TimeSlotCreateModal,
})
</script>
