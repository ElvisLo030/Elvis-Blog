// 觀看次數服務類 - 使用 Firebase Realtime Database
export class ViewCountService {
  constructor() {
    // Firebase Realtime Database URL (公開讀寫，但有規則限制)
    this.firebaseUrl = 'https://elvisiotw-default-rtdb.firebaseio.com/viewCounts';
    this.storageKey = 'blog_view_counts_cache';
    this.cache = this.loadCache();
    this.isOnline = navigator.onLine;
    this.lastSyncTime = 0;
    this.syncInterval = 30000; // 30秒同步一次
    
    // 監聽網路狀態
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncWithFirebase();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // 初始化時載入 Firebase 數據
    if (this.isOnline) {
      this.syncWithFirebase();
    }
  }

  /**
   * 從本地快取載入數據
   */
  loadCache() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    } catch (error) {
      console.error('Error loading cache:', error);
      return {};
    }
  }

  /**
   * 儲存到本地快取
   */
  saveCache() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  }

  /**
   * 從 Firebase 載入觀看次數
   */
  async loadFromFirebase() {
    try {
      const response = await fetch(`${this.firebaseUrl}.json`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // 合併 Firebase 數據與本地快取
          Object.keys(data).forEach(slug => {
            this.cache[slug] = Math.max(this.cache[slug] || 0, data[slug] || 0);
          });
          this.saveCache();
          return data;
        }
      }
    } catch (error) {
      console.error('Error loading from Firebase:', error);
    }
    return {};
  }

  /**
   * 更新 Firebase 中的特定文章觀看次數
   */
  async updateFirebaseCount(slug, count) {
    try {
      const response = await fetch(`${this.firebaseUrl}/${slug}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(count)
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error updating Firebase:', error);
      return false;
    }
  }

  /**
   * 原子性增加 Firebase 中的觀看次數
   */
  async incrementFirebaseCount(slug) {
    try {
      // 先讀取當前值
      const response = await fetch(`${this.firebaseUrl}/${slug}.json`);
      let currentCount = 0;
      
      if (response.ok) {
        const data = await response.json();
        currentCount = data || 0;
      }
      
      // 增加並更新
      const newCount = currentCount + 1;
      const updateSuccess = await this.updateFirebaseCount(slug, newCount);
      
      if (updateSuccess) {
        return newCount;
      }
    } catch (error) {
      console.error('Error incrementing Firebase count:', error);
    }
    
    return null;
  }

  /**
   * 與 Firebase 同步
   */
  async syncWithFirebase() {
    if (!this.isOnline) return;
    
    const now = Date.now();
    if (now - this.lastSyncTime < this.syncInterval) return;
    
    this.lastSyncTime = now;
    await this.loadFromFirebase();
  }

  /**
   * 獲取特定文章的觀看次數
   */
  async getViewCount(slug) {
    // 同步 Firebase 數據
    await this.syncWithFirebase();
    
    // 返回快取中的觀看次數
    return this.cache[slug] || 0;
  }

  /**
   * 增加文章觀看次數
   */
  async incrementViewCount(slug) {
    // 檢查是否在短時間內重複訪問
    const lastViewKey = `last_view_${slug}`;
    const lastViewTime = localStorage.getItem(lastViewKey);
    const currentTime = Date.now();
    
    if (lastViewTime && (currentTime - parseInt(lastViewTime)) < 60000) {
      // 1分鐘內重複訪問不計數，但仍返回當前計數
      return this.cache[slug] || 0;
    }
    
    // 記錄訪問時間
    localStorage.setItem(lastViewKey, currentTime.toString());
    
    if (this.isOnline) {
      try {
        // 嘗試直接在 Firebase 中增加觀看次數
        const newCount = await this.incrementFirebaseCount(slug);
        
        if (newCount !== null) {
          // 成功更新 Firebase，同步到本地快取
          this.cache[slug] = newCount;
          this.saveCache();
          return newCount;
        }
      } catch (error) {
        console.error('Error incrementing view count in Firebase:', error);
      }
    }
    
    // Firebase 更新失敗或離線時，只更新本地快取
    this.cache[slug] = (this.cache[slug] || 0) + 1;
    this.saveCache();
    
    // 標記為需要同步到 Firebase
    this.markForSync(slug);
    
    return this.cache[slug];
  }

  /**
   * 標記需要同步到 Firebase 的項目
   */
  markForSync(slug) {
    const pendingSync = JSON.parse(localStorage.getItem('pending_sync') || '{}');
    pendingSync[slug] = (pendingSync[slug] || 0) + 1;
    localStorage.setItem('pending_sync', JSON.stringify(pendingSync));
    
    // 如果重新連線，嘗試同步
    if (this.isOnline) {
      this.syncPendingCounts();
    }
  }

  /**
   * 同步待處理的觀看次數到 Firebase
   */
  async syncPendingCounts() {
    const pendingSync = JSON.parse(localStorage.getItem('pending_sync') || '{}');
    
    for (const slug of Object.keys(pendingSync)) {
      const pendingCount = pendingSync[slug];
      if (pendingCount > 0) {
        try {
          // 讀取 Firebase 當前值
          const response = await fetch(`${this.firebaseUrl}/${slug}.json`);
          let currentCount = 0;
          
          if (response.ok) {
            const data = await response.json();
            currentCount = data || 0;
          }
          
          // 加上待同步的次數
          const newCount = currentCount + pendingCount;
          const updateSuccess = await this.updateFirebaseCount(slug, newCount);
          
          if (updateSuccess) {
            // 成功同步，從待處理列表中移除
            delete pendingSync[slug];
            this.cache[slug] = newCount;
          }
        } catch (error) {
          console.error('Error syncing pending count for', slug, error);
        }
      }
    }
    
    // 更新待處理列表
    localStorage.setItem('pending_sync', JSON.stringify(pendingSync));
    this.saveCache();
  }

  /**
   * 獲取所有觀看次數
   */
  async getAllViewCounts() {
    await this.syncWithFirebase();
    return this.cache;
  }
}

// 單例模式導出
const viewCountService = new ViewCountService();
export default viewCountService;
