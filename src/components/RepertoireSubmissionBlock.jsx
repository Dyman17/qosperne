import React, { useState } from 'react';
import { UserCheck, Plus, X, Music, CheckCircle2, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { POPULAR_KUIS, addStudentToRepertoire } from '../data/repertoireData';

const GRADE_OPTIONS = [
  '7A', '7B', '7C', '7D', '7E',
  '8A', '8B', '8C', '8D', '8E',
  '9A', '9B', '9C', '9D', '9E',
  '10A', '10B', '10C', '10D', '10E',
  '11A', '11B', '11C', '11D', '11E',
  '12A', '12B', '12C', '12D', '12E'
];

export default function RepertoireSubmissionBlock({ onNavigateToRepertoire, onShowToast }) {
  const [name, setName] = useState('');
  const [classGrade, setClassGrade] = useState('9A');
  const [group, setGroup] = useState('Үлкен топ');
  const [selectedKuis, setSelectedKuis] = useState(['Адай', 'Балқадиша']);
  const [customKuiInput, setCustomKuiInput] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const togglePopularKui = (kui) => {
    if (selectedKuis.includes(kui)) {
      setSelectedKuis(selectedKuis.filter(k => k !== kui));
    } else {
      setSelectedKuis([...selectedKuis, kui]);
    }
  };

  const handleAddCustomKui = (e) => {
    e?.preventDefault();
    const trimmed = customKuiInput.trim();
    if (!trimmed) return;
    if (selectedKuis.some(k => k.toLowerCase() === trimmed.toLowerCase())) {
      onShowToast?.('Бұл күй тізімде бар');
      return;
    }
    setSelectedKuis([...selectedKuis, trimmed]);
    setCustomKuiInput('');
  };

  const removeKui = (kuiToRemove) => {
    setSelectedKuis(selectedKuis.filter(k => k !== kuiToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      alert('Өтінеміз, аты-жөніңізді жазыңыз');
      return;
    }

    if (selectedKuis.length === 0) {
      alert('Кемінде 1 күйді таңдаңыз немесе жазыңыз');
      return;
    }

    const newStudent = {
      name: cleanName,
      classGrade: classGrade,
      group: group,
      repertoire: selectedKuis
    };

    const success = addStudentToRepertoire(newStudent);
    if (success) {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#80c342', '#080341', '#25d366', '#ffffff']
      });

      setSubmittedData(newStudent);
      onShowToast?.(`«${cleanName}» репертуар базасына сәтті қосылды!`);
    }
  };

  const handleReset = () => {
    setName('');
    setClassGrade('9A');
    setGroup('Үлкен топ');
    setSelectedKuis(['Адай', 'Балқадиша']);
    setCustomKuiInput('');
    setSubmittedData(null);
  };

  return (
    <section className="section submission-section" id="submit-repertoire">
      <div className="container">
        
        <div className="sec-header">
          <span className="eyebrow">
            <Sparkles size={14} />
            <span>Күй қоры • Базаға тіркелу</span>
          </span>
          <h2 className="sec-title">
            Өз күйлеріңді <em>репертуарға қос!</em>
          </h2>
          <p className="sec-sub">
            Сіз домбырада қандай күйлерді орындай аласыз? Аты-жөніңіз бен білетін 
            шығармаларыңызды енгізіңіз — деректеріңіз бірден мектептің ресми репертуар базасына қосылады!
          </p>
        </div>

        <div className="card-white submission-card">
          {submittedData ? (
            <div className="submission-success-view">
              <div className="submission-success-icon">
                <CheckCircle2 size={48} color="#67a600" />
              </div>
              <h3 className="submission-success-title">
                Құттықтаймыз, {submittedData.name}!
              </h3>
              <p className="submission-success-text">
                Сіздің мәліметтеріңіз (<strong>{submittedData.classGrade}</strong>, {submittedData.group}) 
                және <strong>{submittedData.repertoire.length} күйіңіз</strong> жалпы Qos Perne репертуар базасына қосылды!
              </p>

              <div className="submission-kuis-summary">
                {submittedData.repertoire.map((k) => (
                  <span key={k} className="badge-soft kui-summary-badge">
                    {k}
                  </span>
                ))}
              </div>

              <div className="submission-success-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={onNavigateToRepertoire}
                >
                  <BookOpen size={18} />
                  <span>Репертуар базасынан көру</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  <span>Басқа оқушыны қосу</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="submission-form">
              <div className="form-row-2">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="sub-name">
                    Оқушының аты-жөні <span className="text-brand">*</span>
                  </label>
                  <input
                    id="sub-name"
                    type="text"
                    className="input-field"
                    placeholder="Мысалы: Серік Ерболат"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Grade */}
                <div className="form-group">
                  <label className="form-label" htmlFor="sub-grade">
                    Сыныбы <span className="text-brand">*</span>
                  </label>
                  <select
                    id="sub-grade"
                    className="input-field select-field"
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g} сынып</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Group Choice */}
              <div className="form-group">
                <label className="form-label">
                  Топ деңгейі <span className="text-brand">*</span>
                </label>
                <div className="radio-pills">
                  <label className={`radio-pill ${group === 'Үлкен топ' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="sub-group"
                      value="Үлкен топ"
                      checked={group === 'Үлкен топ'}
                      onChange={() => setGroup('Үлкен топ')}
                    />
                    <span>Үлкен топ (Сахналық құрам)</span>
                  </label>

                  <label className={`radio-pill ${group === 'Кіші топ' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="sub-group"
                      value="Кіші топ"
                      checked={group === 'Кіші топ'}
                      onChange={() => setGroup('Кіші топ')}
                    />
                    <span>Кіші топ (Бастауыш деңгей)</span>
                  </label>
                </div>
              </div>

              {/* Kui Selector: Popular Pills */}
              <div className="form-group">
                <label className="form-label">
                  Танымал күйлерден жылдам белгілеу:
                </label>
                <div className="submission-quick-pills">
                  {POPULAR_KUIS.map((kui) => {
                    const isSelected = selectedKuis.includes(kui);
                    return (
                      <button
                        type="button"
                        key={kui}
                        className={`chip-pill ${isSelected ? 'active' : ''}`}
                        onClick={() => togglePopularKui(kui)}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {kui}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Kui Input */}
              <div className="form-group">
                <label className="form-label" htmlFor="custom-kui">
                  Өз күйіңізді жазып қосу (егер тізімде болмаса):
                </label>
                <div className="custom-kui-input-row">
                  <input
                    id="custom-kui"
                    type="text"
                    className="input-field"
                    placeholder="Мысалы: Көңіл толқыны, Тойбастар, Аққу..."
                    value={customKuiInput}
                    onChange={(e) => setCustomKuiInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomKui();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handleAddCustomKui}
                  >
                    <Plus size={16} />
                    <span>Қосу</span>
                  </button>
                </div>
              </div>

              {/* Selected Kuis List */}
              <div className="submission-selected-box">
                <div className="selected-box-header">
                  <strong>Таңдалған күйлер ({selectedKuis.length}):</strong>
                  {selectedKuis.length === 0 && (
                    <span className="text-muted">Әзірге күй таңдалмады</span>
                  )}
                </div>
                {selectedKuis.length > 0 && (
                  <div className="selected-kuis-tags">
                    {selectedKuis.map((kui) => (
                      <span key={kui} className="selected-kui-tag">
                        <span>{kui}</span>
                        <button
                          type="button"
                          className="remove-kui-btn"
                          onClick={() => removeKui(kui)}
                          title="Өшіру"
                          aria-label={`${kui} күйін өшіру`}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="submission-submit-row">
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  <UserCheck size={18} />
                  <span>Мені репертуар базасына қос</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
