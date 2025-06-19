import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const items = [
    {
      key: 'en',
      label: 'English',
      onClick: () => changeLanguage('en'),
    },
    {
      key: 'zh',
      label: '中文',
      onClick: () => changeLanguage('zh'),
    }
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button className="language-button">
        <Space>
          <GlobalOutlined />
          {i18n.language === 'en' ? 'EN' : 'ZH'}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
}