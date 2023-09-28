<template>
  <u-slideover
    v-model="open"
    :ui="{
      background: 'bg-white dark:bg-gray-900',
      base: 'rounded-none sm:rounded-tl-[30px]',
    }"
  >
    <slot />
  </u-slideover>
</template>
<script setup lang="ts">
const open = defineModel<boolean>('open')
</script>
