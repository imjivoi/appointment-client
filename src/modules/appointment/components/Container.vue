<template>
  <div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold">Turnos</h2>
    </div>
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <u-input
        v-model="emailOrName"
        placeholder="Buscar por email or nombre"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        size="md"
      >
        <template #trailing>
          <u-button color="gray" variant="link" icon="i-heroicons-magnifying-glass" :padded="false"></u-button>
        </template>
      </u-input>
      <u-button
        :ui="{
          rounded: 'rounded-full',
          padding: {
            sm: 'px-8',
          },
        }"
        :as="defineNuxtLink({})"
        to="/a/blabl"
      >
        Nuevo turno
      </u-button>
    </div>

    <div class="grid gap-6">
      <appointment-item v-for="appointment in appointments" v-bind="appointment" :key="appointment.id" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { startOfToday } from 'date-fns/esm'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { useModal } from 'vue-final-modal'

import AppointmentItem from './Item.vue'

import { cn } from '#shared/lib/utils'

const date = ref(startOfToday().getTime())
const emailOrName = ref('')

const page = ref(2)
const pageSize = ref(20)

const appointments = [
  {
    id: 1,
    startAt: '2023-09-26T18:34:03.959Z',
    endAt: '2023-09-26T19:34:03.959Z',
    client: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    service: 'Corte de cabello',
    status: 'Pendiente',
    email: 'john@doe.com',
  },
  {
    id: 2,
    startAt: '2023-09-27T18:34:03.959Z',
    endAt: '2023-09-27T19:34:03.959Z',
    client: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    service: 'Corte de cabello',
    status: 'Pendiente',
    email: 'john@doe.com',
  },
]
</script>
