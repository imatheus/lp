import React, { useState, useEffect } from 'react';
import { HiCheck, HiXMark, HiChevronDown } from 'react-icons/hi2';
import { PiRocketLaunch, PiCalendarCheck } from 'react-icons/pi';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';
import './Plans.css';

// Planos fallback (caso a API falhe)
const FALLBACK_PLANS = [
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
  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [loading, setLoading] = useState(true);

  // Buscar planos da API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://app.lemify.com.br/api/plans');
        if (response.ok) {
          const data = await response.json();
          // Ordenar por valor e pegar apenas os 3 principais (ou ajustar conforme necessário)
          const sortedPlans = data
            .filter(p => p.isPublic !== false) // Filtrar planos públicos
            .sort((a, b) => a.value - b.value)
            .slice(0, 3);
          if (sortedPlans.length > 0) {
            setPlans(sortedPlans);
          }
        }
      } catch (error) {
        console.log('Usando planos fallback:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

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
      <div className="plans-wrapper">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-lg">Comece simples, cresça com o Lemify</h2>
            <p className="text-lg">
              Planos criados para se adaptar ao tamanho do seu time.
            </p>
          </div>

          <div className="plans-grid">
            {plans.map((plan, index) => {
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

                  <ul className="plan-features">
                    {/* Canais com ícones */}
                    <li className="plan-feature">
                      <HiCheck className="plan-feature-icon plan-feature-icon--check" />
                      <span className="plan-feature-channels">
                        {plan.connections} {plan.connections === 1 ? 'Canal' : 'Canais'}
                        <span className="plan-channel-icons">
                          {plan.useWhatsapp && <FaWhatsapp title="WhatsApp" className="channel-icon channel-icon--whatsapp" />}
                          {plan.useInstagram && <FaInstagram title="Instagram" className="channel-icon channel-icon--instagram" />}
                          {plan.useFacebook && <FaFacebook title="Facebook" className="channel-icon channel-icon--facebook" />}
                          {plan.useMeli && <SiMercadopago title="Mercado Livre" className="channel-icon channel-icon--meli" />}
                        </span>
                      </span>
                    </li>

                    {/* Usuários */}
                    <li className="plan-feature">
                      <HiCheck className="plan-feature-icon plan-feature-icon--check" />
                      <span>{plan.users} {plan.users === 1 ? 'Atendente' : 'Atendentes'}</span>
                    </li>

                    {/* Filas */}
                    <li className="plan-feature">
                      <HiCheck className="plan-feature-icon plan-feature-icon--check" />
                      <span>{plan.queues} {plan.queues === 1 ? 'Fila' : 'Filas'} de atendimento</span>
                    </li>

                    {/* Recursos com check/x */}
                    <li className={`plan-feature ${!plan.useCampaigns ? 'plan-feature--disabled' : ''}`}>
                      {plan.useCampaigns ? <HiCheck className="plan-feature-icon plan-feature-icon--check" /> : <HiXMark className="plan-feature-icon plan-feature-icon--x" />}
                      <span>Campanhas</span>
                    </li>

                    <li className={`plan-feature ${!plan.useScheduler ? 'plan-feature--disabled' : ''}`}>
                      {plan.useScheduler ? <HiCheck className="plan-feature-icon plan-feature-icon--check" /> : <HiXMark className="plan-feature-icon plan-feature-icon--x" />}
                      <span>Agendamentos</span>
                    </li>

                    <li className={`plan-feature ${!plan.useChatbotFlows ? 'plan-feature--disabled' : ''}`}>
                      {plan.useChatbotFlows ? <HiCheck className="plan-feature-icon plan-feature-icon--check" /> : <HiXMark className="plan-feature-icon plan-feature-icon--x" />}
                      <span>Chatbot</span>
                    </li>

                    <li className={`plan-feature ${!plan.useInternalchat ? 'plan-feature--disabled' : ''}`}>
                      {plan.useInternalchat ? <HiCheck className="plan-feature-icon plan-feature-icon--check" /> : <HiXMark className="plan-feature-icon plan-feature-icon--x" />}
                      <span>Chat Interno</span>
                    </li>

                    {plan.useLemiAI && (
                      <li className="plan-feature">
                        <HiCheck className="plan-feature-icon plan-feature-icon--check" />
                        <span>Lemi AI</span>
                      </li>
                    )}
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
                            <PiRocketLaunch className="plan-dropdown-icon" />
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
                            <PiCalendarCheck className="plan-dropdown-icon" />
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
      </div>
    </section>
  );
}

export default Plans;
