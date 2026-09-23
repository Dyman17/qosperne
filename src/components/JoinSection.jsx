import React, { useState } from 'react';
import { MessageCircle, UserPlus, Copy, Check, QrCode } from 'lucide-react';

const WHATSAPP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function JoinSection({ onOpenRegister, onShowToast }) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(WHATSAPP_URL).then(() => {
      setCopiedLink(true);
      onShowToast?.('WhatsApp сілтемесі көшірілді');
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

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
                Төмендегі батырмалар арқылы біздің ресми WhatsApp тобымызға 
                қосылыңыз немесе онлайн өтінім қалдырыңыз.
              </p>

              <div className="join-buttons-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp тобына өту</span>
                </a>

                <button 
                  onClick={onOpenRegister}
                  className="btn btn-secondary btn-lg"
                >
                  <UserPlus size={18} />
                  <span>Онлайн өтінім беру</span>
                </button>
              </div>

              <div className="join-link-copy-row">
                <span className="join-link-label">Топ сілтемесі:</span>
                <code className="join-link-code">chat.whatsapp.com/FAgVLbx...</code>
                <button
                  onClick={handleCopyLink}
                  className="btn btn-secondary btn-sm copy-btn"
                  title="Сілтемені көшіру"
                >
                  {copiedLink ? <Check size={14} color="#67a600" /> : <Copy size={14} />}
                  <span>{copiedLink ? 'Көшірілді' : 'Көшіру'}</span>
                </button>
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
