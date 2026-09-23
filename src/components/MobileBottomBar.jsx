import React from 'react';
import { Home, Music, Volume2, Image as ImageIcon, UserPlus, MessageCircle } from 'lucide-react';

export default function MobileBottomBar({ onOpenRegister }) {
  return (
    <nav className="mobile-bottom-bar" aria-label="Мобильді навигация">
      <a href="#top" className="bottom-nav-item">
        <Home size={19} />
        <span>Басты</span>
      </a>

      <a href="#repertoire" className="bottom-nav-item">
        <Music size={19} />
        <span>Күйлер</span>
      </a>

      <a href="#tuner" className="bottom-nav-item">
        <Volume2 size={19} />
        <span>Бұрау</span>
      </a>

      <a href="#gallery" className="bottom-nav-item">
        <ImageIcon size={19} />
        <span>Галерея</span>
      </a>

      <button onClick={onOpenRegister} className="bottom-nav-item highlight-btn">
        <UserPlus size={19} />
        <span>Жазылу</span>
      </button>
    </nav>
  );
}
