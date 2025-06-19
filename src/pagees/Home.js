// Home.jsx
import React, { useEffect } from 'react';
import { Button, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo_mystic_tarot.png';
import { useTarot } from '../context/TarotContext';
import './Home.css';

const { Title } = Typography;

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetReading } = useTarot();
  
  const startReading = () => {
    resetReading(); // 重置先前的占卜資料
    navigate('/theme');
  };
  
  // 添加頁面載入時的動畫效果
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.home-container').classList.add('fade-in');
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={logo} alt="Mystic Tarot Logo" className="home-logo" />
        <Title level={1} className="home-title">
          {t('app.title')}
        </Title>
        <Button 
          type="primary" 
          size="large" 
          onClick={startReading}
          className="start-button"
        >
          {t('app.start')}
        </Button>
      </div>
    </div>
  );
}
