<template>
  <u-card
    class="w-fit transition-all duration-300 mx-auto md:max-h-[800px] max-w-4xl sm:rounded-[30px] dark:bg-gray-950 overflow-x-hidden"
  >
    <!-- <template #header>
      <h2 class="text-xl font-bold text-center">
        Agenda tu cita para
        <span>"Peluqueria blaBLA"</span>
      </h2>
    </template> -->
    <div v-if="isSuccess" class="max-w-sm">
      <div class="mb-4">
        <span class="mx-auto bg-green-400 rounded-full h-28 w-28 flex justify-center items-center">
          <Icon size="40" class="text-white" name="heroicons:check" />
        </span>
      </div>
      <h2 class="text-xl font-bold text-center">
        Exitosamente agendaste cita para
        <span>"Peluqueria blaBLA"</span>
      </h2>

      <div class="grid gap-4 mt-10 bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl">
        <div class="flex items-center gap-2">
          <Icon size="30" class="text-primary" name="heroicons:wrench-screwdriver-solid" />
          <span class="text-lg font-bold">{{ selectedServiceLabel ?? '-' }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon size="30" class="text-primary" name="heroicons:calendar-days-solid"></Icon>
          <span class="text-lg font-bold">{{ selectedDate ? formatDate(selectedDate, 'dd MMMM yyyy') : '-' }}</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon size="30" class="text-primary" name="heroicons:clock-20-solid"></Icon>
          <span class="text-md font-bold">{{ transformedDate ? formatDate(transformedDate, 'hh:mm') : '-' }}</span>
        </div>
      </div>

      <div class="grid gap-4 mt-10">
        <u-button
          variant="soft"
          size="lg"
          block
          :ui="{
            rounded: 'rounded-full',
          }"
          @click="reset"
        >
          Agendar otro turno
        </u-button>
        <u-button
          color="rose"
          variant="soft"
          size="lg"
          block
          :ui="{
            rounded: 'rounded-full',
          }"
        >
          Cancelar
        </u-button>
      </div>
    </div>
    <div v-else ref="parentRef" class="flex flex-col-reverse md:flex-row gap-8 sm:gap-16">
      <div class="flex flex-col justify-between gap-6 md:min-h-[550px] md:w-[60%]">
        <div class="mb-4 flex items-center gap-4">
          <u-button
            icon="i-heroicons-arrow-left"
            variant="ghost"
            size="lg"
            :disabled="isLoading"
            @click="step--"
            v-if="step !== steps.service"
          ></u-button>
          <h2 class="text-xl font-bold text-center">
            <template v-if="step === steps.service">Selecciona servicio</template>
            <template v-if="step === steps.date">Selecciona fecha</template>
            <template v-if="step === steps.time">Selecciona tiempo</template>
            <template v-if="step === steps.form">Datos de usuario</template>
          </h2>
        </div>
        <div v-if="step === steps.service">
          <u-radio
            v-for="service of services"
            :key="service.name"
            v-model="selectedService"
            v-bind="service"
            :ui="{
              wrapper: 'mb-6',
            }"
          />
        </div>
        <div v-if="step === steps.date" ref="calendarRef">
          <calendar v-model="selectedDate" :min="startOfDay(new Date())" />
        </div>
        <div v-else-if="step === steps.time" ref="timeSlotsRef">
          <div class="flex flex-wrap gap-4 max-h-[400px] overflow-y-auto p-2">
            <appointment-time-slot-item
              v-for="(timeSlot, idx) in enabledTimeSlots"
              :key="idx"
              class="flex-1"
              :active="selectedTimeSlot === timeSlot"
              @click="selectedTimeSlot = timeSlot"
            >
              {{ timeSlot }}
            </appointment-time-slot-item>
          </div>
        </div>
        <div v-else-if="step === steps.form" class="h-full">
          <u-form ref="formRef" class="flex flex-col gap-4 h-full" :validate="validate" @submit.prevent>
            <u-form-group label="Correo" name="email" size="md">
              <u-input v-model="form.email" :disabled="isLoading" />
            </u-form-group>
            <u-form-group label="Nombre" name="firstName" size="md">
              <u-input v-model="form.firstName" :disabled="isLoading" />
            </u-form-group>
            <u-form-group label="Apellido" name="lastName" size="md">
              <u-input v-model="form.lastName" :disabled="isLoading" />
            </u-form-group>
            <!-- <div class="grid gap-2">
              <u-button
                size="xl"
                :ui="{
                  rounded: 'rounded-full',
                  padding: {
                    xl: 'px-10',
                  },
                }"
                block
                type="submit"
              >
                Agendar
              </u-button>
            </div> -->
          </u-form>
        </div>
        <u-button
          v-if="step !== steps.form"
          size="xl"
          :ui="{
            rounded: 'rounded-full',
            padding: {
              xl: 'px-10',
            },
          }"
          block
          :disabled="nextStepDisabled"
          @click="step++"
        >
          Seguir
        </u-button>
        <u-button
          v-else
          size="xl"
          :ui="{
            rounded: 'rounded-full',
            padding: {
              xl: 'px-10',
            },
          }"
          block
          :loading="isLoading"
          @click="submit"
        >
          Agendar
        </u-button>
      </div>
      <div class="md:min-w-[300px] flex-1">
        <h2 class="text-xl font-bold text-center">
          Agenda tu cita para
          <span>"Peluqueria blaBLA"</span>
        </h2>

        <div class="grid gap-4 mt-10 bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl">
          <div class="flex items-center gap-2">
            <Icon size="30" class="text-primary" name="heroicons:wrench-screwdriver-solid" />
            <span class="text-lg font-bold">{{ selectedServiceLabel ?? '-' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon size="30" class="text-primary" name="heroicons:calendar-days-solid"></Icon>
            <span class="text-lg font-bold">{{ selectedDate ? formatDate(selectedDate, 'dd MMMM yyyy') : '-' }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon size="30" class="text-primary" name="heroicons:clock-20-solid"></Icon>
            <span class="text-md font-bold">{{ transformedDate ? formatDate(transformedDate, 'hh:mm') : '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
import { startOfDay } from 'date-fns'
// import { usePreferredReducedMotion } from '@vueuse/core'

// import { useAnimateHeight } from '../composables/useAnimateHeight'
import { useCreateAppointment } from '../composables/useCreateAppointment'
// import { easeInOutQuad, easeOutQuart } from '../utils/ease-functions'

const steps = {
  service: 1,
  date: 2,
  time: 3,
  form: 4,
}
const {
  $v,
  form,
  selectedDate,
  selectedTimeSlot,
  enabledTimeSlots,
  validate,
  transformedDate,
  resetForm,
  selectedService,
} = useCreateAppointment()

const toast = useToast()

const step = ref(steps.service)
const formRef = ref()
const isLoading = ref(false)
const isSuccess = ref(false)

const services = [
  {
    name: 'corte de pelo',
    value: 'corte-de-pelo',
    label: 'Corte de pelo',
    help: 'Duracion 30 min',
  },
  {
    name: 'corte de barba',
    value: 'corte-de-barba',
    label: 'Corte de barba',
    help: 'Duracion 30 min',
  },
  {
    name: 'corte de pelo y barba',
    value: 'corte-de-pelo-y-barba',
    label: 'Corte de pelo y barba',
    help: 'Duracion 30 min',
  },
]

const selectedServiceLabel = computed(() => {
  return services.find((service) => service.value === selectedService.value)?.label
})

const nextStepDisabled = computed(() => {
  switch (step.value) {
    case steps.service:
      return !selectedService.value

    case steps.date:
      return !selectedDate.value

    case steps.time:
      return !selectedTimeSlot.value

    default:
      break
  }
})

async function submit() {
  try {
    await formRef.value.validate()
    isLoading.value = true
    await sleep(2000)
    isSuccess.value = true
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

function reset() {
  step.value = 1
  isSuccess.value = false
  resetForm()
}

// const parentRef = ref() as unknown as HTMLFormElement
// const calendarRef = ref() as unknown as HTMLFormElement
// const timeSlotsRef = ref() as unknown as HTMLFormElement

// const animateHeight = useAnimateHeight({ parentRef })

// let changePageTimeout = undefined as unknown as ReturnType<typeof setTimeout>

// const preferredMotion = usePreferredReducedMotion()
// const shouldReduceMotion = preferredMotion.value === 'reduce'

// onMounted(() => {
//   if (shouldReduceMotion) {
//     parentRef.value.style.height = `${calendarRef.value.offsetHeight + 80}px`
//     return
//   }
//   // Slightly slower animation at page init, with a different easing function
//   animateHeight({ duration: 450, easeFn: easeInOutQuad, childRef: calendarRef })
// })

// watch(step, () => {
//   const childRef = step === 1 ? calendarRef : timeSlotsRef
//   if (shouldReduceMotion) {
//     setTimeout(() => {
//       parentRef.value.style.height = `${childRef.value.offsetHeight + 80}px`
//     })
//     return
//   }
//   clearTimeout(changePageTimeout)
//   changePageTimeout = setTimeout(() => {
//     // 350 -> Arbitrary value...
//     // In theory we should put the same duration as the CSS transform transition (0.3s)
//     // but visually it seems better to give a slightly longer duration here
//     animateHeight({ duration: 350, easeFn: easeOutQuart, childRef })
//   }, 0)
// })
</script>
