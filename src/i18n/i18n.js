import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 中文翻譯
const zhResources = {
  translation: {
    'app.title': '神秘塔羅占卜',
    'app.start': '開始占卜',
    'app.allCards': '所有牌義',
    'language.en': 'English',
    'language.zh': '中文',
    'theme.title': '選擇占卜主題',
    'theme.love': '愛情',
    'theme.career': '事業',
    'theme.health': '健康',
    'theme.other': '其他',
    'count.title': '選擇牌數',
    'count.oneCard': '單張牌陣',
    'count.threeCards': '三張牌陣',
    'count.sixCards': '六張牌陣',
    'draw.title': '選擇您的牌',
    'draw.instruction': '點選卡片進行抽牌',
    'draw.complete': '完成抽牌',
    'result.title': '占卜結果',
    'result.theme': '占卜主題',
    'result.upright': '正位解析',
    'result.reversed': '逆位解析',
    'result.backToHome': '返回首頁',
    'cardInfo.title': '塔羅牌牌義總覽',
    'cardInfo.upright': '正位牌義',
    'cardInfo.reversed': '逆位牌義'
  }
};

// 英文翻譯
const enResources = {
  translation: {
    'app.title': 'Mystic Tarot Reading',
    'app.start': 'Start Reading',
    'app.allCards': 'All Cards',
    'language.en': 'English',
    'language.zh': '中文',
    'theme.title': 'Choose Your Reading Theme',
    'theme.love': 'Love',
    'theme.career': 'Career',
    'theme.health': 'Health',
    'theme.other': 'Other',
    'count.title': 'Select Number of Cards',
    'count.oneCard': 'Single Card',
    'count.threeCards': 'Three Card Spread',
    'count.sixCards': 'Six Card Spread',
    'draw.title': 'Select Your Cards',
    'draw.instruction': 'Click on cards to select',
    'draw.complete': 'Complete Reading',
    'result.title': 'Your Reading Results',
    'result.theme': 'Reading Theme',
    'result.upright': 'Upright Meaning',
    'result.reversed': 'Reversed Meaning',
    'result.backToHome': 'Back to Home',
    'cardInfo.title': 'Tarot Card Meanings',
    'cardInfo.upright': 'Upright Meaning',
    'cardInfo.reversed': 'Reversed Meaning'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enResources,
      zh: zhResources
    },
    lng: localStorage.getItem('language') || 'zh', // 默認語言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React 已經安全了，不需要 escape
    }
  });

export default i18n;