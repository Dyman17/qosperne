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

        <div className="card-white tuner-card">
          <div className="tuner-fretboard">
            {/* Upper string - Re (D4) */}
            <div className={`tuner-string-row ${playingString === 'D4' || playingString === 'both' ? 'active' : ''}`}>
              <div className="tuner-string-info">
                <span className="tuner-string-label">1-ішек (Жоғарғы)</span>
                <div className="tuner-note-hz-row">
                  <strong className="tuner-string-note">Ре (D4)</strong>
                  <span className="tuner-string-hz">293.7 Гц</span>
                </div>
              </div>

              <button
                type="button"
                className={`btn btn-sm tuner-play-btn ${playingString === 'D4' || playingString === 'both' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => playDombraTone(293.66, 'D4')}
                aria-label="Ре дыбысын ойнау"
              >
                <Play size={14} />
                <span>Ойнау</span>
              </button>
            </div>

            {/* Lower string - Sol (G3) */}
            <div className={`tuner-string-row ${playingString === 'G3' || playingString === 'both' ? 'active' : ''}`}>
              <div className="tuner-string-info">
                <span className="tuner-string-label">2-ішек (Төменгі)</span>
                <div className="tuner-note-hz-row">
                  <strong className="tuner-string-note">Соль (G3)</strong>
                  <span className="tuner-string-hz">196.0 Гц</span>
                </div>
              </div>

              <button
                type="button"
                className={`btn btn-sm tuner-play-btn ${playingString === 'G3' || playingString === 'both' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => playDombraTone(196.00, 'G3')}
                aria-label="Соль дыбысын ойнау"
              >
                <Play size={14} />
                <span>Ойнау</span>
              </button>
            </div>
          </div>

          <div className="tuner-bottom-row">
            <div className="tuner-hint">
              <Info size={16} className="tuner-hint-icon" />
              <span>Web Audio API: шынайы домбыра бұрауы</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm tuner-strum-btn"
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
