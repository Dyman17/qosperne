import React, { useState } from 'react';
import { Menu, X, MessageCircle, UserPlus } from 'lucide-react';

const WHATSAPP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function Header({ onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="nav-container">
          {/* Dual Logos (Qos Perne + NIS) */}
          <a href="#top" className="nav-brand" onClick={closeMenu}>
            <div className="nav-brand-logos">
              <img src="/qos_perne_logo.jpg" alt="Qos-Perne Logo" className="brand-logo-qp" />
              <img src="/logo_NIS.png" alt="NIS Logo" className="brand-logo-nis" />
            </div>
            <div className="brand-info">
              <span className="brand-name">QOS PERNE</span>
              <span className="brand-tag">NIS • Домбыра клубы</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-links">
            <a href="#about">Біз туралы</a>
            <a href="#achievements">Жетістіктер</a>
            <a href="#repertoire">Репертуар</a>
            <a href="#tuner">Тюнер</a>
            <a href="#gallery">Галерея</a>
            <a href="#faq">Сұрақ-жауап</a>
            <a href="#join">Қосылу</a>
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="nav-actions">
            <button
              onClick={onOpenRegister}
              className="btn btn-secondary btn-sm nav-reg-btn"
            >
              <UserPlus size={15} />
              <span>Тіркелу</span>
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm nav-wa-btn"
              title="WhatsApp тобына өту"
            >
              <MessageCircle size={15} />
              <span className="nav-wa-text">WhatsApp</span>
            </a>
            <button
              className="nav-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Мәзір"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div 
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand">
            <img src="/qos_perne_logo.jpg" alt="Qos-Perne Logo" className="drawer-qp-logo" />
            <img src="/logo_NIS.png" alt="NIS Logo" className="drawer-nis-logo" />
            <div>
              <strong>QOS PERNE</strong>
              <small>NIS Домбыра клубы</small>
            </div>
          </div>
          <button className="drawer-close" onClick={closeMenu} aria-label="Жабу">
            <X size={20} />
          </button>
        </div>

        <nav className="drawer-nav">
          <a href="#about" onClick={closeMenu}>Біз туралы</a>
          <a href="#achievements" onClick={closeMenu}>Жетістіктер</a>
          <a href="#repertoire" onClick={closeMenu}>Репертуар қоры</a>
          <a href="#tuner" onClick={closeMenu}>Домбыра бұрау (Тюнер)</a>
          <a href="#gallery" onClick={closeMenu}>Галерея</a>
          <a href="#faq" onClick={closeMenu}>Сұрақ-жауап</a>
          <a href="#join" onClick={closeMenu}>Клубқа қосылу</a>
        </nav>

        <div className="drawer-footer">
          <button
            onClick={() => { closeMenu(); onOpenRegister(); }}
            className="btn btn-secondary btn-block"
            style={{ marginBottom: '10px' }}
          >
            <UserPlus size={16} />
            <span>Онлайн өтінім беру</span>
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block"
            onClick={closeMenu}
          >
            <MessageCircle size={16} />
            <span>WhatsApp тобына өту</span>
          </a>
        </div>
      </div>
    </>
  );
}
