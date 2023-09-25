<template>
  <form @submit.prevent>
    <div class="mb-6">
      <ui-label>Duracion (en minutos)</ui-label>
      <ui-input class="max-w-[150px]" v-model="formValue.appointmentDuration" type="number" />
      <template v-if="$v.appointmentDuration.$error">
        <div v-if="$v.appointmentDuration.required?.$invalid" class="text-red-500 mt-1">
          Por favor ingresa la duracion del servicio
        </div>
        <div v-else-if="$v.appointmentDuration.minValue?.$invalid" class="text-red-500 mt-1">
          Duracion debe ser mayor a 0
        </div>
      </template>
    </div>
    <div class="grid gap-2">
      <create-form-item
        v-for="(timeSlot, timeSlotIdx) in formValue.timeSlots"
        :key="timeSlotIdx"
        v-model:active="timeSlot.options.active"
        v-model:time="timeSlot.options.time"
        :week-day="weekDays[timeSlot.weekDay]"
        :idx="timeSlotIdx"
      ></create-form-item>
    </div>

    <div class="flex items-center justify-center gap-4 mt-6">
      <ui-button @click="validate">Crear</ui-button>
      <ui-button variant="secondary" @click="$emit('update:modelValue')">Cancelar</ui-button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'
import { setHours, startOfDay, setSeconds } from 'date-fns/esm'

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
})

const rules = {
  appointmentDuration: { required, minValue: minValue(1) },
}

const $v = useVuelidate(rules, formValue)

async function validate() {
  $v.value.$touch()
  await $v.value.$validate()
  // formValue.timeSlots.forEach((timeSlot) => {
  //   if (timeSlot.options.active) {
  //     timeSlot.options.time.forEach((time) => {
  //       if (time.startAt >= time.endAt) {
  //         throw new Error('La hora de inicio debe ser menor a la hora de fin')
  //       }
  //     })
  //   }
  // })

  console.log('error: ', $v.value.$error)
}

function transformTime(time: string) {
  const toSeconds = () => {
    const [hours, minutes] = time.split(':')
    return Number(hours) * 60 * 60 + Number(minutes) * 60
  }
  return setSeconds(startOfDay(Date.now()), toSeconds()).getTime()
}

onMounted(() => {
  nextTick(() => {
    formValue.timeSlots = TIME_SLOTS_DEFAULT
  })
})
</script>
