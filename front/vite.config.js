import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path"

export default defineConfig({
  plugins: [svelte()],
  build:{
     // rollupOptions: {
    //   input: {
    //     landing: path.resolve(__dirname, "index.html"),
    //   },
    outDir: "../backEnd/dist/webServer"
    // },
  }
})
