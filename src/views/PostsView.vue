<template>
  <div class="posts-container">
    <h1 class="page-title">文章列表</h1>
    
    <div class="posts-filter">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="搜尋文章..." 
        class="search-input"
      />
      <div class="filter-tags" v-if="allTags.length > 0">
        <button 
          v-for="tag in allTags" 
          :key="tag"
          @click="toggleTagFilter(tag)"
          class="tag-filter"
          :class="{ active: selectedTags.includes(tag) }"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    
    <div class="posts-list" v-if="filteredPosts.length > 0">
      <div 
        v-for="post in filteredPosts" 
        :key="post.slug"
        class="post-item"
      >
        <div class="post-date">{{ formatDate(post.date) }}</div>
        <h2 class="post-title">
          <router-link :to="`/post/${post.slug}`">{{ post.title }}</router-link>
        </h2>
        <p class="post-summary">{{ post.summary || truncateContent(post.content) }}</p>
        <div class="post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="post-tag"
            @click.prevent="toggleTagFilter(tag)"
          >
            {{ tag }}
          </span>
        </div>
        <router-link :to="`/post/${post.slug}`" class="read-more">閱讀更多 →</router-link>
      </div>
    </div>
    
    <div v-else class="no-posts">
      <p v-if="posts.length === 0">還沒有文章發布，敬請期待！</p>
      <p v-else>沒有找到符合條件的文章</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import postService from '../services/PostService';

// 文章列表
const posts = ref([]);
const searchQuery = ref('');
const selectedTags = ref([]);

// 獲取所有文章
onMounted(async () => {
  posts.value = postService.getAllPosts();
});

// 獲取所有標籤
const allTags = computed(() => {
  const tags = new Set();
  posts.value.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});

// 過濾文章
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    // 先檢查搜尋關鍵字
    const matchesSearch = 
      searchQuery.value === '' || 
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 再檢查標籤
    const matchesTags = 
      selectedTags.value.length === 0 || 
      selectedTags.value.every(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
});

// 切換標籤過濾
const toggleTagFilter = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// 截斷內容
const truncateContent = (content) => {
  const plainText = content.replace(/<[^>]*>?/gm, '');
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
};
</script>

<style scoped>
.posts-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.page-title:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60%;
  height: 3px;
  background-color: var(--primary-color);
}

.posts-filter {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--card-bg);
  color: var(--text-color);
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.2);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-filter {
  background-color: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-filter:hover {
  border-color: var(--primary-color);
}

.tag-filter.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-item {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: slideIn 0.5s ease-out forwards;
}

.post-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.post-date {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}

.post-title {
  font-size: 1.6rem;
  margin: 0.5rem 0;
}

.post-title a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: var(--primary-color-dark);
}

.post-summary {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-tag {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.post-tag:hover {
  background-color: rgba(var(--primary-rgb), 0.2);
}

.read-more {
  display: inline-block;
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: var(--primary-color-dark);
}

.no-posts {
  text-align: center;
  padding: 3rem 1rem;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px var(--shadow-color);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}

/* 使用全局定義的 CSS 變量，移除重複定義 */
</style>
