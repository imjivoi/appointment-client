import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { startOfDay, setSeconds } from 'date-fns/esm'

const MOKED_TIME_SLOTS = [
  '10:00',
  '10:05',
  '10:10',
  '10:15',
  '10:20',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
  '10:25',
]

export function useCreateAppointment() {
  const selectedDate = ref<Date>()
  const selectedTimeSlot = ref('')
  const enabledTimeSlots = ref(MOKED_TIME_SLOTS)
  const selectedService = ref(null)

  const transformedDate = computed(() => {
    if (!selectedTimeSlot.value || !selectedDate.value) return null
    const toSeconds = () => {
      const [hours, minutes] = selectedTimeSlot.value.split(':')
      return Number(hours) * 60 * 60 + Number(minutes) * 60
    }
    return setSeconds(startOfDay(selectedDate.value), toSeconds())
  })

  const form = ref({
    email: '',
    firstName: '',
    lastName: '',
  })

  const rules = {
    email: {
      required: helpers.withMessage('Por favor ingresa tu correo', required),
      email: helpers.withMessage('Por favor ingresa un correo valido', email),
    },
    firstName: {
      minLength: helpers.withMessage('Nombre debe contener al menos 3 digitos', minLength(3)),
      required: helpers.withMessage('Por favor ingresa nombre', required),
    },
    lastName: {
      minLength: helpers.withMessage('Apellido debe contener al menos 3 digitos', minLength(3)),
      required: helpers.withMessage('Por favor ingresa apellido', required),
    },
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

  return {
    form,
    selectedDate,
    selectedTimeSlot,
    $v,
    enabledTimeSlots,
    validate,
    selectedService,
    transformedDate,
  }
}
