#!/usr/bin/env node

import { readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// 檢查路由文件
function checkRoutes() {
  const distDir = join(projectRoot, 'dist')
  
  console.log('🔍 檢查路由文件...\n')
  
  // 檢查基本頁面
  const basicPages = ['index.html', 'about.html', 'post.html', 'projects.html', 'invite.html', '404.html']
  console.log('📄 基本頁面:')
  basicPages.forEach(page => {
    const exists = existsSync(join(distDir, page))
    console.log(`  ${exists ? '✓' : '✗'} ${page}`)
  })
  
  // 檢查文章頁面
  const postsDir = join(projectRoot, 'src/content/posts')
  const distPostDir = join(distDir, 'post')
  
  console.log('\n📝 文章頁面:')
  if (existsSync(postsDir)) {
    const posts = readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', '.html'))
    
    posts.forEach(post => {
      const exists = existsSync(join(distPostDir, post))
      console.log(`  ${exists ? '✓' : '✗'} post/${post}`)
    })
  }
  
  // 檢查重要文件
  const importantFiles = ['CNAME', 'favicon.ico']
  console.log('\n🔧 重要文件:')
  importantFiles.forEach(file => {
    const exists = existsSync(join(distDir, file))
    console.log(`  ${exists ? '✓' : '✗'} ${file}`)
  })
  
  console.log('\n🎉 路由檢查完成!')
}

// 執行檢查
checkRoutes() 