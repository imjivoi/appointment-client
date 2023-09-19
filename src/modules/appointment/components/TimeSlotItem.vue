<template>
  <button
    class="py-4 font-medium px-8 transition-all rounded-md"
    :class="{
      'bg-primary text-white shadow-[0_0_0_3px] shadow-secondary': active,
      'hover:bg-white': !active,
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
