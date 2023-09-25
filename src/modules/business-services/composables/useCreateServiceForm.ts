import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export function useCreateServiceForm() {
  const form = reactive({
    name: '',
    description: '',
    duration: 5,
  })

  const rules = {
    name: { required },
    descripttion: {},
    duration: { required, minValue: minValue(1) },
  }

  const $v = useVuelidate(rules, form)

  async function validate() {
    await $v.value.$validate()
  }

  return {
    form,
    $v,
    validate,
  }
}
