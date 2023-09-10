/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#2f2f2f',
          500: '#1c1c1c',
          600: '#171717',
        },
      },
    },
  },
}
