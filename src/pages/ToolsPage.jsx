import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Volume2, Sparkles, UserPlus } from 'lucide-react';
import RepertoireSearch from '../components/RepertoireSearch';
import DombraTuner from '../components/DombraTuner';

export default function ToolsPage({ onNavigateHome, onShowToast, onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('repertoire'); // 'repertoire' | 'tuner' | 'all'

  return (
    <div className="tools-page">
      {/* Top Bar Navigation */}
      <div className="tools-top-bar">
        <div className="container">
          <div className="tools-bar-inner">
            <button
              type="button"
              className="btn btn-secondary btn-sm tools-back-btn"
              onClick={onNavigateHome}
            >
              <ArrowLeft size={16} />
              <span>Басты бетке қайту</span>
            </button>

            <div className="tools-bar-title-wrap">
              <span className="tools-bar-tag">Домбыра порталы</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Page Hero */}
      <div className="tools-hero">
        <div className="container">
          <div className="tools-hero-content">
            <span className="eyebrow">
              <Sparkles size={14} />
              <span>Qos Perne • Арнайы құралдар мен база</span>
            </span>
            <h1 className="tools-hero-title">
              Репертуар қоры және <em>сандық домбыра тюнері</em>
            </h1>
            <p className="tools-hero-desc">
              Назарбаев Зияткерлік мектебі оқушыларының орындайтын күйлер тізілімі, 
              іздеу жүйесі және табиғи бұрау жиілігімен дыбысталатын домбыра тюнері.
            </p>

            {/* Tab Switcher Pills */}
            <div className="tools-tab-switcher">
              <button
                type="button"
                className={`tools-tab-btn ${activeTab === 'repertoire' ? 'active' : ''}`}
                onClick={() => setActiveTab('repertoire')}
              >
                <BookOpen size={16} />
                <span>Репертуар қоры</span>
              </button>

              <button
                type="button"
                className={`tools-tab-btn ${activeTab === 'tuner' ? 'active' : ''}`}
                onClick={() => setActiveTab('tuner')}
              >
                <Volume2 size={16} />
                <span>Домбыра тюнері</span>
              </button>

              <button
                type="button"
                className={`tools-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <span>Барлығы бірге</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab 1: Repertoire Search & Database */}
      {(activeTab === 'repertoire' || activeTab === 'all') && (
        <div className="tools-section-block">
          <RepertoireSearch onShowToast={onShowToast} />
        </div>
      )}

      {/* Tab 2: Interactive Dombra Tuner */}
      {(activeTab === 'tuner' || activeTab === 'all') && (
        <div className="tools-section-block">
          <DombraTuner />
        </div>
      )}

      {/* Bottom CTA to add kuys on main page */}
      <div className="tools-bottom-cta">
        <div className="container">
          <div className="card-white tools-cta-card">
            <div className="tools-cta-info">
              <strong className="tools-cta-title">Өз күйлеріңізді базаға қосқыңыз келе ме?</strong>
              <p className="tools-cta-desc">
                Басты бетте арнайы пішін арқылы аты-жөніңіз бен білетін күйлеріңізді 
                жазып қалдырыңыз — ол бірден осы репертуар базасына қосылады!
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={onNavigateHome}
            >
              <span>Басты бетке өтіп, күй қосу</span>
              <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
