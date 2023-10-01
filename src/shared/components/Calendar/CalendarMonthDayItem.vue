<template>
  <button
    class="cursor-pointer max-h-20 max-w-20 p-2 sm:p-4 rounded-[18px] transition-all"
    :disabled="isDisabled"
    :class="{
      'bg-primary-500 text-gray-100': isSelected,
      'hover:bg-gray-200/[0.6] dark:hover:bg-gray-950/[0.6]': !isSelected && !isDisabled,
    }"
  >
    <div class="h-full">
      <span
        class="flex justify-center"
        :class="{
          'text-gray-400 dark:text-gray-500': !isCurrentMonth,
          'text-gray-300 dark:text-gray-700': isDisabled,
          'text-primary-500': isToday && !isSelected,
        }"
      >
        {{ label }}
      </span>
      <div>
        <slot />
      </div>
    </div>
  </button>
</template>
<script lang="ts" setup>
import { format } from 'date-fns/esm'
const props = withDefaults(
  defineProps<{
    date: Date
    isCurrentMonth?: boolean
    isToday?: boolean
    isSelected?: boolean
    isDisabled?: boolean
  }>(),
  {
    isCurrentMonth: false,
    isToday: false,
  },
)

const label = computed(() => {
  return format(props.date, 'd')
})
</script>
