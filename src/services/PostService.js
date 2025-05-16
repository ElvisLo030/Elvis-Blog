// 文章服務類，負責讀取所有文章數據
export class PostService {
  constructor() {
    this.posts = [];
    this.loadPosts();
  }

  /**
   * 加載所有文章
   */
  async loadPosts() {
    const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });
    
    this.posts = Object.entries(modules).map(([path, content]) => {
      // 從文件路徑獲取文章slug
      const slug = path.split('/').pop().replace('.md', '');
      
      // 提取元數據（假設文章頂部有YAML前端事項）
      const metaMatch = content.match(/---\s*([\s\S]*?)\s*---/);
      const metaStr = metaMatch ? metaMatch[1] : '';
      
      // 解析元數據
      const meta = {};
      metaStr.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) meta[key] = value;
      });
      
      // 提取內容（移除元數據）
      const postContent = content.replace(/---\s*([\s\S]*?)\s*---/, '').trim();
      
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || new Date().toISOString().split('T')[0],
        tags: meta.tags ? meta.tags.split(',').map(tag => tag.trim()) : [],
        summary: meta.summary || '',
        content: postContent
      };
    });
    
    // 按日期排序（最新的在前）
    this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * 獲取所有文章
   * @returns {Array} 文章列表
   */
  getAllPosts() {
    return this.posts;
  }

  /**
   * 根據slug獲取特定文章
   * @param {string} slug - 文章slug
   * @returns {Object|null} 文章對象或null
   */
  getPostBySlug(slug) {
    return this.posts.find(post => post.slug === slug) || null;
  }
}

// 單例模式導出
const postService = new PostService();
export default postService;
