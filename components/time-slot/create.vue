<template>
  <div>
    <!-- <n-date-picker v-model:value="range" type="datetimerange" clearable /> -->
    <n-form ref="formRef" :model="formValue">
      <n-form-item
        label="Servicio"
        path="service"
        :rule="{
          required: true,
          message: 'Por favor seleccione un servicio',
        }"
      >
        <n-select v-model:value="formValue.service" :options="services" />
      </n-form-item>
      <div v-for="(timeSlot, idx) in formValue.timeSlots" :key="idx" class="grid gap-2 mb-10 p-4 bg-gray-50 rounded-xl">
        <div class="flex gap-2">
          <n-form-item
            class="flex-1"
            label="Empieza en"
            :path="`timeSlots[${idx}].startAt`"
            :rule="[
              {
                required: true,
                message: `Por favor ingrese la hora de inicio`,
                trigger: ['input'],
                validator: (rule, value) => {
                  return !!value
                },
              },
              {
                message: `El horario de inicio debe ser menor al horario de finalizacion`,
                trigger: ['input'],
                validator: (rule, value) => {
                  return value < timeSlot.endAt
                },
              },
            ]"
          >
            <n-time-picker v-model:value="timeSlot.startAt" class="w-full" clearable />
          </n-form-item>
          <n-form-item
            class="flex-1"
            label="Termina en"
            :path="`timeSlots[${idx}].endAt`"
            :rule="[
              {
                required: true,
                message: `Por favor ingrese la hora de finalizacion`,
                trigger: ['input'],
                validator: (rule, value) => {
                  return !!value
                },
              },
              {
                message: `El horario de finalizacion debe ser mayor al horario de inicio`,
                trigger: ['input'],
                validator: (rule, value) => {
                  return value > timeSlot.startAt
                },
              },
            ]"
          >
            <n-time-picker v-model:value="timeSlot.endAt" class="w-full" clearable />
          </n-form-item>
          <n-form-item>
            <n-button type="error" secondary @click="removeItem(idx)">
              <template #icon>
                <Icon name="ic:baseline-delete" />
              </template>
              Eliminar
            </n-button>
          </n-form-item>
        </div>
        <div class="flex gap-2">
          <n-form-item
            label="Dias de la semana"
            :path="`timeSlots[${idx}].selectedWeekDays`"
            :rule="{
              type: 'array',
              required: true,
              trigger: 'change',
              message: 'Por favor seleccione al menos un dia de la semana',
              validator: (rule, value) => {
                return value.length > 0
              },
            }"
          >
            <n-checkbox-group v-model:value="timeSlot.selectedWeekDays">
              <n-checkbox
                v-for="weekDay in weekDays"
                :key="weekDay.value"
                :value="weekDay.value"
                :label="weekDay.label"
              ></n-checkbox>
            </n-checkbox-group>
          </n-form-item>
          <n-form-item label="Repetir hasta">
            <n-date-picker v-model:value="timeSlot.repeatUntil" :is-date-disabled="(val) => val < Date.now()" />
          </n-form-item>
        </div>
      </div>

      <n-form-item>
        <n-button class="mx-auto" type="success" secondary @click="addTimeSlot">
          <template #icon>
            <Icon name="ic:outline-plus" />
          </template>
          Agregar nuevo horario
        </n-button>
      </n-form-item>
      <n-form-item>
        <n-button size="large" class="mx-auto" type="primary" @click="validate">Crear</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<script setup lang="ts">
import { addMonths } from 'date-fns/esm'
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

const weekDays = [
  {
    label: 'Lun',
    value: '1',
  },
  {
    label: 'Mar',
    value: '2',
  },
  {
    label: 'Mie',
    value: '3',
  },
  {
    label: 'Jue',
    value: '4',
  },
  {
    label: 'Vie',
    value: '5',
  },
  {
    label: 'Sab',
    value: '6',
  },
  {
    label: 'Dom',
    value: '7',
  },
]

// const repeats = [
//   {
//     label: 'Una vez',
//     value: '0',
//   },
//   {
//     label: 'Todos los dias',
//     value: '1',
//   },
//   {
//     label: 'Todos los dias menos',
//     value: '2',
//   },
//   {
//     label: 'Solo los dias',
//     value: '3',
//   },
//   {
//     label: 'Solo los dias de semana',
//     value: '4',
//   },
// ]
// const repeat = ref('0')

// const selectedWeekDays = ref(['1'] as string[])
// const repeatUntil = ref(addMonths(Date.now(), 1))

const formRef = ref<FormInst | null>(null)
const formValue = reactive({
  service: null,
  timeSlots: [] as Array<{
    startAt: number
    endAt: number
    id: string
    selectedWeekDays: string[]
    repeatUntil: number
  }>,
})

function addTimeSlot() {
  formValue.timeSlots.push({
    selectedWeekDays: ['1'],
    repeatUntil: addMonths(Date.now(), 1).getTime(),
    startAt: Date.now(),
    endAt: Date.now(),
    id: generateRandomId(),
  })
}

function removeItem(index: number) {
  formValue.timeSlots.splice(index, 1)
}

async function validate() {
  try {
    await formRef.value?.validate()
  } catch (error) {}
}
</script>
