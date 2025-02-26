import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    root: './',
    css: { postcss: { plugins: [tailwindcss()] } },
});
