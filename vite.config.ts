import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The CV viewer (react-pdf + pdf.js) is lazy-loaded, so it only downloads when the CV is opened.
export default defineConfig({
  plugins: [react()],
});
