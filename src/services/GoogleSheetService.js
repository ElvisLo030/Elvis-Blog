export class GoogleSheetService {
  /**
   * 解析 CSV 字串為 JSON 物件陣列
   * @param {string} csvText - CSV 內容
   * @returns {Array} 解析後的物件陣列
   */
  parseCSV(csvText) {
    if (!csvText) return [];
    
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return []; // 只有標題或空的

    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
      // 處理引號內的逗號
      const values = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim().replace(/^"|"$/g, '')); // 移除前後引號
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim().replace(/^"|"$/g, '')); // 最後一個值

      const entry = {};
      headers.forEach((header, index) => {
        if (index < values.length) {
          entry[header] = values[index];
        }
      });
      return entry;
    });
  }

  /**
   * 從指定的 URL 獲取並解析 CSV
   * @param {string} url - Google Sheet CSV 發布連結
   * @returns {Promise<Array>} 解析後的資料
   */
  async fetchData(url) {
    if (!url) return [];
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      return this.parseCSV(text);
    } catch (error) {
      console.error('Error fetching Google Sheet data:', error);
      return [];
    }
  }
}

const googleSheetService = new GoogleSheetService();
export default googleSheetService;
