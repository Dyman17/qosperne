import React from 'react';
import { MessageCircle, UserPlus, ArrowRight } from 'lucide-react';

const WHATSAPP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function Hero({ onOpenRegister }) {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-container">
        
        {/* Editorial Text Content (Left-aligned) */}
        <div className="hero-content">
          <div className="hero-eyebrow-row">
            <span className="eyebrow">Назарбаев Зияткерлік мектебі • Qos Perne</span>
            <span className="hero-motto-tag">Қос перне • Қос ішек • Бір жүрек</span>
          </div>

          <h1 className="hero-title">
            Домбыра клубы және мектептік <span className="text-brand">күй ансамблі</span>
          </h1>

          <p className="hero-lead">
            Қазақтың төл өнерін дәріптейтін мектеп қауымдастығы. Біз күй өнерін 
            нөлден үйретіп қана қоймай, мектепішілік және салтанатты сахналарда 
            өнер көрсететін біртұтас домбырашылар құрамын дайындаймыз.
          </p>

          <div className="hero-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <MessageCircle size={18} />
              <span>WhatsApp арқылы жазылу</span>
            </a>

            <button onClick={onOpenRegister} className="btn btn-secondary btn-lg">
              <UserPlus size={18} />
              <span>Онлайн өтінім беру</span>
            </button>
          </div>
        </div>

        {/* Crisp Wide Club Photo Banner - Placed UNDER text without dark veil */}
        <div className="hero-banner-wrap">
          <div className="hero-banner-frame">
            <img 
              src="/images/main.jpeg" 
              alt="Qos Perne домбыра ансамблі" 
              className="hero-banner-img"
            />
            <div className="hero-banner-caption">
              <strong>Qos Perne ансамблі</strong>
              <span>Мектеп сахнасындағы жалпы құрамның өнер көрсетуі</span>
            </div>
          </div>
        </div>

        {/* Key Numbers and Facts Bar (Цифры и факты) */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <strong className="stat-num">40+</strong>
            <span className="stat-label">Қатысушы оқушылар</span>
            <small className="stat-desc">Үлкен және Кіші топ құрамы</small>
          </div>

          <div className="stat-card">
            <strong className="stat-num">30+</strong>
            <span className="stat-label">Күй репертуары</span>
            <small className="stat-desc">Төкпе және шертпе дәстүрі</small>
          </div>

          <div className="stat-card">
            <strong className="stat-num">2 топ</strong>
            <span className="stat-label">Оқыту деңгейі</span>
            <small className="stat-desc">Бастауыш және сахналық топ</small>
          </div>

          <div className="stat-card">
            <strong className="stat-num">100%</strong>
            <span className="stat-label">Мектеп базасы</span>
            <small className="stat-desc">Домбыралармен тегін қамту</small>
          </div>
        </div>

      </div>
    </section>
  );
}
