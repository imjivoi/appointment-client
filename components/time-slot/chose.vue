<template>
  <div
    class="flex flex-col sm:flex-row gap-8 items-center md:items-baseline bg-gray-50 py-4 px-4 md:px-16 rounded-xl w-full"
  >
    <div>
      <n-date-picker
        v-model:value="activeDay"
        :first-day-of-week="0"
        type="date"
        panel
        :is-date-disabled="disabledDate"
        :actions="null"
      ></n-date-picker>
    </div>
    <div>
      <time-slot-list :time-slots="currentTimeSlots" @active="activeTime = $event" />
    </div>
    <div v-if="activeTime" class="flex-1">
      <div class="bg-white rounded-lg p-4 h-full grid gap-4 justify-center">
        <div>
          <div class="flex gap-2">
            <Icon name="ic:baseline-calendar-today" class="text-3xl" />
            <div>
              <span class="text-2xl">{{ format(activeDay, 'yyyy-MM-dd') }}</span>
              <div class="text-gray-400 mt-1">Fecha</div>
            </div>
          </div>
          <div class="flex gap-2">
            <Icon name="ic:baseline-access-alarm" class="text-3xl" />
            <div>
              <span class="text-2xl">{{ format(new Date(activeTime), 'HH-mm') }}</span>
              <div class="text-gray-400 mt-1">Hora</div>
            </div>
          </div>
          <div class="flex gap-2">
            <Icon name="ic:baseline-hourglass-bottom" class="text-3xl" />
            <div>
              <span class="text-2xl">{{ '15 minutos' }}</span>
              <div class="text-gray-400 mt-1">Duracion</div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <n-button type="primary" size="large" block @click="openConfirmModal">Eligir</n-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isSameDay, getTime, format } from 'date-fns/esm'
import { NButton, NTabs, NTab, NDatePicker } from 'naive-ui'
import { useModal } from 'vue-final-modal'

import { AppointmentConfirmModal } from '#components'

const props = defineProps({
  timeSlots: {
    type: Array as PropType<string[]>,
    required: true,
  },
})

const defaultDay = () => {
  return getTime(new Date(props.timeSlots[0]))
}
const activeDay = ref<number>(defaultDay())
const activeTime = ref<string>()

const currentTimeSlots = computed(() => {
  return props.timeSlots.filter((time) => {
    const timeTs = getTime(new Date(time))
    return isSameDay(timeTs, activeDay.value)
  })
})
function disabledDate(ts: number) {
  const today = new Date().getTime()
  const lastDay = getTime(new Date(props.timeSlots.at(-1) as string))
  const date = getTime(new Date(ts))

  if (date < today || date > lastDay) return true

  return props.timeSlots.some((time) => {
    const timeTs = getTime(new Date(format(new Date(time), 'yyyy-MM-dd')))
    return isSameDay(timeTs, date)
  })
}

const { open } = useModal({
  component: AppointmentConfirmModal,
})

const openConfirmModal = () => {
  open()
}
</script>
