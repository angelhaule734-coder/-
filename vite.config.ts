import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fix: Cast process to any to avoid 'cwd' does not exist error on Process type
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Safely replace only the API_KEY, preserving other process.env values like NODE_ENV
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})