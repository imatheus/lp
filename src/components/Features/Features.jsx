import React from 'react';
import { HiOutlineChatBubbleLeftRight, HiOutlineCpuChip, HiOutlineChartBar, HiOutlineUsers, HiOutlineBolt, HiOutlineShieldCheck } from 'react-icons/hi2';
import './Features.css';

const features = [
  {
    icon: <HiOutlineChatBubbleLeftRight size={28} color="#1C403B" />,
    title: 'Atendimento unificado',
    desc: 'Centralize WhatsApp, Instagram, Facebook Messenger e mais em uma única caixa de entrada com histórico completo de cada cliente.'
  },
  {
    icon: <HiOutlineCpuChip size={28} color="#1C403B" />,
    title: 'Automação inteligente',
    desc: 'Crie chatbots, respostas automáticas e fluxos de atendimento que funcionam 24/7, sem perder o toque humano.'
  },
  {
    icon: <HiOutlineChartBar size={28} color="#1C403B" />,
    title: 'Métricas e insights',
    desc: 'Acompanhe tempo de resposta, satisfação do cliente e produtividade do time em dashboards em tempo real.'
  },
  {
    icon: <HiOutlineUsers size={28} color="#1C403B" />,
    title: 'Gestão de equipe',
    desc: 'Distribua tickets automaticamente, defina filas de atendimento e monitore o desempenho de cada colaborador.'
  },
  {
    icon: <HiOutlineBolt size={28} color="#1C403B" />,
    title: 'CRM integrado',
    desc: 'Organize leads em funis visuais, registre notas e tarefas, e acompanhe cada oportunidade do primeiro contato à venda.'
  },
  {
    icon: <HiOutlineShieldCheck size={28} color="#1C403B" />,
    title: 'Segurança e LGPD',
    desc: 'Seus dados protegidos com criptografia, backup automático e total conformidade com a Lei Geral de Proteção de Dados.'
  }
];

function Features() {
  return (
    <section className="features section" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-lg">Tudo que você precisa para atender melhor</h2>
          <p className="text-lg">
            Funcionalidades pensadas para times que querem escalar sem perder qualidade.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
