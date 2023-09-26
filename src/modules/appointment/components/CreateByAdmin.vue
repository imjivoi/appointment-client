<template>
  <div class="bg-gray-100 py-4 px-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
    <div class="mb-4">
      <h2 class="text-2xl font-bold">Crear cita</h2>
    </div>
    <div class="grid gap-4 mb-8 bg-gray-50 p-4 rounded-xl">
      <div>
        <ui-label class="text-gray-400 font-medium">Servicio</ui-label>
        <ui-select v-model="selectedService">
          <ui-select-trigger class="sm:max-w-[250px]">
            <ui-select-value class="font-bold" placeholder="Eligi una categoria" />
          </ui-select-trigger>
          <ui-select-content>
            <ui-select-group>
              <ui-select-item v-for="(service, idx) in services" :key="idx" :value="service.value">
                {{ service.name }}
              </ui-select-item>
            </ui-select-group>
          </ui-select-content>
        </ui-select>
      </div>

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

    <div v-if="step === steps.date">
      <div class="flex justify-center flex-col sm:flex-row gap-10">
        <div class="sm:bg-gray-50 sm:p-4 rounded-lg">
          <h4 class="text-center mb-4 font-bold">Eligi fecha</h4>
          <ui-calendar :min-date="new Date()" v-model="selectedDate" class="rounded-md" />
        </div>
        <div class="sm:bg-gray-50 p-4 flex-1 rounded-lg flex flex-col gap-4">
          <h4 class="text-center mb-4 font-bold">Tiempo disponible</h4>
          <ui-scroll-area class="max-h-60">
            <div class="flex flex-wrap gap-2">
              <appointment-time-slot-item
                class="flex-1"
                v-for="(timeSlot, idx) in enabledTimeSlots"
                :key="idx"
                :active="selectedTimeSlot === timeSlot"
                @click="selectedTimeSlot = timeSlot"
              >
                {{ timeSlot }}
              </appointment-time-slot-item>
            </div>
          </ui-scroll-area>
        </div>
      </div>
      <div class="mt-4 text-right">
        <ui-button :disabled="!selectedDate || !selectedTimeSlot" @click="step = steps.client" class="w-full sm:w-auto">
          Seguir
        </ui-button>
      </div>
    </div>
    <div v-else-if="steps.client" class="p-4 bg-gray-50 rounded-xl">
      <h4 class="text-center mb-4 font-bold">Datos de cliente</h4>

      <form class="grid gap-6" @submit.prevent>
        <div>
          <ui-label>Correo</ui-label>
          <ui-input v-model="form.email" />
          <template v-if="$v.email.$error">
            <div v-if="$v.email.required?.$invalid" class="text-red-500 text-sm mt-1">
              Por favor ingresa el correo de tu cliente
            </div>
            <div v-else-if="$v.email.email?.$invalid" class="text-red-500 text-sm mt-1">Por favor un correo valido</div>
          </template>
        </div>
        <div>
          <ui-label>Nombre</ui-label>
          <ui-input v-model="form.firstName" />
          <template v-if="$v.firstName.$error">
            <div v-if="$v.firstName.required?.$invalid" class="text-red-500 text-sm mt-1">
              Por favor ingresa el nombre de tu cliente
            </div>
            <div v-else-if="$v.firstName.minLength?.$invalid" class="text-red-500 text-sm mt-1">
              Nombre debe contener al menos 3 digitos
            </div>
          </template>
        </div>
        <div>
          <ui-label>Apellido</ui-label>
          <ui-input v-model="form.lastName" />
          <template v-if="$v.lastName.$error">
            <div v-if="$v.lastName.required?.$invalid" class="text-red-500 text-sm mt-1">
              Por favor ingresa el apellido de tu cliente
            </div>
            <div v-else-if="$v.lastName.minLength?.$invalid" class="text-red-500 text-sm mt-1">
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
  </div>
</template>
<script lang="ts" setup>
import {} from 'date-fns/esm'
import { useCreateAppointment } from '../composables/useCreateAppointment'

const { $v, form, selectedDate, selectedTimeSlot, enabledTimeSlots, validate, transformedDate } = useCreateAppointment()

const steps = {
  date: 1,
  client: 2,
  success: 3,
}

const step = ref(steps.date)

const services = [
  {
    id: 1,
    name: 'Corte de cabello',
    duration: 30,
    price: 100,
    value: 'corte-de-cabello',
  },
  {
    id: 2,
    name: 'Corte de barba',
    duration: 30,
    price: 100,
    value: 'corte-de-barba',
  },
  {
    id: 3,
    name: 'Corte de cabello y barba',
    duration: 30,
    price: 100,
    value: 'corte-de-cabello-y-barba',
  },
]

const selectedService = ref(services[0].value)
</script>
