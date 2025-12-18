import React, { useEffect, useRef } from 'react';
import './PhaseOne.css';
import cardx from '../../assets/cardx.png';
import cardy from '../../assets/cardy.png';
import cardz from '../../assets/cardz.png';

function PhaseOne() {
  const boxXRef = useRef(null);
  const boxYRef = useRef(null);
  const boxZRef = useRef(null);

  useEffect(() => {
    const mediaQuery = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const amplitudeScale = mediaQuery && mediaQuery.matches ? 0.35 : 1; // respeita acessibilidade mas não desativa

    let ticking = false;

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    const updateParallax = () => {
      const vh = window.innerHeight || 1;
      const half = vh / 2;

      const applyOffset = (el, baseShift) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distanceFromCenter = center - half; // 0 quando o centro do elemento está no centro da viewport
        const norm = clamp(distanceFromCenter / half, -1, 1); // -1 topo, 0 centro, 1 bottom
        const offset = norm * baseShift * amplitudeScale; // desloca proporcionalmente, indo a 0 no centro
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      };

      const x = boxXRef.current;
      const y = boxYRef.current;
      const z = boxZRef.current;

      applyOffset(x, 100); // ajuste fino
      applyOffset(y, 30);
      applyOffset(z, 10); // direção oposta p/ profundidade
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
    };

    const raf = requestAnimationFrame(updateParallax);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('orientationchange', onScroll);
    window.addEventListener('load', onScroll);
    if (mediaQuery) {
      if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onScroll);
      else if (mediaQuery.addListener) mediaQuery.addListener(onScroll);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('orientationchange', onScroll);
      window.removeEventListener('load', onScroll);
      if (mediaQuery) {
        if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', onScroll);
        else if (mediaQuery.removeListener) mediaQuery.removeListener(onScroll);
      }
    };
  }, []);

  return (
    <section className="phase-one" aria-label="Primeira fase">
      <div className="container px-1">
        {/* <div className="phase-heading">
          <h2 className="heading-style-h3">Funcionalidades que resolvem de verdade</h2>
        </div> */}
        <div className="phase-grid">
          <div
            ref={boxXRef}
            className="box box-x"
            style={{
              background: 'transparent',
              border: '2px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '18px',
              willChange: 'transform',
              transition: 'transform 0.1s linear',
              transform: 'translate3d(0, 0px, 0)'
            }}
          >
            <h3 style={{ margin: 0, fontWeight: 700, color: 'var(--primary-strong)' }}>Atendimento rápido com IA</h3>
            <p style={{ margin: '8px 0 14px', lineHeight: 1.6, color: 'var(--muted)' }}>
              A IA do Lemify sugere respostas automáticas, identifica o sentimento da conversa e ajuda seu time a responder mais rápido — sem perder o tom humano.
            </p>
            <img src={cardx} alt="IA que entende e agiliza o atendimento" style={{ width: '100%', height: 'auto', borderRadius: 22, display: 'block' }} />
          </div>

          <div
            ref={boxYRef}
            className="box box-y"
            style={{
              background: 'var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '18px',
              willChange: 'transform',
              transition: 'transform 0.1s linear',
              transform: 'translate3d(0, 0px, 0)'
            }}
          >
            <h3 style={{ margin: 0, fontWeight: 700, color: 'var(--secondary)' }}>CRM integrado</h3>
            <div style={{ margin: '8px 0 14px' }}>
              <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--secondary) ' }}>
                Organize e acompanhe oportunidades em um funil visual, do primeiro contato ao fechamento.
                 Mova cards entre etapas com arrastar‑e‑soltar, registre notas, tarefas e responsáveis, e mantenha todo o histórico de interação em um único lugar.
              </p>
            </div>
            <img src={cardz} alt="CRM e Pipeline integrados" style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }} />
          </div>

          <div
            ref={boxZRef}
            className="box box-z"
            style={{
              background: 'var(--secondary)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'start',
              gap: '16px',
              padding: '18px',
              willChange: 'transform',
              transition: 'transform 0.1s linear',
              transform: 'translate3d(0, 0px, 0)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <h3 style={{ margin: 0, fontWeight: 700, color: 'var(--primary-strong)' }}>Fluxos e automações</h3>
              <p style={{ margin: '8px 0 14px', lineHeight: 1.6, color: 'var(--text)' }}>
                Crie rotinas inteligentes para distribuição de tickets, respostas automáticas, avaliação de atendimentos e muito mais.
                Menos tarefas manuais, mais tempo para o que importa.
              </p>
            </div>
            <div>
              <img src={cardy} alt="Fluxos e automações" style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhaseOne;
