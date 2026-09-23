import React, { useState } from 'react';
import { Award, Trophy, MapPin, Calendar } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievementsData';

export default function Achievements() {
  const [filter, setFilter] = useState('all');

  const filteredAchievements = filter === 'all' 
    ? ACHIEVEMENTS 
    : ACHIEVEMENTS.filter(a => a.category.includes(filter));

  return (
    <section className="section section-alt achievements-section" id="achievements">
      <div className="container">
        
        <div className="sec-header">
          <span className="eyebrow">Жетістіктер мен сахна • Награды и сцена</span>
          <h2 className="sec-title">
            Біздің <em>сахналық жолымыз</em>
          </h2>
          <p className="sec-sub">
            Мектепішілік салтанаттар, мәдени сапарлар және ансамбльдің қатысуымен 
            өткен айтулы өнер көрсетулері.
          </p>

          {/* Filter Pills */}
          <div className="achieve-filters">
            <button
              type="button"
              className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Барлық сахналар
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filter === 'Халықаралық' ? 'active' : ''}`}
              onClick={() => setFilter('Халықаралық')}
            >
              Халықаралық сапар (Баку)
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${filter === 'Мектептік' ? 'active' : ''}`}
              onClick={() => setFilter('Мектептік')}
            >
              Winter Ball сахнасы
            </button>
          </div>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map((item) => (
            <article key={item.id} className="achieve-card card-white">
              {item.photo && (
                <div className="achieve-photo-wrap">
                  <img src={item.photo} alt={item.title} className="achieve-photo" loading="lazy" />
                  <span className="achieve-highlight-chip">{item.highlight}</span>
                </div>
              )}

              <div className="achieve-body">
                <div className="achieve-top-bar">
                  <span className="medal-pill">
                    <Trophy size={14} color="#67a600" />
                    <span>{item.place}</span>
                  </span>
                  <span className="achieve-cat-tag">{item.category}</span>
                </div>

                <h3 className="achieve-title">{item.title}</h3>
                <p className="achieve-desc">{item.description}</p>

                <div className="achieve-meta-row">
                  <span className="meta-item">
                    <MapPin size={14} color="#67a600" />
                    <span>{item.city}</span>
                  </span>
                  <span className="meta-item">
                    <Calendar size={14} color="#67a600" />
                    <span>{item.year}</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
