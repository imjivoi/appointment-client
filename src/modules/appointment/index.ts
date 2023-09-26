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
      {
        name: 'dashboard-appointments-create',
        file: resolve('pages/CreateAppointmentByAdmin.vue'),
        path: '/dashboard/appointments/create',
      },
      {
        name: 'create-appointment',
        file: resolve('pages/CreateAppointmentByClient.vue'),
        path: '/a/:serviceToken',
      },
    ]

    extendPages((pages) => {
      pages.push(...appointmentPages)
    })
  },
})
