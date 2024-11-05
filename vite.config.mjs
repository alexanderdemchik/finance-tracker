import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [ react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  server: {
    host: '192.168.100.11',
  },
});
