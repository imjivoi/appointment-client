import { createResolver, defineNuxtModule, addComponent, addComponentsDir, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'business',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)

    addComponentsDir({
      prefix: 'business',
      path: resolve('components'),
    })

    const businessPages = [
      {
        name: 'dashboard',
        file: resolve('pages/Dashboard.vue'),
        path: '/dashboard',
      },
      {
        name: 'dashboard-appointments',
        file: resolve('pages/DashboardAppointments.vue'),
        path: '/dashboard/appointments',
      },
      {
        name: 'dashboard-create',
        file: resolve('pages/DashboardCreate.vue'),
        path: '/dashboard/create',
      },
    ]

    extendPages((pages) => {
      pages.push(...businessPages)
    })
  },
})
