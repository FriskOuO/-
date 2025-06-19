// Home.jsx
import React from 'react';
import { Button, Typography, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo_mystic_tarot.png';
import { useTarot } from '../context/TarotContext';

const { Title } = Typography;

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetReading } = useTarot();
  
  const startReading = () => {
    resetReading(); // 重置先前的占卜資料
    navigate('/theme');
  };
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '64px' }}>
      <Col xs={22} sm={20} md={16} lg={12} xl={10} xxl={8}>
        <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
          <img src={logo} alt="Mystic Tarot Logo" style={{ width: '180px', marginBottom: '20px' }} />
          <Title level={1} style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {t('app.title')}
          </Title>
          <Button 
            type="primary" 
            size="large" 
            onClick={startReading}
            style={{ fontSize: '18px', height: 'auto', padding: '10px 40px' }}
          >
            {t('app.start')}
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
