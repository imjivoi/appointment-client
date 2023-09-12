<template>
  <ui-modal>
    <template #header>
      <div class="text-center">
        <h2 class="text-2xl font-bold">Horario</h2>
        <p class="text-gray-400 mt-2">Configura horario para tu servicio</p>
      </div>
    </template>
    <div>
      <time-slot-create-form @update:modelValue="$emit('update:modelValue')" />
    </div>
  </ui-modal>
</template>
