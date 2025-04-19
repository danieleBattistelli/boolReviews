// Importa la funzione defineConfig da Vite per definire la configurazione
import { defineConfig } from 'vite'

// Importa il plugin React per Vite
import react from '@vitejs/plugin-react'

// Esporta la configurazione di Vite
export default defineConfig({
  // Specifica i plugin utilizzati, in questo caso React
  plugins: [react()],
})
