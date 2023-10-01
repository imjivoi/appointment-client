<template>
  <div class="dark:text-white font-bold sm:text-lg w-32 sm:w-48">{{ selectedMonth }} {{ selectedYear }}</div>
</template>
<script setup lang="ts">
import { format } from 'date-fns/esm'
const props = defineProps<{
  selectedDate: Date
}>()

const selectedMonth = computed(() => format(props.selectedDate, 'MMMM'))
const selectedYear = computed(() => format(props.selectedDate, 'yyyy'))
</script>
