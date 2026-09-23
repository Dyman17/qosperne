import React, { useState } from 'react';
import { Menu, X, MessageCircle, UserPlus } from 'lucide-react';

const WHATSAPP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function Header({ onOpenRegister, currentPage = 'home', onNavigateHome, onNavigateToRepertoire }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    closeMenu();

    if (currentPage !== 'home') {
      onNavigateHome?.();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToolsClick = (e) => {
    e.preventDefault();
    closeMenu();
    onNavigateToRepertoire?.();
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    closeMenu();
    onNavigateHome?.();
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-container">
          {/* Dual Logos (Qos Perne + NIS) */}
          <a href="/" className="nav-brand" onClick={handleHomeClick}>
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
            <a href="/" onClick={handleHomeClick} className={currentPage === 'home' ? 'active-link' : ''}>
              Басты бет
            </a>
            <a href="#join" onClick={(e) => handleNavClick(e, 'join')}>
              Клубқа қосылу
            </a>
            <a href="#submit-repertoire" onClick={(e) => handleNavClick(e, 'submit-repertoire')}>
              Күй қосу
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
              Біз туралы
            </a>
            <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')}>
              Жетістіктер
            </a>
            <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>
              Галерея
            </a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
              Сұрақ-жауап
            </a>
            <a
              href="/repertoire"
              className={`nav-tools-pill ${currentPage === 'repertoire' ? 'active' : ''}`}
              onClick={handleToolsClick}
            >
              <span>Репертуар мен Тюнер</span>
              <span className="badge-dot" />
            </a>
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
          <a href="/" onClick={handleHomeClick}>
            Басты бет
          </a>
          <a
            href="/repertoire"
            onClick={handleToolsClick}
            className="drawer-highlight-link"
          >
            🎵 Репертуар базасы мен Тюнер ↗
          </a>
          <a href="#submit-repertoire" onClick={(e) => handleNavClick(e, 'submit-repertoire')}>
            ✍️ Өз күйіңді базаға қос
          </a>
          <a href="#join" onClick={(e) => handleNavClick(e, 'join')}>
            Клубқа жазылу
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
            Біз туралы
          </a>
          <a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')}>
            Жетістіктер
          </a>
          <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>
            Галерея
          </a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>
            Сұрақ-жауап
          </a>
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
