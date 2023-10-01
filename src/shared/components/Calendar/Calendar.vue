<template>
  <div class="md:w-max max-w-4xl">
    <div class="flex gap-8 items-center justify-between mb-8">
      <calendar-date-indicator :selected-date="currentDate" />
      <calendar-date-selector
        v-model:selectedDate="currentDate"
        :current-date="today"
        @update:selectToday="setSelected(today)"
      />
    </div>
    <div class="mb-4">
      <calendar-weekdays />
    </div>

    <div class="grid grid-cols-7 bg-gray-100 dark:bg-gray-900 rounded-[20px] overflow-hidden">
      <calendar-month-day-item
        v-for="day in days"
        :key="day.date.getTime()"
        v-bind="day"
        @click="setSelected(day.date)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  eachDayOfInterval,
  getDay,
  format,
  addMonths,
  compareAsc,
  addDays,
  setDay,
  differenceInCalendarDays,
  startOfMonth,
  endOfMonth,
  setMonth,
  getMonth,
  startOfDay,
  subMonths,
  subDays,
  isSameMonth,
} from 'date-fns'

const props = defineProps<{
  min?: Date
  max?: Date
}>()

const selectedDate = defineModel<Date>()
const currentDate = ref(selectedDate.value || startOfDay(new Date()))

const today = computed(() => startOfDay(new Date()))
const days = computed(() => {
  const monthStart = startOfMonth(currentDate.value)
  const dayNumInWeek = getDay(monthStart)

  const calendarStart = subDays(monthStart, dayNumInWeek !== 0 ? dayNumInWeek - 1 : 6)

  return eachDayOfInterval({
    start: calendarStart,
    end: addDays(calendarStart, 41),
  }).map((date) => {
    return {
      isDisabled: isDisabled(date),
      // isCurrent: compareAsc(currentDate.value, date) === 0,
      isCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      isToday: date.getTime() === new Date(today.value).getTime(),
      isSelected: selectedDate.value?.getTime() === new Date(date).getTime(),
      date,
    }
  })
})

function isDisabled(date: Date) {
  return (props.min && date.getTime() < props.min.getTime()) || (props.max && date.getTime() > props.max.getTime())
}

function setSelected(date: Date) {
  if (!isSameMonth(date, currentDate.value)) {
    currentDate.value = setMonth(currentDate.value, getMonth(date))
  }
  if (isDisabled(date)) return
  selectedDate.value = date
}
</script>
