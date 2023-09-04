<template>
  <button
    class="rounded-lg py-2 px-4 text-lg border-none shadow-sm cursor-pointer transition ease duration-300 w-full"
    :class="{
      'bg-primary-500 text-white shadow-lg': active,
      'bg-white hover:bg-gray-100': !active,
    }"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>
