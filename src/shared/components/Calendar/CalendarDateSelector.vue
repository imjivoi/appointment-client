<template>
  <div class="flex gap-4">
    <button class="button" @click="selectPrevious">
      <u-icon name="i-heroicons-chevron-left" class="dark:text-white"></u-icon>
    </button>
    <button class="button" @click="selectToday">Today</button>
    <button class="button" @click="selectNext">
      <u-icon name="i-heroicons-chevron-right" class="dark:text-white"></u-icon>
    </button>
  </div>
</template>
<script setup lang="ts">
import { setMonth, getMonth } from 'date-fns/esm'

const props = defineProps<{
  currentDate: Date
  selectedDate: Date
}>()
const emits = defineEmits<{
  (e: 'update:selectedDate', value: Date): void
  (e: 'update:selectToday'): void
}>()

function selectPrevious() {
  const newSelectedDate = setMonth(props.selectedDate, getMonth(props.selectedDate) - 1)
  emits('update:selectedDate', newSelectedDate)
}

function selectToday() {
  emits('update:selectToday')
}

function selectNext() {
  const newSelectedDate = setMonth(props.selectedDate, getMonth(props.selectedDate) + 1)
  emits('update:selectedDate', newSelectedDate)
}
</script>
<style scoped lang="postcss">
.button {
  @apply rounded-2xl bg-gray-100 dark:bg-gray-900 font-medium p-4 sm:p-6 flex items-center justify-center transition-all;
  &:hover {
    @apply bg-gray-100/[0.6] dark:bg-gray-900/[0.6];
  }
}
</style>
