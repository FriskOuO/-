// CardItem.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import imageMap from '../utils/imageMap';
import './CardItem.css';

export default function CardItem({ card, src, isReversed }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // 處理不同的元件用法 (有些地方使用 card 物件，有些地方使用 src 參數)
  if (src) {
    // ShuffleAndDraw.js 和 Result.js 中使用此方式
    return (
      <div className={`tarot-card ${isReversed ? 'reversed' : ''}`}>
        <img 
          src={imageMap[src] || src} 
          alt="Tarot Card"
          className="tarot-card-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=Card+Image';
          }}
        />
      </div>
    );
  }
  
  // 處理 card 物件為空的情況
  if (!card) {
    return (
      <div className="card-item card-error">
        <div className="card-inner">
          <div className="card-content">
            <h3 className="card-title">卡片資料錯誤</h3>
          </div>
        </div>
      </div>
    );
  }
  
  // Cards.js 頁面使用此方式 (完整 card 物件)
  // 處理圖片來源
  const imageSrc = card.image ? 
    (imageMap[card.image] || card.image) : 
    'https://via.placeholder.com/300x450?text=Card+Image+Not+Available';
  
  // 處理卡片名稱
  const cardName = typeof card.name === 'object' ? 
    card.name[currentLang] || 'Unknown Card' : 
    (card.name || 'Unknown Card');
  
  // 處理牌義
  const uprightMeaning = card.meanings && card.meanings.upright ? 
    (typeof card.meanings.upright === 'object' ? card.meanings.upright[currentLang] : card.meanings.upright) : '';
  const reversedMeaning = card.meanings && card.meanings.reversed ? 
    (typeof card.meanings.reversed === 'object' ? card.meanings.reversed[currentLang] : card.meanings.reversed) : '';
  
  // 處理關鍵字
  const keywords = (card.keywords && card.keywords[currentLang]) ? 
    card.keywords[currentLang] : [];
  
  return (
    <div className="card-item">
      <div className="card-inner">
        <div className="card-image-container">
          <img 
            src={imageSrc} 
            alt={cardName}
            className="card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x450?text=Card+Image+Not+Available';
            }}
          />
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{cardName}</h3>
          
          <div className="card-meanings">
            <div className="meaning-section">
              <h4 className="meaning-title upright">正位</h4>
              <p className="meaning-text">{uprightMeaning}</p>
            </div>
            
            <div className="meaning-section">
              <h4 className="meaning-title reversed">逆位</h4>
              <p className="meaning-text">{reversedMeaning}</p>
            </div>
          </div>
          
          {keywords && keywords.length > 0 && (
            <div className="card-keywords">
              {keywords.map((keyword, index) => (
                <span key={index} className="keyword-tag">
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
