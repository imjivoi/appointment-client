<template>
  <n-form ref="formRef" :model="formValue">
    <n-form-item label="Duracion de turno" class="max-w-[150px]">
      <n-input-number v-model:value="formValue.appointmentDuration" min="1" :show-button="false">
        <template #suffix>
          <span>min</span>
        </template>
      </n-input-number>
    </n-form-item>

    <template v-if="formValue.timeSlots.length">
      <business-time-slot-create-form-item
        v-for="(timeSlot, timeSlotIdx) in formValue.timeSlots"
        :key="timeSlotIdx"
        v-model:active="timeSlot.options.active"
        v-model:time="timeSlot.options.time"
        :week-day="weekDays[timeSlot.weekDay]"
        :idx="timeSlotIdx"
      ></business-time-slot-create-form-item>
    </template>
    <template v-else-if="isInitiatingForm">
      <div class="space-y-2">
        <n-skeleton v-for="i in 7" :key="i" height="50px" />
      </div>
    </template>
    <div class="flex items-center justify-center gap-4">
      <n-button type="primary" size="large" round @click="validate">Crear</n-button>
      <n-button size="large" round @click="$emit('update:modelValue')">Cancelar</n-button>
    </div>
  </n-form>
</template>
<script setup lang="ts">
import { setHours, startOfDay } from 'date-fns/esm'
import { NForm, NFormItem, FormInst, NInputNumber, NSkeleton, useMessage, NButton } from 'naive-ui'

const message = useMessage()

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

const START_AT_DEFAULT = setHours(startOfDay(Date.now()), 9).getTime()
const END_AT_DEFAULT = setHours(startOfDay(Date.now()), 17).getTime()
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

const formRef = ref<FormInst | null>(null)
const isInitiatingForm = ref(true)

const formValue = reactive({
  appointmentDuration: 15,
  timeSlots: [] as typeof TIME_SLOTS_DEFAULT,
})

function validate() {
  formValue.timeSlots.forEach((timeSlot) => {
    if (timeSlot.options.active) {
      timeSlot.options.time.forEach((time) => {
        if (time.startAt >= time.endAt) {
          message.error('La hora de inicio debe ser menor a la hora de fin')
          throw new Error('La hora de inicio debe ser menor a la hora de fin')
        }
      })
    }
  })
}

onMounted(() => {
  nextTick(async () => {
    await sleep(500)
    formValue.timeSlots = TIME_SLOTS_DEFAULT
    isInitiatingForm.value = false
  })
})
</script>
