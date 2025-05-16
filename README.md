# 小羅の窩 (Elvis Blog)

![License](https://img.shields.io/badge/license-GPL3.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.5-green.svg)
![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)

一個使用 Vue 3 和 Vite 構建的個人部落格網站，支持 Markdown 文章和黑暗模式。

## 特色功能

- 深色模式/淺色模式切換
- Markdown 文章展示
- 自適應移動端和桌面端
- 使用 GitHub Pages 部署

## 環境要求

- Node.js 16.x 或更高版本
- npm 或 yarn

## 安裝

```bash
git clone https://github.com/ElvisLo030/elvis-blog.git
cd elvis-blog
npm install
```

## 開發

```bash
# 啟動開發伺服器
npm run dev
```

## 生產環境構建

```bash
# 構建生產版本
npm run build

# 本地預覽生產版本
npm run preview
```

## 部署到 GitHub Pages

```bash
# 自動構建並部署到 GitHub Pages
npm run deploy
```

## 自定義

- 替換 `public/assets/` 中的圖片以自定義個人形象
- 修改 `src/content/posts/` 中的 Markdown 文件添加自己的文章
- 調整 `src/views/` 中的視圖組件以更改頁面布局
- 在 `src/services/GitHubService.js` 中更改 GitHub 用戶名以展示自己的專案

---
© 2025 ElvisLo All Rights Reserved