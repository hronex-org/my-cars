import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // serving from root of hronex.com
  plugins: [react()],
});