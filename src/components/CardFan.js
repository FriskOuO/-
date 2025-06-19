import React, { useState } from 'react';
import './CardFan.css';
import PropTypes from 'prop-types';

/**
 * CardFan 元件 - 以扇形排列顯示塔羅牌
 * @param {Object} props
 * @param {number} props.count - 要顯示的卡片數量
 * @param {string} props.cardBackImg - 卡片背面圖片路徑
 * @param {Function} props.onSelect - 卡片選擇回調函數
 * @param {number} props.fanAngle - 扇形的角度範圍（默認為 120 度）
 * @param {number} props.fanRadius - 扇形的半徑（默認為 250px）
 */
const CardFan = ({ count, cardBackImg, onSelect, fanAngle = 120, fanRadius = 250 }) => {
  // 生成指定數量的卡片陣列
  const cards = Array.from({ length: count }, (_, i) => i);
  // 跟踪選中的卡片
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // 計算每張卡片的角度
  const angleStep = count > 1 ? fanAngle / (count - 1) : 0;
  // 起始角度為負的 fanAngle 的一半
  const startAngle = -fanAngle / 2;
  
  const handleCardClick = (index) => {
    setSelectedIndex(index);
    if (onSelect && typeof onSelect === 'function') {
      onSelect(index);
    }
  };
  
  return (
    <div className="card-fan-container">
      {cards.map((_, index) => {
        // 計算當前卡片的角度
        const currentAngle = startAngle + angleStep * index;
        
        // 計算卡片位置
        const style = {
          transform: `
            rotate(${currentAngle}deg)
            translate(0, ${-fanRadius}px)
            rotate(${-currentAngle}deg)
          `,
          transformOrigin: 'bottom center',
          // 如果這張卡片被選中，添加特殊的視覺效果
          filter: selectedIndex === index ? 'brightness(1.2) drop-shadow(0 0 10px gold)' : 'none',
          // 使選中的卡片稍微向上移動
          marginBottom: selectedIndex === index ? '20px' : '10px',
        };
        
        return (
          <div
            key={index}
            className={`card-fan-item ${selectedIndex === index ? 'selected' : ''}`}
            style={style}
            onClick={() => handleCardClick(index)}
          >
            <img 
              src={cardBackImg} 
              alt={`Tarot Card ${index + 1}`}
              className="card-fan-image"
            />
          </div>
        );
      })}
    </div>
  );
};

CardFan.propTypes = {
  count: PropTypes.number.isRequired,
  cardBackImg: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  fanAngle: PropTypes.number,
  fanRadius: PropTypes.number
};

export default CardFan;