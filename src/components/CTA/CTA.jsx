import React, { useEffect, useRef, useState } from 'react';
import './CTA.css';

/**
 * Componente CTA com 3 variantes:
 * - "primary" (padrão): Fundo verde escuro com texto branco
 * - "secondary": Fundo verde lima com texto escuro
 * - "outline": Fundo transparente com borda
 */
function CTA({
  variant = 'primary',
  title = 'Pronto para transformar seu atendimento?',
  description = 'Comece agora com 7 dias grátis. Sem cartão de crédito, sem compromisso. Seu time vai agradecer.',
  primaryButtonText = 'Testar 7 dias grátis',
  primaryButtonUrl = 'https://app.lemify.com.br/signup',
  secondaryButtonText = 'Falar com time de vendas',
  secondaryButtonUrl = 'https://wa.me/5511957839501',
  showSecondaryButton = true
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contato" className={`cta cta-${variant}`}>
      <div className="container">
        <div className={`cta-card-wrapper ${isVisible ? 'layers-converged' : ''}`}>
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Comece hoje. Veja resultados amanhã.</h2>
              <p className="cta-text">7 dias grátis para testar tudo. Sem burocracia, sem cartão. Cancele quando quiser.</p>
              <div className="cta-actions">
                <a
                  href={primaryButtonUrl}
                  className="btn btn-secondary btn-lg"
                >
                  {primaryButtonText}
                </a>
                {showSecondaryButton && (
                  <a
                    href={secondaryButtonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-lg"
                  >
                    {secondaryButtonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
