import React from 'react';
import { useTranslation } from 'react-i18next';
import imageMap from '../utils/imageMap'; // 假設您已經有此圖片映射模組
import './CardThumbnail.css';

const CardThumbnail = ({ card, onClick }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // 提取卡片名稱
  const cardName = typeof card.name === 'object' ? 
    card.name[currentLang] || 'Unknown Card' : 
    (card.name || 'Unknown Card');
  
  // 提取圖片來源
  const imageSrc = card.image ? 
    (imageMap[card.image] || card.image) : 
    'https://via.placeholder.com/300x450?text=Card+Image';
  
  return (
    <div className="card-thumbnail" onClick={() => onClick(card)}>
      <div className="thumbnail-image-container">
        <img 
          src={imageSrc} 
          alt={cardName}
          className="thumbnail-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=Card+Image';
          }}
        />
      </div>
      <div className="thumbnail-overlay">
        <h3 className="thumbnail-title">{cardName}</h3>
      </div>
    </div>
  );
};

export default CardThumbnail;