<template>
  <u-card
    class="w-fit transition-all duration-300 mx-auto max-h-[800px] max-w-4xl sm:rounded-[30px] dark:bg-gray-950 overflow-x-hidden"
  >
    <!-- <template #header>
      <h2 class="text-xl font-bold text-center">
        Agenda tu cita para
        <span>"Peluqueria blaBLA"</span>
      </h2>
    </template> -->
    <div ref="parentRef" class="flex gap-16">
      <div class="flex flex-col justify-between gap-6 min-h-[600px] sm:w-[60%]">
        <div v-if="step === 1" ref="calendarRef">
          <calendar v-model="selectedDate" :min="new Date()" />
        </div>
        <div v-else-if="step === 2" ref="timeSlotsRef">
          <div class="mb-4">
            <u-button icon="i-heroicons-arrow-left" variant="ghost" size="lg" @click="step--"></u-button>
          </div>
          <div class="flex flex-wrap gap-4 max-h-[400px]">
            <appointment-time-slot-item
              v-for="(timeSlot, idx) in enabledTimeSlots"
              :key="idx"
              :active="selectedTimeSlot === timeSlot"
              @click="selectedTimeSlot = timeSlot"
            >
              {{ timeSlot }}
            </appointment-time-slot-item>
          </div>
        </div>
        <div v-else-if="step === 3" class="h-full">
          <div class="mb-4">
            <u-button icon="i-heroicons-arrow-left" variant="ghost" size="lg" @click="step--"></u-button>
          </div>
          <u-form class="flex flex-col gap-4 h-full" ref="formRef" :validate="validate" @submit.prevent>
            <u-form-group label="Correo" name="email">
              <u-input v-model="form.email" />
            </u-form-group>
            <u-form-group label="Nombre" name="firstName">
              <u-input v-model="form.firstName" />
            </u-form-group>
            <u-form-group label="Apellido" name="lastName">
              <u-input v-model="form.lastName" />
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
          v-if="step !== 3"
          size="xl"
          :ui="{
            rounded: 'rounded-full',
            padding: {
              xl: 'px-10',
            },
          }"
          block
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
          @click="submit"
        >
          Agendar
        </u-button>
      </div>
      <div class="sm:min-w-[300px] flex-1">
        <h2 class="text-xl font-bold text-center">
          Agenda tu cita para
          <span>"Peluqueria blaBLA"</span>
        </h2>

        <div class="grid gap-2 mt-10 bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl">
          <div>
            <span class="text-gray-400 font-medium">Fecha:</span>
            &nbsp;
            <span class="text-md font-bold">{{ selectedDate ? formatDate(selectedDate, 'dd MMMM yyyy') : '-' }}</span>
          </div>
          <div>
            <span class="text-gray-400 font-medium">Hora:</span>
            &nbsp;
            <span class="text-md font-bold">{{ transformedDate ? formatDate(transformedDate, 'hh:mm') : '-' }}</span>
          </div>
        </div>
      </div>
    </div>
  </u-card>
</template>
<script lang="ts" setup>
// import { usePreferredReducedMotion } from '@vueuse/core'

// import { useAnimateHeight } from '../composables/useAnimateHeight'
import { useCreateAppointment } from '../composables/useCreateAppointment'
// import { easeInOutQuad, easeOutQuart } from '../utils/ease-functions'

const { $v, form, selectedDate, selectedTimeSlot, enabledTimeSlots, validate, transformedDate } = useCreateAppointment()

const toast = useToast()

const step = ref(1)
const formRef = ref()
const isLoading = ref(false)
const isSuccess = ref(false)

async function submit() {
  try {
    await formRef.value.validate()
    // isLoading.value = true
  } catch (error) {}
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
