import React from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/images/logo_mystic_tarot.png';

const { Header } = Layout;

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 20px', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Link to="/">
            <img src={logo} alt="Mystic Tarot" style={{ height: '40px', marginRight: '10px' }} />
          </Link>
        </Col>
        <Col>
          <Row gutter={16} align="middle">
            <Col>
              <Link to="/cards">
                <Button type={location.pathname === '/cards' ? 'primary' : 'default'}>
                  {t('app.allCards')}
                </Button>
              </Link>
            </Col>
            <Col>
              <LanguageSwitcher />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}