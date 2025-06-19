import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardItem from '../components/CardItem';
import CardFan from '../components/CardFan';
import { useTarot } from '../context/TarotContext';
import cardBackImage from '../assets/images/card_back.png';
import tarotCards from '../data/cards.json';

const { Title, Text } = Typography;

export default function ShuffleAndDraw() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, cardCount, setSelectedCards } = useTarot();
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [userSelectedCards, setUserSelectedCards] = useState([]);
  const [showCards, setShowCards] = useState(false); // 控制是否顯示單張卡片
  
  // 如果尚未選擇主題或牌數，導回相應頁面
  useEffect(() => {
    if (!theme) {
      navigate('/theme');
    } else if (!cardCount) {
      navigate('/count');
    }
  }, [theme, cardCount, navigate]);
  
  // 洗牌功能
  useEffect(() => {
    if (cardCount) {
      // 複製牌組並洗牌
      const shuffled = [...tarotCards]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ 
          ...card,
          isReversed: Math.random() > 0.5 // 50% 機率為逆位
        }));
      
      setShuffledDeck(shuffled);
      setUserSelectedCards([]);
      setFlippedCards({});
    }
  }, [cardCount]);
  
  // 處理從扇形中選牌的邏輯
  const handleFanCardSelect = (index) => {
    // 檢查是否已經選滿卡片
    if (userSelectedCards.length >= cardCount) {
      message.warning(`您已選滿 ${cardCount} 張牌`);
      return;
    }

    // 為了防止重複選擇，檢查這張牌是否已經被選中
    const isAlreadySelected = userSelectedCards.some(card => card.fanIndex === index);
    if (isAlreadySelected) {
      message.info('您已經選擇了這張牌');
      return;
    }

    const selectedCard = {
      ...shuffledDeck[index],
      isReversed: Math.random() > 0.5,
      fanIndex: index // 記錄這張牌的索引，用於防止重複選擇
    };

    setUserSelectedCards(prev => [...prev, selectedCard]);
    
    // 提供視覺反饋
    message.success(`已選擇第 ${userSelectedCards.length + 1}/${cardCount} 張牌`);
    
    // 如果選滿了卡片數量，提醒用戶可以完成抽牌
    if (userSelectedCards.length + 1 === cardCount) {
      setTimeout(() => {
        message.info('您已選滿所需牌數，請點擊"完成抽牌"按鈕');
      }, 1000);
    }
  };
  
  const handleCardClick = (card, index) => {
    // 如果已經翻開或已選滿，不做任何事
    if (flippedCards[index] || userSelectedCards.length >= cardCount) {
      return;
    }
    
    // 標記為已翻開
    setFlippedCards(prev => ({ ...prev, [index]: true }));
    
    // 加入已選擇的牌
    const selectedCard = {
      ...card,
      isReversed: card.isReversed
    };
    
    setUserSelectedCards(prev => [...prev, selectedCard]);
  };
  
  const handleComplete = () => {
    if (userSelectedCards.length === cardCount) {
      // 將選中的牌存入 Context
      setSelectedCards(userSelectedCards);
      navigate('/result');
    } else {
      message.warning(`請選擇 ${cardCount} 張牌`);
    }
  };

  // 新增的 CSS 樣式
  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    title: {
      color: '#ffffff', 
      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
      marginBottom: '30px'
    },
    instruction: {
      color: '#ffffff',
      fontSize: '18px',
      marginBottom: '40px'
    },
    cardsSection: {
      marginTop: '40px',
      marginBottom: '40px',
      position: 'relative',
      padding: '40px 0',
      borderRadius: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)'
    },
    actionButton: {
      marginTop: '30px',
      background: 'linear-gradient(135deg, #8a6e4b 0%, #5e4a33 100%)',
      borderColor: '#5e4a33',
      borderRadius: '30px',
      padding: '0 30px',
      height: 'auto',
      lineHeight: '40px',
      fontSize: '16px',
      fontWeight: 'bold'
    }
  };
  
  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>
        {t('draw.title')}
      </Title>
      
      <Text style={styles.instruction}>
        {t('draw.instruction')} ({userSelectedCards.length}/{cardCount})
      </Text>
      
      {!showCards ? (
        <div style={styles.cardsSection}>
          <CardFan
            count={Math.max(10, cardCount * 2)} // 確保至少有十張牌可選
            cardBackImg={cardBackImage}
            onSelect={handleFanCardSelect}
            fanAngle={120} // 减小角度，讓牌片更容易選中
            fanRadius={220} // 適當調整半徑
          />
          
          {/* 添加選牌提示 */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '14px'
          }}>
            點擊卡片進行選擇（{userSelectedCards.length}/{cardCount}）
          </div>
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {shuffledDeck.slice(0, cardCount).map((card, index) => (
            <Col key={index} xs={12} sm={8} md={6} lg={4} style={{ marginBottom: '20px' }}>
              <div 
                onClick={() => handleCardClick(card, index)}
                className={`card-container ${flippedCards[index] ? 'flipped' : ''}`}
              >
                {flippedCards[index] ? (
                  <CardItem src={card.image} isReversed={card.isReversed} />
                ) : (
                  <img 
                    src={cardBackImage} 
                    alt="Card Back" 
                    className="card-back"
                    style={{
                      width: '180px',
                      height: '300px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                )}
              </div>
            </Col>
          ))}
        </Row>
      )}
      
      <Button 
        type="primary" 
        size="large" 
        onClick={handleComplete}
        disabled={userSelectedCards.length !== cardCount}
        style={styles.actionButton}
      >
        {t('draw.complete')}
      </Button>
    </div>
  );
}