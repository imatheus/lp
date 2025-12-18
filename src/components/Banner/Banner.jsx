import React, { useRef } from 'react';
import './Banner.css';
import SocialConnector from '../SocialConnector.jsx';

function Banner() {
  const bannerRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    // Desativar o efeito enquanto o mouse estiver sobre a sessão "Todos os seus canais em um só lugar"
    const sc = document.querySelector('.social-connector');
    if (sc && sc.contains(e.target)) return;
    const el = bannerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // posição do mouse dentro do banner
    const y = e.clientY - rect.top;
    const nx = (x / rect.width - 0.5) * 2;   // -1..1
    const ny = (y / rect.height - 0.5) * 2;  // -1..1
    const maxX = 40; // amplitude em px
    const maxY = 24; // amplitude em px
    el.style.setProperty('--blob-x', `${(nx * maxX).toFixed(1)}px`);
    el.style.setProperty('--blob-y', `${(ny * maxY).toFixed(1)}px`);
  };

  const handleMouseLeave = () => {
    const el = bannerRef.current;
    if (!el) return;
    el.style.setProperty('--blob-x', '0px');
    el.style.setProperty('--blob-y', '0px');
  };

  const resetBannerBlob = () => {
    const el = bannerRef.current;
    if (!el) return;
    el.style.setProperty('--blob-x', '0px');
    el.style.setProperty('--blob-y', '0px');
  };

  return (
    <section
      className="banner"
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container px-2">
        <div className="banner-top-glass">
          <div className="banner-card mx-auto">
            {/* Intro */}
            <div className="intro-wrapper">
              <div className="intro">
                <div className="text-align-center" id="js-pin">
                  <div className="-wimaxdth-small align-center">
                    <div className="banner-kicker ">Todos os seus canais em um só lugar</div>
                    <div className="margin-bottom margin-small">
                      <h1 className="heading-style-h1">Encante seus clientes com atendimento <span className="h-underline">unificado</span>.</h1>
                    </div>
                    <p className="text-size-medium">
                      Conecte WhatsApp e outros canais no Lemify para responder mais rápido, automatizar rotinas e manter um padrão de qualidade em todo o time.
                    </p>
                    <div className="cta">
                      <button className="btn btn-primary" type="button">Começar agora</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SocialConnector onInteract={resetBannerBlob} />
      </div>
    </section>
  );
}

export default Banner;
