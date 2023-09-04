<template>
  <div
    class="bg-gray-50 py-4 px-4 rounded-xl w-full h-96 transition-all duration-200"
    :class="{
      'bg-green-50': stepper.isCurrent('confirmed'),
    }"
  >
    <div v-if="stepper.isCurrent('date')">
      <h3 class="font-bold text-xl text-center mb-4">Eligi fecha</h3>
      <div class="flex justify-center">
        <n-date-picker
          v-model:value="activeDay"
          class="mx-auto"
          :first-day-of-week="0"
          type="date"
          panel
          :is-date-disabled="disabledDate"
          :actions="null"
        ></n-date-picker>
      </div>

      <div class="mt-auto">
        <n-button type="primary" block @click="stepper.goToNext()">Siguiente</n-button>
      </div>
    </div>
    <div v-if="stepper.isCurrent('time')" class="h-full flex flex-col justify-between">
      <div>
        <h3 class="font-bold text-xl text-center mb-4">Eligi tiempo</h3>
        <time-slot-time-list v-model="activeTime" :time-slots="currentTimeSlots" />
      </div>
      <div class="grid gap-2 mt-8">
        <n-button type="primary" block :disabled="!stepper.current.value.isValid()" @click="stepper.goToNext()">
          Siguiente
        </n-button>
        <n-button block @click="stepper.goToPrevious()">Anterior</n-button>
      </div>
    </div>
    <div v-if="stepper.isCurrent('userInfo')" class="h-full">
      <h3 class="font-bold text-xl text-center mb-4">Tus datos</h3>

      <n-form ref="formRef" class="h-full grid" :model="formValue" :rules="rules" :disabled="!isFormEnabled">
        <div class="">
          <n-form-item label="Tu nombre" path="firstName">
            <n-input v-model:value="formValue.firstName" />
          </n-form-item>
          <n-form-item label="Tu email" path="email">
            <n-input v-model:value="formValue.email" />
          </n-form-item>
        </div>

        <div class="grid gap-2 mt-4 self-baseline">
          <n-button type="primary" block :disabled="!isFormEnabled" attr-type="submit" @click="validate">
            Confirmar
          </n-button>
          <n-button block @click="stepper.goToPrevious()">Anterior</n-button>
        </div>
      </n-form>
    </div>
    <div v-if="stepper.isCurrent('confirmed')" class="text-center">
      <h3 class="font-bold text-xl mb-4">Listo!</h3>
      <p class="mb-2">Tu turno esta confirmado</p>
      <p>Pronto te mandamos un email con informacion de tu turno y con un link de cancelacion</p>
    </div>
  </div>
</template>
<script setup lang="ts">
// TODO: create mob component
import { isSameDay, getTime, format, isToday, isBefore, startOfToday } from 'date-fns/esm'
import { NButton, NInput, NForm, NFormItem, NDatePicker, FormInst, FormRules } from 'naive-ui'
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
const activeTime = ref<string>('')

const formRef = ref<FormInst | null>(null)
const formValue = ref({
  firstName: '',
  email: '',
})

const rules: FormRules = {
  firstName: {
    required: true,
    message: 'Por favor ingresa tu nombre',
    trigger: 'blur',
  },
  email: [
    {
      required: true,
      message: 'Por favor ingresa tu email',
      trigger: 'blur',
      validator: (rule, value) => {
        if (!value) return false
        return /.+@.+\..+/.test(value)
      },
    },
  ],
}

const stepper = useStepper({
  date: {
    isValid: () => !!activeDay.value,
  },
  time: {
    isValid: () => !!activeTime.value,
  },
  userInfo: {
    isValid: () => !!formValue.value.firstName && !!formValue.value.email,
  },
  confirmed: {},
})

async function validate() {
  try {
    await formRef.value?.validate()

    stepper.goTo('confirmed')
  } catch (error) {}
}

const isFormEnabled = computed(() => {
  return !!activeTime.value && !!activeDay.value
})

watch(activeDay, () => {
  activeTime.value = ''
})

const currentTimeSlots = computed(() => {
  return props.timeSlots.filter((time) => {
    const timeTs = getTime(new Date(time))
    return isSameDay(timeTs, activeDay.value)
  })
})
function disabledDate(ts: number) {
  const now = new Date().getTime()
  const lastDay = getTime(new Date(props.timeSlots.at(-1) as string))
  const date = getTime(new Date(ts))

  if (date < getTime(startOfToday()) || date > lastDay) return true

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
