<template>
  <ul class="space-y-2">
    <li v-for="timeSlot in timeSlots">
      <time-slot-item>{{ timeSlot.time }}</time-slot-item>
    </li>
  </ul>
</template>
<script lang="ts" setup>
const timeSlots = [
  {
    id: 1,
    time: '9:00 AM',
  },
  {
    id: 2,
    time: '9:00 AM',
  },
  {
    id: 3,
    time: '9:00 AM',
  },
]
</script>
