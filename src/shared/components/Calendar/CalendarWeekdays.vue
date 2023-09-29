<template>
  <div class="grid grid-cols-7 place-items-center">
    <div v-for="weekday in WEEKDAYS" :key="weekday">{{ weekday }}</div>
  </div>
</template>
<script lang="ts" setup>
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
</script>
