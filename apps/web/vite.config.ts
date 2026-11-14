/// <reference types="vitest" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Consume token source, not the CJS dist: Vite pre-bundles linked dist and never notices it changed
    alias: {
      '@monorepo/design-tokens': fileURLToPath(new URL('../../packages/tokens/src/index.ts', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts'
  }
})
