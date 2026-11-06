import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const rootDir = import.meta.dirname || path.resolve('.');
  return {
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          hvac: path.resolve(rootDir, 'projects/hvac-pro/index.html'),
          atelier: path.resolve(rootDir, 'projects/atelier/index.html'),
          dentcare: path.resolve(rootDir, 'projects/dentcare/index.html'),
          estateflow: path.resolve(rootDir, 'projects/estateflow/index.html'),
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
