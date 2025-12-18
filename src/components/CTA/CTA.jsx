import React from 'react';
import './CTA.css';

function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">
              Pronto para transformar seu atendimento?
            </h2>
            <p className="cta-text">
              Comece agora com 7 dias grátis. Sem cartão de crédito, sem compromisso. 
              Seu time vai agradecer.
            </p>
            <div className="cta-actions">
              <a 
                href="https://app.pepchat.com.br/signup" 
                className="btn btn-secondary btn-lg"
              >
                Criar conta grátis
              </a>
              <a 
                href="https://wa.me/5511949802138" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
              >
                Falar com vendas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
