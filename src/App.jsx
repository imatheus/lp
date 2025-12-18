import './App.css'
import '@xyflow/react/dist/style.css'
import React, { useEffect, useState } from 'react'

import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Features from './components/Features/Features.jsx'
import Showcase from './components/Showcase/Showcase.jsx'
import Plans from './components/Plans/Plans.jsx'
import FAQ from './components/FAQ/FAQ.jsx'
import CTA from './components/CTA/CTA.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const THRESH_ON = 50;
    const THRESH_OFF = 10;
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled(prev => (y > THRESH_ON ? true : y < THRESH_OFF ? false : prev));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch {}
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return () => {
      try {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto';
        }
      } catch {}
    };
  }, []);

  return (
    <div className="lp">
      <Header scrolled={scrolled} />
      <Hero />
      <Features />
      <Showcase />
      <Plans />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
