import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  oxc: {
    include: /\.(m?js|[jt]sx)$/,
    exclude: [],
    jsx: {
      runtime: 'automatic',
    },
  },
  plugins: [
    react({
      include: /\.[jt]sx?$/,
    }),
  ],
})
