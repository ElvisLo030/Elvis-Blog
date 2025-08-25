<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-icon">
        <font-awesome-icon :icon="['fas', 'search']" />
      </div>
      <h1 class="error-code">404</h1>
      <h2 class="error-title">頁面未找到</h2>
      <p class="error-description">
        抱歉，您訪問的頁面不存在或已被移動。
      </p>
      
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">
          <font-awesome-icon :icon="['fas', 'home']" />
          返回首頁
        </router-link>
        <router-link to="/post" class="btn btn-secondary">
          <font-awesome-icon :icon="['fas', 'newspaper']" />
          查看文章
        </router-link>
      </div>
      
      <div class="helpful-links">
        <h3>您可能在尋找：</h3>
        <ul>
          <li><router-link to="/about">關於我</router-link></li>
          <li><router-link to="/projects">專案</router-link></li>
          <li><router-link to="/invite">邀請碼</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 設置頁面標題
  document.title = '404 - 頁面未找到 | Elvis Blog'
})
</script>

<style scoped>
.not-found-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.error-icon {
  font-size: 4rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  opacity: 0.8;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, var(--primary-color), #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--text-color);
}

.error-description {
  font-size: 1.1rem;
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-color-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
}

.helpful-links {
  border-top: 1px solid var(--border-color);
  padding-top: 2rem;
}

.helpful-links h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.helpful-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.helpful-links li {
  margin: 0;
}

.helpful-links a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.helpful-links a:hover {
  color: var(--primary-color-dark);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
    justify-content: center;
  }
  
  .helpful-links ul {
    flex-direction: column;
    gap: 1rem;
  }
}

/* CSS 變數定義 */
:root {
  --primary-rgb: 74, 158, 255;
  --primary-color-dark: #3a7fd6;
  --text-color-secondary: #666;
  --border-color: #e1e5e9;
}

.dark-mode {
  --primary-rgb: 94, 175, 255;
  --primary-color-dark: #4a9eff;
  --text-color-secondary: #aaa;
  --border-color: #333;
}
</style>
