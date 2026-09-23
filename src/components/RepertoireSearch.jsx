import React, { useState, useMemo, useEffect } from 'react';
import { Search, Copy, Check, ChevronDown, ChevronUp, BookOpen, Music, Users, Sparkles } from 'lucide-react';
import { getAllStudents, computeKuiStats, POPULAR_KUIS } from '../data/repertoireData';

export default function RepertoireSearch({ onShowToast }) {
  const [students, setStudents] = useState(() => getAllStudents());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [copied, setCopied] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);

  // Listen for newly added students
  useEffect(() => {
    const handleUpdate = () => {
      setStudents(getAllStudents());
    };
    window.addEventListener('qos_perne_repertoire_updated', handleUpdate);
    return () => window.removeEventListener('qos_perne_repertoire_updated', handleUpdate);
  }, []);

  const kuiStats = useMemo(() => computeKuiStats(students), [students]);

  // Search logic
  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return students.filter(student => {
      if (selectedGroup !== 'all' && student.group !== selectedGroup) return false;
      const matchesKui = student.repertoire.some(kui => kui.toLowerCase().includes(q));
      const matchesName = student.name.toLowerCase().includes(q) || 
                          (student.classGrade && student.classGrade.toLowerCase().includes(q));
      return matchesKui || matchesName;
    });
  }, [students, searchQuery, selectedGroup]);

  // Copy to clipboard
  const handleCopy = () => {
    if (filteredStudents.length === 0) return;
    const text = `Qos Perne — «${searchQuery}» бойынша қатысушылар (${filteredStudents.length} оқушы):\n\n` +
      filteredStudents.map((s, idx) => `${idx + 1}. ${s.name}${s.classGrade ? ` (${s.classGrade})` : ''} — ${s.group}`).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      onShowToast?.('Тізім алмасу буферіне көшірілді');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="section repertoire-section" id="repertoire">
      <div className="container">
        
        <div className="sec-header">
          <span className="eyebrow">Репертуар базасы • Репертуар и состав</span>
          <h2 className="sec-title">
            Күйлер мен <em>орындаушылар тізілімі</em>
          </h2>
          <p className="sec-sub">
            Клуб оқушыларының орындайтын күйлер қоры. Күйдің немесе оқушының 
            атын жазып іздеуге болады.
          </p>
        </div>

        <div className="rep-table-card card-white">
          {/* Top Search Bar */}
          <div className="rep-search-bar">
            <div className="rep-input-container">
              <Search className="rep-input-icon" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Күй немесе оқушы атын іздеу… мысалы: Адай, Сарыарқа, Джембай"
                className="input-field rep-input"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="input-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Тазарту"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="rep-pills-row">
            <span className="pills-title">Танымал күйлер:</span>
            <div className="pills-group">
              {POPULAR_KUIS.slice(0, 8).map(kui => (
                <button
                  key={kui}
                  type="button"
                  className={`chip-pill ${searchQuery.toLowerCase() === kui.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setSearchQuery(kui)}
                >
                  {kui}
                </button>
              ))}
            </div>
          </div>

          {/* Group Filter */}
          <div className="rep-groups-bar">
            <span className="pills-title">Топты таңдау:</span>
            <div className="pills-group">
              {[
                { id: 'all', label: 'Барлық қатысушылар' },
                { id: 'Үлкен топ', label: 'Үлкен топ (Сахналық)' },
                { id: 'Кіші топ', label: 'Кіші топ (Бастауыш)' }
              ].map(grp => (
                <button
                  key={grp.id}
                  type="button"
                  className={`tab-pill ${selectedGroup === grp.id ? 'active' : ''}`}
                  onClick={() => setSelectedGroup(grp.id)}
                >
                  {grp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="rep-results-wrap">
            {!searchQuery ? (
              <div className="rep-empty-state">
                <BookOpen size={24} color="#67a600" />
                <p>Іздеу жолағына күй атауын жазыңыз немесе жоғарыдағы танымал күйлерді басыңыз.</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="rep-empty-state">
                <p>«<strong>{searchQuery}</strong>» сұрауы бойынша нәтиже табылмады.</p>
              </div>
            ) : (
              <div>
                <div className="rep-results-header">
                  <span className="rep-results-count">
                    Табылды: <strong>{filteredStudents.length}</strong> оқушы
                  </span>
                  <button onClick={handleCopy} className="btn btn-secondary btn-sm">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Көшірілді' : 'Тізімді көшіру'}</span>
                  </button>
                </div>

                <div className="rep-table">
                  <div className="rep-thead">
                    <span className="th-num">№</span>
                    <span className="th-name">Оқушының аты-жөні</span>
                    <span className="th-class">Сыныбы</span>
                    <span className="th-group">Тобы</span>
                    <span className="th-kuis">Репертуары</span>
                  </div>

                  <div className="rep-tbody">
                    {filteredStudents.map((student, idx) => (
                      <div key={`${student.name}-${idx}`} className="rep-trow">
                        <span className="td-num">{idx + 1}</span>
                        <strong className="td-name">{student.name}</strong>
                        <span className="td-class">{student.classGrade || '—'}</span>
                        <span className="td-group">
                          <span className="badge-soft">{student.group}</span>
                        </span>
                        <span className="td-kuis">
                          {student.repertoire.slice(0, 4).join(', ')}
                          {student.repertoire.length > 4 && (
                            <span className="text-muted"> (+{student.repertoire.length - 4})</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Kui Catalog Accordion Toggle */}
          <div className="rep-catalog-wrap">
            <button
              type="button"
              className="rep-catalog-toggle-btn"
              onClick={() => setShowCatalog(!showCatalog)}
            >
              <div className="toggle-left">
                <Music size={18} color="#67a600" />
                <span>Барлық ресми күйлер қоры ({kuiStats.length} күй)</span>
              </div>
              {showCatalog ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {showCatalog && (
              <div className="rep-catalog-grid">
                {kuiStats.map((kui) => (
                  <button
                    type="button"
                    key={kui.title}
                    className="catalog-pill-item"
                    onClick={() => setSearchQuery(kui.title)}
                  >
                    <span className="kui-pill-title">{kui.title}</span>
                    <span className="kui-pill-count">{kui.count} орындаушы</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
