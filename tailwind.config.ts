/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from 'tailwindcss'
// import tailwindAnimate from 'tailwindcss-animate'
// @ts-ignore
export default <Partial<Config>>{
  plugins: [],
  content: [
    './src/shared/components/**/*.{vue,ts}',
    './src/app/layouts/*.vue',
    './src/modules/**/*.vue',
    './src/**/*.vue',
    './src/**/*.ts',
    '**/*.vue',
    '**/*.ts',
  ],
}
