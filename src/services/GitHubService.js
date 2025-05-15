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
    // 使用 GitHub REST API 獲取存儲庫列表
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API 回應錯誤: ${response.status}`);
    }
    
    const reposData = await response.json();
    
    // 轉換成我們需要的格式
    const repos = reposData.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      title: repo.name,
      description: repo.description || '未提供描述',
      tags: getTagsFromRepo(repo),
      technologies: getLanguagesFromRepo(repo),
      // 嘗試獲取圖片，但允許回退到文字顯示
      image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
      demoUrl: repo.homepage || null,
      codeUrl: repo.html_url,
      language: repo.language,
      watchers: repo.watchers_count,
      featured: repo.stargazers_count > 0 || repo.watchers_count > 3,
      createdAt: new Date(repo.created_at),
      updatedAt: new Date(repo.updated_at),
      stars: repo.stargazers_count,
      forks: repo.forks_count
    }));
    
    return repos;
  } catch (error) {
    console.error('獲取 GitHub 存儲庫失敗:', error);
    return [];
  }
}

/**
 * 從存儲庫獲取主要語言資料
 * @param {Object} repo - 存儲庫物件
 * @returns {Promise} 包含語言資料的 Promise
 */
export async function fetchRepoLanguages(repo) {
  try {
    const response = await fetch(repo.languages_url);
    
    if (!response.ok) {
      throw new Error(`GitHub API 回應錯誤: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`獲取存儲庫 ${repo.name} 的語言資料失敗:`, error);
    return {};
  }
}

/**
 * 從存儲庫特性獲取標籤
 * @param {Object} repo - 存儲庫物件
 * @returns {Array} 標籤陣列
 */

/**
 * 從存儲庫特性獲取標籤
 * @param {Object} repo - 存儲庫物件
 * @returns {Array} 標籤陣列
 */
function getTagsFromRepo(repo) {
  const tags = [];
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  
  // 根據存儲庫特性添加標籤
  if (repo.fork) {
    tags.push('Fork');
  } else {
    tags.push('Original');
  }
  
  if (repo.stargazers_count > 0) {
    tags.push('⭐️');
  }
  
  // 基於名稱和描述添加標籤
  if (name.includes('portfolio') || description.includes('portfolio')) {
    tags.push('個人作品集');
  }
  
  if (name.includes('demo') || description.includes('demo')) {
    tags.push('示例');
  }
  
  if (name.includes('learn') || description.includes('learn') || 
      name.includes('study') || description.includes('study')) {
    tags.push('學習專案');
  }
  
  return tags;
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
  });
  
  // 確保至少有一個技術標籤
  if (technologies.length === 0) {
    technologies.push('Another');
  }
  
  return technologies;
}
