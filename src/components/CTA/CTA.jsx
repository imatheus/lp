import React from 'react';
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
  primaryButtonText = 'Criar conta grátis',
  primaryButtonUrl = 'https://app.lemify.com.br/signup',
  secondaryButtonText = 'Falar com vendas',
  secondaryButtonUrl = 'https://wa.me/5511949802138',
  showSecondaryButton = true
}) {
  return (
    <section className={`cta cta-${variant}`}>
      <div className="container">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">{title}</h2>
            <p className="cta-text">{description}</p>
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
    </section>
  );
}

export default CTA;
