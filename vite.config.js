import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'https://github.com/Pradhap-07/gemini-clone/', // Replace with your repo name
  plugins: [react()],
})
