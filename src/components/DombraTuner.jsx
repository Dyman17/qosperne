import React, { useState, useRef } from 'react';
import { Volume2, Play, Disc3, Info } from 'lucide-react';

export default function DombraTuner() {
  const [playingString, setPlayingString] = useState(null);
  const audioCtxRef = useRef(null);

  // Play a plucked dombra string note with Web Audio API
  const playDombraTone = (freq, stringName) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      setPlayingString(stringName);

      const now = ctx.currentTime;
      const duration = 2.4;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(0.65, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.35);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);
      
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.3, now);
      osc2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      osc2.connect(osc2Gain);
      osc2Gain.connect(gainNode);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + duration);

      osc1.connect(gainNode);
      gainNode.connect(filter);
      filter.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);

      setTimeout(() => {
        setPlayingString(null);
      }, duration * 800);

    } catch (e) {
      console.warn('Audio play error:', e);
      setPlayingString(null);
    }
  };

  const playStrum = () => {
    playDombraTone(196.00, 'G3');
    setTimeout(() => {
      playDombraTone(293.66, 'D4');
      setPlayingString('both');
    }, 60);
  };

  return (
    <section className="section tuner-section" id="tuner">
      <div className="container">
        <div className="sec-header">
          <span className="eyebrow">
            <Volume2 size={14} />
            <span>Интерактивті бұрау • Тюнер</span>
          </span>
          <h2 className="sec-title">
            Домбыраның <em>қос ішегі</em>
          </h2>
          <p className="sec-sub">
            Қазақ домбырасының классикалық бұрауы — Соль (G) және Ре (D).
            Төмендегі ішектерді басып, аспабыңызды құлақ күйіне келтіріңіз немесе үнін тыңдаңыз.
          </p>
        </div>

        <div className="card-white tuner-card" style={{ padding: '28px' }}>
          <div className="tuner-fretboard" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
            {/* Upper string - Re (D4) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>1-ішек (Жоғарғы)</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text)' }}>Ре (D4)</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-strong)', marginLeft: '8px' }}>293.7 Гц</span>
              </div>

              <button
                type="button"
                className={`btn btn-sm ${playingString === 'D4' || playingString === 'both' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => playDombraTone(293.66, 'D4')}
              >
                <Play size={14} />
                <span>Ойнау</span>
              </button>
            </div>

            {/* Lower string - Sol (G3) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>2-ішек (Төменгі)</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text)' }}>Соль (G3)</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-strong)', marginLeft: '8px' }}>196.0 Гц</span>
              </div>

              <button
                type="button"
                className={`btn btn-sm ${playingString === 'G3' || playingString === 'both' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => playDombraTone(196.00, 'G3')}
              >
                <Play size={14} />
                <span>Ойнау</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Info size={16} color="#67a600" />
              <span>Дыбыс Web Audio API синтезаторы арқылы шынайы табиғи бұрау жиілігімен ойнатылады</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={playStrum}
            >
              <Disc3 size={15} />
              <span>Қос ішекті бірге шерту</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
