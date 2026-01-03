/**
 * GitHub 服務 - 用於獲取 GitHub 公開存儲庫資料
 */

// 預設的 GitHub 用戶名
const DEFAULT_USERNAME = 'ElvisLo030';

/**
 * 從 GitHub API 獲取用戶的公開存儲庫列表
 * @param {string} username - GitHub 用戶名
 * @returns {Promise} 包含存儲庫資料的 Promise
 */
export async function fetchRepositories(username = DEFAULT_USERNAME) {
  try {
    // 同時獲取用戶的存儲庫和 starred 存儲庫
    const [reposResponse, starredResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
      fetch(`https://api.github.com/users/${username}/starred?per_page=100`)
    ]);
    
    if (!reposResponse.ok) {
      throw new Error(`GitHub API 回應錯誤: ${reposResponse.status}`);
    }
    
    const reposData = await reposResponse.json();
    let starredData = [];
    
    // 獲取 starred 存儲庫（如果 API 呼叫成功）
    if (starredResponse.ok) {
      starredData = await starredResponse.json();
    }
    
    // 創建 starred 存儲庫的 ID 集合，用於快速查找
    const starredIds = new Set(starredData.map(repo => repo.id));
    
    // 轉換成我們需要的格式
    const repos = reposData.map(repo => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || '未提供描述',
      technologies: getLanguagesFromRepo(repo),
      image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
      codeUrl: repo.html_url,
      language: repo.language,
      fork: repo.fork,
      isStarred: starredIds.has(repo.id)
    }));
    
    return repos;
  } catch (error) {
    console.error('獲取 GitHub 存儲庫失敗:', error);
    return [];
  }
}

/**
 * 獲取特定存儲庫的提交記錄
 * @param {string} owner - 擁有者
 * @param {string} repo - 存儲庫名稱
 * @param {number} perPage - 每頁數量
 * @returns {Promise<Array>} 提交記錄列表
 */
export async function fetchCommits(owner = DEFAULT_USERNAME, repo = 'Elvis-Blog', perPage = 10) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`);
    if (!response.ok) {
      throw new Error(`GitHub API 回應錯誤: ${response.status}`);
    }
    const data = await response.json();
    
    return data.map(item => ({
      sha: item.sha,
      shortSha: item.sha.substring(0, 7),
      date: new Date(item.commit.author.date),
      formattedDate: new Date(item.commit.author.date).toLocaleDateString('zh-TW', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      }).replace(/\//g, '-'),
      message: item.commit.message,
      author: item.commit.author.name,
      url: item.html_url
    }));
  } catch (error) {
    console.error('獲取提交記錄失敗:', error);
    return [];
  }
}

/**
 * 從存儲庫獲取預設技術標籤
 * @param {Object} repo - 存儲庫物件
 * @returns {Array} 技術標籤陣列
 */
function getLanguagesFromRepo(repo) {
  const technologies = [];
  
  // 添加主要語言（如果有）
  if (repo.language) {
    technologies.push(repo.language);
  }
  
  // 嘗試從名稱和描述中提取技術關鍵字
  const techKeywords = [
    'JavaScript', 'TypeScript', 'Vue', 'React', 'Angular', 
    'Node', 'Express', 'MongoDB', 'SQL', 'Python', 'Django',
    'Flask', 'Java', 'Spring', 'PHP', 'Laravel', 'C#', '.NET', 
    'Ruby', 'Rails', 'HTML', 'CSS', 'SCSS', 'TailwindCSS'
  ];
  
  const nameAndDesc = `${repo.name} ${repo.description || ''}`;
  
  techKeywords.forEach(tech => {
    if (nameAndDesc.toLowerCase().includes(tech.toLowerCase()) && !technologies.includes(tech)) {
      technologies.push(tech);
    }
  });    // 確保至少有一個技術標籤
  if (technologies.length === 0) {
    technologies.push('Other');
  }
  
  return technologies;
}
