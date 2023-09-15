import { createResolver, defineNuxtModule, addImportsDir, addComponentsDir } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'app',
  },
  setup() {
    const { resolve } = createResolver(import.meta.url)

    addComponentsDir({
      prefix: 'App',
      path: resolve('components'),
    })

    addImportsDir([resolve('composables')])
  },
})
