<script setup lang="ts">
import { TooltipRoot, type TooltipRootEmits, type TooltipRootProps } from 'radix-vue'

import { useEmitAsProps } from '#shared/lib/utils'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()
</script>

<template>
  <TooltipRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </TooltipRoot>
</template>
