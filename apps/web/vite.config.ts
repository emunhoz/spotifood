/// <reference types="vitest" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Consume workspace source, not the compiled dist: dist only rebuilds on install, so dev and
    // tests would silently run stale components (and Vite pre-bundles it, never noticing changes)
    alias: {
      '@monorepo/design-tokens': fileURLToPath(new URL('../../packages/tokens/src/index.ts', import.meta.url)),
      '@monorepo/ui-components': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts'
  }
})
