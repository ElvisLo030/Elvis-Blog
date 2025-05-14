/**
 * 專案圖片處理 composable
 * 提供獲取和管理專案圖片的方法
 */

// 獲取項目圖片的 URL
export function getProjectImageUrl(project) {
  // 嘗試從項目信息中取得圖片
  if (project && project.image) {
    return project.image;
  }
  
  // 使用默認圖片
  return '/elvis-blog/assets/default-repo.png';
}

// 處理圖片載入錯誤的函數
export function handleImageError(event) {
  // 設置默認圖片
  event.target.src = '/elvis-blog/assets/default-repo.png';
  
  // 添加額外的 CSS 類
  event.target.classList.add('fallback-image');
  
  // 阻止進一步的錯誤
  event.target.onerror = null;
}
