<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
const props = defineProps({
  rules: { type: Object, required: true },
  model: { type: Object, required: true },
})
const form = ref()
const v = useVuelidate(props.rules, props.model)
async function validateWithVuelidate() {
  v.value.$touch()
  await v.value.$validate()
  return v.value.$errors.map((error) => ({
    message: error.$message,
    path: error.$propertyPath,
  }))
}
defineExpose({
  validate: async () => {
    await form.value.validate()
  },
})
</script>
<template>
  <UForm ref="form" :model="model" :validate="validateWithVuelidate">
    <slot />
  </UForm>
</template>
