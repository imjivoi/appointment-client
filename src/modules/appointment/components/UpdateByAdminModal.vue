<template>
  <modal>
    <template #header>
      <h3 class="text-xl sm:text-2xl font-bold text-center">Crear cita</h3>
    </template>
    <div v-if="step === 1">
      <div class="flex justify-center flex-col sm:flex-row gap-10">
        <div class="sm:bg-gray-50 sm:p-4 rounded-lg">
          <h4 class="text-center mb-4 font-bold">Eligi fecha</h4>
          <ui-calendar v-model="selectedDate" class="rounded-md" />
        </div>
        <div class="sm:bg-gray-50 p-4 flex-1 rounded-lg flex flex-col gap-4">
          <h4 class="text-center mb-4 font-bold">Tiempo disponible</h4>
          <ui-scroll-area class="max-h-60">
            <div class="flex flex-wrap gap-2">
              <appointment-time-slot-item
                v-for="(timeSlot, idx) in enabledTimeSlots"
                :key="idx"
                :active="selectedTimeSlot?.id === timeSlot.id"
                @click="selectedTimeSlot = timeSlot"
              >
                {{ timeSlot.time }}
              </appointment-time-slot-item>
            </div>
          </ui-scroll-area>
        </div>
      </div>
      <div class="mt-4 text-right">
        <ui-button :disabled="!selectedDate || !selectedTimeSlot" @click="step = 2" class="w-full sm:w-auto">
          Seguir
        </ui-button>
      </div>
    </div>
    <div v-else class="max-w-sm mx-auto">
      <div class="grid gap-2 mb-8">
        <div class="text-md font-bold">Fecha: {{ formatDate(selectedDate, 'dd MMMM yyyy') }}</div>
        <div class="text-md font-bold">Hora: {{ formatDate(selectedDate, 'HH:MM') }}</div>
      </div>
      <form class="grid gap-6" @submit.prevent>
        <div>
          <ui-label>Correo</ui-label>
          <ui-input v-model="form.email" />
          <template v-if="$v.email.$error">
            <div v-if="$v.email.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa el correo de tu cliente
            </div>
            <div v-else-if="$v.email.email?.$invalid" class="text-red-500 mt-1">Por favor un correo valido</div>
          </template>
        </div>
        <div>
          <ui-label>Nombre</ui-label>
          <ui-input v-model="form.firstName" />
          <template v-if="$v.firstName.$error">
            <div v-if="$v.firstName.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa el nombre de tu cliente
            </div>
            <div v-else-if="$v.firstName.minLength?.$invalid" class="text-red-500 mt-1">
              Nombre debe contener al menos 3 digitos
            </div>
          </template>
        </div>
        <div>
          <ui-label>Apellido</ui-label>
          <ui-input v-model="form.lastName" />
          <template v-if="$v.lastName.$error">
            <div v-if="$v.lastName.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa el apellido de tu cliente
            </div>
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
  </modal>
</template>
<script lang="ts" setup>
import { useCreateAppointment } from '../composables/useCreateAppointment'

const { $v, form, selectedDate, selectedTimeSlot, enabledTimeSlots, validate } = useCreateAppointment()

const step = ref(1)

const appointment = {
  id: 1,
  time: '10:00',
  date: '2021-10-10',
  client: 'John Doe',
  service: 'Corte de cabello',
  status: 'Pendiente',
}
</script>
