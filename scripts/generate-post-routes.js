#!/usr/bin/env node

import { readdirSync, mkdirSync, copyFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// 獲取所有文章
function getPostSlugs() {
  try {
    const postsDir = join(projectRoot, 'src/content/posts')
    const files = readdirSync(postsDir)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''))
  } catch (error) {
    console.warn('無法讀取文章目錄:', error)
    return []
  }
}

// 生成文章靜態頁面
function generatePostPages() {
  const distDir = join(projectRoot, 'dist')
  const postDir = join(distDir, 'post')
  const indexFile = join(distDir, 'index.html')
  
  // 檢查 dist 目錄是否存在
  if (!existsSync(distDir)) {
    console.error('dist 目錄不存在，請先運行構建')
    process.exit(1)
  }
  
  // 檢查 index.html 是否存在
  if (!existsSync(indexFile)) {
    console.error('index.html 不存在，請先運行構建')
    process.exit(1)
  }
  
  // 創建 post 目錄
  if (!existsSync(postDir)) {
    mkdirSync(postDir, { recursive: true })
  }
  
  // 獲取文章列表
  const posts = getPostSlugs()
  console.log('找到文章:', posts)
  
  // 為每個文章創建 HTML 文件
  posts.forEach(slug => {
    const postFile = join(postDir, `${slug}.html`)
    try {
      copyFileSync(indexFile, postFile)
      console.log(`✓ 已創建: post/${slug}.html`)
    } catch (error) {
      console.error(`✗ 創建 post/${slug}.html 失敗:`, error)
    }
  })
  
  console.log(`\n🎉 成功生成 ${posts.length} 個文章頁面!`)
}

// 執行腳本
generatePostPages() 