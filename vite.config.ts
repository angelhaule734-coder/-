import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Using (process as any).cwd() to ensure path resolution works in Node environment
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Correctly expose the API_KEY to the client-side code
      // We explicitly check both the loaded env and the process.env (for Vercel system envs)
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    }
  }
})