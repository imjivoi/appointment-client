<template>
  <div class="flex gap-4 justify-center">
    <div class="w-24 mt-2 font-medium">
      {{ weekDay.label }}
    </div>
    <n-form-item class="block">
      <n-switch v-model:value="active">
        <template #checked>Activo</template>
        <template #unchecked>Inactivo</template>
      </n-switch>
    </n-form-item>
    <div class="grid ml-10">
      <div v-for="(timeItem, timeItemIdx) in time" :key="timeItemIdx" class="flex gap-4">
        <n-form-item class="w-32 block">
          <n-time-picker
            v-model:value="timeItem.startAt"
            format="HH:mm"
            time-zone="America/Argentina/Buenos_Aires"
            :disabled="!active"
          />
        </n-form-item>
        <span class="mt-2">hasta</span>
        <n-form-item class="w-32 block">
          <n-time-picker v-model:value="timeItem.endAt" :disabled="!active" format="HH:mm" />
        </n-form-item>
        <div class="mt-1">
          <n-button
            v-if="timeItemIdx === 0"
            circle
            size="tiny"
            type="info"
            secondary
            :disabled="!active"
            @click="addTime"
          >
            <template #icon>
              <Icon name="ic:round-plus" />
            </template>
          </n-button>
          <n-button
            v-if="timeItemIdx !== 0"
            circle
            size="tiny"
            type="error"
            secondary
            :disabled="!active"
            @click="removeTime(timeItemIdx)"
          >
            <template #icon>
              <Icon name="ic:baseline-delete" />
            </template>
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { setHours, startOfDay } from 'date-fns/esm'
import { NButton, NFormItem, NTimePicker, NSwitch } from 'naive-ui'

const props = defineProps<{
  idx: number
  weekDay: {
    label: string
    value: string
  }
}>()

const active = defineModel<boolean>('active')
const time = defineModel<{ startAt: number; endAt: number }[]>('time')

const START_AT_DEFAULT = setHours(startOfDay(Date.now()), 9).getTime()
const END_AT_DEFAULT = setHours(startOfDay(Date.now()), 17).getTime()

function addTime() {
  time.value!.push({
    startAt: START_AT_DEFAULT,
    endAt: END_AT_DEFAULT,
  })
}

function removeTime(idx: number) {
  time.value!.splice(idx, 1)
}
</script>
