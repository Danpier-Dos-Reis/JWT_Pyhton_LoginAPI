import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Escucha en todas las interfaces (0.0.0.0)
    port: 5173, // (Opcional) Puedes cambiar el puerto si lo deseas
  },
});

/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/