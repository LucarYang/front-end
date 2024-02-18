import { defineConfig } from "vite";
import {createVuePlugin} from "vite-plugin-vue2"

// import vue from '@vitejs/plugin-vue'

export default defineConfig({  
    plugins: [
        createVuePlugin(),
    ]  
  })

