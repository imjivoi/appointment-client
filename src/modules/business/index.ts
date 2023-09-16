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
        name: 'dashboard-business-create',
        file: resolve('pages/DashboardBusinessCreate.vue'),
        path: '/dashboard/business/create',
      },
    ]

    extendPages((pages) => {
      pages.push(...businessPages)
    })
  },
})
