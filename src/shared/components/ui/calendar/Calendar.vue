<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { getMonth, setMonth } from 'date-fns/esm'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { DatePicker } from 'v-calendar'

import { buttonVariants } from '../button'

import type { Calendar } from 'v-calendar'

import { cn } from '#shared/lib/utils'

const props = withDefaults(
  defineProps<{
    modelValue?:
      | string
      | number
      | Date
      | Partial<{
          start: Date
          end: Date
        }>
    modelModifiers?: object
    columns?: number
    type?: 'single' | 'range'
    minDate?: Date
  }>(),
  {
    type: 'single',
    columns: 1,
  },
)
const emits = defineEmits<{
  (e: 'update:modelValue', payload: typeof props.modelValue): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})

const datePicker = ref<InstanceType<typeof DatePicker>>()
// @ts-expect-error in this current version of v-calendar has the calendaRef instance, which is required to handle arrow nav.
const calendarRef = computed<InstanceType<typeof Calendar>>(() => datePicker.value?.calendarRef)

const isPrevDisabled = computed(() => {
  if (!calendarRef.value || !calendarRef.value.firstPage) return false

  const { minDate } = props

  if (!minDate) return false

  return getMonth(setMonth(minDate, getMonth(minDate) - 1)) < getMonth(calendarRef.value.firstPage!.month)
})

function handleNav(direction: 'prev' | 'next') {
  if (!calendarRef.value) return

  if (direction === 'prev') calendarRef.value.movePrev()
  else calendarRef.value.moveNext()
}

onMounted(async () => {
  await nextTick()
  await nextTick()
  if (modelValue.value instanceof Date && calendarRef.value) calendarRef.value.focusDate(modelValue.value)
})
</script>

<template>
  <div class="relative">
    <div class="absolute top-3 flex justify-between w-full px-4">
      <button
        :class="cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')"
        :disabled="isPrevDisabled"
        @click="handleNav('prev')"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button
        :class="cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')"
        @click="handleNav('next')"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
    <DatePicker
      ref="datePicker"
      v-model="modelValue"
      :model-modifiers="modelModifiers"
      class="calendar"
      trim-weeks
      :transition="'none'"
      :columns="columns"
      :min-date="minDate"
    />
  </div>
</template>

<style lang="postcss">
.calendar {
  @apply p-3 text-center;
}
.calendar .vc-pane-layout {
  @apply grid gap-4;
}
.calendar .vc-title {
  @apply text-sm font-medium pointer-events-none;
}
.calendar .vc-pane-header-wrapper {
  @apply hidden;
}
.calendar .vc-weeks {
  @apply mt-4;
}
.calendar .vc-weekdays {
  @apply flex;
}
</style>
