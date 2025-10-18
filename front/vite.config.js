import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' 
import path from 'path'

// eslint-disable-next-line no-undef        
const root = path.resolve(__dirname, "src") 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],        
  server: { port: 5001 },
  resolve: { alias : { "@": root } }        
})

