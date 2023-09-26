<template>
  <div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold">Turnos</h2>
    </div>
    <div class="mb-2 flex flex-col sm:flex-row gap-4">
      <div class="flex gap-2">
        <ui-input v-model="emailOrName" placeholder="Buscar por email or nombre" />
        <ui-button variant="ghost">
          <Icon name="ic:outline-search" />
        </ui-button>
      </div>
      <client-only>
        <ui-popover>
          <ui-popover-trigger>
            <ui-button :variant="'outline'" :class="cn('justify-start text-left font-normal w-[150px]')">
              <CalendarIcon class="mr-2 h-4 w-4" />
              <span>{{ date ? formatDate(date, 'PP') : 'Pick a date' }}</span>
            </ui-button>
          </ui-popover-trigger>
          <ui-popover-content class="w-auto p-0">
            <ui-calendar v-model="date" />
          </ui-popover-content>
        </ui-popover>
      </client-only>
      <ui-button variant="secondary" :as="defineNuxtLink({})" to="/dashboard/appointments/create">
        Nuevo turno
      </ui-button>
    </div>

    <div class="grid gap-6">
      <appointment-item v-for="appointment in appointments" v-bind="appointment" />
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
