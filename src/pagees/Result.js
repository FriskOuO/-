import React, { useEffect } from 'react';
import { Button, Typography, Space, Row, Col, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeOutlined } from '@ant-design/icons';
import CardItem from '../components/CardItem';
import { useTarot } from '../context/TarotContext';

const { Title, Text } = Typography;

// 模擬牌義資料（之後可替換為實際的牌義資料）
const cardMeanings = {
  cups01: {
    name: 'Ace of Cups',
    upright: '新的感情開始、愛、直覺、創造力、精神滿足',
    reversed: '情感封閉、錯失良機、負面情緒、自私'
  },
  cups02: {
    name: 'Two of Cups',
    upright: '和諧關係、愛情、合作、吸引力、結合',
    reversed: '失去平衡、分離、衝突、不融洽'
  },
  cups03: {
    name: 'Three of Cups',
    upright: '友誼、慶祝、協作、社交、團隊合作',
    reversed: '過度放縱、排除在外、疏離、破裂的友誼'
  },
  cups04: {
    name: 'Four of Cups',
    upright: '沉思、冥想、無動於衷、重新評估',
    reversed: '新希望、接受變化、行動起來'
  },
  cups05: {
    name: 'Five of Cups',
    upright: '失落、遺憾、悲傷、失望、悔恨',
    reversed: '接受損失、向前看、寬恕自己'
  },
  cups06: {
    name: 'Six of Cups',
    upright: '懷舊、童年回憶、純真、喜悅、禮物',
    reversed: '停滯在過去、天真、缺乏前瞻性'
  },
  cups07: {
    name: 'Seven of Cups',
    upright: '選擇、幻想、機會、夢想、幻覺',
    reversed: '現實、清晰的選擇、專注'
  },
  cups08: {
    name: 'Eight of Cups',
    upright: '放棄、前進、尋求更深層次的意義',
    reversed: '害怕變化、逃避責任、猶豫不決'
  },
  cups09: {
    name: 'Nine of Cups',
    upright: '滿足、幸福、願望成真、感恩',
    reversed: '過度放縱、空虛、物質主義'
  },
  cups10: {
    name: 'Ten of Cups',
    upright: '和諧、愛的關係、家庭、完美的結合',
    reversed: '破碎的家庭、缺乏和諧、不穩定的基礎'
  }
};

// 主題對應的文本
const themeTexts = {
  love: '愛情',
  career: '事業',
  health: '健康',
  other: '其他'
};

export default function Result() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, selectedCards } = useTarot();
  
  // 如果沒有選擇的牌，導回主頁
  useEffect(() => {
    if (!selectedCards || selectedCards.length === 0) {
      navigate('/');
    }
  }, [selectedCards, navigate]);
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '84px', paddingBottom: '40px' }}>
      <Col xs={22} sm={20} md={18} lg={16}>
        <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
          <Title level={2} style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {t('result.title')}
          </Title>
          
          <Card style={{ width: '100%', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Text strong style={{ fontSize: '18px' }}>
                {t('result.theme')}: {theme && t(`theme.${theme}`)}
              </Text>
              
              {selectedCards.map((card, index) => {
                const meaning = cardMeanings[card.id];
                return (
                  <div key={index}>
                    {index > 0 && <Divider />}
                    <Row gutter={[24, 16]} align="middle">
                      <Col xs={24} sm={8} md={6}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <CardItem src={card.image} isReversed={card.isReversed} />
                        </div>
                      </Col>
                      <Col xs={24} sm={16} md={18}>
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <Title level={4}>{meaning.name}</Title>
                          <Text strong>{card.isReversed ? t('result.reversed') : t('result.upright')}</Text>
                          <Text>{card.isReversed ? meaning.reversed : meaning.upright}</Text>
                        </Space>
                      </Col>
                    </Row>
                  </div>
                );
              })}
              
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<HomeOutlined />}
                  onClick={() => navigate('/')}
                >
                  {t('result.backToHome')}
                </Button>
              </div>
            </Space>
          </Card>
        </Space>
      </Col>
    </Row>
  );
}