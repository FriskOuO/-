import React from 'react';
import { Typography, Space, Row, Col, Card, Input, List } from 'antd';
import { useTranslation } from 'react-i18next';
import CardItem from '../components/CardItem';
// 將卡片導入移到這裡
import cups01 from '../assets/cards/cups01.jpg';
import cups02 from '../assets/cards/cups02.jpg';
import cups03 from '../assets/cards/cups03.jpg';
import cups04 from '../assets/cards/cups04.jpg';
import cups05 from '../assets/cards/cups05.jpg';

const { Title, Text } = Typography;
const { Search } = Input;

// 同樣使用模擬的牌和牌義資料（實際應用時應替換為完整資料）
const cardData = [
  {
    id: 'cups01',
    image: cups01,
    name: 'Ace of Cups',
    upright: '新的感情開始、愛、直覺、創造力、精神滿足',
    reversed: '情感封閉、錯失良機、負面情緒、自私'
  },
  {
    id: 'cups02',
    image: cups02,
    name: 'Two of Cups',
    upright: '和諧關係、愛情、合作、吸引力、結合',
    reversed: '失去平衡、分離、衝突、不融洽'
  },
  {
    id: 'cups03',
    image: cups03,
    name: 'Three of Cups',
    upright: '友誼、慶祝、協作、社交、團隊合作',
    reversed: '過度放縱、排除在外、疏離、破裂的友誼'
  },
  {
    id: 'cups04',
    image: cups04,
    name: 'Four of Cups',
    upright: '沉思、冥想、無動於衷、重新評估',
    reversed: '新希望、接受變化、行動起來'
  },
  {
    id: 'cups05',
    image: cups05,
    name: 'Five of Cups',
    upright: '失落、遺憾、悲傷、失望、悔恨',
    reversed: '接受損失、向前看、寬恕自己'
  }
];

export default function CardInfo() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredCards, setFilteredCards] = React.useState(cardData);
  
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = cardData.filter(card => 
      card.name.toLowerCase().includes(value.toLowerCase()) || 
      card.upright.toLowerCase().includes(value.toLowerCase()) ||
      card.reversed.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCards(filtered);
  };
  
  return (
    <Row justify="center" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '94px', paddingBottom: '40px' }}>
      <Col xs={23} sm={22} md={20} lg={18} xl={16}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)', textAlign: 'center' }}>
            {t('cardInfo.title')}
          </Title>
          
          <Search 
            placeholder="搜尋牌名或關鍵字" 
            allowClear
            enterButton
            size="large"
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            onSearch={handleSearch}
            style={{ maxWidth: '500px', margin: '0 auto 20px', display: 'block' }}
          />
          
          <List
            grid={{ 
              gutter: 24,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3
            }}
            dataSource={filteredCards}
            renderItem={card => (
              <List.Item>
                <Card 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={8}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardItem src={card.image} isReversed={false} />
                      </div>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Title level={4}>{card.name}</Title>
                        
                        <Text strong>{t('cardInfo.upright')}:</Text>
                        <Text>{card.upright}</Text>
                        
                        <Text strong style={{ marginTop: '10px' }}>{t('cardInfo.reversed')}:</Text>
                        <Text>{card.reversed}</Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </List.Item>
            )}
          />
        </Space>
      </Col>
    </Row>
  );
}