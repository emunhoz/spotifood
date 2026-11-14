/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // design-tokens ships CommonJS and is symlinked by the workspace, so Rollup must be told to convert it
  optimizeDeps: { include: ['@monorepo/design-tokens'] },
  build: { commonjsOptions: { include: [/design-tokens/, /node_modules/] } },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts'
  }
})
