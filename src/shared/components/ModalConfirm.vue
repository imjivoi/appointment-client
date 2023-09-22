<template>
  <ui-alert-dialog v-model:open="open">
    <ui-alert-dialog-trigger as-child>
      <slot name="trigger" />
    </ui-alert-dialog-trigger>
    <ui-alert-dialog-content>
      <ui-alert-dialog-header>
        <ui-alert-dialog-title>{{ title }}</ui-alert-dialog-title>
        <ui-alert-dialog-description>
          {{ description }}
        </ui-alert-dialog-description>
      </ui-alert-dialog-header>
      <ui-alert-dialog-footer>
        <ui-alert-dialog-cancel :disabled="isLoading">{{ cancelText || 'Cancelar' }}</ui-alert-dialog-cancel>
        <ui-button :disabled="isLoading" @click="confirm">{{ actionText || 'Confirmar' }}</ui-button>
      </ui-alert-dialog-footer>
    </ui-alert-dialog-content>
  </ui-alert-dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  cancelText?: string
  actionText?: string
  onConfirm: () => void
}>()

const open = ref(false)
const isLoading = ref(false)

async function confirm() {
  try {
    isLoading.value = true
    await props.onConfirm()
    open.value = false
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
</script>
