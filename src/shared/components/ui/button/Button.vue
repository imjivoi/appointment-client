<script setup lang="ts">
import { buttonVariants } from '.'

import { cn } from '#shared/lib/utils'

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: string | Object
  block?: boolean
  rounded?: boolean
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component :is="as" :class="cn(buttonVariants({ variant, size, block, rounded }), $attrs.class ?? '')">
    <slot />
  </component>
</template>
