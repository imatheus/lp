import React, { useState, useEffect } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import './Hero.css';

const ROTATING_WORDS = [
  'Venda mais',
  'Converta mais',
  'Retenha clientes',
  'Fidelize',
  'Aumente resultados'
];

function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* Background sólido */}
      <div className="hero-bg"></div>

      <div className="hero-content container">
        <span className="badge">Organização e eficiência para seu time</span>
        <h1 className="heading-xl hero-title">
          Centralize seus canais de atendimento<br />
          <span className={`highlight ${isAnimating ? 'fade-slide-out' : 'fade-slide-in'}`}>
            {ROTATING_WORDS[currentWordIndex]}
          </span>
        </h1>
        <p className="text-lg hero-subtitle">
          WhatsApp, Instagram, Facebook e outros canais em um só lugar.
        </p>
        <div className="hero-actions">
          <a href="#features" className="btn btn-primary btn-lg">Funcionalidades <IoIosArrowDroprightCircle size={22} /></a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
