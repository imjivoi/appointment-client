<template>
  <div
    class="flex flex-col sm:flex-row gap-8 items-center md:items-baseline bg-gray-50 py-4 px-4 md:px-16 rounded-xl w-full"
  >
    <div>
      <h3 class="font-bold text-xl text-center mb-4">Eligi fecha</h3>
      <n-date-picker
        v-model:value="activeDay"
        :first-day-of-week="0"
        type="date"
        panel
        :is-date-disabled="disabledDate"
        :actions="null"
      ></n-date-picker>
    </div>
    <div class="flex-1 flex flex-col self-stretch justify-between gap-4">
      <div>
        <h3 class="font-bold text-xl text-center mb-4">Eligi tiempo</h3>
        <time-slot-time-list v-model="activeTime" :time-slots="currentTimeSlots" />
      </div>
      <div>
        <n-form ref="formRef" :model="formValue" :rules="rules" :disabled="!isFormEnabled">
          <div class="md:flex gap-4">
            <n-form-item label="Tu nombre" path="firstName">
              <n-input v-model:value="formValue.firstName" />
            </n-form-item>
            <n-form-item label="Tu email" path="email">
              <n-input v-model:value="formValue.email" />
            </n-form-item>
            <n-form-item>
              <n-button type="primary" :disabled="!isFormEnabled" @click="validate">Confirmar</n-button>
            </n-form-item>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isSameDay, getTime, format, startOfToday } from 'date-fns/esm'
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

async function validate() {
  try {
    await formRef.value?.validate()
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
