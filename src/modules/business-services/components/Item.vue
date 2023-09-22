<template>
  <ui-card>
    <ui-card-header class="flex flex-row justify-between">
      <div>
        <ui-card-title>{{ name }}</ui-card-title>
        <ui-card-description>{{ description }}</ui-card-description>
      </div>
      <div>
        <ui-button size="sm" variant="secondary" @click="$emit('edit')">Editar</ui-button>
        <modal-confirm title="Eliminar servicio?" :on-confirm="deleteService">
          <template #trigger>
            <ui-button variant="link" size="sm" class="text-red-500">Eliminar</ui-button>
          </template>
        </modal-confirm>
      </div>
    </ui-card-header>
  </ui-card>
</template>
<script lang="ts" setup>
defineProps<{
  id: string
  name: string
  description?: string
  duration: number
}>()

defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

async function deleteService() {
  await sleep(2000)
  console.log('delete')
}
</script>
