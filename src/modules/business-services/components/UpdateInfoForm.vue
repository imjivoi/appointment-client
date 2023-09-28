<template>
  <template v-if="pending">
    <div class="grid gap-4">
      <u-skeleton class="h-4 w-full" />
      <u-skeleton class="h-4 w-full" />
      <u-skeleton class="h-4 w-full" />
      <u-skeleton class="h-4 w-full" />
    </div>
  </template>
  <u-form v-else class="grid gap-4" :state="form" :validate="validate" @submit.prevent>
    <u-form-group label="Nombre" name="name">
      <u-input v-model="form.name" />
    </u-form-group>

    <u-form-group label="Descripcion (opcional)" name="description">
      <u-textarea v-model="form.description" />
    </u-form-group>
    <u-form-group label="Duracion (en minutos)" name="duration">
      <u-input v-model="form.duration" type="number" min="1" />
    </u-form-group>

    <div class="grid gap-2">
      <u-button size="lg" block type="submit">Guardar</u-button>
      <u-button size="lg" block variant="outline" @click="$emit('update:modelValue')">Cancelar</u-button>
    </div>
  </u-form>
</template>
<script setup lang="ts">
import { getService } from '../composables/api'
import { useCreateServiceForm } from '../composables/useCreateServiceForm'

const { form, $v, validate } = useCreateServiceForm()

const { data, pending } = getService({ id: '22' })

function submit() {}

watch(pending, () => {
  form.name = data.value.name
  form.description = data.value.description
  form.duration = data.value.duration
})
</script>
