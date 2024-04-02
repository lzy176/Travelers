import path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#2186FB',
          // 配置我们定义的less样式变量
          hack: `true; @import (reference) "${path.resolve('./src/assets/styles/global.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})