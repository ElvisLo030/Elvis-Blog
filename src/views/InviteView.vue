<template>
  <div class="invite-container">
    <h1 class="page-title">Invite Code</h1>
    
    <div class="filter-section">
      <div class="search-box">
        <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜尋優惠..." 
          class="search-input"
        />
      </div>
      
      <div class="tags-filter">
        <button 
          v-for="tag in allTags" 
          :key="tag"
          @click="toggleTag(tag)"
          class="filter-tag"
          :class="{ active: selectedTags.includes(tag) }"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    
    <div class="invite-grid">
      <div 
        v-for="item in filteredItems" 
        :key="item.id"
        class="invite-card"
        @click="handleItemClick(item)"
      >
        <div class="invite-content">
          <h2 class="invite-title">{{ item.title }}</h2>
          <div class="invite-info">
            <font-awesome-icon :icon="['fas', 'calendar']" />
            <span>活動日期：{{ item.period }}</span>
          </div>
          <div class="invite-benefits">
            <div class="benefit-item" v-for="benefit in item.benefits" :key="benefit">
              <span v-if="!isUrl(benefit)" class="benefit-text">{{ benefit }}</span>
              <a 
                v-else 
                :href="getUrl(benefit)"
                target="_blank"
                class="benefit-link"
                @click.stop
              >
                <font-awesome-icon :icon="['fas', 'external-link-alt']" />
                查看詳細說明
              </a>
            </div>
          </div>
          <div class="invite-footer">
            <div class="invite-tags">
              <span 
                v-for="tag in item.tags" 
                :key="tag"
                class="item-tag"
                @click.stop="toggleTag(tag)"
              >
                {{ tag }}
              </span>
            </div>
            <button v-if="item.type === 'code'" class="action-button" @click.stop="copyCode(item.code)">
              複製邀請碼
            </button>
            <button v-else class="action-button" @click.stop="openLink(item.link)">
              立即申請
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 說明框框 -->
    <div class="invite-modal" v-if="selectedItem" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
        <h2 class="modal-title">{{ selectedItem.title }}</h2>
        <div class="modal-info">
          <div class="info-item">
            <font-awesome-icon :icon="['fas', 'calendar']" />
            <span>活動日期：{{ selectedItem.period }}</span>
          </div>
          <div class="info-item" v-if="selectedItem.type === 'code'">
            <font-awesome-icon :icon="['fas', 'ticket']" />
            <span>邀請碼：{{ selectedItem.code }}</span>
            <button class="copy-button" @click="copyCode(selectedItem.code)">
              <font-awesome-icon :icon="['fas', 'copy']" />
            </button>
          </div>
        </div>
        <div class="modal-description">{{ selectedItem.description }}</div>
        <div class="modal-benefits">
          <h3>優惠內容：</h3>
          <div class="benefit-item" v-for="benefit in selectedItem.benefits" :key="benefit">
            <span v-if="!isUrl(benefit)" class="benefit-text">{{ benefit }}</span>
            <a 
              v-else 
              :href="getUrl(benefit)"
              target="_blank"
              class="benefit-link"
              @click.stop
            >
              <font-awesome-icon :icon="['fas', 'external-link-alt']" />
              說明網站
            </a>
          </div>
        </div>
        <div class="modal-action">
          <button 
            class="action-button"
            @click="selectedItem.type === 'code' ? copyCode(selectedItem.code) : openLink(selectedItem.link)"
          >
            {{ selectedItem.type === 'code' ? '複製邀請碼' : '立即申請' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- 複製成功提示 -->
    <div class="copy-toast" :class="{ 'show': isCopyToastVisible }">
      <font-awesome-icon :icon="['fas', 'check-circle']" /> 邀請碼已複製
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 搜尋和篩選
const searchQuery = ref('');
const selectedTags = ref([]);

// 優惠資訊資料
const inviteItems = ref([
  {
    id: 1,
    type: 'link',
    title: '國泰世華 CUBE 信用卡',
    period: '2025/04/01 ~ 2025/6/30',
    link: 'https://cathaybk.tw/24L4S86T3',
    description: '六大方案最高3.3%回饋無上限',
    tags: ['信用卡'],
    benefits: [
      '受邀者：200點小樹點',
      '邀請者：200點小樹點',
      'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/'
    ]
  },
  {
    id: 2,
    type: 'link',
    title: '玉山銀行 Unicard 信用卡',
    period: '2025/01/01 ~ 2025/6/30',
    link: 'https://card.esunbank.com.tw/EsunCreditweb/txnservice/identify?PRJCD=APYCRD0070&param=631747708936836#b',
    description: '百大特店最高5%回饋',
    tags: ['信用卡'],
    benefits: [
      '受邀者：好像沒有🥲',
      '邀請者：500點玉山e point',
      'https://www.esunbank.com.tw/zh-tw/personal/credit-card/intro/bank-card/unicard#5'
    ]
  },
  {
    id: 3,
    type: 'code',
    title: 'Airalo eSIM',
    period: '2025/01/01 ~ 2025/12/31',
    code: 'LUIFEJ6003',
    description: '首次申辦享免費試用eSIM',
    tags: ['eSIM'],
    benefits: [
      '受邀者：首購享USD$3.00優惠',
      '邀請者：USD$3.00 Airmoney',
      'https://airalo.go.link/7P8MX'
    ]
  }
]);

// 獲取所有標籤
const allTags = computed(() => {
  const tags = new Set();
  inviteItems.value.forEach(item => {
    item.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
});

// 篩選項目
const filteredItems = computed(() => {
  return inviteItems.value.filter(item => {
    // 搜尋條件
    const matchSearch = searchQuery.value === '' || 
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 標籤條件
    const matchTags = selectedTags.value.length === 0 || 
      selectedTags.value.every(tag => item.tags.includes(tag));
    
    return matchSearch && matchTags;
  });
});

// 切換標籤
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

// 選中的項目
const selectedItem = ref(null);

// 顯示項目詳情
const handleItemClick = (item) => {
  selectedItem.value = item;
};

// 關閉說明框框
const closeModal = () => {
  selectedItem.value = null;
};

// 複製邀請碼相關功能
const isCopyToastVisible = ref(false);

const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    showCopyToast();
  } catch (err) {
    console.error('複製失敗：', err);
  }
};

const showCopyToast = () => {
  isCopyToastVisible.value = true;
  setTimeout(() => {
    isCopyToastVisible.value = false;
  }, 2000);
};

// 開啟連結
const openLink = (url) => {
  window.open(url, '_blank');
};

// 檢查是否為URL
const isUrl = (text) => {
  return text.startsWith('http://') || text.startsWith('https://');
};

// 從文字中提取URL
const getUrl = (text) => {
  return text.split('：').pop();
};
</script>

<style scoped>
.invite-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: block;
  text-align: center;
  width: 100%;
}

.page-title:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 47%;
  height: 3px;
  background-color: var(--primary-color);
}

