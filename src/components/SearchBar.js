import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="search-container">
      <div className="search-bar-wrapper">
        <Input
          className="search-input"
          placeholder={t('cards.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          allowClear
        />
        <Button 
          className="search-button" 
          onClick={handleSearch}
          aria-label="Search"
        >
          <SearchOutlined className="search-icon" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;