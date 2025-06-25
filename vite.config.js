import { fileURLToPath, URL } from 'node:url'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// 自動掃描文章檔案並生成路由
function getPostRoutes() {
  try {
    const postsDir = join(process.cwd(), 'src/content/posts')
    const files = readdirSync(postsDir)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => `/post/${file.replace('.md', '')}`)
  } catch (error) {
    console.warn('Could not read posts directory:', error)
    return []
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/*',
          dest: ''
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 自訂域名部署設置
  base: '/',
  ssg: {
    format: 'esm',
    entry: 'src/main.js',
    mock: true,
    dirStyle: 'nested',
    // 為動態路由生成靜態頁面
    includedRoutes() {
      // 基本路由
      const staticRoutes = [
        '/',
        '/about',
        '/post',
        '/projects',
        '/invite'
      ]
      
      // 動態文章路由
      const postRoutes = getPostRoutes()
      console.log('Generated post routes:', postRoutes)
      
      return [...staticRoutes, ...postRoutes]
    }
  }
})
