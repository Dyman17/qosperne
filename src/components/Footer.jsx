import React from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-main-grid">
          
          {/* Brand Column with Dual Logos */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-logos-dual">
                <img src="/qos_perne_logo.jpg" alt="Qos-Perne Logo" className="footer-logo-qp" />
                <img src="/logo_NIS.png" alt="NIS Logo" className="footer-logo-nis" />
              </div>
              <div className="footer-brand-titles">
                <strong className="footer-title">QOS PERNE</strong>
                <p className="footer-sub">Домбыра клубы • NIS</p>
              </div>
            </div>
            <p className="footer-desc">
              Назарбаев Зияткерлік мектебінің ресми домбыра үйірмесі және ансамблі. 
              Қос ішек пен киелі күй өнерін ұрпаққа жеткізуші мектеп қауымдастығы.
            </p>
            <div className="footer-motto">
              <span>«Қос перне • Қос ішек • Бір жүрек»</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Бөлімдер</h4>
            <div className="footer-nav-list">
              <a href="#about">Біз туралы</a>
              <a href="#achievements">Жетістіктер</a>
              <a href="#repertoire">Репертуар қоры</a>
              <a href="#gallery">Сахна сәттері</a>
              <a href="#faq">Сұрақ-жауап</a>
              <a href="#join">Клубқа қосылу</a>
            </div>
          </div>

          {/* Contacts & School Info */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Байланыс пен мекенжай</h4>
            <p className="footer-contact-text">
              <strong>Мектеп:</strong> Назарбаев Зияткерлік мектебі<br />
              <strong>Өтетін орны:</strong> Акт залы / Музыка кабинеті<br />
              <strong>Дайындық уақыты:</strong> Сабақтан кейінгі қосымша білім беру кестесі бойынша
            </p>
            
            <div className="footer-actions-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp тобы</span>
              </a>

              <button 
                onClick={scrollToTop} 
                className="btn btn-secondary btn-sm" 
                title="Жоғарыға көтерілу"
              >
                <ArrowUp size={15} />
                <span>Жоғарыға ↑</span>
              </button>
            </div>
          </div>

        </div>

        <div className="footer-divider-line" />

        <div className="footer-bottom-bar">
          <p className="copy-text">
            © {new Date().getFullYear()} Qos Perne. Назарбаев Зияткерлік мектебінің домбыра клубы. Барлық құқықтар қорғалған.
          </p>
          <p className="legal-text">
            Сайт NIS корпоративтік стиль стандарты негізінде әзірленген.
          </p>
        </div>
      </div>
    </footer>
  );
}
