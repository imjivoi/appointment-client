import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
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
]

export function useCreateAppointment() {
  const selectedDate = ref(new Date())
  const selectedTimeSlot = ref('')
  const enabledTimeSlots = ref(MOKED_TIME_SLOTS)
  const selectedService = ref(null)

  const transformedDate = computed(() => {
    if (!selectedTimeSlot.value) return null
    const toSeconds = () => {
      const [hours, minutes] = selectedTimeSlot.value.split(':')
      return Number(hours) * 60 * 60 + Number(minutes) * 60
    }
    return setSeconds(startOfDay(selectedDate.value), toSeconds())
  })

  const form = reactive({
    email: '',
    firstName: '',
    lastName: '',
  })

  const rules = {
    email: { required, email },
    firstName: { minLength: minLength(3), required },
    lastName: { minLength: minLength(3), required },
  }

  const $v = useVuelidate(rules, form)

  async function validate() {
    try {
      await $v.value.$validate()
    } catch (error) {}
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
