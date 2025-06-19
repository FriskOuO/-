// CardItem.jsx
import React from 'react';
import './CardItem.css';

export default function CardItem({ src, isReversed }) {
  return (
    <img
      src={src}
      alt="tarot card"
      className={`card ${isReversed ? 'reversed' : ''}`}
    />
  );
}
