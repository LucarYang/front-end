import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, 'src'),
  resolve: {  
    alias: {  
      // 将 Bootstrap CSS 文件引入到项目中  
      'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css')  
    }  
  },
  plugins: [vue()],
  optimizeDeps:{},
  cacheDir:'/.cache'//vite缓存
})
