import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          hvac: path.resolve(__dirname, 'projects/hvac-pro/index.html'),
          atelier: path.resolve(__dirname, 'projects/atelier/index.html'),
          dentcare: path.resolve(__dirname, 'projects/dentcare/index.html'),
          estateflow: path.resolve(__dirname, 'projects/estateflow/index.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
