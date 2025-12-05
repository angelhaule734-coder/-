import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We use (process as any).cwd() to avoid TypeScript errors if @types/node isn't perfectly resolved in the config context
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Safely replace process.env.API_KEY with the actual value from Vercel or .env
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})