import React, { createContext, useState, useContext } from 'react';

// 創建 Context
const TarotContext = createContext();

// Context Provider 元件
export const TarotProvider = ({ children }) => {
  const [theme, setTheme] = useState(null); // 占卜主題
  const [cardCount, setCardCount] = useState(null); // 選擇的牌數
  const [selectedCards, setSelectedCards] = useState([]); // 選中的牌

  // 清除所有選擇，重新開始
  const resetReading = () => {
    setTheme(null);
    setCardCount(null);
    setSelectedCards([]);
  };

  // 提供給子元件的值
  const value = {
    theme,
    setTheme,
    cardCount,
    setCardCount,
    selectedCards,
    setSelectedCards,
    resetReading,
  };

  return <TarotContext.Provider value={value}>{children}</TarotContext.Provider>;
};

// 自定義 Hook 方便使用 Context
export const useTarot = () => {
  const context = useContext(TarotContext);
  if (!context) {
    throw new Error('useTarot must be used within a TarotProvider');
  }
  return context;
};