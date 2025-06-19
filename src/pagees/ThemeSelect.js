import React from 'react';
import { Button, Typography, Space, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeartOutlined, CompassOutlined, MedicineBoxOutlined, QuestionOutlined } from '@ant-design/icons';
import { useTarot } from '../context/TarotContext';

const { Title } = Typography;

export default function ThemeSelect() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setTheme } = useTarot();
  
  const handleThemeSelect = (theme) => {
    setTheme(theme);
    navigate('/count');
  };
  
  const themes = [
    { key: 'love', icon: <HeartOutlined style={{ fontSize: '32px' }} /> },
    { key: 'career', icon: <CompassOutlined style={{ fontSize: '32px' }} /> },
    { key: 'health', icon: <MedicineBoxOutlined style={{ fontSize: '32px' }} /> },
    { key: 'other', icon: <QuestionOutlined style={{ fontSize: '32px' }} /> }
  ];
  
  return (
    <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '84px' }}>
      <Col xs={22} sm={20} md={18} lg={16} xl={14}>
        <Space direction="vertical" size="large" align="center" style={{ width: '100%' }}>
          <Title level={2} style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {t('theme.title')}
          </Title>
          
          <Row gutter={[16, 16]} justify="center">
            {themes.map(theme => (
              <Col xs={12} sm={12} md={6} key={theme.key}>
                <Card 
                  hoverable
                  style={{ 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '10px'
                  }}
                  onClick={() => handleThemeSelect(theme.key)}
                >
                  <Space direction="vertical" size="small">
                    {theme.icon}
                    <Title level={4}>{t(`theme.${theme.key}`)}</Title>
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