import React, { useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
import './FAQ.css';

const FAQ_ITEMS = [
  {
    q: 'O Lemify tem teste grátis? Preciso de cartão?',
    a: 'Sim! Você pode iniciar um teste grátis de 7 dias sem compromisso. Não pedimos cartão de crédito para começar. Depois do período de avaliação, você escolhe o plano que melhor atende sua necessidade.'
  },
  {
    q: 'Como funciona a integração com WhatsApp e Instagram?',
    a: 'O Lemify é compatível com integrações oficiais da Meta (WhatsApp Business API e Instagram). Você conecta seus canais em poucos cliques e centraliza todas as conversas em uma única plataforma, com histórico completo e atendimento unificado.'
  },
  {
    q: 'Posso começar em um plano e mudar depois?',
    a: 'Claro! Você pode fazer upgrade ou downgrade a qualquer momento. A cobrança é proporcional, então você paga apenas pelo que usar. Nossos planos são flexíveis para crescer junto com seu negócio.'
  },
  {
    q: 'Quais recursos de automação e CRM estão inclusos?',
    a: 'Todos os planos incluem: automação de mensagens, distribuição inteligente de tickets, funil de oportunidades, tarefas e histórico por contato. Em planos avançados, você tem acesso a chatbots personalizados, campanhas em massa e integrações via API.'
  },
  {
    q: 'E quanto ao suporte e migração de dados?',
    a: 'Oferecemos suporte durante toda a implantação, com materiais de ajuda e acompanhamento personalizado conforme seu plano. A migração de dados é assistida quando necessário, e seus dados são tratados com total segurança, seguindo as melhores práticas e a LGPD.'
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx));
  };

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="faq-grid">
          <div className="faq-intro">
            <h2 className="heading-lg">Perguntas frequentes</h2>
            <p className="text-lg">
              Tire suas dúvidas sobre o Lemify. Se não encontrar o que procura, fale com a gente.
            </p>

            <div className="faq-contact">
              <div className="faq-contact-title">Precisa de ajuda?</div>
              <p className="faq-contact-text">
                Nossa equipe está pronta para tirar suas dúvidas e ajudar na implantação.
              </p>
              <a
                href="https://wa.me/5511949802138"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div className="faq-list" role="list">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = idx === openIndex;
              const contentId = `faq-content-${idx}`;
              return (
                <div key={idx} className={`faq-item${isOpen ? ' open' : ''}`} role="listitem">
                  <button
                    type="button"
                    className="faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggle(idx)}
                  >
                    <span className="faq-question">{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <HiPlus size={18} />
                    </span>
                  </button>

                  <div className={`faq-collapse${isOpen ? ' open' : ''}`} id={contentId}>
                    <div className="faq-content">
                      <p className="faq-answer">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
