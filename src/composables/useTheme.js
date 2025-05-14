import { ref } from 'vue';

// 主題模式（只有深色模式）
export function useTheme() {
  // 固定為深色模式
  const isDark = ref(true);

  // 套用深色主題
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');

  // 返回固定的深色模式狀態
  return {
    isDark
  };
}
