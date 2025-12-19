import React from 'react';
import { FiArrowDown } from 'react-icons/fi';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      {/* Background sólido */}
      <div className="hero-bg"></div>

      <div className="hero-content container">
        <span className="badge">Atendimento organizado e eficiente</span>
        <h1 className="heading-xl hero-title">
          Centralize atendimentos<br /> Acelere respostas<br /> <span className="highlight">Venda mais.</span>
        </h1>
        <p className="text-lg hero-subtitle">
          Conecte WhatsApp, Instagram, Facebook e outros canais em uma única plataforma feita para times que levam atendimento a sério.
        </p>
        <div className="hero-actions">
          <a href="#features" className="btn btn-secondary btn-lg">Funcionalidades <FiArrowDown size={22} /></a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
