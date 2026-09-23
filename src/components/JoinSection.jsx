import React from 'react';
import { MessageCircle, UserPlus, ExternalLink, QrCode } from 'lucide-react';

const WHATSAPP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function JoinSection({ onOpenRegister }) {
  return (
    <section className="section section-alt join-section" id="join">
      <div className="container">
        
        <div className="join-container-card card-white">
          <div className="join-content-grid">
            
            {/* Left: Text & Actions */}
            <div className="join-text-side">
              <span className="eyebrow">Қосылу • Присоединиться</span>
              <h2 className="join-heading">
                Клубқа қалай <em>жазылуға болады?</em>
              </h2>
              <p className="join-description">
                Домбыра клубы мектептің барлық оқушыларына есігін айқара ашады. 
                Арнайы музыкалық білім немесе жеке аспап талап етілмейді. 
                Төмендегі батырма арқылы ресми WhatsApp тобымызға бірден өтіңіз 
                немесе онлайн өтінім қалдырыңыз.
              </p>

              <div className="join-buttons-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg join-wa-btn"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp тобына тікелей өту</span>
                  <ExternalLink size={15} />
                </a>

                <button 
                  onClick={onOpenRegister}
                  className="btn btn-secondary btn-lg join-reg-btn"
                >
                  <UserPlus size={18} />
                  <span>Онлайн өтінім беру</span>
                </button>
              </div>

              <div className="join-direct-link-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="join-direct-link"
                >
                  <span>Тікелей сілтеме: <strong>chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g</strong></span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Right: QR Code Clean White Card */}
            <div className="join-qr-side">
              <div className="join-qr-box">
                <div className="qr-image-wrapper">
                  <img src="/QR_code.png" alt="WhatsApp тобына QR код" className="qr-code-img" />
                </div>
                <div className="qr-text-info">
                  <strong className="qr-box-title">Камерамен сканерлеңіз</strong>
                  <p className="qr-box-sub">Смартфон камерасын бағыттап, бірден топқа қосылыңыз</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
