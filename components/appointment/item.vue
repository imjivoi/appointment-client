<template>
  <div class="flex justify-between py-4 px-8 rounded-xl bg-gray-50">
    <div>
      <div class="mb-2 font-bold truncate max-w-[150px]">{{ fullName }}</div>
      <div>{{ email }}</div>
    </div>
    <div>
      <div class="mb-2">{{ getDate() }}</div>
      <div class="text-gray-500 font-medium">{{ getTime() }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  firstName: string
  lastName: string
  email: string
  startAt: string
  endAt: string
}>()

const fullName = computed(() => `${props.firstName} ${props.lastName}`)

function getDate() {
  return formatDate(new Date(props.startAt), 'dd MMMM')
}
function getTime() {
  return `${formatDate(new Date(props.startAt), 'HH:mm')} - ${formatDate(new Date(props.endAt), 'HH:mm')}`
}
</script>
