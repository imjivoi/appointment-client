<template>
  <n-table>
    <thead>
      <tr>
        <th>Tiempo</th>
        <th>Fecha</th>
        <th>Cliente</th>
        <th>Servicio</th>
        <th>Estado</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(appointment, idx) in appointments" :key="idx">
        <td class="font-medium">{{ appointment.time }}</td>
        <td class="font-medium">{{ appointment.date }}</td>
        <td class="font-medium">{{ appointment.client }}</td>
        <td class="font-medium">{{ appointment.service }}</td>
        <td class="font-medium">
          <n-tag :bordered="false" type="warning" round>{{ appointment.status }}</n-tag>
        </td>
        <td>
          <div class="flex gap-2">
            <n-button size="tiny" circle type="info" secondary>
              <template #icon>
                <Icon name="ic:baseline-edit" />
              </template>
            </n-button>
            <n-button size="tiny" circle type="error" secondary title="Cancelar">
              <template #icon>
                <Icon name="ic:outline-close" />
              </template>
            </n-button>
          </div>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>
<script lang="ts" setup>
import { NTable, NButton, NTag } from 'naive-ui'

const appointments = [
  {
    id: 1,
    time: '10:00',
    date: '2021-10-10',
    client: 'John Doe',
    service: 'Corte de cabello',
    status: 'Pendiente',
  },
  {
    id: 2,
    time: '10:00',
    date: '2021-10-10',
    client: 'John Doe',
    service: 'Corte de cabello',
    status: 'Pendiente',
  },
]
</script>
