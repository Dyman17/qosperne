import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { POPULAR_KUIS } from '../data/repertoireData';

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/FAgVLbxew4SEcbsksGsS4g";

export default function RegistrationModal({ isOpen, onClose, onShowToast }) {
  const [formData, setFormData] = useState({
    fullName: '',
    grade: '8',
    letter: 'A',
    groupPreference: 'Кіші топ',
    phone: '',
    experience: 'beginner',
    knownKuis: []
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleKuiToggle = (kui) => {
    setFormData(prev => {
      const exists = prev.knownKuis.includes(kui);
      if (exists) {
        return { ...prev, knownKuis: prev.knownKuis.filter(k => k !== kui) };
      } else {
        return { ...prev, knownKuis: [...prev.knownKuis, kui] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      alert('Өтінеміз, аты-жөніңізді енгізіңіз');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('qos_perne_applications') || '[]');
      existing.push({
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem('qos_perne_applications', JSON.stringify(existing));
    } catch (err) {
      console.warn('Storage error:', err);
    }

    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const kuisText = formData.knownKuis.length > 0 
      ? formData.knownKuis.join(', ')
      : 'Жаңадан үйренгім келеді';

    const text = `Сәлеметсіз бе! Мен Qos Perne домбыра клубына жазылғым келеді.\n\n` +
      `• Аты-жөнім: ${formData.fullName}\n` +
      `• Сыныбым: ${formData.grade} "${formData.letter}"\n` +
      `• Топ: ${formData.groupPreference}\n` +
      `• Телефон: ${formData.phone || 'Чат арқылы'}\n` +
      `• Білетін күйлерім: ${kuisText}\n\n` +
      `Дайындық уақыты мен орнын нақтылағым келеді.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    onShowToast?.('Өтінім WhatsApp-қа дайындалды');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Жабу">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="eyebrow">Тіркелу • Регистрация</span>
              <h3 className="modal-title">Домбыра клубына өтінім</h3>
              <p className="modal-subtitle">
                Мәліметтерді толтырыңыз. Жетекші сізбен хабарласып, деңгейіңізге сай топқа қосады.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="reg-form">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Аты-жөніңіз (ФИО) *</label>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Мысалы: Джембай Думан"
                  className="input-field"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-grade">Сынып</label>
                  <select
                    id="reg-grade"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="input-field form-select"
                  >
                    {['7', '8', '9', '10', '11', '12'].map(g => (
                      <option key={g} value={g}>{g} сынып</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-letter">Әріп (Литер)</label>
                  <select
                    id="reg-letter"
                    value={formData.letter}
                    onChange={(e) => setFormData({ ...formData, letter: e.target.value })}
                    className="input-field form-select"
                  >
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Қай топқа қосқыңыз келеді?</label>
                <div className="radio-pills">
                  <label className={`radio-pill ${formData.groupPreference === 'Кіші топ' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="group"
                      value="Кіші топ"
                      checked={formData.groupPreference === 'Кіші топ'}
                      onChange={() => setFormData({ ...formData, groupPreference: 'Кіші топ' })}
                    />
                    <span>Кіші топ (Бастауыш, нөлден)</span>
                  </label>
                  <label className={`radio-pill ${formData.groupPreference === 'Үлкен топ' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="group"
                      value="Үлкен топ"
                      checked={formData.groupPreference === 'Үлкен топ'}
                      onChange={() => setFormData({ ...formData, groupPreference: 'Үлкен топ' })}
                    />
                    <span>Үлкен топ (Сахналық құрам)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-phone">Телефон / WhatsApp нөміріңіз</label>
                <input
                  id="reg-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (7__) ___-__-__"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Қандай күйлерді білесіз? (белгілеңіз)
                </label>
                <div className="modal-kuis-selector">
                  {POPULAR_KUIS.slice(0, 10).map(kui => {
                    const isSelected = formData.knownKuis.includes(kui);
                    return (
                      <button
                        type="button"
                        key={kui}
                        className={`kui-check-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleKuiToggle(kui)}
                      >
                        <span>{kui}</span>
                        {isSelected && <CheckCircle2 size={13} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn-primary btn-block">
                  <span>Өтінімді сақтау</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={44} color="#67a600" />
            </div>
            <h3 className="success-title">Өтінім қабылданды</h3>
            <p className="success-desc">
              Рахмет, <strong>{formData.fullName}</strong>! Мәліметтеріңіз жазылды.
              Төмендегі батырма арқылы хабарламаны бірден жетекшінің WhatsApp-ына жолдаңыз немесе топқа өтіңіз:
            </p>

            <div className="success-actions">
              <button
                onClick={handleSendToWhatsApp}
                className="btn btn-primary btn-block"
              >
                <Send size={16} />
                <span>WhatsApp арқылы жіберу</span>
              </button>

              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block"
                onClick={onClose}
              >
                <span>WhatsApp тобына өту</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
