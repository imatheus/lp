import React from 'react';
import cardx from '../../assets/cardx.png';
import cardy from '../../assets/cardy.png';
import cardz from '../../assets/cardz.png';
import './Showcase.css';

function Showcase() {
  return (
    <section className="showcase">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-lg">Funcionalidades que resolvem de verdade</h2>
          <p className="text-lg">
            Do primeiro contato à conversão, cada detalhe pensado para otimizar seu atendimento.
          </p>
        </div>
        
        <div className="showcase-grid">
          {/* Card 1 - IA */}
          <div className="showcase-card showcase-card--light">
            <div className="showcase-content">
              <span className="showcase-badge">Inteligência Artificial</span>
              <h3 className="showcase-title">Atendimento rápido com IA</h3>
              <p className="showcase-desc">
                A IA do Lemify sugere respostas automáticas, identifica o sentimento da conversa 
                e ajuda seu time a responder mais rápido — sem perder o tom humano.
              </p>
            </div>
            <div className="showcase-image">
              <img src={cardx} alt="IA que entende e agiliza o atendimento" />
            </div>
          </div>
          
          {/* Card 2 - CRM */}
          <div className="showcase-card showcase-card--dark">
            <div className="showcase-content">
              <span className="showcase-badge">Gestão de vendas</span>
              <h3 className="showcase-title">CRM integrado</h3>
              <p className="showcase-desc">
                Organize e acompanhe oportunidades em um funil visual, do primeiro contato ao fechamento. 
                Mova cards entre etapas, registre notas e mantenha todo o histórico em um único lugar.
              </p>
            </div>
            <div className="showcase-image">
              <img src={cardz} alt="CRM e Pipeline integrados" />
            </div>
          </div>
          
          {/* Card 3 - Automações (full width) */}
          <div className="showcase-card showcase-card--accent showcase-card--full">
            <div className="showcase-content">
              <span className="showcase-badge">Produtividade</span>
              <h3 className="showcase-title">Fluxos e automações</h3>
              <p className="showcase-desc">
                Crie rotinas inteligentes para distribuição de tickets, respostas automáticas, 
                avaliação de atendimentos e muito mais. Menos tarefas manuais, mais tempo para o que importa.
              </p>
            </div>
            <div className="showcase-image">
              <img src={cardy} alt="Fluxos e automações" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;
