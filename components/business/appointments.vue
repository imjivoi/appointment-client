<template>
  <div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold">Turnos</h2>
    </div>
    <div class="mb-2 flex gap-4">
      <n-input-group>
        <n-input v-model:value="emailOrName" placeholder="Buscar por email or nombre" />
        <n-button>
          <template #icon>
            <Icon name="ic:outline-search" />
          </template>
        </n-button>
      </n-input-group>
      <n-date-picker v-model:value="date" type="date" clearable />
      <n-button type="info" secondary round>Nuevo turno</n-button>
    </div>
    <business-appointment-table />
    <div class="mt-4 flex">
      <n-pagination
        class="ml-auto"
        v-model:page="page"
        v-model:page-size="pageSize"
        :page-count="100"
        :page-sizes="[10, 20, 30, 40]"
        :page-slot="8"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { startOfToday } from 'date-fns/esm'
import { NPagination, NDatePicker, NButton, NInput, NInputGroup } from 'naive-ui'

const date = ref(startOfToday())
const emailOrName = ref('')

const page = ref(2)
const pageSize = ref(20)
</script>
