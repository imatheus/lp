import React, { useState, useEffect } from 'react';
import './Header.css';

function Header({ scrolled }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['features', 'plans', 'faq'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      // Se não está em nenhuma seção, limpa o active
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica posição inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <a href="/" className="header-brand">
          <img src="/logo.png" alt="Lemify" className="header-logo" />
        </a>

        <nav className="header-nav">
          <a
            href="#"
            className={activeSection === '' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveSection(''); }}
          >
            Início
          </a>
          <a
            href="#features"
            className={activeSection === 'features' ? 'active' : ''}
            onClick={(e) => handleClick(e, 'features')}
          >
            Recursos
          </a>
          <a
            href="#plans"
            className={activeSection === 'plans' ? 'active' : ''}
            onClick={(e) => handleClick(e, 'plans')}
          >
            Planos
          </a>
          <a
            href="#faq"
            className={activeSection === 'faq' ? 'active' : ''}
            onClick={(e) => handleClick(e, 'faq')}
          >
            FAQ
          </a>
        </nav>

        <div className="header-actions">
          <a className="btn btn-outline" href="https://app.lemify.com.br/login">
            Entrar
          </a>
          <a className="btn btn-primary" href="https://app.lemify.com.br/signup">
            Cadastre-se
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
