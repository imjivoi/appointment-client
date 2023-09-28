<template>
  <u-card
    :ui="{
      rounded: 'rounded-2xl',
    }"
  >
    <div class="flex justify-between">
      <div>
        <h4>{{ name }}</h4>
        <p class="text-gray-500">{{ description }}</p>
      </div>
      <div class="flex items-center gap-2">
        <u-button icon="i-heroicons-pencil" variant="ghost" size="xs" @click="$emit('update:info')"></u-button>
        <u-button icon="i-heroicons-trash" color="red" variant="ghost" size="xs" @click="openConfirmModal"></u-button>
        <!-- <modal-confirm title="Eliminar servicio?" :on-confirm="deleteService">
          <template #trigger>
            <ui-button variant="link">
              <Icon name="ic:baseline-delete" />
            </ui-button>
          </template>
        </modal-confirm> -->
      </div>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
import { useModal } from 'vue-final-modal'

import { ModalConfirm } from '#components'

defineProps<{
  id: string
  name: string
  description?: string
  duration: number
}>()

defineEmits<{
  (e: 'update:info'): void
  (e: 'delete'): void
}>()
const { open: openConfirmModal, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Eliminar servicio?',
    onConfirm: async () => {
      await sleep(2000)
      close()
      console.log('delete')
    },
  },
})
</script>
