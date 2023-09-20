import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const MOKED_TIME_SLOTS = [
  {
    id: 1,
    time: '10:00',
  },
  {
    id: 2,
    time: '10:05',
  },
  {
    id: 3,
    time: '10:10',
  },
  {
    id: 4,
    time: '10:15',
  },
  {
    id: 5,
    time: '10:20',
  },
  {
    id: 6,
    time: '10:25',
  },
  {
    id: 7,
    time: '10:25',
  },
  {
    id: 8,
    time: '10:25',
  },
  {
    id: 9,
    time: '10:25',
  },
  {
    id: 10,
    time: '10:25',
  },
  {
    id: 11,
    time: '10:25',
  },
  {
    id: 12,
    time: '10:25',
  },
  {
    id: 13,
    time: '10:25',
  },
  {
    id: 14,
    time: '10:25',
  },
  {
    id: 15,
    time: '10:25',
  },
  {
    id: 16,
    time: '10:25',
  },
  {
    id: 17,
    time: '10:25',
  },
  {
    id: 18,
    time: '10:25',
  },
  {
    id: 19,
    time: '10:25',
  },
  {
    id: 20,
    time: '10:25',
  },
  {
    id: 21,
    time: '10:25',
  },
  {
    id: 22,
    time: '10:25',
  },
  {
    id: 23,
    time: '10:25',
  },
  {
    id: 24,
    time: '10:25',
  },
  {
    id: 25,
    time: '10:25',
  },
  {
    id: 26,
    time: '10:25',
  },
  {
    id: 27,
    time: '10:25',
  },
  {
    id: 28,
    time: '10:25',
  },
  {
    id: 29,
    time: '10:25',
  },
  {
    id: 30,
    time: '10:25',
  },
  {
    id: 31,
    time: '10:25',
  },
  {
    id: 32,
    time: '10:25',
  },
  {
    id: 33,
    time: '10:25',
  },
  {
    id: 34,
    time: '10:25',
  },
  {
    id: 35,
    time: '10:25',
  },
  {
    id: 36,
    time: '10:25',
  },
  {
    id: 37,
    time: '10:25',
  },
  {
    id: 38,
    time: '10:25',
  },
  {
    id: 39,
    time: '10:25',
  },
  {
    id: 40,
    time: '10:25',
  },
  {
    id: 41,
    time: '10:25',
  },
]

export function useCreateAppointment() {
  const selectedDate = ref(new Date())
  const selectedTimeSlot = ref(null)
  const enabledTimeSlots = ref(MOKED_TIME_SLOTS)

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
  }
}
