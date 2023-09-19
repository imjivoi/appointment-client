<template>
  <ui-card class="w-fit transition duration-300 mx-auto">
    <ui-card-header>
      <ui-card-title class="text-xl font-bold text-center">
        Agenda tu cita para
        <span>"Peluqueria blaBLA"</span>
      </ui-card-title>
    </ui-card-header>
    <ui-card-content class="transition duration-300">
      <div v-if="step === 1" class="flex justify-center flex-col sm:flex-row gap-10">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-center mb-4 font-bold">Eligi fecha</h4>
          <ui-calendar v-model="selectedDate" class="rounded-md" />
        </div>
        <div class="bg-gray-50 p-4 flex-1 rounded-lg flex flex-col gap-4">
          <h4 class="text-center mb-4 font-bold">Tiempo disponible</h4>
          <ui-scroll-area class="h-52">
            <div class="flex flex-wrap gap-2">
              <appointment-time-slot-item
                v-for="(timeSlot, idx) in timeSlots"
                :key="idx"
                :active="selectedTimeSlot?.id === timeSlot.id"
                @click="selectedTimeSlot = timeSlot"
              >
                {{ timeSlot.time }}
              </appointment-time-slot-item>
            </div>
          </ui-scroll-area>
          <div class="mt-auto text-right">
            <ui-button :disabled="!selectedDate || !selectedTimeSlot" @click="step = 2" class="w-full sm:w-auto">
              Seguir
            </ui-button>
          </div>
        </div>
      </div>
      <div v-else class="max-w-sm">
        <form class="grid gap-6" @submit.prevent>
          <div>
            <ui-label>Correo</ui-label>
            <ui-input v-model="form.email" />
            <template v-if="$v.email.$error">
              <div v-if="$v.email.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu correo</div>
              <div v-else-if="$v.email.email?.$invalid" class="text-red-500 mt-1">Por favor un correo valido</div>
            </template>
          </div>
          <div>
            <ui-label>Nombre</ui-label>
            <ui-input v-model="form.fi" />
            <template v-if="$v.firstName.$error">
              <div v-if="$v.firstName.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu nombre</div>
              <div v-else-if="$v.firstName.minLength?.$invalid" class="text-red-500 mt-1">
                Nombre debe contener al menos 3 digitos
              </div>
            </template>
          </div>
          <div>
            <ui-label>Apellido</ui-label>
            <ui-input v-model="form.lastName" />
            <template v-if="$v.lastName.$error">
              <div v-if="$v.lastName.required?.$invalid" class="text-red-500 mt-1">Por favor ingresa tu apellido</div>
              <div v-else-if="$v.lastName.minLength?.$invalid" class="text-red-500 mt-1">
                Apellido debe contener al menos 3 digitos
              </div>
            </template>
          </div>
          <div class="grid gap-2">
            <ui-button block @click="validate">Agendar</ui-button>
            <ui-button block variant="outline" @click="step = 1">Atras</ui-button>
          </div>
        </form>
      </div>
    </ui-card-content>
  </ui-card>
</template>
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const timeSlots = [
  {
    id: 1,
    time: '10:00',
  },
  {
    id: 2,
    time: '10:05',
  },
  {
    id: 3,
    time: '10:10',
  },
  {
    id: 4,
    time: '10:15',
  },
  {
    id: 5,
    time: '10:20',
  },
  {
    id: 6,
    time: '10:25',
  },
  {
    id: 7,
    time: '10:25',
  },
  {
    id: 8,
    time: '10:25',
  },
  {
    id: 9,
    time: '10:25',
  },
  {
    id: 10,
    time: '10:25',
  },
  {
    id: 11,
    time: '10:25',
  },
  {
    id: 12,
    time: '10:25',
  },
  {
    id: 13,
    time: '10:25',
  },
  {
    id: 14,
    time: '10:25',
  },
  {
    id: 15,
    time: '10:25',
  },
  {
    id: 16,
    time: '10:25',
  },
  {
    id: 17,
    time: '10:25',
  },
  {
    id: 18,
    time: '10:25',
  },
  {
    id: 19,
    time: '10:25',
  },
  {
    id: 20,
    time: '10:25',
  },
  {
    id: 21,
    time: '10:25',
  },
  {
    id: 22,
    time: '10:25',
  },
  {
    id: 23,
    time: '10:25',
  },
  {
    id: 24,
    time: '10:25',
  },
  {
    id: 25,
    time: '10:25',
  },
  {
    id: 26,
    time: '10:25',
  },
  {
    id: 27,
    time: '10:25',
  },
  {
    id: 28,
    time: '10:25',
  },
  {
    id: 29,
    time: '10:25',
  },
  {
    id: 30,
    time: '10:25',
  },
  {
    id: 31,
    time: '10:25',
  },
  {
    id: 32,
    time: '10:25',
  },
  {
    id: 33,
    time: '10:25',
  },
  {
    id: 34,
    time: '10:25',
  },
  {
    id: 35,
    time: '10:25',
  },
  {
    id: 36,
    time: '10:25',
  },
  {
    id: 37,
    time: '10:25',
  },
  {
    id: 38,
    time: '10:25',
  },
  {
    id: 39,
    time: '10:25',
  },
  {
    id: 40,
    time: '10:25',
  },
  {
    id: 41,
    time: '10:25',
  },
]

const selectedDate = ref(new Date())
const selectedTimeSlot = ref(null)

const step = ref(1)

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
})

const rules = {
  email: { required, email },
  firstName: { minLength: minLength(3), required },
  lastName: { minLength: minLength(3), required },
}

const $v = useVuelidate(rules, form)

async function validate() {
  try {
    await $v.value.$validate()
  } catch (error) {}
}
</script>
