import { createResolver, defineNuxtModule, addComponent, addComponentsDir } from '@nuxt/kit'

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
  },
})
