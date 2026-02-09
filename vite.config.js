import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
  plugins: [
    topLevelAwait(),
    legacy({
      targets: [
        'Android >= 5',
        'iOS >= 10',
        'Chrome >= 49'
      ],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    wasm() // 👈 добавляем поддержку .wasm
  ],
  base: './',
  optimizeDeps: {
    exclude: ['@dimforge/rapier3d']
  },
  build: {
    target: 'es5',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});