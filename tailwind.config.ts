/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: ['./src/components/**/*.vue', './src/layouts/**/*.vue', './src/pages/**/*.vue', './src/modules/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#47dba9',
          500: '#06d6a0',
          600: '#04ba8b',
        },
        error: {
          400: '#f45e7d',
          500: '#ef476f',
          600: '#d03d60',
        },
        warning: {
          400: '#ffd679',
          500: '#ffd166',
          600: '#deb558',
        },
      },
    },
  },
}
