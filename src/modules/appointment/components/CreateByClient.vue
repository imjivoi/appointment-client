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
                v-for="(timeSlot, idx) in enabledTimeSlots"
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
            <ui-input v-model="form.firstName" />
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
import { useCreateAppointment } from '../composables/useCreateAppointment'

const { $v, form, selectedDate, selectedTimeSlot, enabledTimeSlots, validate } = useCreateAppointment()

const step = ref(1)
</script>
