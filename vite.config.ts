import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/email-builder-js/',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EmailTemplateEditor',
      fileName: 'email-template-editor',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        exports: 'named'
      }
    }
  },
  define: {
    global: 'globalThis',
  },
  ssr: {
    noExternal: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled']
  }
});
