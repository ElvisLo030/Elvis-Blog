import { marked } from 'marked';
import hljs from 'highlight.js';

// 設置 marked 選項
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
});

// 處理 Markdown 的服務
export class MarkdownService {
  /**
   * 將 Markdown 轉換為 HTML
   * @param {string} markdownText - Markdown 文本
   * @returns {string} - 轉換後的 HTML
   */
  convertToHtml(markdownText) {
    if (!markdownText) return '';
    return marked.parse(markdownText);
  }
  
  /**
   * 將 Markdown 文本轉換為純文本（去除所有 Markdown 標記）
   * @param {string} markdownText - 要轉換的 Markdown 文本
   * @returns {string} 純文本
   */
  markdownToPlainText(markdownText) {
    if (!markdownText) return '';
    
    // 簡單的 Markdown 轉純文字處理
    return markdownText
      .replace(/#+\s+/g, '') // 移除標題符號
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 將 [文字](連結) 變為純文字
      .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗體標記
      .replace(/\*(.*?)\*/g, '$1') // 移除斜體標記
      .replace(/`([^`]+)`/g, '$1') // 移除行內代碼標記
      .replace(/```[\s\S]*?```/g, '') // 移除代碼塊
      .replace(/>/g, '') // 移除引用標記
      .replace(/\n\s*\n/g, '\n') // 將多行空行縮減為單行
      .trim();
  }

  /**
   * 截斷文本到指定長度
   * @param {string} text - 要截斷的文本
   * @param {number} maxLength - 最大長度
   * @returns {string} 截斷後的文本
   */
  truncateText(text, maxLength = 150) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
}

// 單例模式導出
const markdownService = new MarkdownService();
export default markdownService;
