import { createResolver, defineNuxtModule, extendPages, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'appointment',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)

    addComponentsDir({
      prefix: 'Appointment',
      path: resolve('components'),
    })

    const appointmentPages = [
      {
        name: 'dashboard-appointments',
        file: resolve('pages/DashboardAppointments.vue'),
        path: '/dashboard/appointments',
      },
    ]

    extendPages((pages) => {
      pages.push(...appointmentPages)
    })
  },
})
