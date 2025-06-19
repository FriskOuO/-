import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang); // 儲存語言設定
  };

  return (
    <Space>
      <GlobalOutlined />
      <Button 
        type={i18n.language === 'en' ? 'primary' : 'default'} 
        size="small" 
        onClick={() => changeLanguage('en')}
      >
        {t('language.en')}
      </Button>
      <Button 
        type={i18n.language === 'zh' ? 'primary' : 'default'} 
        size="small" 
        onClick={() => changeLanguage('zh')}
      >
        {t('language.zh')}
      </Button>
    </Space>
  );
}