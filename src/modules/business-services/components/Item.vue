<template>
  <ui-card>
    <ui-card-header class="flex flex-row justify-between">
      <div>
        <ui-card-title>{{ name }}</ui-card-title>
        <ui-card-description>{{ description }}</ui-card-description>
      </div>
      <div class="flex items-center gap-2">
        <ui-button rounded size="icon" variant="secondary" @click="$emit('update:info')">
          <Icon name="ic:baseline-edit" />
        </ui-button>
        <modal-confirm title="Eliminar servicio?" :on-confirm="deleteService">
          <template #trigger>
            <ui-button variant="link" class="text-red-500">
              <Icon name="ic:baseline-delete" />
            </ui-button>
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
  (e: 'update:info'): void
  (e: 'delete'): void
}>()

async function deleteService() {
  await sleep(2000)
  console.log('delete')
}
</script>
