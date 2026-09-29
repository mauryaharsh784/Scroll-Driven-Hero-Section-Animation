import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes built asset URLs relative, so the build works on GitHub Pages
// under any repository name without hard-coding it.
export default defineConfig({ base: './', plugins: [react()] })
