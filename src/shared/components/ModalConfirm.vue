<template>
  <modal class="max-w-sm p-4 rounded-xl">
    <template #header>
      <h3 class="text-gray-950 dark:text-white font-bold text-2xl">{{ title }}</h3>
    </template>
    {{ description }}
    <template #footer>
      <div class="flex flex-col sm:flex-row gap-2">
        <u-button :disabled="isLoading" color="white" @click="$emit('update:modelValue', false)">
          {{ cancelText || 'Cancelar' }}
        </u-button>
        <u-button variant="solid" :loading="isLoading" :disabled="isLoading" @click="confirm">
          {{ actionText || 'Confirmar' }}
        </u-button>
      </div>
    </template>
  </modal>
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
