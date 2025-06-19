import React, { useState, useEffect } from 'react';
import { Space, Select, Spin, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import useCards from '../hooks/useCards';
import CardThumbnail from '../components/CardThumbnail'; // 新的縮圖元件
import CardDetail from '../components/CardDetail'; // 新的詳細視圖元件
import SearchBar from '../components/SearchBar';
import './Cards.css';

const { Option } = Select;

export default function Cards() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [arcanaFilter, setArcanaFilter] = useState('all');
  const { cards, loading } = useCards();
  
  // 控制詳情模態框
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  // 多語搜尋功能
  const getFilteredCards = () => {
    if (!cards) return [];
    
    return cards.filter(card => {
      // 依據大小阿爾克那篩選
      if (arcanaFilter !== 'all' && card.arcana !== arcanaFilter) {
        return false;
      }
      
      // 如果沒有搜尋關鍵字，顯示所有符合大小阿爾克那的卡片
      if (!searchQuery) {
        return true;
      }
      
      const query = searchQuery.toLowerCase().trim();
      
      // 英文名稱搜尋
      const nameEnMatch = card.name && card.name.en && 
        card.name.en.toLowerCase().includes(query);
      
      // 中文名稱搜尋
      const nameZhMatch = card.name && card.name.zh && 
        card.name.zh.toLowerCase().includes(query);
      
      // 關鍵字搜尋 (英文)
      const keywordsEnMatch = card.keywords && card.keywords.en && 
        card.keywords.en.some(keyword => keyword.toLowerCase().includes(query));
      
      // 關鍵字搜尋 (中文)
      const keywordsZhMatch = card.keywords && card.keywords.zh && 
        card.keywords.zh.some(keyword => keyword.toLowerCase().includes(query));
      
      // 兼容不同的數據結構
      const alternativeNameMatch = typeof card.name === 'string' && 
        card.name.toLowerCase().includes(query);
        
      // 檢查牌號搜尋 (例如: "cups01" 或 "01" 或 "1")
      const cardNumberMatch = card.image && (
        card.image.toLowerCase().includes(query) ||
        (query.match(/^\d+$/) && card.image.match(/\d+/) && 
          card.image.match(/\d+/)[0].replace(/^0+/, '') === query.replace(/^0+/, ''))
      );
      
      return nameEnMatch || nameZhMatch || keywordsEnMatch || 
             keywordsZhMatch || alternativeNameMatch || cardNumberMatch;
    });
  };

  const filteredCards = getFilteredCards();
  
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  
  // 處理卡片點擊
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };
  
  // 關閉模態框
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="cards-container">
      <div className="cards-header">
        <h1 className="cards-title">{t('cards.allCards')}</h1>
        
        <div className="filter-container">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Select 
              defaultValue="all" 
              onChange={setArcanaFilter}
              className="arcana-filter"
            >
              <Option value="all">{t('cards.allArcana')}</Option>
              <Option value="major">{t('cards.majorArcana')}</Option>
              <Option value="minor">{t('cards.minorArcana')}</Option>
            </Select>
            
            <SearchBar onSearch={handleSearch} />
          </Space>
        </div>
      </div>
      
      <div className="cards-result-info">
        {!loading && (
          <p className="results-count">
            {t('cards.resultsCount', { count: filteredCards.length })}
          </p>
        )}
      </div>
      
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <div className="cards-grid-thumbnails">
          {filteredCards.length > 0 ? (
            filteredCards.map(card => (
              <CardThumbnail 
                key={card.id} 
                card={card} 
                onClick={() => handleCardClick(card)}
              />
            ))
          ) : (
            <div className="no-results">
              <p>{t('cards.noResults')}</p>
            </div>
          )}
        </div>
      )}
      
      {/* 卡片詳情模態框 */}
      <Modal
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        className="card-detail-modal"
        centered
      >
        {selectedCard && <CardDetail card={selectedCard} />}
      </Modal>
    </div>
  );
}