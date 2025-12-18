import React from 'react';
import './FeaturesQuick.css';

function FeaturesQuick() {
  return (
    <section className="features-quick" aria-label="Destaques do Lemify">
      <div className="container px-1">
        <div className="f-item">
          <div className="f-icon" aria-hidden="true">
            <img className="f-icon-img" src="https://img.icons8.com/?size=100&id=NiUK2P9f8dIx&format=png&color=000000" alt="" loading="lazy" />
          </div>
          <h3 className="f-title">Atendimento unificado</h3>
          <p className="f-desc">Reúna WhatsApp, Instagram e mais em uma caixa de entrada com histórico completo.</p>
        </div>
        <div className="f-item">
          <div className="f-icon" aria-hidden="true">
            <img className="f-icon-img" src="https://img.icons8.com/?size=100&id=Wf7yEOoqKwjo&format=png&color=000000" alt="" loading="lazy" />
          </div>
          <h3 className="f-title">Automação inteligente</h3>
          <p className="f-desc">Automatize mensagens, gatilhos e distribuição de tickets para manter o time produtivo nos picos.</p>
        </div>
        <div className="f-item">
          <div className="f-icon" aria-hidden="true">
            <img className="f-icon-img" src="https://img.icons8.com/?size=100&id=ixXlHAhB5qQ3&format=png&color=000000" alt="" loading="lazy" />
          </div>
          <h3 className="f-title">Gestão e insights</h3>
          <p className="f-desc">Monitore filas, produtividade e satisfação em tempo real — do primeiro contato à venda.</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesQuick;
