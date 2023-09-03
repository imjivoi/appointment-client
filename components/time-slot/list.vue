<template>
  <ul class="space-y-2">
    <li v-for="timeSlot in timeSlots">
      <time-slot-item @click="$emit('active', timeSlot)">{{ formatTime(timeSlot) }}</time-slot-item>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import {format} from 'date-fns/esm'
const props = defineProps<{
  timeSlots: string[]
}>()

function formatTime(time: string) {
  return format(new Date(time), 'HH:mm')
}
</script>
