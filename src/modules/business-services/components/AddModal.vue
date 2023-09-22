<template>
  <modal class="sm:w-[400px]">
    <template #header>
      <h2 class="text-lg sm:text-2xl font-bold">Agregar servicio</h2>
    </template>
    <div>
      <form class="grid gap-4" @submit.prevent>
        <div>
          <ui-label>Nombre</ui-label>
          <ui-input v-model="form.name" />
          <template v-if="$v.name.$error">
            <div v-if="$v.name.required?.$invalid" class="text-red-500 text-sm mt-1 wrap-space">
              Por favor ingresa el nombre del servicio
            </div>
            <div v-else-if="$v.name.minLength?.$invalid" class="text-red-500 mt-1">
              Nombre debe contener al menos 3 digitos
            </div>
          </template>
        </div>
        <div>
          <ui-label>Descripcion (opcional)</ui-label>
          <ui-textarea v-model="form.description" />
        </div>
        <div>
          <ui-label>Duracion (en minutos)</ui-label>
          <ui-input v-model="form.duration" type="number" min="1" />
          <template v-if="$v.duration.$error">
            <div v-if="$v.duration.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa la duracion del servicio
            </div>
          </template>
        </div>

        <div class="grid gap-2">
          <ui-button block @click="validate">Agregar</ui-button>
          <ui-button block variant="outline" @click="$emit('update:modelValue')">Cancelar</ui-button>
        </div>
      </form>
    </div>
  </modal>
</template>
<script lang="ts" setup>
import { useCreateServiceForm } from '../composables/useCreateServiceForm'

const { form, $v, validate } = useCreateServiceForm()
</script>
