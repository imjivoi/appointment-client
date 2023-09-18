<template>
  <ui-table>
    <ui-table-header>
      <ui-table-row>
        <ui-table-head class-name="w-[100px]">Tiempo</ui-table-head>
        <ui-table-head>Fecha</ui-table-head>
        <ui-table-head>Cliente</ui-table-head>
        <ui-table-head>Servicio</ui-table-head>
        <ui-table-head>Estatus</ui-table-head>
        <ui-table-head></ui-table-head>
      </ui-table-row>
    </ui-table-header>
    <ui-table-body>
      <ui-table-row v-for="(appointment, idx) in appointments" :key="idx">
        <ui-table-cell class="font-medium">
          {{ appointment.time }}
        </ui-table-cell>
        <ui-table-cell>{{ appointment.date }}</ui-table-cell>
        <ui-table-cell>{{ appointment.client }}</ui-table-cell>
        <ui-table-cell>{{ appointment.service }}</ui-table-cell>
        <ui-table-cell>
          <div class="flex gap-2">
            <ui-button rounded size="icon" variant="secondary">
              <Icon name="ic:baseline-edit" />
            </ui-button>
            <ui-button rounded size="icon" variant="desctructive" class="text-red-500">
              <Icon name="ic:outline-close" />
            </ui-button>
          </div>
        </ui-table-cell>
      </ui-table-row>
    </ui-table-body>
  </ui-table>
</template>
<script lang="ts" setup>
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
