<template>
  <button
    class="flex items-center justify-center font-medium transition-all rounded-md w-20 h-10"
    :class="{
      'bg-primary dark:text-gray shadow-[0_0_0_3px] shadow-primary': active,
      'hover:bg-white dark:hover:bg-gray-800': !active,
    }"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
defineProps<{
  active?: boolean
}>()
</script>
