<template>
  <slideover v-model:open="open" :prevent-close="isLoading">
    <u-card>
      <template #header>
        <h2 class="text-lg sm:text-2xl font-bold">Agregar servicio</h2>
      </template>
    </u-card>
    <div class="px-8">
      <u-form class="grid gap-4" :validate="validate" :state="form" @submit="submit">
        <u-form-group label="Nombre" name="name">
          <u-input v-model="form.name" />
        </u-form-group>
        <!-- <div>
          <label>Nombre</label>
          <template v-if="$v.name.$error">
            <div v-if="$v.name.required?.$invalid" class="text-red-500 text-sm mt-1 wrap-space">
              Por favor ingresa el nombre del servicio
            </div>
            <div v-else-if="$v.name.minLength?.$invalid" class="text-red-500 mt-1">
              Nombre debe contener al menos 3 digitos
            </div>
          </template>
        </div> -->
        <u-form-group label="Descripcion (opcional)" name="description">
          <u-textarea v-model="form.description" />
        </u-form-group>
        <!-- <div>
          <label></label>
        </div>
        <div>
          <label>Duracion (en minutos)</label>
          <template v-if="$v.duration.$error">
            <div v-if="$v.duration.required?.$invalid" class="text-red-500 mt-1">
              Por favor ingresa la duracion del servicio
            </div>
          </template>
        </div> -->
        <u-form-group label="Duracion (en minutos)">
          <u-input v-model="form.duration" type="number" min="1" />
        </u-form-group>

        <div class="grid gap-2">
          <u-button size="lg" block type="submit">Agregar</u-button>
          <u-button size="lg" block variant="outline" @click="open = false">Cancelar</u-button>
        </div>
      </u-form>
    </div>
  </slideover>
</template>
<script lang="ts" setup>
import { useCreateServiceForm } from '../composables/useCreateServiceForm'

const open = defineModel<boolean>('open')

const isLoading = ref(false)

const { form, validate, resetForm } = useCreateServiceForm()

function submit() {}

watch(open, (value) => {
  console.log(value)
  if (value) {
    resetForm()
  }
})
</script>
