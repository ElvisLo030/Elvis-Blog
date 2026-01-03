<template>
  <div class="about-container">
    <div class="about-header">
      <h1 class="page-title">網站更新日誌</h1>
    </div>

    <section class="about-section">
      <div class="section-content">
        <div v-if="loading" class="loading-state">
          <font-awesome-icon :icon="['fas', 'spinner']" spin /> 載入中...
        </div>
        <div v-else-if="error" class="error-state">
          {{ error }}
        </div>
        <div v-else class="timeline">
          <div v-for="(commits, date) in groupedCommits" :key="date" class="timeline-item">
            <div class="timeline-date">{{ date }}</div>
            <div class="timeline-content">
              <div v-for="commit in commits" :key="commit.sha" class="commit-item">
                <div class="commit-header">
                  <h3 class="commit-title">
                    <a :href="commit.url" target="_blank" class="commit-link">
                      {{ getCommitSummary(commit.message) }}
                    </a>
                  </h3>
                  <span class="commit-sha">{{ commit.shortSha }}</span>
                </div>
                <p v-if="getCommitBody(commit.message)" class="commit-body">
                  {{ getCommitBody(commit.message) }}
                </p>
                <div class="commit-meta">
                  <span class="commit-author">
                    <font-awesome-icon :icon="['fas', 'user']" size="xs" /> {{ commit.author }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchCommits } from '../services/GitHubService';

const commits = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  window.scrollTo(0, 0);
  try {
    loading.value = true;
    commits.value = await fetchCommits('ElvisLo030', 'Elvis-Blog');
  } catch (err) {
    error.value = '無法載入更新日誌，請稍後再試。';
    console.error(err);
  } finally {
    loading.value = false;
  }
});

const groupedCommits = computed(() => {
  const groups = {};
  commits.value.forEach(commit => {
    if (!groups[commit.formattedDate]) {
      groups[commit.formattedDate] = [];
    }
    groups[commit.formattedDate].push(commit);
  });
  return groups;
});

const getCommitSummary = (message) => {
  return message.split('\n')[0];
};

const getCommitBody = (message) => {
  const lines = message.split('\n');
  if (lines.length > 1) {
    return lines.slice(1).join('\n').trim();
  }
  return '';
};
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 60%;
  height: 3px;
  background-color: var(--primary-color);
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-color-secondary);
  margin-top: 1rem;
}

.about-section {
  margin-bottom: 3rem;
  animation: fadeIn 0.5s ease-out forwards;
}

.section-content {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px var(--shadow-color);
}

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 20px;
  border-left: 2px solid var(--primary-color);
}

.timeline-item:last-child {
  margin-bottom: 0;
  border-left-color: transparent; 
  /* 最後一個項目不顯示左側線條延伸，或者使用 transparent */
  border-left: 2px solid var(--primary-color); 
}
/* 修正最後一個項目的線條顯示 */
.timeline-item:last-of-type {
    border-image: linear-gradient(to bottom, var(--primary-color) 0%, transparent 100%) 1 100%;
    border-left: 2px solid transparent; /* fallback */
    border-left: 2px solid var(--primary-color); /* reset if gradient not supported or logic simple */
}


.timeline-date {
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.1rem;
  position: relative;
}

/* 圓點 */
.timeline-date::before {
  content: '';
  position: absolute;
  left: -27px; /* 20px padding + 2px border + 5px radius */
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: var(--bg-color);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  z-index: 1;
}

.commit-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.commit-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.commit-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.commit-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
}

.commit-link {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s;
}

.commit-link:hover {
  color: var(--primary-color);
}

.commit-sha {
  font-family: monospace;
  font-size: 0.85rem;
  padding: 2px 6px;
  background-color: rgba(var(--primary-rgb), 0.1);
  border-radius: 4px;
  color: var(--primary-color);
}

.commit-body {
  margin: 0.5rem 0;
  font-size: 0.95rem;
  color: var(--text-color-secondary);
  white-space: pre-wrap;
  line-height: 1.6;
}

.commit-meta {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-color-secondary);
}

.error-state {
  color: #ff4757;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .timeline-item {
    padding-left: 15px;
  }
  
  .timeline-date::before {
    left: -22px;
  }
}
</style>
