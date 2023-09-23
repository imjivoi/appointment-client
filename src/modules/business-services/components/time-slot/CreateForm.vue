<template>
  <form @submit.prevent>
    <div>
      <ui-label>Duracion (en minutos)</ui-label>
      <ui-input v-model="form.duration" type="number" min="1" />
      <template v-if="$v.duration.$error">
        <div v-if="$v.duration.required?.$invalid" class="text-red-500 mt-1">
          Por favor ingresa la duracion del servicio
        </div>
      </template>
    </div>

    <template v-if="formValue.timeSlots.length">
      <create-form-item
        v-for="(timeSlot, timeSlotIdx) in formValue.timeSlots"
        :key="timeSlotIdx"
        v-model:active="timeSlot.options.active"
        v-model:time="timeSlot.options.time"
        :week-day="weekDays[timeSlot.weekDay]"
        :idx="timeSlotIdx"
      ></create-form-item>
    </template>
    <template v-else-if="isInitiatingForm">
      <div class="space-y-2">
        <ui-skeleton v-for="i in 7" :key="i" class="h-50px" />
      </div>
    </template>
    <div class="flex items-center justify-center gap-4">
      <ui-button @click="validate">Crear</ui-button>
      <ui-button variant="secondary" @click="$emit('update:modelValue')">Cancelar</ui-button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { setHours, startOfDay } from 'date-fns/esm'
import { NForm, NFormItem, FormInst, NInputNumber, NSkeleton, NButton } from 'naive-ui'

import CreateFormItem from './CreateFormItem.vue'

const weekDays = {
  monday: {
    label: 'Lunes',
    value: '1',
  },
  tuesday: {
    label: 'Martes',
    value: '2',
  },
  wednesday: {
    label: 'Miercoles',
    value: '3',
  },
  thursday: {
    label: 'Jueves',
    value: '4',
  },
  friday: {
    label: 'Viernes',
    value: '5',
  },
  saturday: {
    label: 'Sabado',
    value: '6',
  },
  sunday: {
    label: 'Domingo',
    value: '7',
  },
}

const START_AT_DEFAULT = formatDate(setHours(startOfDay(Date.now()), 9), 'HH:mm')
const END_AT_DEFAULT = formatDate(setHours(startOfDay(Date.now()), 17), 'HH:mm')
const TIME_SLOTS_DEFAULT = [
  {
    weekDay: 'monday',
    options: {
      active: true,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
  {
    weekDay: 'tuesday',
    options: {
      active: true,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
  {
    weekDay: 'wednesday',
    options: {
      active: true,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
  {
    weekDay: 'thursday',
    options: {
      active: true,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
  {
    weekDay: 'friday',
    options: {
      active: true,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
  {
    weekDay: 'saturday',
    options: {
      active: false,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
  {
    weekDay: 'sunday',
    options: {
      active: false,
      time: [
        {
          startAt: START_AT_DEFAULT,
          endAt: END_AT_DEFAULT,
        },
      ],
    },
  },
]

const formValue = reactive({
  appointmentDuration: 15,
  timeSlots: [] as typeof TIME_SLOTS_DEFAULT,
})

function validate() {
  formValue.timeSlots.forEach((timeSlot) => {
    if (timeSlot.options.active) {
      timeSlot.options.time.forEach((time) => {
        if (time.startAt >= time.endAt) {
          throw new Error('La hora de inicio debe ser menor a la hora de fin')
        }
      })
    }
  })
}

onMounted(() => {
  nextTick(async () => {
    formValue.timeSlots = TIME_SLOTS_DEFAULT
  })
})
</script>
