<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold">Próximos turnos</h3>
      <button-link to="/dashboard/appointments">Ver todos</button-link>
    </div>
    <div class="grid gap-4">
      <appointment-item
        first-name="Test"
        last-name="testssssssssssssssssssssssssss"
        start-at="2023-09-13T20:00:00.000Z"
        end-at="2023-09-13T21:00:00.000Z"
        email="test@test.com"
      />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
