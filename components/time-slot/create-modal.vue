<template>
  <ui-modal>
    <template #header>
      <div class="text-center">
        <h2 class="text-2xl font-bold">Horario</h2>
        <p class="text-gray-400 mt-2">Configura horario para tu servicio</p>
      </div>
    </template>
    <div>
      <n-form>
        <div
          v-for="[weekDay, options] in Object.entries(formValue.timeSlots)"
          :key="weekDay"
          class="flex gap-4 justify-center"
        >
          <div class="w-24 mt-2">
            {{ weekDays[weekDay].label }}
          </div>
          <n-form-item class="block">
            <n-switch v-model:value="options.active">
              <template #checked>Activo</template>
              <template #unchecked>Inactivo</template>
            </n-switch>
          </n-form-item>
          <div class="grid ml-10">
            <div v-for="(timeItem, idx) in options.time" :key="idx" class="flex gap-4">
              <n-form-item class="w-32 block">
                <n-time-picker
                  v-model:value="timeItem.startAt"
                  time-zone="America/Argentina/Buenos_Aires"
                  :disabled="!options.active"
                />
              </n-form-item>
              <span class="mt-2">hasta</span>
              <n-form-item class="w-32 block">
                <n-time-picker v-model:value="timeItem.endAt" :disabled="!options.active" />
              </n-form-item>
              <div class="mt-1">
                <n-button
                  v-if="idx === 0"
                  circle
                  size="tiny"
                  type="info"
                  secondary
                  :disabled="!options.active"
                  @click="addTime(weekDay)"
                >
                  <template #icon>
                    <Icon name="ic:round-plus" />
                  </template>
                </n-button>
                <n-button
                  v-if="idx !== 0"
                  circle
                  size="tiny"
                  type="error"
                  secondary
                  :disabled="!options.active"
                  @click="removeTime(weekDay, idx)"
                >
                  <template #icon>
                    <Icon name="ic:baseline-delete" />
                  </template>
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </n-form>
    </div>
    <template #footer>
      <div class="flex items-center justify-center gap-4">
        <n-button type="primary" size="large" round>Crear</n-button>
        <n-button size="large" round @click="$emit('update:modelValue')">Cancelar</n-button>
      </div>
    </template>
  </ui-modal>
</template>
<script setup lang="ts">
import { addMonths, eachDayOfInterval } from 'date-fns/esm'
import {
  NButton,
  NDatePicker,
  NTimePicker,
  NForm,
  NFormItem,
  FormInst,
  NSelect,
  FormRules,
  NCheckbox,
  NCheckboxGroup,
  NDivider,
  NSwitch,
} from 'naive-ui'

import { generateRandomId } from '../../utils'

const services = [
  {
    id: '1',
    label: 'Corte de pelo',
    value: '1',
  },
  {
    id: '2',
    label: 'Corte de barba',
    value: '2',
  },
  {
    id: '3',
    label: 'Corte de pelo y barba',
    value: '3',
  },
]

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

const formRef = ref<FormInst | null>(null)
const formValue = reactive({
  service: null,
  appointmentDuration: null,
  timeSlots: {
    monday: {
      active: true,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
    tuesday: {
      active: true,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
    wednesday: {
      active: true,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
    thursday: {
      active: true,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
    friday: {
      active: true,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
    saturday: {
      active: false,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
    sunday: {
      active: false,
      time: [
        {
          startAt: 1694347200171,
          endAt: 1694376000171,
        },
      ],
    },
  } as Record<string, any>,
})

function addTime(weekDay: string) {
  formValue.timeSlots[weekDay].time.push({
    startAt: Date.now(),
    endAt: Date.now(),
  })
}

function removeTime(weekDay: string, idx: number) {
  formValue.timeSlots[weekDay].time.splice(idx, 1)
}

async function validate() {
  try {
    await formRef.value?.validate()
    prepateTimeSlots()
  } catch (error) {}
}

function setWeekDay(weekDay: string) {
  if (formValue.weekDays.includes(weekDay)) {
    formValue.weekDays = formValue.weekDays.filter((day) => day !== weekDay)
  } else {
    formValue.weekDays.push(weekDay)
  }
}

function prepateTimeSlots() {
  return formValue.timeSlots.map((timeSlot) => {
    let date

    const duration = eachDayOfInterval({
      start: new Date(timeSlot.startAt),
      end: new Date(timeSlot.repeatUntil),
    })
    console.log(duration)

    return {
      ...timeSlot,
      startAt: new Date(timeSlot.startAt).toLocaleTimeString(),
      endAt: new Date(timeSlot.endAt).toLocaleTimeString(),
    }
  })
}
</script>
