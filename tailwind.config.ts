import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        gray: {
            50: '#cecece',
            100: '#cacaca',
            200: '#bebebe',
            300: '#b4b4b4',
            400: '#b4b4b4',
            500: '#b4b4b4',
            600: '#b4b4b4',
            700: '#b4b4b4',
            800: '#b4b4b4',
            900: '#b4b4b4',
            950: '#b4b4b4',
        }
      }
    }
  }
}
