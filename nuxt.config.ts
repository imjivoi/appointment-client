import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
          rel: 'stylesheet',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap',
          rel: 'stylesheet',
        },
      ],
    },
  },
  css: ['~/app/styles/index.scss'],
  modules: ['nuxt-icon', 'nuxt-viewport', '@vueuse/nuxt', '@nuxt/ui'],
  colorMode: {
    preference: 'light',
  },
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },

    fallbackBreakpoint: 'lg',
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  experimental: {
    typedPages: true,
  },
  devtools: { enabled: false },
  srcDir: 'src',
  components: {
    dirs: [resolve('./src/shared/components')],
  },
  imports: {
    autoImport: true,
    dirs: [resolve('./src/shared/utils'), '~/shared/lib'],
  },
  alias: {
    '#shared': resolve('./src/shared'),
  },
  dir: {
    layouts: resolve('./src/app/layouts'),
    middleware: resolve('./src/app/middleware'),
    plugins: resolve('./src/app/plugins'),
    assets: resolve('./src/app/assets'),
  },
  typescript: {
    tsConfig: {
      include: ['./src/**/*'],
    },
  },
})
