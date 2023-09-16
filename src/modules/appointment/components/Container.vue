<template>
  <div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold">Turnos</h2>
    </div>
    <div class="mb-2 flex flex-col sm:flex-row gap-4">
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
    <appointment-table v-if="viewport.isGreaterThan('sm')" />
    <template v-else>
      <div class="grid gap-6">
        <appointment-item />
      </div>
    </template>

    <div class="mt-4 flex">
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        class="ml-auto"
        :page-count="100"
        :page-sizes="[10, 20, 30, 40]"
        :page-slot="7"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { startOfToday } from 'date-fns/esm'
import { NPagination, NDatePicker, NButton, NInput, NInputGroup } from 'naive-ui'

const viewport = useViewport()

const date = ref(startOfToday().getTime())
const emailOrName = ref('')

const page = ref(2)
const pageSize = ref(20)
</script>
