import { createResolver, defineNuxtModule, addComponentsDir, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'business-services',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)

    // addComponentsDir({
    //   prefix: 'BusinessServices',
    //   path: resolve('components'),
    // })

    const businessPages = [
      {
        name: 'dashboard-services',
        file: resolve('pages/DashboardServices.vue'),
        path: '/dashboard/services',
      },
    ]

    extendPages((pages) => {
      pages.push(...businessPages)
    })
  },
})
