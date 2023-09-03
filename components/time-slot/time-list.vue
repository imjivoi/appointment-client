<template>
  <div>
    <n-scrollbar class="max-h-[180px]">
      <ul class="grid grid-cols-3 gap-4">
        <li v-for="(timeSlot, idx) in timeSlots" :key="idx">
          <time-slot-time-item :active="timeSlot === modelValue" @click="$emit('update:modelValue', timeSlot)">
            {{ formatTime(timeSlot) }}
          </time-slot-time-item>
        </li>
      </ul>
    </n-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { format } from 'date-fns/esm'
import { NScrollbar } from 'naive-ui'

defineProps<{
  timeSlots: string[]
  modelValue: string
}>()

defineEmits(['update:modelValue'])

function formatTime(time: string) {
  return format(new Date(time), 'HH:mm')
}
</script>
