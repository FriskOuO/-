/**
 * 塔羅牌圖片映射模組
 * 
 * 此模組使用 require.context() 批次導入 src/assets/cards 目錄下的所有圖片
 * 並創建一個映射物件，以檔名為鍵，圖片路徑為值
 */

// 使用 import.meta.globEager 代替 require.context (適用於 Vite)
// 如果使用 webpack，請使用下方註解的程式碼
let imageMap = {};

// 處理 React 18+ 和 Vite/Webpack 5+ 環境
try {
  // 方法 1: 使用 import.meta.glob (Vite 環境)
  if (import.meta && import.meta.glob) {
    const images = import.meta.glob('../assets/cards/*.{jpg,jpeg,png,gif,webp}');
    
    Object.keys(images).forEach(key => {
      const filename = key.split('/').pop(); // 從路徑中提取檔名
      imageMap[filename] = images[key];
    });
  }
} catch (e) {
  console.log('使用 webpack 模式載入圖片');
}

// 方法 2: 使用傳統的 webpack require.context (如果方法 1 失敗)
if (Object.keys(imageMap).length === 0) {
  try {
    const requireContext = require.context('../assets/cards', false, /\.(jpg|jpeg|png|gif|webp)$/);
    
    requireContext.keys().forEach((key) => {
      const filename = key.replace('./', '');
      imageMap[filename] = requireContext(key);
    });
  } catch (e) {
    console.error('無法載入圖片:', e);
    
    // 方法 3: 手動匯入常見的塔羅牌圖片 (備用方案)
    const importAll = (r) => {
      let images = {};
      r.keys().forEach((item) => {
        images[item.replace('./', '')] = r(item);
      });
      return images;
    };
    
    try {
      // 嘗試使用 webpack 的 require.context
      imageMap = importAll(require.context('../assets/cards', false, /\.(jpg|jpeg|png|gif|webp)$/));
    } catch (err) {
      console.error('備用載入方式也失敗:', err);
      
      // 最終的備用方案: 手動列出所有可能的塔羅牌檔案
      const cardPrefixes = ['cups', 'wands', 'swords', 'pentacles', 'major', 'rws_tarot'];
      const cardNumbers = Array.from({ length: 22 }, (_, i) => 
        i < 10 ? `0${i}` : `${i}`
      );
      
      // 為每個可能的組合創建一個條目
      cardPrefixes.forEach(prefix => {
        cardNumbers.forEach(num => {
          const filename = `${prefix}${num}.jpg`;
          imageMap[filename] = `../assets/cards/${filename}`;
        });
      });
      
      // 愚者牌等特殊牌
      ['rws_tarot_00_fool.jpg', 'rws_tarot_01_magician.jpg'].forEach(filename => {
        imageMap[filename] = `../assets/cards/${filename}`;
      });
    }
  }
}

// 調試信息 - 查看載入的圖片數量
console.log(`已載入 ${Object.keys(imageMap).length} 張塔羅牌圖片`);

export default imageMap;