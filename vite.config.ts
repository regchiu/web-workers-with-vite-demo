import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          'simple-web-worker': resolve(__dirname, 'simple-web-worker/index.html'),
          'simple-shared-worker': resolve(__dirname, 'simple-shared-worker/index.html'),
          'simple-shared-worker/second': resolve(__dirname, 'simple-shared-worker/second/index.html'),
          'fibonacci-worker': resolve(__dirname, 'fibonacci-worker/index.html'),
          'offscreen-canvas-worker': resolve(__dirname, 'offscreen-canvas-worker/index.html'),
        }
      }
    },
    base: env.NODE_ENV === 'production' ? '/web-workers-with-demo/' : '/'
  }
})
