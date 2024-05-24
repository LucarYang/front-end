import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:3011, //本地运行端口号
  },
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: "@import './src/layout/bem.scss';"
        }
    }
  }
})
