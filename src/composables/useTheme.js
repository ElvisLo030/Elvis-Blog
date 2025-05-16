import { ref } from 'vue';

export function useTheme() {
  // 設定為固定深色模式
  const isDark = ref(true);

  // 套用深色主題
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark-mode');
  // 儲存主題設定到本地儲存空間
  localStorage.setItem('theme', 'dark');

  // 返回深色模式狀態變數
  return {
    isDark
  };
}
