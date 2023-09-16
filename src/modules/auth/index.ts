import { defineNuxtModule, extendPages, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'auth',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)
    const authPages = [
      {
        name: 'login',
        file: resolve('pages/Login.vue'),
        path: '/auth/login',
      },
      {
        name: 'register',
        file: resolve('pages/Register.vue'),
        path: '/auth/register',
      },
    ]

    extendPages((pages) => {
      pages.push(...authPages)
    })
  },
})
