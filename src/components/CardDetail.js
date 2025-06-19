import React from 'react';
import { useTranslation } from 'react-i18next';
import imageMap from '../utils/imageMap';
import './CardDetail.css';

const CardDetail = ({ card }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // 提取卡片資訊
  const cardName = typeof card.name === 'object' ? 
    card.name[currentLang] || 'Unknown Card' : 
    (card.name || 'Unknown Card');
  
  const imageSrc = card.image ? 
    (imageMap[card.image] || card.image) : 
    'https://via.placeholder.com/300x450?text=Card+Image';
  
  const uprightMeaning = card.meanings && card.meanings.upright ? 
    (typeof card.meanings.upright === 'object' ? card.meanings.upright[currentLang] : card.meanings.upright) : '';
  
  const reversedMeaning = card.meanings && card.meanings.reversed ? 
    (typeof card.meanings.reversed === 'object' ? card.meanings.reversed[currentLang] : card.meanings.reversed) : '';
  
  const keywords = (card.keywords && card.keywords[currentLang]) ? 
    card.keywords[currentLang] : [];
  
  return (
    <div className="card-detail">
      <div className="detail-content">
        <div className="detail-image-container">
          <img 
            src={imageSrc} 
            alt={cardName}
            className="detail-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x450?text=Card+Image+Not+Available';
            }}
          />
        </div>
        
        <div className="detail-info">
          <h2 className="detail-title">{cardName}</h2>
          
          {card.arcana && (
            <div className="detail-arcana">
              <span className={`arcana-badge ${card.arcana}`}>
                {card.arcana === 'major' ? '大阿爾克那' : '小阿爾克那'}
              </span>
              {card.suit && <span className="suit-info">{card.suit}</span>}
            </div>
          )}
          
          <div className="detail-meanings">
            <div className="meaning-section">
              <h4 className="meaning-title upright">正位</h4>
              <p className="meaning-text">{uprightMeaning}</p>
            </div>
            
            <div className="meaning-section">
              <h4 className="meaning-title reversed">逆位</h4>
              <p className="meaning-text">{reversedMeaning}</p>
            </div>
          </div>
          
          {keywords.length > 0 && (
            <div className="detail-keywords">
              <h4 className="keywords-title">關鍵字</h4>
              <div className="keywords-list">
                {keywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;