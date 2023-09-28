import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'

const defaultForm = {
  name: '',
  description: '',
  duration: 5,
}

export function useCreateServiceForm() {
  const form = ref(defaultForm)

  const rules = {
    name: { required: helpers.withMessage('Por favor ingresa el nombre del servicio', required) },
    descripttion: {},
    duration: { required, minValue: minValue(1) },
  }

  const $v = useVuelidate(rules, form)

  async function validate() {
    $v.value.$touch()
    await $v.value.$validate()
    return $v.value.$errors.map((error) => ({
      message: error.$message,
      path: error.$propertyPath,
    }))
  }

  function resetForm() {
    form.value.name = ''
    form.value.description = ''
    form.value.duration = 5
  }

  return {
    form,
    $v,
    validate,
    resetForm,
  }
}
