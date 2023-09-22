import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export function useCreateServiceForm() {
  const form = reactive({
    name: '',
    description: '',
    duration: 0,
  })

  const rules = {
    name: { required },
    descripttion: {},
    duration: { required },
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
