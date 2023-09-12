<template>
  <n-form ref="formRef" :model="formValue">
    <n-form-item label="Duracion de turno" class="max-w-[150px]">
      <n-input-number v-model:value="formValue.appointmentDuration" min="1" :show-button="false">
        <template #suffix>
          <span>min</span>
        </template>
      </n-input-number>
    </n-form-item>
    <time-slot-create-form-item
      v-for="(timeSlot, timeSlotIdx) in formValue.timeSlots"
      :key="timeSlotIdx"
      v-model:active="timeSlot.options.active"
      v-model:time="timeSlot.options.time"
      :week-day="weekDays[timeSlot.weekDay]"
      :idx="timeSlotIdx"
    ></time-slot-create-form-item>
    <!-- <template v-for="(timeSlot, timeSlotIdx) in formValue.timeSlots" :key="timeSlotIdx">
      <div class="flex gap-4 justify-center">
        <div class="w-24 mt-2 font-medium">
          {{ weekDays[timeSlot.weekDay].label }}
        </div>
        <n-form-item class="block">
          <n-switch v-model:value="timeSlot.options.active">
            <template #checked>Activo</template>
            <template #unchecked>Inactivo</template>
          </n-switch>
        </n-form-item>
        <div class="grid ml-10">
          <div v-for="(timeItem, idx) in timeSlot.options.time" :key="idx" class="flex gap-4">
            <n-form-item
              :path="`timeSlots[${timeSlotIdx}].options.time[${idx}].startAt`"
              class="w-32 block"
              :rule="{
                validator: (rule, value) => {
                  return value < timeItem.endAt
                },
                trigger: 'change',
                message: 'La hora de inicio debe ser menor a la hora de fin',
              }"
            >
              <n-time-picker
                format="HH:mm"
                v-model:value="timeItem.startAt"
                time-zone="America/Argentina/Buenos_Aires"
                :disabled="!timeSlot.options.active"
              />
            </n-form-item>
            <span class="mt-2">hasta</span>
            <n-form-item
              :path="`timeSlots[${timeSlotIdx}].options.time[${idx}].endAt`"
              class="w-32 block"
              :rule="{
                validator: (rule, value) => {
                  return timeItem.startAt < value
                },
                trigger: 'change',
                message: 'La hora de fin debe ser mayor a la hora de inicio',
              }"
            >
              <n-time-picker v-model:value="timeItem.endAt" :disabled="!timeSlot.options.active" />
            </n-form-item>
            <div class="mt-1">
              <n-button
                v-if="idx === 0"
                circle
                size="tiny"
                type="info"
                secondary
                :disabled="!timeSlot.options.active"
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
                :disabled="!formValue.timeSlots[weekDay].active"
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
    </template> -->
  </n-form>
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
  NInputNumber,
  NInput,
} from 'naive-ui'

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

const START_AT_DEFAULT = 1694347200171
const END_AT_DEFAULT = 1694376000171

const formRef = ref<FormInst | null>(null)
// const formValue = ref({
//   appointmentDuration: 15,
//   timeSlots: {
//     monday: {
//       active: true,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//     tuesday: {
//       active: true,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//     wednesday: {
//       active: true,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//     thursday: {
//       active: true,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//     friday: {
//       active: true,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//     saturday: {
//       active: false,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//     sunday: {
//       active: false,
//       time: [
//         {
//           startAt: START_AT_DEFAULT,
//           endAt: END_AT_DEFAULT,
//         },
//       ],
//     },
//   } as Record<string, any>,
// })

const formValue = reactive({
  appointmentDuration: 15,
  timeSlots: [
    {
      weekDay: 'monday',
      options: {
        active: ref(true),
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
        active: ref(true),
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
        active: ref(true),
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
        active: ref(true),
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
        active: ref(true),
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
        active: ref(false),
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
        active: ref(false),
        time: [
          {
            startAt: START_AT_DEFAULT,
            endAt: END_AT_DEFAULT,
          },
        ],
      },
    },
  ],
})

function addTime(weekDay: string) {
  formValue.value.timeSlots[weekDay].time.push({
    startAt: START_AT_DEFAULT,
    endAt: END_AT_DEFAULT,
  })
}

function removeTime(weekDay: string, idx: number) {
  formValue.value.timeSlots[weekDay].time.splice(idx, 1)
}

async function validate() {
  try {
    await formRef.value?.validate()
    console.log('valid')
  } catch (error) {}
}
</script>
