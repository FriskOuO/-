import React, { useState, useEffect } from 'react';
import { Button, Typography, Space, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardItem from '../components/CardItem';
import { useTarot } from '../context/TarotContext';
// 正確的檔名
import cardBackImage from '../assets/images/card_back.png';

// 暫時使用 cups 牌作為範例
import cups01 from '../assets/cards/cups01.jpg';
import cups02 from '../assets/cards/cups02.jpg';
import cups03 from '../assets/cards/cups03.jpg';
import cups04 from '../assets/cards/cups04.jpg';
import cups05 from '../assets/cards/cups05.jpg';
import cups06 from '../assets/cards/cups06.jpg';
import cups07 from '../assets/cards/cups07.jpg';
import cups08 from '../assets/cards/cups08.jpg';
import cups09 from '../assets/cards/cups09.jpg';
import cups10 from '../assets/cards/cups10.jpg';

const { Title, Text } = Typography;

// 模擬所有牌的陣列（之後可替換為完整的牌組）
const allCards = [
  { id: 'cups01', image: cups01, name: 'Ace of Cups' },
  { id: 'cups02', image: cups02, name: 'Two of Cups' },
  { id: 'cups03', image: cups03, name: 'Three of Cups' },
  { id: 'cups04', image: cups04, name: 'Four of Cups' },
  { id: 'cups05', image: cups05, name: 'Five of Cups' },
  { id: 'cups06', image: cups06, name: 'Six of Cups' },
  { id: 'cups07', image: cups07, name: 'Seven of Cups' },
  { id: 'cups08', image: cups08, name: 'Eight of Cups' },
  { id: 'cups09', image: cups09, name: 'Nine of Cups' },
  { id: 'cups10', image: cups10, name: 'Ten of Cups' }
];

export default function ShuffleAndDraw() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, cardCount, selectedCards, setSelectedCards } = useTarot();
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  
  // 如果尚未選擇主題或牌數，導回相應頁面
  useEffect(() => {
    if (!theme) {
      navigate('/theme');
    } else if (!cardCount) {
      navigate('/count');
    }
  }, [theme, cardCount, navigate]);
  
  // 初始化洗牌
  useEffect(() => {
    if (cardCount) {
      const shuffled = [...allCards]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ 
          ...card, 
          isReversed: Math.random() > 0.5 // 50%機率為逆位
        }));
      setShuffledDeck(shuffled);
      setSelectedCards([]);
      setFlippedCards({});
    }
  }, [cardCount, setSelectedCards]);
  
  const handleCardClick = (card, index) => {
    // 如果已經翻開或已選滿，不做任何事
    if (flippedCards[index] || selectedCards.length >= cardCount) {
      return;
    }
    
    // 標記為已翻開
    setFlippedCards(prev => ({ ...prev, [index]: true }));
    
    // 加入已選擇的牌
    setSelectedCards(prev => [...prev, card]);
  };
  
  const handleComplete = () => {
    if (selectedCards.length === cardCount) {
      navigate('/result');
    } else {
      message.warning(`請選擇 ${cardCount} 張牌`);
    }
  };
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '84px' }}>
      <Col xs={24} sm={22} md={20} lg={18}>
        <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
          <Title level={2} style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {t('draw.title')}
          </Title>
          
          <Text style={{ color: '#ffffff', fontSize: '18px', marginBottom: '20px' }}>
            {t('draw.instruction')} ({selectedCards.length}/{cardCount})
          </Text>
          
          <Row gutter={[16, 16]} justify="center">
            {shuffledDeck.slice(0, 12).map((card, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={4} style={{ marginBottom: '20px' }}>
                <div 
                  onClick={() => handleCardClick(card, index)}
                  style={{ cursor: 'pointer', transition: 'transform 0.3s', transform: flippedCards[index] ? 'rotateY(180deg)' : '' }}
                >
                  {flippedCards[index] ? (
                    <CardItem src={card.image} isReversed={card.isReversed} />
                  ) : (
                    <img 
                      src={cardBackImage} 
                      alt="Card Back" 
                      className="card"
                      style={{ width: '180px', height: '300px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
                    />
                  )}
                </div>
              </Col>
            ))}
          </Row>
          
          <Button 
            type="primary" 
            size="large" 
            onClick={handleComplete}
            disabled={selectedCards.length !== cardCount}
            style={{ marginTop: '20px' }}
          >
            {t('draw.complete')}
          </Button>
        </Space>
      </Col>
    </Row>
  );
}