import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/images/logo_mystic_tarot_horizontal.png';
import './Navbar.css';

const { Header } = Layout;

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <Header className={`site-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="logo-container">
          <Link to="/" className="navbar-logo-link">
            <img src={logo} alt="Mystic Tarot" className="navbar-logo-horizontal" />
          </Link>
        </div>
        
        <div className="navbar-right">
          <Link to="/cards">
            <Button
              type={location.pathname === '/cards' ? 'primary' : 'default'}
              className="navbar-button"
            >
              {t('app.allCards')}
            </Button>
          </Link>
          <div className="language-switcher-container">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </Header>
  );
}