/* 搜尋和篩選區域 */
.filter-section {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color-secondary);
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--card-bg);
  color: var(--text-color);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filter-tag {
  background: none;
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-color);
}

.filter-tag:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-tag.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.invite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.invite-card {
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  animation: fadeIn 0.5s ease-out forwards;
}

.invite-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.invite-content {
  padding: 1.2rem;
}

.invite-title {
  font-size: 1.2rem;
  margin: 0 0 0.8rem 0;
  color: var(--primary-color);
}

.invite-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.invite-benefits {
  margin: 0.8rem 0;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.invite-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.invite-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  flex: 1;
}

.item-tag {
  background-color: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 16px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.item-tag:hover {
  background-color: rgba(var(--primary-rgb), 0.2);
}

.action-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  font-size: 0.9rem;
  white-space: nowrap;
}

.action-button:hover {
  background-color: var(--primary-color-dark);
}

/* Modal 樣式 */
.invite-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.modal-info {
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.modal-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.modal-benefits {
  margin-bottom: 2rem;
}

.modal-benefits h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.modal-action {
  display: flex;
  justify-content: center;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  transition: color 0.2s;
}

.close-button:hover {
  color: var(--text-color);
}

.copy-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;
}

.copy-button:hover {
  color: var(--primary-color-dark);
}

/* 複製成功提示樣式 */
.copy-toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background-color: rgba(47, 47, 47, 0.9);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  z-index: 1000;
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.copy-toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.copy-toast .svg-inline--fa {
  color: #4ade80;
}

/* 動畫 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes modalSlideIn {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}

.benefit-text {
  line-height: 1.4;
}

.benefit-link {
  color: var(--primary-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.benefit-link:hover {
  color: var(--primary-color-dark);
  text-decoration: underline;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .invite-grid {
    grid-template-columns: 1fr;
  }
  
  .invite-content {
    padding: 1rem;
  }
  
  .invite-title {
    font-size: 1.1rem;
  }
  
  .invite-footer {
    flex-direction: column;
    align-items: stretch;
  }
  
  .invite-tags {
    margin-bottom: 0.5rem;
  }
  
  .action-button {
    width: 100%;
    padding: 0.8rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .search-box {
    margin-bottom: 1rem;
  }
  
  .tags-filter {
    justify-content: flex-start;
    padding: 0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
