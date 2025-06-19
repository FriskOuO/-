import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import './styles/global.css';
import { TarotProvider } from './context/TarotContext';
import Navbar from './components/Navbar';
import Home from './pagees/Home';
import ThemeSelect from './pagees/ThemeSelect';
import CardCountSelect from './pagees/CardCountSelect';
import ShuffleAndDraw from './pagees/ShuffleAndDraw';
import Result from './pagees/Result';
import CardInfo from './pagees/CardInfo';
import './i18n/i18n';

const { Content } = Layout;

function App() {
  return (
    <TarotProvider>
      <Router>
        <Layout className="app-layout">
          <Navbar />
          <Content className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/theme" element={<ThemeSelect />} />
              <Route path="/count" element={<CardCountSelect />} />
              <Route path="/draw" element={<ShuffleAndDraw />} />
              <Route path="/result" element={<Result />} />
              <Route path="/cards" element={<CardInfo />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </TarotProvider>
  );
}

export default App;
