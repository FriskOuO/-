import React from 'react';
import { Button, Typography, Space, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTarot } from '../context/TarotContext';

const { Title, Text } = Typography;

export default function CardCountSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, setCardCount } = useTarot();
  
  // 如果尚未選擇主題，導回主題選擇頁
  React.useEffect(() => {
    if (!theme) {
      navigate('/theme');
    }
  }, [theme, navigate]);
  
  const handleCountSelect = (count) => {
    setCardCount(count);
    navigate('/draw');
  };
  
  const countOptions = [
    { count: 1, key: 'oneCard' },
    { count: 3, key: 'threeCards' },
    { count: 6, key: 'sixCards' }
  ];
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '84px' }}>
      <Col xs={22} sm={20} md={18} lg={16} xl={12}>
        <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
          <Title level={2} style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {t('count.title')}
          </Title>
          
          <Row gutter={[16, 16]} justify="center">
            {countOptions.map(option => (
              <Col xs={24} sm={8} key={option.key}>
                <Card 
                  hoverable
                  style={{ 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '10px'
                  }}
                  onClick={() => handleCountSelect(option.count)}
                >
                  <Space direction="vertical" size="small">
                    <Title level={2} style={{ margin: 0 }}>{option.count}</Title>
                    <Text strong>{t(`count.${option.key}`)}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Space>
      </Col>
    </Row>
  );
}