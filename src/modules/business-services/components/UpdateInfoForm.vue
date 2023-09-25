<template>
  <template v-if="pending">
    <div class="grid gap-4">
      <ui-skeleton class="h-4 w-full" />
      <ui-skeleton class="h-4 w-full" />
      <ui-skeleton class="h-4 w-full" />
      <ui-skeleton class="h-4 w-full" />
    </div>
  </template>
  <form v-else class="grid gap-4" @submit.prevent>
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
      <ui-button block @click="validate">Guardar</ui-button>
      <ui-button block variant="outline" @click="$emit('update:modelValue')">Cancelar</ui-button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { getService } from '../composables/api'
import { useCreateServiceForm } from '../composables/useCreateServiceForm'

const { form, $v, validate } = useCreateServiceForm()

const { data, pending } = getService({ id: '22' })

watch(pending, () => {
  form.name = data.value.name
  form.description = data.value.description
  form.duration = data.value.duration
})
</script>
