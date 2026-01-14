# Elvis Blog

![License](https://img.shields.io/badge/license-GPL3.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.5-green.svg)
![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)
![Firebase](https://img.shields.io/badge/Firebase-RTDB-orange.svg)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

一個現代化及高效能的個人部落格系統。</br>
基於 **Vue 3** 與 **Vite** 構建，提供流暢的閱讀體驗。

## 🌟 功能亮點

- **Markdown 部落格**：支持完整的 Markdown 語法，管理簡單。
- **即時觀看統計**：串接 **Firebase Realtime Database**，實現文章觀看次數統計，並支援離線快取同步機制。
- **輕量級 CMS**：整合 **Google Sheets API (CSV)** 作為後端，輕鬆維護「時間軸（Timeline）」與「推薦邀請（Invite）」頁面資料。
- **響應式主題**：內建深色/淺色模式切換，自適應手機、平板與桌面端。
- **SSG 靜態生成**：使用 `vite-ssg` 預渲染頁面，大幅提升載入速度與搜尋引擎收錄。
- **自動化路由**：內建腳本自動掃描 Markdown 檔案，生成 SSG 所需的靜態路由。
- **GitHub 整合**：透過 GitHub API 自動展示個人公開專案。

## 🛠️ 技術棧

- **核心框架**：Vue 3 (Composition API)
- **路由管理**：Vue Router 4
- **構建工具**：Vite 6
- **靜態生成**：Vite SSG
- **數據存儲**：Firebase Realtime Database (觀看次數), Google Sheets (內容資料)
- **樣式處理**：CSS Variables, FontAwesome 6
- **文章解析**：Marked, Markdown-it

## 🏗️ 專案架構 (SOLID 原則)

本專案遵循 SOLID 原則進行開發，將邏輯與 UI 分離：

- **Services 層**：封裝外部 API 通訊（GitHub, Google Sheets, Firebase）。
- **Composables 層**：封裝可複用的邏輯（如主題切換）。
- **Scripts 層**：負責構建前的自動化處理（路由生成）。

```text
src/
├── assets/          # 靜態資源與全域樣式
├── composables/     # 可複用的組合式函數 (Theme, etc.)
├── content/         # Markdown 文章內容
├── router/          # 路由配置
├── services/        # 業務邏輯與 API 封裝 (Firebase, Google Sheets)
├── views/           # 頁面組件
└── App.vue          # 主進入組件
```

## 🚀 快速開始

### 環境要求

- Node.js 18.x 或更高版本
- npm (建議 v9.x 以上)

### 安裝與開發

1. **複製專案**
   ```bash
   git clone https://github.com/ElvisLo030/Elvis-Blog
   cd Elvis-Blog
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

### 構建與生產環境

```bash
# 生成 SSG 靜態頁面並構建
npm run build

# 本地預覽構建結果
npm run preview
```

## 📦 部署

專案已配置 GitHub Pages 自動化部署：

```bash
# 執行構建並推送至 gh-pages 分支
npm run deploy
```

## ⚙️ 自定義調整

- **文章內容**：於 `src/content/posts/` 新增或修改 `.md` 檔案，構建時會自動產生對應頁面。
- **資料維護**：修改 `src/views/TimelineView.vue` 或 `src/views/InviteView.vue` 中的 Google Sheet 連結以更換資料來源。
- **GitHub 專案**：在 `src/services/GitHubService.js` 中調整目標用戶名。

---

© 2026 ElvisLo All Rights Reserved </br>
Licensed under the [GPL-3.0 License](LICENSE).
