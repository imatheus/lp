import React, { useState } from 'react';
import { HiCheck, HiXMark, HiChevronDown } from 'react-icons/hi2';
import './Plans.css';

// Planos estáticos (mesma estrutura da API)
const PLANS = [
  {
    id: 1,
    name: "Starter",
    users: 3,
    connections: 2,
    queues: 5,
    value: 97,
    slug: "starter",
    description: "Para pequenos negócios",
    useWhatsapp: true,
    useCampaigns: false,
    useMenu: false,
    useInstagram: false,
    useFacebook: false,
    useMeli: false,
    useScheduler: true,
    useChatbotFlows: false,
    useInternalchat: true,
    useLemiAI: false,
  },
  {
    id: 2,
    name: "Professional",
    users: 10,
    connections: 5,
    queues: 15,
    value: 197,
    slug: "professional",
    description: "Para times em crescimento",
    useWhatsapp: true,
    useCampaigns: true,
    useMenu: true,
    useInstagram: true,
    useFacebook: true,
    useMeli: false,
    useScheduler: true,
    useChatbotFlows: true,
    useInternalchat: true,
    useLemiAI: true,
  },
  {
    id: 3,
    name: "Enterprise",
    users: 30,
    connections: 15,
    queues: 50,
    value: 497,
    slug: "enterprise",
    description: "Para grandes operações",
    useWhatsapp: true,
    useCampaigns: true,
    useMenu: true,
    useInstagram: true,
    useFacebook: true,
    useMeli: true,
    useScheduler: true,
    useChatbotFlows: true,
    useInternalchat: true,
    useLemiAI: true,
  }
];

// Mapear os recursos do plano para exibição
const PLAN_FEATURES = [
  { key: 'useWhatsapp', label: 'WhatsApp' },
  { key: 'useInstagram', label: 'Instagram' },
  { key: 'useFacebook', label: 'Facebook' },
  { key: 'useMeli', label: 'Mercado Livre' },
  { key: 'useChatbotFlows', label: 'Chatbot' },
  { key: 'useLemiAI', label: 'Lemi AI' },
  { key: 'useScheduler', label: 'Agendamentos' },
  { key: 'useInternalchat', label: 'Chat Interno' },
  { key: 'useCampaigns', label: 'Campanhas' },
  { key: 'useMenu', label: 'Menu Interativo' },
];

function Plans() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const formatPrice = (value) => {
    if (value === 0) return 'Grátis';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleDropdown = (planId) => {
    setOpenDropdown(openDropdown === planId ? null : planId);
  };

  // Pegar recursos habilitados do plano
  const getEnabledFeatures = (plan) => {
    return PLAN_FEATURES.filter(feature => plan[feature.key] === true);
  };

  // Pegar recursos desabilitados do plano
  const getDisabledFeatures = (plan) => {
    return PLAN_FEATURES.filter(feature => plan[feature.key] === false);
  };

  return (
    <section className="plans section" id="plans">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-lg">Comece simples, cresça com o Lemify</h2>
          <p className="text-lg">
            Planos criados para se adaptar ao tamanho do seu time.
          </p>
        </div>

        <div className="plans-grid">
          {PLANS.map((plan, index) => {
            const isPopular = index === 1; // O do meio é o popular
            const isFree = plan.value === 0;
            const enabledFeatures = getEnabledFeatures(plan);
            const disabledFeatures = getDisabledFeatures(plan);

            return (
              <div
                key={plan.id}
                className={`plan-card ${isPopular ? 'plan-card--popular' : ''} ${isFree ? 'plan-card--free' : ''}`}
              >
                {isPopular && (
                  <div className="plan-badge">Mais popular</div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  {plan.description && (
                    <p className="plan-description">{plan.description}</p>
                  )}
                  <div className="plan-price">
                    {isFree ? (
                      <span className="plan-value plan-value--free">Grátis</span>
                    ) : (
                      <>
                        <span className="plan-currency">R$</span>
                        <span className="plan-value">{formatPrice(plan.value)}</span>
                        <span className="plan-period">/mês</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="plan-limits">
                  <div className="plan-limit">
                    <span className="plan-limit-value">{plan.users}</span>
                    <span className="plan-limit-label">usuários</span>
                  </div>
                  <div className="plan-limit">
                    <span className="plan-limit-value">{plan.connections}</span>
                    <span className="plan-limit-label">conexões</span>
                  </div>
                  <div className="plan-limit">
                    <span className="plan-limit-value">{plan.queues}</span>
                    <span className="plan-limit-label">filas</span>
                  </div>
                </div>

                <ul className="plan-features">
                  {/* Recursos habilitados */}
                  {enabledFeatures.map((feature) => (
                    <li key={feature.key} className="plan-feature">
                      <HiCheck className="plan-feature-icon plan-feature-icon--check" />
                      <span>{feature.label}</span>
                    </li>
                  ))}

                  {/* Recursos desabilitados */}
                  {disabledFeatures.map((feature) => (
                    <li key={feature.key} className="plan-feature plan-feature--disabled">
                      <HiXMark className="plan-feature-icon plan-feature-icon--x" />
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-actions">
                  <div
                    className="plan-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className={`btn ${isPopular ? 'btn-secondary' : 'btn-primary'} plan-btn`}
                      onClick={() => toggleDropdown(plan.id)}
                    >
                      {isFree ? 'Começar grátis' : 'Escolher plano'}
                      <HiChevronDown className={`plan-btn-icon ${openDropdown === plan.id ? 'open' : ''}`} />
                    </button>

                    {openDropdown === plan.id && (
                      <div className="plan-dropdown-menu">
                        <a
                          href={`https://app.lemify.com.br/signup?plan=${plan.slug}`}
                          className="plan-dropdown-item"
                        >
                          <span className="plan-dropdown-icon">🚀</span>
                          <div className="plan-dropdown-content">
                            <span className="plan-dropdown-title">Testar Grátis</span>
                            <span className="plan-dropdown-desc">7 dias sem compromisso</span>
                          </div>
                        </a>
                        <a
                          href={`https://wa.me/5511949802138?text=Olá! Gostaria de agendar uma demonstração do Lemify - Plano ${plan.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="plan-dropdown-item"
                        >
                          <span className="plan-dropdown-icon">📅</span>
                          <div className="plan-dropdown-content">
                            <span className="plan-dropdown-title">Agendar Demo</span>
                            <span className="plan-dropdown-desc">Fale com um especialista</span>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="plans-footer">
          <p className="plans-footer-text">
            Precisa de um plano customizado?
            <a href="https://wa.me/5511949802138" target="_blank" rel="noopener noreferrer">
              Fale com nosso time
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Plans;
