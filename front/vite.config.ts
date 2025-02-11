import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',          // Pasta de saída do build
    minify: 'esbuild',        // Minificação rápida e eficiente
    sourcemap: false,         // Desativa sourcemaps para menor tamanho
    chunkSizeWarningLimit: 500 // Limite de alerta para chunks grandes
  },
  server: {
    host: '0.0.0.0',    // Aceita conexões externas
    port: 5173,         // Porta padrão do Vite
    strictPort: true,   // Garante que a porta seja sempre a mesma
  }
});
