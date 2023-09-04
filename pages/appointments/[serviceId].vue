<template>
  <time-slot-chose v-if="viewport.isGreaterThan('sm')" :time-slots="timeSlots" />
  <time-slot-chose-mobile v-else :time-slots="timeSlots" />
</template>
<script setup lang="ts">
const timeSlots = [
  '2023-09-04T13:00:00Z',
  '2023-09-04T15:00:00Z',
  '2023-09-04T22:00:00Z',
  '2023-09-06T13:00:00Z',
  '2023-09-08T10:00:00Z',
  '2023-09-08T11:00:00Z',
  '2023-09-08T12:00:00Z',
  '2023-09-08T13:00:00Z',
  '2023-09-08T14:00:00Z',
  '2023-09-08T15:00:00Z',
  '2023-09-08T16:00:00Z',
  '2023-09-08T17:00:00Z',
  '2023-09-08T18:00:00Z',
  '2023-09-08T19:00:00Z',
  '2023-09-08T20:00:00Z',
]

const viewport = useViewport()
</script>
