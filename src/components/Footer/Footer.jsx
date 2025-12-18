import React from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">Lemify</div>
            <p className="footer-tagline">
              Plataforma de atendimento unificado. Conecte todos os seus canais,
              automatize processos e encante seus clientes.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/pepchat" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com/company/pepchat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="https://wa.me/5511949802138" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div className="footer-links">
            <div className="footer-links-title">Produto</div>
            <a href="#features">Recursos</a>
            <a href="#plans">Planos e preços</a>
            <a href="#faq">FAQ</a>
            <a href="https://app.pepchat.com.br/signup">Criar conta</a>
          </div>

          {/* Empresa */}
          <div className="footer-links">
            <div className="footer-links-title">Empresa</div>
            <a href="#">Sobre nós</a>
            <a href="#">Blog</a>
            <a href="#">Carreiras</a>
            <a href="mailto:contato@pepchat.com.br">Contato</a>
          </div>

          {/* Suporte */}
          <div className="footer-links">
            <div className="footer-links-title">Suporte</div>
            <a href="#">Central de ajuda</a>
            <a href="https://wa.me/5511949802138" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
            <a href="mailto:suporte@pepchat.com.br">Email de suporte</a>
            <a href="#">Status do sistema</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 Lemify. Todos os direitos reservados.
          </div>
          <div className="footer-legal">
            <a href="#">Termos de uso</a>
            <a href="#">Política de privacidade</a>
            <a href="#">LGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
