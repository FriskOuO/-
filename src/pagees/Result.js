import React, { useEffect } from 'react';
import { Button, Typography, Space, Row, Col, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeOutlined } from '@ant-design/icons';
import CardItem from '../components/CardItem';
import { useTarot } from '../context/TarotContext';

const { Title, Text } = Typography;

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

  // 安全檢查，確保只在有卡片時渲染
  if (!selectedCards || selectedCards.length === 0) {
    return <div>Loading...</div>;
  }

  // 獲取主題對應的文本
  const themeText = theme ? t(`theme.${theme}`) : '';
  
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
                {t('result.theme')}: {themeText}
              </Text>
              
              {selectedCards.map((card, index) => {
                // 安全檢查，確保卡片資料是有效的
                if (!card || !card.name) {
                  return <div key={index}>Invalid card data</div>;
                }
                
                // 獲取對應主題的牌義
                const meaningType = theme && card.meanings ? 
                  (card.isReversed ? card.meanings.reversed[theme] : card.meanings.upright[theme]) :
                  'No meaning available';
                
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
                          <Title level={4}>{card.name}</Title>
                          <Text strong>{card.isReversed ? t('result.reversed') : t('result.upright')}</Text>
                          <Text>{meaningType || 'No meaning available for this theme'}</Text>
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