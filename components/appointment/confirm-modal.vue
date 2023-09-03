<template>
  <ui-modal>
    <template #title>Confirm</template>
    <template #footer>
      <div class="flex justify-center gap-4">
        <n-button type="primary" size="large">Confirmar</n-button>
        <n-button size="large" @click="$emit('update:modelValue')">Cancelar</n-button>
      </div>
    </template>
  </ui-modal>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>
